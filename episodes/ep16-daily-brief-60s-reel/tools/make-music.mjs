// Synthesizes the ep16 reel music bed into assets/music/bed.mp3: a clean, minimal 116 bpm beat (soft kick, clap on 2 and
// 4, off-beat hats), a round sine bass and a light Karplus-Strong pluck over C – G – Am – F. Seeded, so a rerun gives
// the same file. It reads index.html for its cues:
//   · the root duration (the file is exactly that long),
//   · every <audio id="vo-…"> window, to duck the bed under the voice (−7 dB, 60 ms in, 300 ms out),
//   · the s10 slot (the black beat: drums drop out, the bed thins to bass + pluck and a riser builds),
//   · the end of the last voice line + 0.1 s (one hit, kick + chord stab + crash, ringing out to the hard stop).
// The hook (s01) has no bass or clap; the band comes in on the first whip (the s02 slot).
//
// Usage (from the project folder):  node tools/make-music.mjs   (needs ffmpeg on PATH; rerun after retiming)
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const index = readFileSync(join(project, "index.html"), "utf8");
const LEN = +index.match(/data-composition-id="main"[^>]*?data-duration="([\d.]+)"/)[1];
const slot = (id) => +index.match(new RegExp(`<div id="${id}"[^>]*data-start="([\\d.]+)"`))[1];
const BAND = slot("s02"), BREAK = slot("s10");
const VO = [...index.matchAll(/<audio[^>]*id="vo-[^"]*"[^>]*>/g)].map((m) => {
  const a = +m[0].match(/data-start="([\d.]+)"/)[1];
  return [a, a + +m[0].match(/data-duration="([\d.]+)"/)[1]];
});
const HIT = +(Math.max(...VO.map((v) => v[1])) + 0.1).toFixed(2);   // the hit lands as the last line ends

const SR = 44100, TAU = Math.PI * 2;
const BPM = 116, BEAT = 60 / BPM, BAR = BEAT * 4;
let seed = 2026;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const out = new Float32Array(Math.ceil(LEN * SR));
const add = (src, at, gain = 1) => {
  const o = Math.round(at * SR);
  for (let i = 0; i < src.length && o + i < out.length; i++) if (o + i >= 0) out[o + i] += src[i] * gain;
};
const buf = (sec) => new Float32Array(Math.ceil(sec * SR));
function lp(x, f) { const y = new Float32Array(x.length), a = 1 - Math.exp((-TAU * f) / SR); let v = 0; for (let i = 0; i < x.length; i++) y[i] = v += a * (x[i] - v); return y; }
function hp(x, f) { const l = lp(x, f); return x.map((v, i) => v - l[i]); }

/* ---------- instruments ---------- */
const kick = (g = 1) => { const b = buf(0.32); let ph = 0; for (let i = 0; i < b.length; i++) { const t = i / SR; ph += (TAU * (46 + 90 * Math.exp(-t / 0.035))) / SR; b[i] = Math.sin(ph) * Math.exp(-t / 0.11) * g; } return b; };
const clap = () => { const b = buf(0.25); for (let i = 0; i < b.length; i++) { const t = i / SR; b[i] = noise() * (Math.exp(-t / 0.05) + 0.6 * Math.exp(-Math.abs(t - 0.012) / 0.004)); } return lp(hp(b, 900), 6000); };
const hat = (open) => { const b = buf(open ? 0.18 : 0.04); for (let i = 0; i < b.length; i++) b[i] = noise() * Math.exp(-(i / SR) / (open ? 0.05 : 0.012)); return hp(b, 7000); };
const bass = (f, sec) => { const b = buf(sec); let ph = 0; for (let i = 0; i < b.length; i++) { const t = i / SR; ph += (TAU * f) / SR; b[i] = (Math.sin(ph) + 0.25 * Math.sin(2 * ph)) * Math.min(1, t / 0.01) * Math.exp(-t / 0.5) * Math.min(1, (sec - t) / 0.03); } return b; };
function pluck(f, sec = 0.5, damp = 0.994) {
  const b = buf(sec), n = Math.round(SR / f), line = new Float32Array(n);
  for (let i = 0; i < n; i++) line[i] = noise();
  let k = 0, prev = 0;
  for (let i = 0; i < b.length; i++) { const v = line[k]; line[k] = (v + prev) * 0.5 * damp; prev = v; b[i] = v; k = (k + 1) % n; }
  return lp(b, 3500);
}
const pad = (fs, sec) => { const b = buf(sec); fs.forEach((f) => { let p1 = rnd() * TAU, p2 = rnd() * TAU; for (let i = 0; i < b.length; i++) { const t = i / SR; p1 += (TAU * f) / SR; p2 += (TAU * f * 1.004) / SR; b[i] += (Math.sin(p1) + Math.sin(p2)) * 0.5 * Math.min(1, t / 0.4) * Math.min(1, (sec - t) / 0.4); } }); return lp(b, 1200); };

/* ---------- the song ---------- */
const N = (m) => 440 * Math.pow(2, (m - 69) / 12);
// C – G – Am – F, one chord per bar: [bass midi, chord tones]
const CHORDS = [[36, [60, 64, 67, 72]], [43, [59, 62, 67, 71]], [45, [60, 64, 69, 72]], [41, [60, 65, 69, 72]]];
const ARP = [0, 2, 1, 3, 2, 1, 3, 2]; // eighth-note pluck pattern over the chord tones

for (let bar = 0; bar * BAR < HIT; bar++) {
  const t0 = bar * BAR, [root, tones] = CHORDS[bar % 4];
  const brk = t0 >= BREAK - 0.01;
  for (let e = 0; e < 8; e++) {
    const t = t0 + e * (BEAT / 2);
    if (t >= HIT) break;
    const inBreak = t >= BREAK, band = t >= BAND;
    // drums
    if (!inBreak) {
      if (e % 2 === 0) add(kick(band ? 0.95 : 0.7), t);
      if (band && (e === 2 || e === 6)) add(clap(), t, 0.32);
      add(hat(e % 2 === 1 && e === 7), t, e % 2 ? 0.16 : 0.07);
    }
    // bass: root on the beat, octave pop on the "and" of 2 and 4
    if (band) {
      if (e === 0 || e === 3 || e === 4) add(bass(N(root), BEAT * 0.9), t, inBreak ? 0.3 : 0.42);
      if (e === 5 || e === 7) add(bass(N(root + 12), BEAT * 0.4), t, inBreak ? 0.12 : 0.18);
    }
    // pluck: light arpeggio an octave up
    add(pluck(N(tones[ARP[e]] + 12), 0.45), t, inBreak ? 0.1 : 0.14);
  }
  // a soft pad on the black beat
  if (brk) add(pad(tones.map((m) => N(m)), Math.min(BAR, HIT - t0) + 0.3), t0, 0.06);
}
// riser into the hit
{
  const sec = HIT - BREAK, b = buf(sec);
  for (let i = 0; i < b.length; i++) b[i] = noise() * Math.pow(i / SR / sec, 3);
  add(lp(hp(b, 1500), 9000), BREAK, 0.12);
}
// the hit: kick + C major stab + crash, ringing out to the hard stop
add(kick(1.2), HIT, 1);
{
  const sec = LEN - HIT, b = buf(sec);
  [48, 55, 60, 64, 67, 72].forEach((m) => { let ph = rnd() * TAU; for (let i = 0; i < b.length; i++) { const t = i / SR; ph += (TAU * N(m)) / SR; b[i] += (Math.sin(ph) + 0.3 * Math.sin(3 * ph)) * Math.exp(-t / 0.9) * 0.12; } });
  add(lp(b, 2600), HIT, 1);
  const c = buf(sec); for (let i = 0; i < c.length; i++) c[i] = noise() * Math.exp(-(i / SR) / 0.7);
  add(hp(c, 5000), HIT, 0.18);
}

/* ---------- duck under the voice ---------- */
const DUCK = Math.pow(10, -7 / 20), ATT = 0.06, REL = 0.3;
for (let i = 0; i < out.length; i++) {
  const t = i / SR;
  if (t >= HIT) break;   // the hit is never ducked
  let g = 1;
  for (const [a, b] of VO) {
    if (t < a - ATT || t > b + REL) continue;
    const d = t < a ? (a - t) / ATT : t > b ? (t - b) / REL : 0;
    g = Math.min(g, DUCK + (1 - DUCK) * d);
  }
  out[i] *= g;
}

// self-check: the bed is the right length and silent nowhere before the hit
const rms = (a, b) => { let s = 0; for (let i = Math.round(a * SR); i < Math.round(b * SR); i++) s += out[i] * out[i]; return Math.sqrt(s / ((b - a) * SR)); };
if (Math.abs(out.length / SR - LEN) > 0.01) throw new Error("bed length != episode length");
for (let t = 0; t + 1 < HIT; t += 1) if (rms(t, t + 1) < 1e-3) throw new Error(`music bed is silent at ${t}s`);

/* ---------- write ---------- */
let peak = 0; for (const v of out) peak = Math.max(peak, Math.abs(v));
const g = 0.89 / peak, fade = Math.round(0.02 * SR);
for (let i = 0; i < fade; i++) out[out.length - 1 - i] *= i / fade;
const pcm = Buffer.alloc(44 + out.length * 2);
pcm.write("RIFF", 0); pcm.writeUInt32LE(36 + out.length * 2, 4); pcm.write("WAVEfmt ", 8);
pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(1, 22); pcm.writeUInt32LE(SR, 24);
pcm.writeUInt32LE(SR * 2, 28); pcm.writeUInt16LE(2, 32); pcm.writeUInt16LE(16, 34); pcm.write("data", 36);
pcm.writeUInt32LE(out.length * 2, 40);
out.forEach((v, i) => pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(v * g * 32767))), 44 + i * 2));
const dir = join(project, "assets", "music");
mkdirSync(dir, { recursive: true });
const wav = join(dir, "bed.wav");
writeFileSync(wav, pcm);
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", wav, "-ac", "2", "-b:a", "192k", join(dir, "bed.mp3")]);
unlinkSync(wav);
console.log(`music bed ${LEN}s → assets/music/bed.mp3 (band in at ${BAND}s, break at ${BREAK}s, hit at ${HIT}s, ${VO.length} voice ducks)`);
