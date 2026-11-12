// Snapshots several style variants of one episode at the same timestamps and writes one grid page
// (rows = timestamps, columns = variants) to renders/compare/index.html at the repo root (gitignored).
//
// Usage (from the repo root):
//   node studio/tools/compare-variants.mjs --at 2,8,15,30 episodes/ep14-skill-60s episodes/ep14-skill-60s-*
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join, basename, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const atIdx = args.indexOf("--at");
const times = atIdx >= 0 ? args.splice(atIdx, 2)[1]?.split(",").map(Number) : null;
const dirs = args.map((d) => resolve(d));
if (!times?.length || times.some(isNaN) || dirs.length < 2) {
  console.error("Usage: node studio/tools/compare-variants.mjs --at 2,8,15,30 <episode dir> <episode dir> ...");
  process.exit(1);
}
for (const d of dirs) if (!existsSync(join(d, "index.html"))) throw new Error(`${d} is not an episode (no index.html)`);

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "renders", "compare");
rmSync(out, { recursive: true, force: true });

const snap = (dir) =>
  new Promise((ok, fail) => {
    const p = spawn(
      `npx --yes hyperframes@0.8.137 snapshot --at ${times.join(",")} --no-end -o "${join(out, basename(dir))}"`,
      { cwd: dir, shell: true, stdio: "ignore" },
    );
    p.on("exit", (code) => (code === 0 ? (console.log(`✓ ${basename(dir)}`), ok()) : fail(new Error(`${dir}: snapshot exit ${code}`))));
  });

// Three Chrome snapshots at a time: more than that and they starve each other.
const queue = [...dirs];
await Promise.all([0, 1, 2].map(async () => { while (queue.length) await snap(queue.shift()); }));

const names = dirs.map((d) => basename(d));
// Column labels drop the shared prefix: "ep14-skill-60s-mono" -> "mono".
let pre = names[0];
while (!names.every((n) => n.startsWith(pre))) pre = pre.slice(0, -1);
const label = (n) => n.slice(pre.length).replace(/^-/, "") || n;
const file = (n, i) => `${n}/frame-${String(i).padStart(2, "0")}-at-${times[i]}s.png`;
const thumb = (n, i) => file(n, i).replace(/\.png$/, ".jpg");
// ffmpeg from PATH, else the winget install CLAUDE.md names.
const winget = join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg.exe");
const ffmpeg = existsSync(winget) ? winget : "ffmpeg";
// Small JPG thumbnails keep the grid light (full PNGs are ~3 MB each); each thumbnail links to its PNG.
for (const n of names) times.forEach((_, i) =>
  execFileSync(ffmpeg, ["-v", "error", "-y", "-i", join(out, file(n, i)), "-vf", "scale=360:-1", "-q:v", "4", join(out, thumb(n, i))]));
const page = (src, link = true) => `<!doctype html><meta charset="utf-8"><title>Variant comparison</title>
<style>
  body { margin: 0; padding: 8px; font: 13px system-ui, sans-serif; }
  table { border-collapse: collapse; width: 100%; table-layout: fixed; } th, td { padding: 4px; vertical-align: top; }
  th { text-align: left; font-weight: 600; overflow-wrap: anywhere; } th:first-child { width: 36px; }
  img { width: 100%; max-width: 220px; display: block; border-radius: 4px; }
</style>
<table>
<tr><th></th>${names.map((n) => `<th>${label(n)}</th>`).join("")}</tr>
${times.map((t, i) => `<tr><th>${t}s</th>${names.map((n) => `<td>${link ? `<a href="${src(file(n, i))}">` : ""}<img src="${src(thumb(n, i))}" alt="${label(n)} at ${t}s">${link ? "</a>" : ""}</td>`).join("")}</tr>`).join("\n")}
</table>
`;
mkdirSync(out, { recursive: true });
// index.html (relative links) opens in a browser; inline.html (absolute paths, no PNG links: the
// previewer inlines every local path, 25 MB cap) is for html_preview / html_render.
writeFileSync(join(out, "index.html"), page((p) => p));
writeFileSync(join(out, "inline.html"), page((p) => join(out, p).replaceAll("\\", "/"), false));
console.log(`Wrote ${join(out, "index.html")} and inline.html`);
