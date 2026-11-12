// Synthesizes the sketch variant's own sound palette into assets/sfx: a whiteboard desk. Pencil scratches and
// scribbles for strokes drawing on, a marker squeak for circles, a highlighter swipe, handwriting, sticky notes
// sticking, paper slides and soft thuds for landings, an eraser for clearing, light ticks and taps, a soft keyboard
// and a mouse click for the terminal and chat, and wooden marimba / kalimba notes for the moments that land
// (Claude, a match, the end). No library sounds.
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

/* ---------- the palette ---------- */
const D5 = 587.33;

// grainy amplitude: lowpassed noise around 1, gives pencil graphite its grit
function grit(sec, cut = 90, depth = 0.6) {
  const g = biquad(noiseBuf(sec), "lp", cut, 0.7);
  let pk = 0; for (const v of g) pk = Math.max(pk, Math.abs(v));
  return g.map((v) => 1 - depth + depth * Math.min(1, Math.abs(v / (pk || 1)) * 2));
}
// one pencil stroke of length sec, centred at f
function stroke(sec, f = 3600, gain = 1) {
  const n = biquad(biquad(noiseBuf(sec), "bp", (t) => f * (1 + 0.08 * Math.sin(TAU * 3 * t)), 1.2), "hp", 1400);
  const g = grit(sec, 120, 0.7);
  return env(n.map((v, i) => v * g[i] * gain), (t) => Math.min(1, t / 0.015) * Math.max(0, Math.min(1, (sec - t) / 0.04)));
}
// a wooden mallet note (marimba-like: fundamental, the 4th partial, a short click)
function mallet(f, sec = 1.0, gain = 1) {
  const b = partials(sec, f, [[1, 0.7 * gain, 0.32], [3.93, 0.18 * gain, 0.06], [9.2, 0.05 * gain, 0.02]]);
  return mix(b, env(biquad(noiseBuf(0.01), "bp", 2400, 1.2), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.15 * gain);
}
function key(pitch = 1) {
  const b = buf(0.08);
  mix(b, env(biquad(noiseBuf(0.02), "bp", 2400 * pitch, 1.2), (t) => expDecay(t, 0.003, 0.0005)), 0, 0.7);
  mix(b, partials(0.05, 160 * pitch, [[1, 0.35, 0.01]]), 0.002);
  return biquad(b, "lp", 6000);
}

const SOUNDS = {
  // frame 0: a big sheet flaps down onto the desk with a soft low thud
  flap: () => room(mix(env(biquad(noiseBuf(0.5), "bp", (t) => 600 + 1800 * Math.exp(-t / 0.12), 0.7), (t) => Math.min(1, t / 0.03) * Math.exp(-t / 0.1) * 0.8),
    partials(0.6, 70, [[1, 0.9, 0.12], [2.1, 0.2, 0.05]], (t) => 1 + 0.5 * Math.exp(-t / 0.03)), 0.05), 0.12, 0.4),
  // something landing on the paper: a soft thud
  thud: () => room(mix(partials(0.3, 95, [[1, 0.8, 0.06], [2.4, 0.15, 0.025]], (t) => 1 + 0.4 * Math.exp(-t / 0.02)),
    env(biquad(noiseBuf(0.1), "lp", 900), (t) => expDecay(t, 0.015, 0.001)), 0, 0.4), 0.1, 0.2),
  // a sheet sliding across paper
  slide: () => room(env(biquad(noiseBuf(0.55), "bp", (t) => 1900 - t * 1500, 0.8), (t) => (t < 0.08 ? t / 0.08 : Math.exp(-(t - 0.08) / 0.14)) * 0.8), 0.08, 0.25),
  // a sticky note pressed onto the board: a papery slap and a small thump
  stick: () => room(mix(env(biquad(noiseBuf(0.12), "hp", 1800), (t) => expDecay(t, 0.012, 0.0008)), partials(0.15, 150, [[1, 0.5, 0.03]]), 0.002, 1), 0.08, 0.15),
  // one pencil stroke drawing on (trim with "dur")
  scratch: () => stroke(0.6, 3800),
  // a hachure fill: quick back-and-forth strokes (trim with "dur")
  scribble: () => {
    const b = buf(1.5); let t = 0, k = 0;
    while (t < 1.4) { const d = 0.07 + rnd() * 0.03; mix(b, stroke(d, k++ % 2 ? 3300 : 4100, 0.8 + rnd() * 0.3), t); t += d + 0.012; }
    return room(b, 0.05, 0.1);
  },
  // a marker loop on a whiteboard: a slip-stick squeak riding on felt noise
  squeak: () => {
    const sec = 0.6, b = buf(sec); let ph = 0;
    for (let i = 0; i < b.length; i++) {
      const t = i / SR; ph += (TAU * (1900 + 350 * Math.sin(TAU * 2.2 * t) + 120 * Math.sin(TAU * 31 * t))) / SR;
      b[i] = Math.sin(ph) * 0.25 * (0.5 + 0.5 * Math.sin(TAU * 47 * t)) * Math.sin(Math.min(t / sec, 1) * Math.PI);
    }
    mix(b, env(biquad(noiseBuf(sec), "bp", 5200, 1.5), (t) => Math.sin(Math.min(t / sec, 1) * Math.PI) * 0.5));
    return room(biquad(b, "hp", 900), 0.08, 0.15);
  },
  // a highlighter swipe: broad felt, a quick rise and fall
  swipe: () => room(biquad(env(biquad(noiseBuf(0.4), "bp", (t) => 3000 + 1500 * t, 1.1), (t) => Math.pow(Math.sin(Math.min(t / 0.38, 1) * Math.PI), 1.5) * 0.8), "hp", 1500), 0.06, 0.12),
  // handwriting: short pencil strokes with small pauses (trim with "dur")
  write: () => {
    const b = buf(2.8); let t = 0.01;
    while (t < 2.65) { const d = 0.05 + rnd() * 0.14; mix(b, stroke(d, 3000 + rnd() * 1600, 0.5 + rnd() * 0.5), t); t += d + 0.015 + rnd() * 0.05 + (rnd() < 0.1 ? 0.1 : 0); }
    return room(b, 0.05, 0.1);
  },
  // an eraser rubbing the board clean
  erase: () => {
    const g = grit(0.55, 60, 0.5);
    return room(env(biquad(noiseBuf(0.55), "bp", 1100, 0.9).map((v, i) => v * g[i]), (t) => (0.6 + 0.4 * Math.sin(TAU * 9 * t)) * Math.sin(Math.min(t / 0.55, 1) * Math.PI)), 0.06, 0.15);
  },
  // a soft keyboard run (trim with "dur")
  keys: () => {
    const b = buf(2.6); let t = 0.01;
    while (t < 2.5) { mix(b, key(0.9 + rnd() * 0.3), t, 0.5 + rnd() * 0.5); t += 0.05 + rnd() * 0.05 + (rnd() < 0.1 ? 0.08 : 0); }
    return room(b, 0.06, 0.12);
  },
  // a mouse click: press and release
  click: () => mix(mix(buf(0.1), env(biquad(noiseBuf(0.01), "bp", 3800, 2), (t) => expDecay(t, 0.0015, 0.0002))),
    env(biquad(noiseBuf(0.01), "bp", 3000, 2), (t) => expDecay(t, 0.0015, 0.0002)), 0.045, 0.6),
  // a light pencil tick: check marks, small marks
  tick: () => mix(partials(0.06, 2300, [[1, 0.3, 0.008]]), env(biquad(noiseBuf(0.02), "bp", 4800, 1.5), (t) => expDecay(t, 0.003, 0.0004)), 0, 0.8),
  // a pencil tapping the desk: chips, labels, small arrivals
  tap: () => room(mix(partials(0.15, 880, [[1, 0.5, 0.025], [2.7, 0.2, 0.01]]), env(biquad(noiseBuf(0.01), "bp", 3000, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.5), 0.1, 0.15),
  // a match: two rising wooden notes
  match: () => room(mix(mallet(D5 * 0.75, 0.9), mallet(D5, 0.9), 0.11), 0.16, 0.4),
  // vague: a dull low double knock
  bonk: () => room(mix(mallet(196, 0.5, 0.9), mallet(165, 0.5, 0.9), 0.15), 0.1, 0.2),
  // the end: three wooden notes resolving up
  done: () => room(mix(mix(mallet(D5 * 0.75, 1.3), mallet(D5 * 0.9, 1.3), 0.12), mallet(D5 * 1.125, 1.3), 0.24), 0.18, 0.6),
  // Claude: a soft kalimba chord, plucked low to high
  claude: () => {
    const b = buf(1.6);
    [[D5, 0], [D5 * 1.5, 0.06], [D5 * 2, 0.12]].forEach(([f, t]) => mix(b, partials(1.4, f, [[1, 0.5, 0.45], [5.9, 0.06, 0.04], [1.003, 0.2, 0.4]]), t));
    return room(b, 0.2, 0.6);
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
