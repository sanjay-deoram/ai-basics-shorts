// Synthesizes the "soft" variant's sound palette into assets/sfx: felt-piano / marimba-like single notes in
// D major pentatonic for reveals, an airy swell for dissolves, a glassy tick, muted key taps, a warm two-note
// confirmation and a very quiet pad bed. Nothing percussive or cartoonish; everything sits under the voice.
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
const D4 = 293.66;
const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2]; // D E F# A B D  →  n1 … n6

// One felt-piano / marimba-like note: a soft hammer (low-passed noise), a strong fundamental, quick upper partials.
function note(f, len = 1.6) {
  const b = partials(len, f, [[1, 0.6, 0.42], [2, 0.14, 0.2], [3, 0.04, 0.1], [4, 0.07, 0.07], [1.003, 0.2, 0.5]]);
  mix(b, env(biquad(noiseBuf(0.03), "lp", 900), (t) => expDecay(t, 0.006, 0.002)), 0, 0.25);
  return room(biquad(env(b, (t) => Math.min(1, t / 0.006)), "lp", 2600), 0.2, 0.7);
}
// A muted key tap: felt, no click.
function key(pitch = 1) {
  const b = buf(0.08);
  mix(b, env(biquad(noiseBuf(0.03), "bp", 1100 * pitch, 1.2), (t) => expDecay(t, 0.006, 0.001)), 0, 0.8);
  mix(b, partials(0.06, 150 * pitch, [[1, 0.5, 0.014]]), 0.001);
  return biquad(b, "lp", 2200);
}

const SOUNDS = {
  n1: () => note(D4 * PENTA[0]), n2: () => note(D4 * PENTA[1]), n3: () => note(D4 * PENTA[2]),
  n4: () => note(D4 * PENTA[3]), n5: () => note(D4 * PENTA[4]), n6: () => note(D4 * PENTA[5]),
  // the opening: a low, soft D with its octave
  low: () => mix(note(D4 / 2, 2.2), note(D4, 2.2), 0, 0.35),
  // a warm two-note confirmation: A up to D
  confirm: () => mix(mix(buf(2.6), note(D4 * 1.5, 2.0), 0, 0.8), note(D4 * 2, 2.2), 0.16, 1),
  // an airy swell for dissolves: breath that rises and falls, no whoosh
  swell: () => room(env(biquad(noiseBuf(1.1), "bp", (t) => 500 + Math.sin(Math.min(t / 1.0, 1) * Math.PI) * 1100, 0.7),
    (t) => Math.pow(Math.sin(Math.min(t / 1.05, 1) * Math.PI), 2) * 0.7), 0.25, 0.5),
  // a gentle glassy tick: small things arriving
  glass: () => room(env(partials(0.5, D4 * 6, [[1, 0.4, 0.09], [2.01, 0.12, 0.05], [1.5, 0.1, 0.07]]), (t) => Math.min(1, t / 0.004)), 0.22, 0.4),
  key: () => key(1),
  // a run of muted taps at ~14 keys/s with human jitter (trim with "dur")
  keys: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, key(0.85 + rnd() * 0.35), t, 0.55 + rnd() * 0.45); t += 0.05 + rnd() * 0.05 + (rnd() < 0.12 ? 0.08 : 0); }
    return room(b, 0.1, 0.15);
  },
  // the bed: a D major add 9 chord of slow, slightly detuned sines, fading in and out, for the whole film
  // shortcut: constant level rather than ducked per voice line; the voice is near-continuous, so play it very low
  pad: () => {
    const LEN = 57.15, b = buf(LEN);
    [[0.5, 0.5], [0.75, 0.3], [1, 0.3], [1.25, 0.16], [1.5, 0.14], [2.25, 0.05]].forEach(([r, g], k) => {
      [-1, 1].forEach((side) => {
        let ph = rnd() * TAU; const f = D4 * r * (1 + side * 0.0015), lfo = 0.05 + k * 0.013 + (side > 0 ? 0.02 : 0);
        for (let i = 0; i < b.length; i++) { const t = i / SR; ph += (TAU * f) / SR; b[i] += Math.sin(ph) * g * (0.75 + 0.25 * Math.sin(TAU * lfo * t + k)); }
      });
    });
    return env(biquad(b, "lp", 1400), (t) => Math.min(1, t / 2.5, (LEN - t) / 2.5));
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
