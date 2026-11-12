// Synthesizes the papercut variant's sound palette into assets/sfx: a craft table. Paper rustles and slides,
// scissor snips, washi tape, pushpins, cardboard thuds, a rubber stamp, page flips and folds, a typewriter for the
// index cards, a plucked string, a glockenspiel for highlights and a ukulele + woodblock flourish for the end.
// Every sound is generated from seeded noise, sine partials and a plucked-string model, so a rerun gives the same files.
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
const C5 = 523.25;
const gate = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
// paper grain: noise whose loudness crackles (many tiny random bursts)
function crinkle(sec, density = 900) {
  const b = noiseBuf(sec); let g = 0.3;
  for (let i = 0; i < b.length; i++) { if (rnd() < density / SR) g = 0.15 + rnd() * 0.85; g *= 0.9992; b[i] *= g; }
  return b;
}
// Karplus-Strong plucked string (nylon): a noise burst in a damped delay line
function pluck(sec, f, damp = 0.996, bright = 0.5) {
  const n = Math.round(SR / f), line = new Float32Array(n), b = buf(sec);
  for (let i = 0; i < n; i++) line[i] = noise();
  let k = 0, prev = 0;
  for (let i = 0; i < b.length; i++) { const o = line[k]; const v = (o * bright + prev * (1 - bright)) * damp; prev = o; line[k] = v; k = (k + 1) % n; b[i] = o; }
  return biquad(b, "lp", 4200);
}
const glock = (f, sec = 0.9) => room(partials(sec, f, [[1, 0.6, 0.28], [2.76, 0.22, 0.09], [5.4, 0.08, 0.04], [8.9, 0.03, 0.02]]), 0.16, 0.5);
const wood = (f = 900) => mix(partials(0.12, f, [[1, 0.7, 0.022], [2.3, 0.25, 0.012], [3.9, 0.1, 0.006]]),
  env(biquad(noiseBuf(0.01), "bp", 3000, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.35);
function clack(pitch = 1) {
  const b = buf(0.12);
  mix(b, env(biquad(noiseBuf(0.03), "bp", 2400 * pitch, 1.2), (t) => expDecay(t, 0.004, 0.0004)), 0, 1);
  mix(b, partials(0.1, 150 * pitch, [[1, 0.6, 0.02], [3.1, 0.2, 0.008]]), 0.003);
  mix(b, env(biquad(noiseBuf(0.02), "hp", 5000), (t) => expDecay(t, 0.003)), 0.05, 0.18);
  return b;
}
const snip1 = () => {
  const b = buf(0.2);
  mix(b, env(biquad(noiseBuf(0.09), "bp", (t) => 3500 + t * 40000, 1.2), (t) => gate(t, 0.05, 0.012)), 0, 0.8);   // blades closing
  mix(b, partials(0.1, 2900, [[1, 0.5, 0.012], [1.51, 0.3, 0.02], [2.4, 0.15, 0.008]]), 0.065);                    // the metallic snick
  return b;
};

const SOUNDS = {
  // a sheet sliding in over the table
  rustle: () => room(env(biquad(crinkle(0.55), "bp", (t) => 3200 - t * 2600, 0.8), (t) => gate(t, 0.07, 0.14) * 0.9), 0.1, 0.25),
  // a short, lower slide: card stock pushed along
  slide: () => room(env(biquad(crinkle(0.35, 500), "bp", (t) => 900 + t * 1800, 0.7), (t) => Math.pow(Math.sin(Math.min(t / 0.32, 1) * Math.PI), 1.5) * 0.9), 0.08, 0.2),
  // scissors: one snip, and a run of three
  snip: () => room(snip1(), 0.08, 0.15),
  snips: () => { const b = buf(0.75); [0, 0.24, 0.47].forEach((t, i) => mix(b, snip1(), t, 1 - i * 0.12)); return room(b, 0.08, 0.15); },
  // washi tape: a ratchety peel, then pressed down
  tape: () => {
    const b = buf(0.5);
    mix(b, env(biquad(noiseBuf(0.32), "bp", (t) => 1800 + t * 9000, 2.2), (t) => Math.min(t / 0.03, 1) * (0.35 + 0.65 * ((t * 85) % 1)) * (t > 0.28 ? (0.32 - t) / 0.04 : 1)), 0, 0.8);
    mix(b, env(biquad(noiseBuf(0.08), "lp", 700), (t) => expDecay(t, 0.02, 0.001)), 0.36, 0.9);
    return room(b, 0.08, 0.15);
  },
  // a pushpin going into cork
  pin: () => room(mix(partials(0.14, 340, [[1, 0.7, 0.03], [2.6, 0.2, 0.012]], (t) => 1 + Math.exp(-t / 0.01) * 0.5),
    env(biquad(noiseBuf(0.012), "bp", 2600, 1), (t) => expDecay(t, 0.002, 0.0003)), 0, 0.5), 0.1, 0.2),
  // cardboard landing on the table
  thud: () => room(mix(env(biquad(noiseBuf(0.3), "lp", 900), (t) => expDecay(t, 0.035, 0.001) * 0.8),
    partials(0.3, 82, [[1, 0.7, 0.06], [1.9, 0.2, 0.03]], (t) => 1 + Math.exp(-t / 0.02) * 0.7)), 0.1, 0.25),
  // the rubber stamp: a heavy thump with a little squish
  stamp: () => {
    const b = partials(0.4, 58, [[1, 0.9, 0.09], [2.1, 0.3, 0.04]], (t) => 1 + Math.exp(-t / 0.015) * 1.2);
    mix(b, env(biquad(noiseBuf(0.2), "lp", 1400), (t) => expDecay(t, 0.02, 0.0008)), 0, 0.9);
    mix(b, env(biquad(noiseBuf(0.12), "bp", 2200, 0.8), (t) => gate(t, 0.03, 0.03)), 0.09, 0.14);   // lifting off the ink
    return room(b, 0.12, 0.3);
  },
  // a page turned over
  flip: () => room(env(biquad(crinkle(0.3, 1400), "hp", (t) => 900 + t * 6000), (t) => (gate(t, 0.04, 0.05) + 0.7 * gate(Math.max(0, t - 0.14), 0.02, 0.04) * (t > 0.14)) * 0.8), 0.1, 0.2),
  // a crease opening: dry crackles
  fold: () => room(env(biquad(crinkle(0.4, 2600), "bp", 3800, 0.9), (t) => (gate(t, 0.02, 0.08) + 0.8 * gate(Math.max(0, t - 0.17), 0.02, 0.07) * (t > 0.17)) * 0.9), 0.08, 0.2),
  // typewriter: one key, and a run of keys (trim with "dur")
  clack: () => room(clack(1), 0.06, 0.1),
  typewriter: () => {
    const b = buf(3.0); let t = 0.01;
    while (t < 2.9) { mix(b, clack(0.85 + rnd() * 0.3), t, 0.5 + rnd() * 0.5); t += 0.07 + rnd() * 0.05 + (rnd() < 0.1 ? 0.09 : 0); }
    return room(b, 0.06, 0.12);
  },
  // string pulled taut between two pins
  string: () => room(mix(env(biquad(noiseBuf(0.3), "bp", (t) => 600 + t * 3000, 3), (t) => Math.sin(Math.min(t / 0.28, 1) * Math.PI) * 0.35),
    pluck(0.7, 196, 0.994, 0.45), 0.26, 0.9), 0.14, 0.4),
  // glockenspiel notes for highlights: C E G C (xylo-1..4), and a plain "xylo" on G
  xylo: () => glock(C5 * 3),
  "xylo-1": () => glock(C5 * 2),
  "xylo-2": () => glock(C5 * 2.5),
  "xylo-3": () => glock(C5 * 3),
  "xylo-4": () => glock(C5 * 4),
  // woodblock
  wood: () => room(wood(900), 0.1, 0.2),
  // a dull knock: the wrong answer
  knock: () => room(mix(wood(420), wood(390), 0.13, 0.8), 0.08, 0.2),
  // Claude: a soft two-note mallet (G, then C above)
  claude: () => { const b = buf(1.4); mix(b, glock(C5 * 1.5, 1.0), 0, 0.8); mix(b, glock(C5 * 2, 1.1), 0.13, 0.9); return b; },
  // the ending: a ukulele strum (G C E A) and two woodblock taps
  uke: () => {
    const b = buf(2.2);
    [392, 261.63, 329.63, 440].forEach((f, i) => mix(b, pluck(1.9, f, 0.9972, 0.5), 0.03 + i * 0.038, 0.55));
    [392, 261.63, 329.63, 440, 523.25].forEach((f, i) => mix(b, pluck(1.4, f, 0.997, 0.55), 0.5 + i * 0.022, 0.5));
    mix(b, wood(900), 0.28, 0.5); mix(b, wood(1200), 0.4, 0.5);
    return room(b, 0.16, 0.5);
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
