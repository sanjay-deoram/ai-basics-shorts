// Synthesizes the comic variant's sound palette into assets/sfx: punchy whooshes and panel slams, pops and a
// boing for stickers, brassy stabs for bursts, an ink-pen scratch for lettering, a typewriter for the terminal,
// a page turn, a zap, a comedic "wah" for VAGUE and a triumphant hit for SPECIFIC.
// Every sound is generated from seeded noise, sines and saws, so a rerun gives the same files.
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
const D4 = 293.66, Fs4 = 369.99, A4 = 440, D5 = 587.33;

// Brass-ish tone: a saw with a little square, through a low-pass that opens on the attack (cut = fn(t) in Hz).
function brass(sec, f, { bend, vib = 0, cut } = {}) {
  const b = buf(sec); let ph = rnd();
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    ph += (f * (bend ? bend(t) : 1) * (1 + vib * Math.sin(TAU * 5.5 * t))) / SR; ph -= Math.floor(ph);
    b[i] = (2 * ph - 1) * 0.7 + (ph < 0.5 ? 0.3 : -0.3);
  }
  return biquad(b, "lp", cut || ((t) => 500 + 3200 * Math.min(1, t / 0.025) * Math.exp(-t / (sec * 0.7))), 1.1);
}
const chord = (sec, notes, o) => notes.reduce((b, f, i) => mix(b, brass(sec, f, o), i * 0.004, 1 / notes.length), buf(sec));
const kick = (sec, f = 130, tau = 0.12) => partials(sec, f, [[1, 1, tau], [1.5, 0.2, tau / 3]], (t) => 0.42 + Math.exp(-t / 0.035) * 0.9);
const crack = (sec, fc, tau, type = "bp") => env(biquad(noiseBuf(sec), type, fc, 0.8), (t) => expDecay(t, tau, 0.0006));

function clack(pitch = 1) {
  const b = buf(0.11);
  mix(b, crack(0.03, 2300 * pitch, 0.004), 0, 1);
  mix(b, partials(0.09, 140 * pitch, [[1, 0.6, 0.02], [3.1, 0.2, 0.008]]), 0.002);
  mix(b, crack(0.02, 1300 * pitch, 0.004), 0.05, 0.3);
  return b;
}

const SOUNDS = {
  // frame 0: a bass drum, a cymbal crash and a brass stab
  thump: () => {
    const b = buf(1.3);
    mix(b, kick(0.9, 120, 0.22), 0, 1);
    mix(b, env(biquad(noiseBuf(1.2), "hp", 5200), (t) => expDecay(t, 0.3, 0.002)), 0, 0.3);
    mix(b, env(chord(0.6, [D4 / 2, D4, Fs4, A4]), (t) => expDecay(t, 0.2, 0.01)), 0, 0.55);
    return room(b, 0.16, 0.5);
  },
  // a panel slamming onto the page: thud + flat slap
  slam: () => room(mix(mix(kick(0.3, 150, 0.07), crack(0.12, 900, 0.025, "lp"), 0, 0.8), crack(0.03, 4200, 0.004), 0, 0.5), 0.12, 0.2),
  // a punchy whoosh that ends where the slam lands
  whoosh: () => room(env(biquad(noiseBuf(0.34), "bp", (t) => 350 + Math.pow(t / 0.3, 2) * 4200, 1.1),
    (t) => Math.pow(Math.min(t / 0.27, 1), 2.4) * (t > 0.27 ? Math.exp(-(t - 0.27) / 0.02) : 1)), 0.1, 0.15),
  // sticker pop: a falling blip with a click
  pop: () => mix(partials(0.16, 420, [[1, 0.9, 0.035], [2, 0.2, 0.02]], (t) => 0.8 + Math.exp(-t / 0.018) * 1.6), crack(0.01, 5000, 0.002), 0, 0.5),
  // spring boing: a note that wobbles as it settles
  boing: () => room(partials(0.6, 190, [[1, 0.8, 0.2], [2, 0.3, 0.12], [3, 0.12, 0.08]],
    (t) => 1 + Math.exp(-t / 0.03) * 0.5 + Math.sin(TAU * 13 * t) * 0.22 * Math.exp(-t / 0.22)), 0.1, 0.25),
  // brassy stab for a starburst
  stab: () => room(mix(env(chord(0.5, [D4, Fs4, A4, D5]), (t) => expDecay(t, 0.16, 0.008)), kick(0.2, 110, 0.05), 0, 0.5), 0.15, 0.35),
  // ink pen scratching letters: short irregular strokes (trim with "dur")
  scratch: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.85) {
      const len = 0.05 + rnd() * 0.09, f = 3200 + rnd() * 2200;
      mix(b, env(biquad(noiseBuf(len), "bp", (x) => f + x * 6000, 2.2), (x) => Math.sin(Math.min(x / len, 1) * Math.PI) * (0.7 + 0.3 * Math.sin(TAU * 70 * x))), t, 0.5 + rnd() * 0.5);
      t += len + 0.015 + rnd() * 0.05;
    }
    return biquad(b, "hp", 1800);
  },
  // a typewriter run for the terminal (trim with "dur")
  type: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, clack(0.8 + rnd() * 0.4), t, 0.55 + rnd() * 0.45); t += 0.05 + rnd() * 0.045 + (rnd() < 0.1 ? 0.09 : 0); }
    return room(b, 0.08, 0.15);
  },
  // page turn: a fluttering paper sweep
  page: () => room(env(biquad(noiseBuf(0.5), "bp", (t) => 900 + t * 9000, 0.9),
    (t) => Math.sin(Math.min(t / 0.45, 1) * Math.PI) * (0.6 + 0.4 * Math.sin(TAU * 34 * t)) * (t > 0.36 ? 1.5 : 0.8)), 0.1, 0.2),
  // zap: a falling ring-modulated saw with a fizz
  zap: () => {
    const b = brass(0.4, 1900, { bend: (t) => Math.exp(-t / 0.11) + 0.08, cut: () => 6000 });
    for (let i = 0; i < b.length; i++) b[i] *= (0.5 + 0.5 * Math.sign(Math.sin(TAU * 95 * i / SR))) * expDecay(i / SR, 0.13, 0.002);
    return room(mix(b, crack(0.25, 3800, 0.07), 0, 0.35), 0.12, 0.25);
  },
  // comedic wah-wah: two sagging muted-trumpet notes
  wah: () => {
    const b = buf(0.95);
    const note = (f, len, drop) => env(brass(len, f, { bend: (t) => 1 - drop * Math.pow(t / len, 2), vib: 0.012,
      cut: (t) => 350 + 1900 * Math.pow(Math.sin(Math.min(t / len, 1) * Math.PI), 2) }), (t) => Math.min(t / 0.02, 1) * Math.min(1, (len - t) / 0.06));
    mix(b, note(233.08, 0.36, 0.03), 0, 0.9);
    mix(b, note(196, 0.55, 0.16), 0.38, 1);
    return room(b, 0.12, 0.3);
  },
  // triumphant ta-da: a pickup, then a bright major chord over a drum and a cymbal
  hit: () => {
    const b = buf(1.5);
    mix(b, env(chord(0.14, [A4 / 2, D4, Fs4]), (t) => expDecay(t, 0.08, 0.006)), 0, 0.6);
    mix(b, env(chord(1.3, [D4 / 2, D4, Fs4, A4, D5], { vib: 0.006 }), (t) => Math.min(t / 0.012, 1) * Math.exp(-t / 0.55)), 0.16, 1);
    mix(b, kick(0.5, 125, 0.14), 0.16, 0.8);
    mix(b, env(biquad(noiseBuf(1.2), "hp", 5500), (t) => expDecay(t, 0.32, 0.002)), 0.16, 0.25);
    return room(b, 0.18, 0.5);
  },
  // an ink dot: tiny tick for small marks
  tick: () => mix(partials(0.06, 2300, [[1, 0.45, 0.008], [1.5, 0.15, 0.005]]), crack(0.008, 6000, 0.002), 0, 0.3),
  // Claude: a warm two-note vibraphone (D, then the A above) under a soft shimmer
  claude: () => {
    const b = buf(1.8);
    mix(b, partials(1.6, D5, [[0.5, 0.3, 0.7], [1, 0.5, 0.6], [4, 0.08, 0.2], [1.003, 0.25, 0.7]]), 0);
    mix(b, partials(1.4, D5 * 1.5, [[1, 0.4, 0.5], [4, 0.06, 0.15], [1.003, 0.2, 0.6]]), 0.12);
    return room(b, 0.2, 0.7);
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
