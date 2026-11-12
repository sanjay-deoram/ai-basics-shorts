// Synthesizes the dark variant's sound palette into assets/sfx: understated product-film sound design.
// Deep soft sub hits for panels arriving, tight mechanical key taps, precise UI clicks, a short airy riser for
// push-ins, a glassy confirmation tone, a low muted tone for "Vague", and a very quiet dark pad under the voice.
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
function key(pitch = 1) {
  const b = buf(0.08);
  mix(b, env(biquad(noiseBuf(0.015), "bp", 3600 * pitch, 2.2), (t) => expDecay(t, 0.0016, 0.0003)), 0, 0.9);
  mix(b, partials(0.05, 150 * pitch, [[1, 0.45, 0.009], [3.1, 0.12, 0.004]]), 0.001);
  mix(b, env(biquad(noiseBuf(0.012), "bp", 2100 * pitch, 3), (t) => expDecay(t, 0.002)), 0.042, 0.18); // release
  return b;
}
const lfo = (t, hz, ph = 0) => 0.5 + 0.5 * Math.sin(TAU * hz * t + ph);

const SOUNDS = {
  // a panel arrives: a deep, soft sub hit (with a little upper body so small speakers still hear it)
  sub: () => {
    const b = partials(1.0, 50, [[1, 0.9, 0.2], [2, 0.3, 0.12], [3.6, 0.08, 0.05]], (t) => 1 + Math.exp(-t / 0.035) * 0.9);
    mix(b, env(biquad(noiseBuf(0.2), "lp", 420), (t) => expDecay(t, 0.03, 0.004)), 0, 0.35);
    return room(biquad(b, "lp", 900), 0.12, 0.4);
  },
  // one tight mechanical key tap, and a run of them (~14 keys/s, trim with "dur")
  key: () => key(1),
  keys: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, key(0.88 + rnd() * 0.28), t, 0.5 + rnd() * 0.5); t += 0.05 + rnd() * 0.045 + (rnd() < 0.1 ? 0.07 : 0); }
    return room(b, 0.05, 0.12);
  },
  // a precise UI click: buttons, enter, rows selected
  click: () => mix(mix(partials(0.07, 2300, [[1, 0.5, 0.005], [0.42, 0.35, 0.012]]),
    env(biquad(noiseBuf(0.008), "hp", 5000), (t) => expDecay(t, 0.0012, 0.0002)), 0, 0.6),
    partials(0.05, 1500, [[1, 0.18, 0.006]]), 0.03),
  // a tiny data tick: rows and markers appearing
  tick: () => partials(0.05, 2900, [[1, 0.4, 0.006], [1.5, 0.12, 0.004]]),
  // output streaming in: soft, fast, high ticks (trim with "dur")
  stream: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, partials(0.04, 2400 + rnd() * 700, [[1, 0.22, 0.005]]), t, 0.4 + rnd() * 0.6); t += 0.032 + rnd() * 0.03; }
    return room(b, 0.1, 0.2);
  },
  // a short airy riser for push-ins and scene moves
  riser: () => room(env(biquad(noiseBuf(0.85), "bp", (t) => 350 + Math.pow(t / 0.8, 2) * 5200, 1.1),
    (t) => (t < 0.74 ? Math.pow(t / 0.74, 2.2) : Math.exp(-(t - 0.74) / 0.03)) * 0.7), 0.2, 0.5),
  // the accent line scanning a panel: a thin glassy sweep
  scan: () => {
    const b = partials(0.6, 1700, [[1, 0.18, 0.5], [1.5, 0.1, 0.4]], (t) => 1 + t * 0.9);
    mix(b, biquad(noiseBuf(0.6), "bp", (t) => 5000 + t * 3000, 3), 0, 0.12);
    return room(env(b, (t) => Math.pow(Math.sin(Math.min(t / 0.58, 1) * Math.PI), 1.5)), 0.2, 0.3);
  },
  // loaded / matched / specific: a glassy two-note digital confirmation
  confirm: () => {
    const note = (f) => partials(1.2, f, [[1, 0.45, 0.32], [2, 0.12, 0.16], [3.01, 0.06, 0.1], [1.003, 0.2, 0.4]]);
    const b = buf(1.4);
    mix(b, note(880), 0); mix(b, note(1318.5), 0.085, 0.9);
    return room(b, 0.24, 0.9);
  },
  // "Vague": a low, muted, falling tone
  vague: () => {
    const b = buf(0.8);
    mix(b, partials(0.5, 207.65, [[1, 0.6, 0.11], [2, 0.12, 0.05]]), 0);
    mix(b, partials(0.6, 174.61, [[1, 0.6, 0.16], [2, 0.1, 0.06]]), 0.15);
    return room(biquad(b, "lp", 650), 0.15, 0.4);
  },
  // a very quiet dark pad for the whole film (D minor drone, slow movement)
  pad: () => {
    const LEN = 58, b = buf(LEN);
    [[73.42, 0.5, 0.05, 0], [110, 0.3, 0.07, 1.3], [146.83, 0.22, 0.045, 2.1], [174.61, 0.12, 0.06, 0.7], [220.4, 0.08, 0.09, 3.3]].forEach(([f, g, hz, ph]) => {
      for (let i = 0; i < b.length; i++) { const t = i / SR; b[i] += Math.sin(TAU * f * t) * g * (0.45 + 0.55 * lfo(t, hz, ph)); }
    });
    mix(b, biquad(noiseBuf(LEN), "lp", 500), 0, 0.02);
    return env(biquad(b, "lp", 700), (t) => Math.min(1, t / 1.5, (LEN - t) / 2.5));
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
