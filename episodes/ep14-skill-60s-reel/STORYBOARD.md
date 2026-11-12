# Episode 14 (reel cut) · Create a Claude skill in under 60 seconds (57.15 s, halftone avatar narrator)

ep14's script, voice and timing (`voiceover.json`, `assets/vo`, the vo block in `index.html`, untouched) rebuilt in
ep15's reel style: a full-bleed colour per beat, whip-pans with motion blur instead of cuts, word-by-word grotesk
headlines with one italic serif accent word and a `// mono` eyebrow, one dark editor / Claude Code window that keeps
changing between beats, a montage pull-back with a stamp, a hard cut to black, hard stop. No timer chip.
Source and facts: see `../ep14-skill-60s/STORYBOARD.md` (Claude Academy, *Creating your first skill*).

## Voice (as placed, episode seconds)

| Line | Window |
|---|---|
| Here's how to create a Claude skill, in under sixty seconds. | 0.05–3.37 |
| A skill is a set of instructions Claude picks up on its own, when your request needs it. | 3.55–8.49 |
| Let's build one, step by step. | 8.7–10.71 |
| Say you want Claude to write your pull request descriptions, the same way every time. | 11.1–15.25 |
| Step one: in dot claude slash skills, make a folder named after the skill. P R description. | 15.7–22.73 |
| Step two: inside it, add one file: skill dot M D. | 23.15–28.43 |
| At the top, a name, and a description of when to use it. | 28.7–31.89 |
| Below that, the instructions, in plain English: run git diff, then write three sections. What, why, and changes. | 32.15–39.52 |
| Step three: just ask. | 39.95–41.78 |
| Claude reads only each skill's name and description up front. When your request matches, it loads the full file and follows it. | 42.05–49.5 |
| Same format, every time. Just keep the description specific, or Claude won't know when to use it. | 49.8–55.34 |

Word times come from ffmpeg `silencedetect` on the placed voice track (pauses ≥ 60 ms at −38 dB), cross-checked
against ep14's scene timings (Whisper isn't installed here).

## Scenes

Slots overlap by 0.36 s at each whip (the outgoing scene slides out as the next slides in); tracks 1/2 alternate.

| Slot | Time | Canvas | What you see |
|---|---|---|---|
| s01 hook | 0–3.76 | white → blue | Frame 0: `// claude skills` and a huge **60**; "Create a Claude *skill.*" word by word, "under" and "*seconds.*" land beside the 60, which pulses on "sixty"; a blue bloom grows out of the 60 and fills the frame. Avatar BIG at the bottom. |
| s02 skill | 3.4–8.81 | blue | "A skill is a set of *instructions.*"; a SKILL.md card drops in and its template types (---, name, description, ---, 1. Run git diff…), the Claude logo spins onto it on "Claude"; on "when your request needs it" a "Write a PR description" pill arrives, a dotted line joins it to the card, the card lights up yellow. Avatar shrinks into the badge. |
| s03 steps | 8.45–11.11 | white | "Let's *build one.*"; three tiles pop on "step by step": 01 Folder · 02 SKILL.md · 03 Ask. |
| s04 example | 10.75–15.66 | peach | Three PR descriptions land in a messy pile (#412 "fixed stuff", #413 wall of text, #414 loose bullets); "PR descriptions, the same way, every *time.*"; on "same way" they snap into a column, each WHAT / WHY / CHANGES. |
| s05 folder | 15.3–23.11 | light blue | "Step one: make a *folder.*"; a shell types `mkdir -p ~/.claude/skills/` as the path is said; tree ~/.claude/ → skills/; a dashed empty folder waits, "// folder name = skill name"; on "P R description" `pr-description` types into the command and the folder at once; Enter, "created ✓", folder fills green. |
| s06 file | 22.75–28.76 | lavender | "Step two: add one *file.*"; path chip `~/.claude/skills/pr-description/`; one file drops in and its name lands as spelled (SKILL · . · m · d); "// exactly that name, in capitals". |
| s07 front | 28.4–32.31 | pink | "A name, and *when to use it.*"; the file is now the dark editor (SKILL.md): --- fences, `name: pr-description`, `description: Writes PR descriptions. / Use when the user asks for a PR.` typed with row highlights. |
| s08 body | 31.95–39.86 | mint | "The instructions. In plain *English.*"; frontmatter dims; `1. Run git diff main...HEAD`, `2. Write three sections:`, `## What: one sentence`, `## Why: brief context`, `## Changes: bullets` typed as they're said. |
| s09 ask | 39.5–42.16 | yellow | "Step three: just *ask.*"; the window becomes Claude Code (logo header); "write a PR description for my changes" types into the prompt. |
| s10 match | 41.8–49.78 | teal | "Reads only name + *description.*"; the skill list (commit-message, pr-description, code-review: names + descriptions only), names then descriptions light; on "matches" the request is sent and pr-description lights up, the others dim; on "loads the full file" the list gives way to the transcript: Skill(pr-description) ⎿ Loaded SKILL.md, Bash(git diff main...HEAD), then the What / Why / Changes reply. |
| s11 montage | 49.42–51.6 | warm grey | Whips in close on the reply, pulls back to six PR descriptions all in the What / Why / Changes shape; "*Same format.*" stamp lands (grid shakes), a ring is drawn, "// every time". |
| s12 black | 51.6–57.15 | black (hard cut) | "Keep the description *specific.*"; weak card "Helps with PRs." stamped VAGUE, better card "Writes PR descriptions. Use when the user asks for a PR." stamped SPECIFIC; on "won't know" the vague one shakes and fades; on the music hit (55.44) the specific one punches; hold to the hard stop. Avatar BIG under the cards. |

## Narrator

`compositions/narrator.html` (ep15's halftone treatment, retimed): BIG at the bottom of the hook, shrinks into the
round badge bottom-left on the first whip (3.3 s), ring colour follows each beat; BIG again (a little lower, under
the cards) on the black beat to the end. Claude appears only as the Claude logo (s02 card, Claude Code headers), never
on or next to the avatar. Lip sync: ep14's `assets/lipsync.js` (same voice, not rerun).

## Sound

- Music: `tools/make-music.mjs` → `assets/music/bed.mp3` (116 bpm, seeded). Hook = kick + hats + pluck, band in on
  the first whip (s02 slot), drums drop on the black beat (s12 slot) with a riser, one hit (kick + C stab + crash) as
  the last voice line ends (55.44 s), ringing out to the hard stop. Ducked −7 dB under every vo line. Rerun after any retime.
- SFX: ep15's palette (`tools/make-sfx.mjs`), cued in each scene's `sfx-cues`, placed by `tools/build-sfx.mjs`.

## Facts used

Same as ep14: a skill is a folder with a `SKILL.md`; frontmatter `name` + `description` between `---` lines,
instructions after; personal skills in `~/.claude/skills/<name>/`, folder name = skill name; Claude loads only each
skill's name and description up front and reads the full file when a request matches; the lesson's `pr-description`
example (git diff main...HEAD, What / Why / Changes). PR numbers, titles and the reply text are invented examples.
