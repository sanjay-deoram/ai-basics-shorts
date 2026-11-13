// Synthesizes the episode's own sound palette into assets/sfx: soft paper and stationery for things on the
// page, a real-feeling keyboard for typing, and a warm bell for Claude. Reveals keep the library pop.mp3
// (and the ending its pop, sparkle and chime): synthesized mallets, bubbles, wood, felt and pops were tried
// for them and turned down.
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
const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2]; // D E F# A B D

function key(pitch = 1) {
  const b = buf(0.09);
  mix(b, env(biquad(noiseBuf(0.02), "bp", 3200 * pitch, 1.4), (t) => expDecay(t, 0.0025, 0.0005)), 0, 0.9);
  mix(b, partials(0.06, 190 * pitch, [[1, 0.5, 0.012], [2.7, 0.15, 0.006]]), 0.002);
  mix(b, env(biquad(noiseBuf(0.02), "bp", 1800 * pitch, 2), (t) => expDecay(t, 0.003)), 0.045, 0.25); // release
  return b;
}

const SOUNDS = {
  // a light UI tap: buttons, chips landing, pills
  tap: () => room(mix(partials(0.12, 1800, [[1, 0.5, 0.018], [2.4, 0.2, 0.008]]),
    env(biquad(noiseBuf(0.01), "bp", 5000, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.5), 0.1, 0.2),
  // a tiny high tick: citation chips, small marks
  tick: () => partials(0.06, 3400, [[1, 0.45, 0.008], [1.5, 0.15, 0.005]]),
  key: () => key(1),
  // a run of keystrokes at ~15 keys/s with human jitter (trim with "dur")
  typing: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, key(0.85 + rnd() * 0.35), t, 0.55 + rnd() * 0.45); t += 0.045 + rnd() * 0.05 + (rnd() < 0.12 ? 0.08 : 0); }
    return room(b, 0.08, 0.15);
  },
  // the answer streaming in: softer, higher, quicker than a person typing
  stream: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, partials(0.05, 2600 + rnd() * 900, [[1, 0.25, 0.006]]), t, 0.5 + rnd() * 0.5); t += 0.03 + rnd() * 0.035; }
    return room(b, 0.12, 0.2);
  },
  // a sheet sliding across paper
  paper: () => room(env(biquad(noiseBuf(0.5), "bp", (t) => 2600 - t * 2600, 0.9),
    (t) => (t < 0.06 ? t / 0.06 : Math.exp(-(t - 0.06) / 0.12)) * 0.8), 0.1, 0.3),
  // a card landing on the pile: a soft paper slap and a low thud
  drop: () => {
    const b = env(biquad(noiseBuf(0.25), "lp", 1600), (t) => expDecay(t, 0.03, 0.001) * 0.7);
    return room(mix(b, partials(0.25, 95, [[1, 0.6, 0.05]], (t) => 1 + Math.exp(-t / 0.02) * 0.6)), 0.1, 0.25);
  },
  // an airy move (replaces the whoosh): band-passed breath that rises and falls
  air: () => room(env(biquad(noiseBuf(0.6), "bp", (t) => 500 + Math.sin(Math.min(t / 0.5, 1) * Math.PI) * 2400, 0.8),
    (t) => Math.pow(Math.sin(Math.min(t / 0.55, 1) * Math.PI), 2) * 0.7), 0.15, 0.3),
  // a felt-tip highlighter stroke
  marker: () => {
    const b = env(biquad(noiseBuf(0.4), "bp", 4200, 1.8), (t) => Math.sin(Math.min(t / 0.36, 1) * Math.PI) * (0.6 + 0.4 * Math.sin(TAU * 38 * t)) * 0.8);
    return room(biquad(b, "hp", 1500), 0.08, 0.15);
  },
  // a pen drawing a longer stroke
  pen: () => {
    const b = env(biquad(noiseBuf(0.8), "bp", (t) => 3000 + 600 * Math.sin(TAU * 2 * t), 1.5), (t) => Math.sin(Math.min(t / 0.75, 1) * Math.PI) * (0.55 + 0.45 * Math.abs(Math.sin(TAU * 11 * t))) * 0.7);
    return room(biquad(b, "hp", 1200), 0.08, 0.15);
  },
  // the send button: a quick rising bloop
  send: () => room(mix(partials(0.25, 380, [[1, 0.7, 0.07], [2, 0.15, 0.04]], (t) => 1 + Math.min(t / 0.09, 1) * 1.9),
    env(biquad(noiseBuf(0.01), "bp", 4000, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.4), 0.14, 0.35),
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
