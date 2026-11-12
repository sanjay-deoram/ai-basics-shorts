// Synthesizes the arcade variant's sound palette into assets/sfx: three chiptune voices (pulse, triangle and a
// sample-and-hold noise channel), no samples. Original blips and jingles; nothing is copied from a game.
// Seeded, so a rerun gives the same files.
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

let seed = 8086;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const buf = (sec) => new Float32Array(Math.ceil(sec * SR));
const mix = (dst, src, at = 0, gain = 1) => {
  const o = Math.round(at * SR);
  for (let i = 0; i < src.length && o + i < dst.length; i++) dst[o + i] += src[i] * gain;
  return dst;
};
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

// One note. wave: "sq" (pulse, duty 0..1), "tri" (4-bit stepped triangle), "noise" (held random value, f = rate).
// f may be a number or a function of time (sweeps). Envelope: instant attack, linear decay to `sus`, 6 ms release.
function note(wave, f, sec, { duty = 0.5, sus = 0.6, vol = 1 } = {}) {
  const b = buf(sec);
  let ph = 0, held = 0, last = -1;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR, fr = typeof f === "function" ? f(t) : f;
    ph += fr / SR;
    const p = ph % 1;
    let v;
    if (wave === "sq") v = p < duty ? 1 : -1;
    else if (wave === "tri") v = Math.round((p < 0.5 ? p * 4 - 1 : 3 - p * 4) * 7.5) / 7.5;
    else { const k = Math.floor(ph); if (k !== last) { held = rnd() * 2 - 1; last = k; } v = held; }
    const rel = Math.min(1, (sec - t) / 0.006), att = Math.min(1, t / 0.002);
    b[i] = v * vol * att * rel * (1 - (1 - sus) * (t / sec));
  }
  return b;
}
// A tune: [[midi | null, beats], …] at `step` seconds per beat, on one wave.
function tune(wave, notes, step, opts = {}) {
  const total = notes.reduce((s, [, n]) => s + n, 0) * step;
  const b = buf(total + 0.02);
  let t = 0;
  for (const [m, n] of notes) { if (m != null) mix(b, note(wave, hz(m), n * step * (opts.gate ?? 0.92), opts), t); t += n * step; }
  return b;
}

/* ---------- the palette ---------- */
const SOUNDS = {
  // frame 0: a noise hit, a falling thump, and two rising pulse notes ("game on")
  start: () => {
    const b = buf(0.7);
    mix(b, note("noise", (t) => 5000 - t * 14000, 0.22, { sus: 0 }), 0, 0.7);
    mix(b, note("tri", (t) => 160 - t * 300, 0.3, { sus: 0.1 }), 0, 0.9);
    mix(b, tune("sq", [[72, 1], [79, 3]], 0.08, { duty: 0.25, sus: 0.3 }), 0.14, 0.5);
    return b;
  },
  // menu cursor / small UI blip
  blip: () => note("sq", hz(81), 0.06, { duty: 0.25, sus: 0.2 }),
  // tiny tick: one row landing
  tick: () => note("sq", hz(93), 0.035, { duty: 0.125, sus: 0.1 }),
  // confirm / select: two quick rising notes
  select: () => tune("sq", [[76, 1], [83, 2]], 0.055, { duty: 0.5, sus: 0.3 }),
  // coin pickup: a short low note into a ringing high one
  coin: () => mix(mix(buf(0.42), note("sq", hz(83), 0.07, { sus: 0.8 })), note("sq", hz(88), 0.34, { sus: 0 }), 0.07),
  // jump: a quick upward pulse sweep
  jump: () => note("sq", (t) => 260 + t * t * 14000, 0.2, { duty: 0.25, sus: 0.3 }),
  // something heavy lands: low noise and a falling triangle
  land: () => mix(note("noise", 900, 0.14, { sus: 0 }), note("tri", (t) => 120 - t * 380, 0.16, { sus: 0.2 }), 0, 0.9),
  // a quick move across the screen: noise with a rising rate
  whoosh: () => note("noise", (t) => 800 + t * 26000, 0.24, { sus: 0.1, vol: 0.8 }),
  // dialogue typewriter: a run of short blips on three pitches (trim with "dur")
  type: () => {
    const b = buf(3.0);
    for (let t = 0.01; t < 2.9; t += 0.055 + (rnd() < 0.15 ? 0.05 : 0)) mix(b, note("sq", hz([84, 86, 88][Math.floor(rnd() * 3)]), 0.028, { duty: 0.25, sus: 0.2 }), t, 0.8);
    return b;
  },
  // power-up: an upward run in hard semitone steps
  powerup: () => tune("sq", [60, 64, 67, 71, 72, 76, 79, 83, 84, 88].map((m) => [m, 1]), 0.04, { duty: 0.25, sus: 0.7, gate: 1 }),
  // level-up arpeggio: one chord climbing two octaves, with a triangle underneath
  levelup: () => mix(tune("sq", [[72, 1], [76, 1], [79, 1], [84, 1], [88, 1], [91, 3]], 0.07, { sus: 0.4 }),
    tune("tri", [[48, 4], [60, 4]], 0.07), 0, 0.8),
  // item get / skill unlocked: four held notes
  unlock: () => mix(tune("sq", [[79, 1], [84, 1], [88, 1], [91, 4]], 0.09, { duty: 0.25, sus: 0.5 }),
    tune("sq", [[76, 3], [84, 4]], 0.09, { duty: 0.5, sus: 0.5 }), 0, 0.35),
  // meter filling: eight rising ticks
  meter: () => tune("sq", [69, 71, 73, 74, 76, 78, 80, 81].map((m) => [m, 1]), 0.04, { duty: 0.125, sus: 0.3, gate: 0.6 }),
  // error buzz: two low, detuned pulses
  error: () => {
    const one = () => mix(note("sq", 98, 0.13, { duty: 0.5, sus: 0.9 }), note("sq", 104, 0.13, { duty: 0.25, sus: 0.9 }), 0, 0.8);
    return mix(mix(buf(0.34), one()), one(), 0.18);
  },
  // screen shake hit
  hit: () => note("noise", (t) => 2400 - t * 9000, 0.16, { sus: 0 }),
  // Claude: the one soft voice in the set, two triangle notes a fifth apart
  claude: () => mix(mix(buf(0.75), note("tri", hz(74), 0.7, { sus: 0 })), note("tri", hz(81), 0.6, { sus: 0 }), 0.1, 0.8),
  // victory jingle (original): a rising run, a held top note, pulse harmony and triangle bass
  victory: () => {
    const s = 0.105;
    const lead = tune("sq", [[72, 1], [72, 1], [76, 1], [79, 2], [76, 1], [79, 1], [84, 2], [81, 1], [83, 1], [84, 6]], s, { duty: 0.25, sus: 0.5 });
    const harm = tune("sq", [[64, 3], [67, 3], [72, 3], [72, 2], [76, 6]], s, { duty: 0.5, sus: 0.5 });
    const bass = tune("tri", [[48, 3], [43, 3], [45, 3], [47, 2], [48, 6]], s);
    return mix(mix(lead, harm, 0, 0.4), bass, 0, 0.9);
  },
  // the bed: a quiet 8-bar loop (Am F C G, 104 bpm) for the whole episode, faded out before the victory jingle
  bed: () => {
    const LEN = 57.15, beat = 60 / 104, s = beat / 2, b = buf(LEN);
    const CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]];
    for (let bar = 0; bar * 4 * beat < LEN; bar++) {
      const [r, t3, f5] = CH[bar % 4], t0 = bar * 4 * beat;
      const arp = [r, f5, t3 + 12, f5, r + 12, f5, t3 + 12, f5].map((m) => [m + 12, 1]);
      mix(b, tune("sq", arp, s, { duty: 0.125, sus: 0.2, gate: 0.7 }), t0, 0.45);
      mix(b, tune("tri", [[r - 12, 3], [r - 12, 1], [f5 - 12, 2], [r - 12, 2]], s, { gate: 0.85 }), t0, 0.9);
      for (let k = 0; k < 8; k++) if (k % 2) mix(b, note("noise", 7000, 0.03, { sus: 0 }), t0 + k * s, 0.25);
    }
    for (let i = 0; i < b.length; i++) { const t = i / SR; b[i] *= Math.min(1, t / 0.4) * Math.max(0, Math.min(1, (53.0 - t) / 2.5)); }
    return b;
  },
};

function writeMp3(name, x) {
  let peak = 0; for (const v of x) peak = Math.max(peak, Math.abs(v));
  const g = 0.89 / (peak || 1);
  const fade = Math.round(0.006 * SR);   // short fade at the end so nothing clicks
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
