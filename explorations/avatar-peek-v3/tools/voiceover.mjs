// Generates the episode voiceover with Fish Audio and places it on the timeline.
//
// Reads voiceover.json: { model, voice, voices, speed, volume, lines: [{ scene, at, text }] }
//   voice = a key of voices ({ name: { id, name } }) or a raw Fish Audio voice id; --voice=<key> overrides it.
//   Each voice's takes are kept side by side, so switching back to one already generated needs no API calls.
//   scene = slot id in index.html (s01, s02…), at = seconds from that scene's start.
// For each line it calls Fish Audio TTS, saves assets/vo/<scene>-<hash>.mp3 (named by content, so
// inserting or reordering lines never re-bills the others), measures it with ffprobe,
// warns if a line runs past its scene or into the next line, then writes <audio> clips into index.html
// between <!-- vo:start --> and <!-- vo:end -->. Unchanged lines are reused (vo.lock.json), so
// re-running only bills new or edited lines.
// Old files no longer referenced by any line are left in place; delete them by hand if you like.
//
// Usage (from the episode folder; the key is read from the environment, never stored):
//   FISH_API_KEY=... node tools/voiceover.mjs          generate + place
//   node tools/voiceover.mjs --place                    place existing files only (no API calls)
//   node tools/voiceover.mjs --voice=sheldon --place    switch to another voice's takes
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const placeOnly = process.argv.includes("--place");
const cfg = JSON.parse(readFileSync(join(project, "voiceover.json"), "utf8"));
const voiceKey = (process.argv.find((a) => a.startsWith("--voice=")) || "").slice(8) || cfg.voice;
const voiceId = cfg.voices?.[voiceKey]?.id ?? voiceKey;
console.log(`voice: ${cfg.voices?.[voiceKey]?.name ?? voiceKey} (${voiceId})`);
const indexPath = join(project, "index.html");
let index = readFileSync(indexPath, "utf8");
const lockPath = join(project, "assets", "vo", "vo.lock.json");
mkdirSync(join(project, "assets", "vo"), { recursive: true });
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, "utf8")) : {};

// Scene slots from index.html
const slots = {};
for (const m of index.matchAll(/<div[^>]*\bid="(s\d+)"[^>]*>/g)) {
  const start = +(m[0].match(/data-start="([\d.]+)"/) || [])[1];
  const dur = +(m[0].match(/data-duration="([\d.]+)"/) || [])[1];
  slots[m[1]] = { start, end: start + dur };
}

const ffprobe = process.env.FFPROBE || "ffprobe";
const probe = (file) =>
  +execFileSync(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", file]).toString().trim();

const counters = {};
const clips = [];
for (const line of cfg.lines) {
  if (!slots[line.scene]) throw new Error(`No scene slot ${line.scene} in index.html`);
  counters[line.scene] = (counters[line.scene] || 0) + 1;
  const id = `${line.scene}-${counters[line.scene]}`;
  const hash = createHash("sha1").update(JSON.stringify([cfg.model, voiceId, cfg.speed, line.text])).digest("hex");
  const rel = `assets/vo/${line.scene}-${hash.slice(0, 8)}.mp3`;
  const file = join(project, rel);

  if (!placeOnly && !existsSync(file)) {
    const key = process.env.FISH_API_KEY;
    if (!key) throw new Error("Set FISH_API_KEY to generate audio (or run with --place).");
    const res = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", model: cfg.model },
      body: JSON.stringify({
        text: line.text,
        reference_id: voiceId,
        format: "mp3",
        mp3_bitrate: 128,
        normalize: true,
        latency: "normal",
        prosody: { speed: cfg.speed ?? 1, volume: 0, normalize_loudness: true },
      }),
    });
    if (!res.ok) throw new Error(`${id}: Fish Audio ${res.status} ${await res.text()}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    lock[rel] = line.text;
    console.log(`generated ${id}`);
  }
  if (!existsSync(file)) throw new Error(`${rel} is missing; run without --place first`);
  const dur = +probe(file).toFixed(3);
  const start = +(slots[line.scene].start + line.at).toFixed(3);
  clips.push({ id, rel, start, dur, end: start + dur, sceneEnd: slots[line.scene].end, text: line.text });
}
writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");

// Timing report
let problems = 0;
clips.forEach((c, i) => {
  const next = clips[i + 1];
  const flags = [];
  if (c.end > c.sceneEnd + 0.25) flags.push(`runs ${(c.end - c.sceneEnd).toFixed(2)}s past its scene`);
  if (next && c.end > next.start) flags.push(`overlaps next line by ${(c.end - next.start).toFixed(2)}s`);
  if (next && next.start - c.end > 2 && next.start < c.sceneEnd) flags.push(`${(next.start - c.end).toFixed(1)}s of silence before the next line in this scene`);
  problems += flags.length;
  console.log(`${c.id.padEnd(7)} ${c.start.toFixed(2).padStart(6)}–${c.end.toFixed(2).padEnd(6)} ${c.dur.toFixed(2)}s  ${c.text}${flags.length ? "   ⚠ " + flags.join("; ") : ""}`);
});

const vol = cfg.volume ?? 1;
const tags = clips
  .map((c) => `      <audio id="vo-${c.id}" src="${c.rel}" data-start="${c.start}" data-duration="${c.dur}" data-track-index="20" data-volume="${vol}"></audio>`)
  .join("\n");
const block = `<!-- vo:start (generated by tools/voiceover.mjs from voiceover.json) -->\n${tags}\n      <!-- vo:end -->`;
if (/<!-- vo:start[\s\S]*?<!-- vo:end -->/.test(index)) index = index.replace(/<!-- vo:start[\s\S]*?<!-- vo:end -->/, block);
else index = index.replace(/(<!-- sfx:end -->)/, `$1\n      ${block}`);
writeFileSync(indexPath, index);
console.log(`${clips.length} voice lines placed${problems ? `, ${problems} timing warning(s)` : ""}`);
