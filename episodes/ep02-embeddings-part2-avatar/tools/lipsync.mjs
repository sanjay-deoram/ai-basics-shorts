// Builds assets/lipsync.js: how open Spark's mouth is on every frame, from the voiceover clips.
//
// Reads the <audio id="vo-…"> clips that tools/voiceover.mjs placed in index.html, decodes each with
// ffmpeg, measures loudness per frame (30 fps), maps it to 0–9 and writes
//   window.EggLipsync = { fps: 30, data: "000013578742…", syl: [[from, to, peak, sound, flags], …] }
// data: one character per frame of the episode. Scenes call Egg.lipsync(tl, spark, Egg.sceneStart(id), from, to).
// syl: the syllables, for a talking avatar. Each voice line's syllables come from its words (voiceover.json):
// sound E (ee/eh/ay), A (ah/ai/uh) or O (oo/oh/er), flags 1 = lips close before it (m/b/p onset), 2 = after it
// (m/b/p coda). Every written syllable gets its own beat, placed on the loudness peaks of that line's clip (where
// speech merges syllables, the widest stretch is split evenly); from/to/peak are episode frames (each syllable owns
// the frames halfway to its neighbours).
//
// Usage (from the episode folder, after tools/voiceover.mjs):  node tools/lipsync.mjs
// Set FFMPEG to the ffmpeg binary if it isn't on PATH.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const FPS = 30, RATE = 16000;
const FLOOR_DB = -42, RANGE_DB = 26, RELEASE = 0.55; // quiet → closed, loud → open; mouths close a bit slower than they open

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const index = readFileSync(join(project, "index.html"), "utf8");
const total = +(index.match(/data-composition-id="main"[^>]*?data-duration="([\d.]+)"/) || index.match(/data-duration="([\d.]+)"[^>]*data-composition-id="main"/) || [0, 60])[1];
const frames = new Float32Array(Math.ceil(total * FPS));

const clips = [...index.matchAll(/<audio[^>]*id="vo-[^"]*"[^>]*>/g)].map((m) => ({
  src: m[0].match(/src="([^"]+)"/)[1],
  start: +m[0].match(/data-start="([\d.]+)"/)[1],
  dur: +m[0].match(/data-duration="([\d.]+)"/)[1],
}));
if (!clips.length) throw new Error("No vo-… clips in index.html; run tools/voiceover.mjs first");

const ffmpeg = process.env.FFMPEG || "ffmpeg";
for (const c of clips) {
  const pcm = execFileSync(ffmpeg, ["-v", "error", "-i", join(project, c.src), "-f", "s16le", "-ac", "1", "-ar", String(RATE), "-"], { maxBuffer: 1 << 28 });
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 2));
  const per = RATE / FPS;
  let prev = 0;
  for (let f = 0; f * per < samples.length && f / FPS < c.dur; f++) {
    let sum = 0;
    const a = Math.floor(f * per), b = Math.min(samples.length, Math.floor((f + 1) * per));
    for (let i = a; i < b; i++) sum += (samples[i] / 32768) ** 2;
    const db = 10 * Math.log10(sum / Math.max(1, b - a) + 1e-10);
    const raw = Math.min(1, Math.max(0, (db - FLOOR_DB) / RANGE_DB));
    const v = Math.max(raw, prev * RELEASE);
    prev = v;
    const g = Math.round((c.start * FPS) + f);
    if (g >= 0 && g < frames.length) frames[g] = Math.max(frames[g], v);
  }
}

// ---------- syllables ----------
const vo = JSON.parse(readFileSync(join(project, "voiceover.json"), "utf8"));
const lineText = {};
const perScene = {};
for (const l of vo.lines) { perScene[l.scene] = (perScene[l.scene] || 0) + 1; lineText[`vo-${l.scene}-${perScene[l.scene]}`] = l.text; }

const SPECIAL = { i: ["A"], a: ["A"], the: ["A"], of: ["A"], to: ["O"], do: ["O"], you: ["O"], two: ["O"], one: ["A"],
  so: ["O"], no: ["O"], go: ["O"], was: ["A"], does: ["A"], why: ["A"], my: ["A"], by: ["A"], what: ["A"], are: ["A"], our: ["A"], your: ["O"], who: ["O"], some: ["A"] };
function wordSyllables(raw) {
  if (raw === "AI") return [{ sound: "E", pre: false, post: false }, { sound: "A", pre: false, post: false }];
  const w = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return [];
  const groups = [...w.matchAll(/[aeiouy]+/g)].map((m) => ({ g: m[0], i: m.index, end: m.index + m[0].length }));
  if (groups[0]?.i === 0 && /^y./.test(groups[0].g)) { groups[0].g = groups[0].g.slice(1); groups[0].i = 1; }   // yes, you
  if (groups.length > 1 && /[^aeiou]e$/.test(w) && !/[^aeiou]le$/.test(w)) groups.pop();          // silent final e
  if (groups.length > 1 && /[^aeiou]ed$/.test(w) && !/[td]ed$/.test(w)) groups.pop();             // learned, walked
  const out = groups.map((G, k) => {
    const after = w.slice(G.end);
    let sound;
    if (/^(e|ea|i|u)$/.test(G.g) && /^r([^aeiouy]|$)/.test(after)) sound = "O";                    // her, learn, bird, turn
    else if (/^(ai|ay|ey|ei)$/.test(G.g)) sound = "E";
    else if (G.g === "a") sound = /^[^aeiou]e/.test(after) && k === groups.length - 1 ? "E" : "A";
    else if (G.g === "i" || G.g === "y") sound = /^gh/.test(after) || (/^[^aeiou]e/.test(after) && k === groups.length - 1) ? "A" : "E";
    else if (G.g === "u") sound = after === "" || /^[^aeiou]e$/.test(after) ? "O" : "A";
    else if (/o|u/.test(G.g)) sound = "O";
    else sound = "E";
    const onset = w.slice(k ? groups[k - 1].end : 0, G.i);
    const coda = k === groups.length - 1 ? after : "";
    return { sound, pre: /[mbp]/.test(onset), post: /[mbp]/.test(coda) };
  });
  const sp = SPECIAL[w];
  if (sp && sp.length === out.length) sp.forEach((snd, k) => (out[k].sound = snd));
  return out;
}
const textSyllables = (text) => text.split(/\s+/).flatMap(wordSyllables);

const allClips = [...index.matchAll(/<audio[^>]*id="(vo-[^"]*)"[^>]*>/g)].map((m) => ({
  id: m[1], start: +m[0].match(/data-start="([\d.]+)"/)[1], dur: +m[0].match(/data-duration="([\d.]+)"/)[1],
}));
const lvl = (i) => (i >= 0 && i < frames.length ? frames[i] : 0);
const smooth = (i) => (lvl(i - 1) + 2 * lvl(i) + lvl(i + 1)) / 4;
const syl = [];
let matched = 0, totalText = 0;
for (const c of allClips) {
  const text = lineText[c.id];
  if (!text) continue;
  const words = textSyllables(text);
  const f0 = Math.floor(c.start * FPS), f1 = Math.ceil((c.start + c.dur) * FPS);
  // One mouth beat per written syllable. Start from the loudness peaks; if speech merged some syllables (fewer
  // peaks than syllables), split the widest stretch between beats until every syllable has one; if there are
  // extra peaks (breaths, plosives), keep the loudest.
  const N = words.length;
  let peaks = [];
  for (let i = f0; i <= f1; i++) {
    const v = smooth(i);
    if (v < 0.25 || v < smooth(i - 1) || v <= smooth(i + 1)) continue;
    const last = peaks[peaks.length - 1];
    if (last !== undefined && i - last < 3) { if (v > smooth(last)) peaks[peaks.length - 1] = i; } else peaks.push(i);
  }
  if (peaks.length > N) peaks = peaks.map((p) => [p, smooth(p)]).sort((a, b) => b[1] - a[1]).slice(0, N).map((x) => x[0]).sort((a, b) => a - b);
  let v0 = f0, v1 = f1;
  while (v0 < f1 && lvl(v0) < 0.2) v0++;
  while (v1 > v0 && lvl(v1) < 0.2) v1--;
  if (!peaks.length && N) peaks.push(Math.round((v0 + v1) / 2));
  while (peaks.length < N) {
    // widest gap: between beats, or from the start / to the end of the voiced part (counted double, as it has one beat)
    let best = { w: (peaks[0] - v0) * 2, at: (v0 + peaks[0]) / 2, i: 0 };
    for (let k = 1; k < peaks.length; k++) if (peaks[k] - peaks[k - 1] > best.w) best = { w: peaks[k] - peaks[k - 1], at: (peaks[k - 1] + peaks[k]) / 2, i: k };
    const tail = (v1 - peaks[peaks.length - 1]) * 2;
    if (tail > best.w) best = { w: tail, at: (peaks[peaks.length - 1] + v1) / 2, i: peaks.length };
    peaks.splice(best.i, 0, Math.round(best.at * 2) / 2);
  }
  totalText += N; matched += peaks.length;
  peaks.forEach((p, k) => {
    const w = words[k];
    const from = k ? (peaks[k - 1] + p) / 2 : f0, to = k < peaks.length - 1 ? (p + peaks[k + 1]) / 2 : f1;
    syl.push([from, to, p, w.sound, (w.pre ? 1 : 0) | (w.post ? 2 : 0)]);
  });
}

const data = Array.from(frames, (v) => String.fromCharCode(48 + Math.round(v * 9))).join("");
writeFileSync(join(project, "assets", "lipsync.js"), `// Generated by tools/lipsync.mjs from the voiceover. Do not edit.\nwindow.EggLipsync = { fps: ${FPS}, data: "${data}", syl: ${JSON.stringify(syl)} };\n`);
const talking = data.split("").filter((ch) => ch > "1").length;
console.log(`${clips.length} clips → ${frames.length} frames (${(talking / FPS).toFixed(1)}s of mouth movement), ${syl.length} mouth beats for ${totalText} written syllables → assets/lipsync.js`);
