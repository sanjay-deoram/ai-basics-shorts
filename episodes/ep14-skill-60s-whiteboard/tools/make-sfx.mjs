// Synthesizes the whiteboard variant's sound palette into assets/sfx: dry-erase marker strokes (scribble for
// doodles, write for handwriting), squeaks, the marker cap, eraser passes, a board knock, stopwatch ticks, a
// lightbulb ding, soft pops, check-mark flicks, a paper shuffle, a "nope" for the red X, and the warm Claude bell.
// Every sound is generated from seeded noise and sine partials, so a rerun gives the same files.
//
// Usage (from the project folder):  node tools/make-sfx.mjs   (needs ffmpeg on PATH)
// Writes assets/sfx/<name>.mp3 and assets/sfx/lengths.json (seconds, read by tools/build-sfx.mjs).
import { writeFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

// SFX_OUT writes somewhere else (for auditions); SFX_ONLY=a,b limits which sounds are written.
const out = process.env.SFX_OUT || join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "sfx");
const ONLY = process.env.SFX_ONLY ? process.env.SFX_ONLY.split(",") : null;
const SR = 44100;
const TAU = Math.PI * 2;

let seed = 1337;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;

const buf = (sec) => new Float32Array(Math.ceil(sec * SR));
const mix = (dst, src, at = 0, gain = 1) => {
  const o = Math.round(at * SR);
  for (let i = 0; i < src.length && o + i < dst.length; i++) dst[o + i] += src[i] * gain;
  return dst;
};

// RBJ biquad; f may be a number or a function of time (for sweeps).
function biquad(x, type, f, q = 0.7) {
  const y = new Float32Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const fc = typeof f === "function" ? f(i / SR) : f;
    const w = (TAU * Math.min(fc, SR * 0.45)) / SR, c = Math.cos(w), a = Math.sin(w) / (2 * q);
    let b0, b1, b2;
    if (type === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = b0; }
    else if (type === "hp") { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = b0; }
    else { b0 = a; b1 = 0; b2 = -a; } // band-pass, 0 dB peak
    const a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
    const v = (b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
  }
  return y;
}

const env = (x, fn) => { for (let i = 0; i < x.length; i++) x[i] *= fn(i / SR); return x; };
const expDecay = (t, tau, attack = 0.002) => (t < attack ? t / attack : Math.exp(-(t - attack) / tau));
const noiseBuf = (sec) => { const b = buf(sec); for (let i = 0; i < b.length; i++) b[i] = noise(); return b; };

// Sine partials [freqRatio, gain, decayTau]; pitch may glide via fn(t) multiplier.
function partials(sec, f0, parts, glide) {
  const b = buf(sec);
  parts.forEach(([r, g, tau]) => {
    let ph = rnd() * TAU;
    for (let i = 0; i < b.length; i++) {
      const t = i / SR;
      ph += (TAU * f0 * r * (glide ? glide(t) : 1)) / SR;
      b[i] += Math.sin(ph) * g * expDecay(t, tau, 0.003);
    }
  });
  return b;
}

// Small, soft room: four combs and an all-pass, mixed low.
function room(x, wet = 0.14, tail = 0.5) {
  const y = new Float32Array(x.length + Math.round(tail * SR));
  y.set(x);
  const w = new Float32Array(y.length);
  [1116, 1188, 1277, 1356].forEach((d) => {
    const line = new Float32Array(d); let k = 0, lp = 0;
    for (let i = 0; i < y.length; i++) {
      const o = line[k]; lp = o * 0.6 + lp * 0.4; line[k] = y[i] + lp * 0.78; k = (k + 1) % d; w[i] += o / 4;
    }
  });
  const ap = new Float32Array(556); let k = 0;
  for (let i = 0; i < w.length; i++) { const o = ap[k]; const v = w[i] + o * 0.5; ap[k] = v; w[i] = o - v * 0.5; k = (k + 1) % 556; }
  for (let i = 0; i < y.length; i++) y[i] = y[i] * (1 - wet) + w[i] * wet * 2;
  return y;
}

/* ---------- the palette: marker on a whiteboard ---------- */
const D5 = 587.33;
const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2]; // D E F# A B D
const hump = (t, a, d) => (t < a ? 0 : t > a + d ? 0 : Math.sin(((t - a) / d) * Math.PI));

// one marker stroke on the board: band-passed felt scratch with a little grain
function stroke(sec, fc, gain = 1) {
  const b = env(biquad(noiseBuf(sec), "bp", (t) => fc * (1 + 0.18 * Math.sin(TAU * (3 + rnd()) * t)), 1.6), (t) => Math.pow(Math.sin(Math.min(t / sec, 1) * Math.PI), 0.7) * gain);
  return biquad(b, "hp", 1400);
}
// a run of strokes: rate = strokes/s, with gaps between words (trim with "dur")
function strokes(rate, fc, gapP) {
  const b = buf(3.0); let t = 0.005;
  while (t < 2.85) {
    const d = (0.6 + rnd() * 0.6) / rate;
    mix(b, stroke(d, fc * (0.8 + rnd() * 0.5), 0.55 + rnd() * 0.45), t);
    if (rnd() < 0.18) mix(b, partials(0.08, 1700 + rnd() * 900, [[1, 0.06, 0.03]], (x) => 1 + x * 3), t + d * 0.8); // a faint squeak on a turn
    t += d * (0.85 + rnd() * 0.3) + (rnd() < gapP ? 0.08 + rnd() * 0.1 : 0);
  }
  return room(b, 0.06, 0.12);
}

const SOUNDS = {
  // the classic dry-erase squeak: a short tonal chirp that bends up, with felt grain under it
  squeak: () => {
    const b = partials(0.24, 1850, [[1, 0.5, 0.09], [2.01, 0.12, 0.05]], (t) => 1 + Math.min(t / 0.12, 1) * 0.35 + 0.03 * Math.sin(TAU * 42 * t));
    env(b, (t) => Math.min(t / 0.015, 1) * Math.sin(Math.min(t / 0.22, 1) * Math.PI));
    return room(mix(b, stroke(0.2, 3200, 0.35), 0), 0.08, 0.15);
  },
  // drawing a doodle: broad marker strokes at ~8/s
  scribble: () => strokes(8, 2600, 0.06),
  // handwriting: quicker, smaller strokes at ~13/s with pauses between words
  write: () => strokes(13, 3400, 0.16),
  // uncapping the marker: a plastic tick and a little suction pop
  cap: () => {
    const b = buf(0.16);
    mix(b, env(biquad(noiseBuf(0.02), "bp", 3600, 2), (t) => expDecay(t, 0.003, 0.0004)), 0, 0.7);
    mix(b, partials(0.08, 1250, [[1, 0.4, 0.014], [2.3, 0.15, 0.008]]), 0.001);
    mix(b, partials(0.1, 320, [[1, 0.5, 0.025]], (t) => 1 + Math.min(t / 0.035, 1) * 0.9), 0.045);
    return room(b, 0.1, 0.2);
  },
  // the felt eraser rubbing the board, three passes
  erase: () => {
    const b = env(biquad(noiseBuf(0.6), "bp", (t) => 900 + 500 * Math.sin(TAU * 5 * t), 0.9), (t) => (hump(t, 0, 0.2) + hump(t, 0.19, 0.2) + hump(t, 0.38, 0.2)) * 0.8);
    return room(biquad(b, "lp", 3500), 0.08, 0.2);
  },
  // a knock on the board (the big 60s lands)
  thump: () => {
    const b = partials(0.4, 92, [[1, 0.8, 0.09], [2.4, 0.25, 0.05]], (t) => 1 + Math.exp(-t / 0.02) * 0.5);
    mix(b, partials(0.3, 230, [[1, 0.25, 0.08]]), 0.002);
    mix(b, env(biquad(noiseBuf(0.05), "lp", 1800), (t) => expDecay(t, 0.008, 0.0005)), 0, 0.5);
    return room(b, 0.12, 0.3);
  },
  // the stopwatch ticking (6 ticks)
  clock: () => {
    const b = buf(0.85);
    for (let i = 0; i < 6; i++) mix(b, partials(0.05, i % 2 ? 2300 : 2600, [[1, 0.5, 0.008], [1.6, 0.2, 0.005]]), i * 0.13);
    return room(b, 0.1, 0.15);
  },
  // the lightbulb moment: a small bright bell
  ding: () => {
    const b = partials(1.0, 1568, [[1, 0.5, 0.35], [2.0, 0.12, 0.2], [2.76, 0.1, 0.12], [1.003, 0.25, 0.3]]);
    for (let i = 0; i < 4; i++) mix(b, partials(0.25, 3136 * PENTA[i + 1], [[1, 0.04, 0.08]]), 0.04 + i * 0.04);
    return room(b, 0.16, 0.5);
  },
  // a soft pop for a doodle reveal
  pop: () => room(mix(partials(0.16, 520, [[1, 0.7, 0.035]], (t) => 1 - Math.min(t / 0.05, 1) * 0.45),
    env(biquad(noiseBuf(0.01), "bp", 2500, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.3), 0.1, 0.2),
  // a check mark: a quick flick of the marker with a tiny squeak
  tick: () => {
    const b = stroke(0.06, 3000, 0.6);
    mix(b, buf(0.1));
    const out = buf(0.16);
    mix(out, b, 0); mix(out, stroke(0.08, 3800, 0.8), 0.055);
    mix(out, partials(0.07, 2300, [[1, 0.12, 0.025]], (t) => 1 + t * 6), 0.07);
    return room(out, 0.08, 0.12);
  },
  // papers straightening: three quick slides
  shuffle: () => {
    const b = buf(0.6);
    for (let i = 0; i < 3; i++) mix(b, env(biquad(noiseBuf(0.18), "bp", (t) => 3000 - t * 6000, 0.9), (t) => Math.sin(Math.min(t / 0.18, 1) * Math.PI) * 0.7), i * 0.09);
    return room(b, 0.1, 0.2);
  },
  // the red X: two hard strokes and a low soft "nope"
  nope: () => {
    const b = buf(0.45);
    mix(b, stroke(0.1, 2200, 1), 0); mix(b, stroke(0.1, 2000, 1), 0.12);
    mix(b, env(partials(0.25, 150, [[1, 0.35, 0.12], [2, 0.15, 0.08], [3, 0.08, 0.05]]), (t) => Math.min(t / 0.01, 1)), 0.2);
    return room(b, 0.1, 0.2);
  },
  // a soft move of air (the narrator gliding)
  swish: () => room(env(biquad(noiseBuf(0.6), "bp", (t) => 500 + Math.sin(Math.min(t / 0.5, 1) * Math.PI) * 2000, 0.8),
    (t) => Math.pow(Math.sin(Math.min(t / 0.55, 1) * Math.PI), 2) * 0.7), 0.15, 0.3),
  // Claude: a warm, soft bell (inharmonic partials over a low D) with a faint shimmer on top
  claude: () => {
    const b = partials(2.0, D5, [[0.5, 0.35, 0.9], [1, 0.45, 0.7], [2.76, 0.14, 0.35], [5.4, 0.05, 0.15], [1.002, 0.25, 0.8]]);
    for (let i = 0; i < 7; i++) mix(b, partials(0.4, D5 * 4 * PENTA[i % 6], [[1, 0.05, 0.12]]), 0.05 + i * 0.045);
    return room(b, 0.2, 0.8);
  },
};
function writeMp3(name, x) {
  let peak = 0; for (const v of x) peak = Math.max(peak, Math.abs(v));
  const g = 0.89 / (peak || 1);
  // short fade at the end so nothing clicks
  const fade = Math.round(0.01 * SR);
  for (let i = 0; i < fade; i++) x[x.length - 1 - i] *= i / fade;
  const pcm = Buffer.alloc(44 + x.length * 2);
  pcm.write("RIFF", 0); pcm.writeUInt32LE(36 + x.length * 2, 4); pcm.write("WAVEfmt ", 8);
  pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(1, 22); pcm.writeUInt32LE(SR, 24);
  pcm.writeUInt32LE(SR * 2, 28); pcm.writeUInt16LE(2, 32); pcm.writeUInt16LE(16, 34); pcm.write("data", 36);
  pcm.writeUInt32LE(x.length * 2, 40);
  x.forEach((v, i) => pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(v * g * 32767))), 44 + i * 2));
  const wav = join(out, `${name}.wav`);
  writeFileSync(wav, pcm);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", wav, "-ac", "2", "-b:a", "192k", join(out, `${name}.mp3`)]);
  unlinkSync(wav);
  return +(x.length / SR).toFixed(2);
}

const lengths = {};
for (const [name, make] of Object.entries(SOUNDS)) if (!ONLY || ONLY.includes(name)) lengths[name] = writeMp3(name, make());
if (!ONLY) writeFileSync(join(out, "lengths.json"), JSON.stringify(lengths, null, 2) + "\n");
console.log(`${Object.keys(lengths).length} sounds → assets/sfx`);
