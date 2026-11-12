# Episode 14 · Create a Claude skill in under 60 seconds · ARCADE variant (57.15 s, avatar narrator)

Restyle of `episodes/ep14-skill-60s`: same script, voice, timing and beats, drawn as an original, generic 8/16-bit
arcade game. Night-sky backdrop (seeded parallax stars, scrolling pixel skyline, `compositions/backdrop.html`), HUD
with TIME 60 counting down and a notched bar that drains green → yellow → red, scanlines (`compositions/chrome.html`).
Theme: `assets/arcade.css` (16-colour palette, Press Start 2P headings, Pixelify Sans body, VT323 code; fonts local,
OFL) and `assets/arcade.js` (`Arc.*`: pixel sprites from char grids, blink-in, stepped drop, screen shake, flashes).
All motion is `tl.set` or `steps()` eases. The avatar sits in an RPG portrait frame with a SANJAY name plate.

*Under 60 seconds* series (see `.claude/skills/under-60/SKILL.md`). Source: Claude Academy, *Introduction to Agent
Skills · Creating your first skill*
(https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill). The worked example is the
lesson's own: a personal `pr-description` skill in Claude Code.

## Script (~146 words, approved 2026-11-11)

| Beat | Line |
|---|---|
| Cold open | Here's how to create a Claude skill, in under sixty seconds. |
| Name it | A skill is a set of instructions Claude picks up on its own, when your request needs it. Let's build one, step by step. |
| Set up the example | Say you want Claude to write your pull request descriptions, the same way every time. |
| Step 1 · Folder | Step one: in dot claude slash skills, make a folder named after the skill. P R description. |
| Step 2 · SKILL.md | Step two: inside it, add one file: skill dot M D. At the top, a name, and a description of when to use it. |
| Step 2 · Instructions | Below that, the instructions, in plain English: run git diff, then write three sections. What, why, and changes. |
| Step 3 · Ask | Step three: just ask. Claude reads only each skill's name and description up front. When your request matches, it loads the full file and follows it. |
| Payoff | Same format, every time. Just keep the description specific, or Claude won't know when to use it. |

## Scenes (arcade)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Title screen + what a skill is | Frame 0: CREATE A CLAUDE SKILL and a huge block-pixel 60 (UNDER · SECONDS · blinking PRESS START) that slams in with a screen shake; the 60 flashes on "sixty" and shrinks into the HUD counter. A parchment SKILL.md drops in and types its template; the Claude logo lands on "Claude". A YOU box types "Write a PR description", pixel dots run to the scroll, it lights up with a "!". "Step by step": QUEST LOG with LV1 FOLDER · LV2 SKILL.MD · LV3 ASK. Avatar: large portrait under the hook. |
| s02 | 10.9–15.5 | The quest | Three PR descriptions drop into a crooked pile, each different and RANK D; on "the same way every time" they snap into a column with WHAT / WHY / CHANGES pixel bars and flip to RANK S. Avatar: corner. |
| s03 | 15.5–22.95 | LEVEL 1 · FOLDER | A staircase of pixel folders (~/.claude/ → skills/) with a cyan sprite jumping down; a terminal types `mkdir -p ~/.claude/skills/pr-description`; the green folder appears, the sprite lands on it, a star pops · FOLDER NAME = SKILL NAME. Avatar: corner. |
| s04 | 22.95–39.75 | LEVEL 2 · SKILL.MD | Path in an inventory bar; a chest drops in, opens, a scroll rises: ITEM GET! SKILL.md ("Exactly that name, in capitals"). It unrolls into a parchment editor: frontmatter, name and description type with a blinking arrow (NAME + WHEN TO USE IT), then git diff and the three sections, with gems lighting for WHAT, WHY, CHANGES (INSTRUCTIONS, IN PLAIN ENGLISH). Avatar: corner. |
| s05 | 39.75–57.15 | LEVEL 3 · ASK + GAME CLEAR | The request types in a YOU box; Claude's skill list (Claude logo) shows three rows, name + description only. On "matches" a match meter fills on each row, only pr-description fills, opens to the full file (MATCHED: FULL FILE LOADED); a log runs Skill(pr-description), Bash(git diff…), then the What / Why / Changes reply (example text). Trophy, NEW SKILL UNLOCKED: pr-description, SAME FORMAT EVERY TIME; WEAK "Helps with PRs." (✗ VAGUE, shakes and dims) vs BETTER "Writes PR descriptions. Use when the user asks for a PR." (✓ SPECIFIC); title flips to GAME CLEAR. Last frame holds. Avatar: out. |

Sound: a new chiptune palette synthesized by `tools/make-sfx.mjs` (pulse, triangle and noise voices, seeded; writes
`assets/sfx/lengths.json`, which `tools/build-sfx.mjs` now reads): start, blip, tick, select, coin, jump, land, whoosh,
type (typewriter blips), powerup, levelup (arpeggio), unlock (item get), meter, error (buzz), hit, claude, victory
(short jingle) and `bed`, a quiet original chiptune loop at volume 0.05 under the voice. Voiceover unchanged: see
voiceover.json (s01 0.05 / 3.55 / 8.7, s02 0.2, s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 / 2.3 / 10.05).

## Facts used (from the lesson)

- A skill is a directory with a `SKILL.md`; frontmatter between `---` lines holds `name` and `description`;
  everything after the second `---` is the instructions Claude follows once the skill is active.
- Personal skills live in `~/.claude/skills/<name>/` (project skills in the repo's `.claude/skills/`); the directory
  name matches the skill name.
- Progressive disclosure: at startup Claude loads only each skill's name and description; a request is matched to
  descriptions by meaning, and only then does Claude read the full SKILL.md.
- The lesson's example: `pr-description`, body runs `git diff main...HEAD` and writes What (one sentence), Why
  (brief context), Changes (bullets).
- Claude Code watches the skills directories, so a new skill is available without a restart.
