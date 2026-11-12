// Synthesizes ep15's own sound palette into assets/sfx: snappy UI sounds for a fast product reel. Whip-pans get a
// band-swept breath with a low push, words and rows get small ticks and pops, the terminal gets real-feeling keys,
// the stamp a felt thud, wins a two-note pluck, the failing test a soft low buzz, the end card a warm bell.
// Every sound is generated from seeded noise and sine partials, so a rerun gives the same files.
// (The music bed is tools/make-music.mjs.)
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
// Karplus-Strong pluck
function pluck(sec, f, damp = 0.996, bright = 0.5) {
  const b = buf(sec), n = Math.round(SR / f), line = new Float32Array(n);
  for (let i = 0; i < n; i++) line[i] = noise() * (1 - bright) + (i < n / 2 ? 1 : -1) * bright;
  let k = 0, prev = 0;
  for (let i = 0; i < b.length; i++) { const v = line[k]; const nv = (v + prev) * 0.5 * damp; prev = v; line[k] = nv; b[i] = v; k = (k + 1) % n; }
  return env(b, (t) => (t < 0.002 ? t / 0.002 : 1));
}
const sweep = (sec, f) => biquad(noiseBuf(sec), "bp", f, 1.1);

const SOUNDS = {
  // whip-pan: a band sweep up and back down with a low push in the middle
  whip: () => {
    const sec = 0.42;
    const b = env(sweep(sec, (t) => 400 + Math.sin(Math.min(t / sec, 1) * Math.PI) * 5200), (t) => Math.pow(Math.sin(Math.min(t / sec, 1) * Math.PI), 1.6));
    mix(b, partials(sec, 70, [[1, 0.5, 0.12]], (t) => 1 + t * 1.5), 0.12);
    return room(b, 0.1, 0.2);
  },
  // the idea bloom: a swell that rises into the colour flip
  bloom: () => {
    const sec = 0.7;
    const b = env(sweep(sec, (t) => 300 + t * 6000), (t) => Math.pow(Math.min(t / 0.55, 1), 2.2) * (t > 0.58 ? Math.exp(-(t - 0.58) / 0.04) : 1));
    mix(b, partials(sec, 220, [[1, 0.35, 0.5], [1.5, 0.2, 0.4]], (t) => 1 + t * 1.6), 0, 0.6);
    return room(b, 0.16, 0.4);
  },
  // a round UI pop: things landing
  pop: () => room(mix(partials(0.14, 760, [[1, 0.8, 0.04], [2, 0.15, 0.02]], (t) => 1 + Math.exp(-t / 0.015) * 0.7),
    env(biquad(noiseBuf(0.01), "bp", 5000, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.3), 0.1, 0.2),
  // a tiny high tick: rows, words, check marks
  tick: () => mix(partials(0.07, 3000, [[1, 0.45, 0.01], [1.5, 0.18, 0.006]]), env(biquad(noiseBuf(0.01), "hp", 6000), (t) => expDecay(t, 0.0015, 0.0002)), 0, 0.3),
  key: () => key(1),
  // a run of keystrokes at ~15 keys/s with human jitter (trim with "dur")
  typing: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, key(0.85 + rnd() * 0.35), t, 0.55 + rnd() * 0.45); t += 0.045 + rnd() * 0.05 + (rnd() < 0.12 ? 0.08 : 0); }
    return room(b, 0.08, 0.15);
  },
  // Enter: a bigger, lower key with a thock
  enter: () => room(mix(mix(key(0.7), key(0.72), 0.004, 0.6), partials(0.12, 120, [[1, 0.6, 0.03]]), 0.002), 0.1, 0.2),
  // a mouse click on a button
  click: () => mix(mix(buf(0.08), key(1.4), 0), key(1.2), 0.03, 0.7),
  // rubber stamp: a felt slap on a low thud
  thud: () => {
    const b = env(biquad(noiseBuf(0.3), "lp", 1800), (t) => expDecay(t, 0.025, 0.001) * 0.8);
    return room(mix(b, partials(0.4, 62, [[1, 1, 0.12], [2.1, 0.2, 0.04]], (t) => 1 + Math.exp(-t / 0.03) * 0.8)), 0.12, 0.3);
  },
  // a win: two bright plucks, a fifth apart, rising
  success: () => {
    const b = buf(0.9);
    mix(b, pluck(0.8, 659.25, 0.995, 0.3), 0, 0.7);
    mix(b, pluck(0.8, 987.77, 0.995, 0.3), 0.09, 0.7);
    mix(b, partials(0.6, 1975.5, [[1, 0.12, 0.2]]), 0.09);
    return room(b, 0.18, 0.4);
  },
  // the failing test: two short soft low buzzes, falling
  error: () => {
    const buzz = (f) => env(biquad(partials(0.16, f, [[1, 0.5, 1], [2, 0.3, 1], [3, 0.22, 1], [5, 0.12, 1]]), "lp", 1400), (t) => (t < 0.01 ? t / 0.01 : Math.exp(-(t - 0.01) / 0.07)));
    const b = buf(0.45);
    mix(b, buzz(220), 0, 0.8); mix(b, buzz(185), 0.15, 0.8);
    return room(b, 0.1, 0.2);
  },
  // the montage pull-back: a reverse whoosh that swells and stops
  zoom: () => {
    const sec = 0.8;
    return room(env(sweep(sec, (t) => 6000 - t * 6500), (t) => Math.pow(Math.min(t / 0.7, 1), 2) * (t > 0.7 ? Math.exp(-(t - 0.7) / 0.03) : 1)), 0.12, 0.3);
  },
  // the file wall streaming past: a long airy rush with card flicks on top
  flurry: () => {
    const sec = 2.0;
    const b = env(sweep(sec, (t) => 800 + Math.sin(Math.min(t / sec, 1) * Math.PI) * 3000), (t) => Math.pow(Math.sin(Math.min(t / sec, 1) * Math.PI), 1.2) * 0.5);
    let t = 0.1;
    while (t < 1.8) { mix(b, env(biquad(noiseBuf(0.03), "bp", 2500 + rnd() * 3000, 2), (x) => expDecay(x, 0.006, 0.001)), t, 0.35 * Math.sin((t / 1.9) * Math.PI)); t += 0.04 + rnd() * 0.04; }
    return room(b, 0.12, 0.3);
  },
  // drawing the ring around the montage
  pen: () => {
    const b = env(biquad(noiseBuf(0.65), "bp", (t) => 3000 + 600 * Math.sin(TAU * 2 * t), 1.5), (t) => Math.sin(Math.min(t / 0.6, 1) * Math.PI) * (0.55 + 0.45 * Math.abs(Math.sin(TAU * 9 * t))) * 0.7);
    return room(biquad(b, "hp", 1200), 0.08, 0.15);
  },
  // Claude: a warm, soft bell (inharmonic partials over a low D) with a faint shimmer on top
  chime: () => {
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
