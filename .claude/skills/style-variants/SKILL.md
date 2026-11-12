---
name: style-variants
description: Builds an episode in several visual styles, compares them side by side in snapshots, and renders only the styles the user keeps. Use when asked for style variants, different looks, or to compare styles of an episode.
argument-hint: <base episode, e.g. ep14-skill-60s> <styles, e.g. "comic, papercut, mono">
disable-model-invocation: true
---

# Style variants

Same episode, several looks. A full render takes ~3 minutes per variant whatever the style, while a snapshot grid of
every variant takes under a minute. So the user **eliminates styles from snapshots first**, then watches full renders
of the ones they keep (pacing and feel only show in the video). Worked example: the `episodes/ep14-skill-60s-*`
folders, nine looks of `ep14-skill-60s`.

All production rules still come from `CLAUDE.md` and `studio/DESIGN.md` (avatar narrator, safe box, `Egg.*`
helpers, the checks). A variant changes the look, never the lesson.

## Steps

1. **Start from a finished base episode**: voice, timeline and scenes done and checked. Work on the base episode's
   branch, never on `main`.
2. **One folder per style.** Copy the base to `episodes/<base>-<style>` (for example `ep14-skill-60s-comic`) and
   delete the copy's `renders/`. Keep `assets/vo`, `voiceover.json` and every scene slot and line `at` unchanged:
   same voice, same timing, same lesson. Give each style its own CSS, scene drawings, motion and sound palette.
   Record the look in a short "Style" section at the top of the variant's `STORYBOARD.md`.
3. **Check each variant**: `node tools/build-sfx.mjs`, then `npx hyperframes check` (0 errors).
4. **Pick the timestamps** from the base `index.html` scene slots (`s01`, `s02`, … `data-start` / `data-duration`):
   one per scene at `start + 0.65 × duration`, so the scene is fully built and not on a cut, plus `2` for the
   opening. Use the same times for every variant. For ep14 that gives `--at 2,7.1,13.9,20.3,33.9,51.1`.
5. **Compare** from the repo root, base first:
   `node studio/tools/compare-variants.mjs --at <times> episodes/<base> episodes/<base>-<style> ...`
   It snapshots three variants at a time (~15 s each) and writes `renders/compare/` (gitignored):
   - `inline.html`: show it in the thread with `html_preview`, then `html_render` with its `contentHeight`.
   - `index.html`: give the user its absolute path; it opens in a browser and each thumbnail links to the full PNG.
6. **The user eliminates styles.** Ask which to drop, or which to tweak. Re-run step 5 after a tweak. Before deleting
   a dropped variant's folder, confirm with the user (a deleted variant can't be rebuilt from the snapshots).
7. **Render only the kept styles**, one at a time (renders don't speed up in parallel: the CPU is already full). In
   each kept folder:
   `npx hyperframes render -o renders/<variant>-hq.mp4`, then
   `ffmpeg -i renders/<variant>-hq.mp4 -c:v libx264 -preset slow -crf 22 -c:a copy -movflags +faststart renders/<variant>.mp4`,
   then delete the `-hq` file and confirm the final MP4 has an audio stream.
8. Commit the kept variants on the branch.

**Done when** the user has seen the comparison grid, said which styles to keep, and has the path to each kept
variant's rendered MP4.
