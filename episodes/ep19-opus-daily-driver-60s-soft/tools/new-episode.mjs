// Starts a new episode by copying this kit (design system, blocks, sample scenes) into
// ../episodes/<slug>. The sample scenes are the starting point: edit or replace them.
//
// Usage (from the studio folder):  node tools/new-episode.mjs ep01-prompting
import { cpSync, existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error("Give the episode a lowercase slug, e.g. node tools/new-episode.mjs ep01-prompting");
  process.exit(1);
}

const kit = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(kit, "..", "episodes", slug);
if (existsSync(dest)) {
  console.error(`${dest} already exists`);
  process.exit(1);
}
mkdirSync(dirname(dest), { recursive: true });

const skip = new Set(["renders", "snapshots", "node_modules", ".git", ".hyperframes"]);
cpSync(kit, dest, { recursive: true, filter: (src) => !skip.has(basename(src)) });

const metaPath = join(dest, "meta.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
meta.id = slug;
meta.name = slug;
meta.createdAt = new Date().toISOString();
writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

console.log(`Created ${dest}`);
console.log("Next: edit compositions/*.html and the slots in index.html, then run node tools/build-sfx.mjs and npx hyperframes check.");
