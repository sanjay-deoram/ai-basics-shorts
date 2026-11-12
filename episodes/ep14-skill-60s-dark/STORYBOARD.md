# Episode 14 · Create a Claude skill in under 60 seconds (57.15 s, avatar narrator)

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

## Look · dark product-film variant

Near-black paper (#08090a) with a faint dot grid fading out radially and one soft electric-violet glow (#7c8cff)
behind the hero; glassy panels (#111214, 1px white-alpha border, 24px radius, top-edge highlight); Inter Tight
headlines with a gradient sheen on the key word; Geist Mono for code, paths and "01 — Folder" labels. Motion: panels
slide in on a tilted plane and settle flat (expo.out), slow push-in per scene, focus pulls (dim + 2px blur), block
caret typing, a scan line when Claude reads, accent chips. Theme in `assets/dark.css`, helpers `Dk.*` in
`assets/dark.js`. Chrome: a thin accent progress line with markers at each step.

## Scenes (57.15 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0 already reads "Create a Claude skill" over a huge gradient "60 · in under · seconds"; the 60 pulses on "sixty" and pulls back into an "Under 60 seconds" chip. A SKILL.md editor slides in and its template types with a block caret; the Claude logo lands in its title bar. A "Your request: Write a PR description" panel arrives, a beam runs up to the editor, which takes the accent ring and "✓ Matched". "Step by step": rows 01 Folder · 02 SKILL.md · 03 Ask. Avatar: large round tile, lower right. |
| s02 | 10.9–15.5 | The example | Three PR cards (#412 "fixed stuff", #413 a wall of text, #414 loose bullets) slide in, a scan passes and each takes the same What / Why / Changes shape with a "✓ Same format" chip. Avatar: corner tile. |
| s03 | 15.5–22.95 | Step 1 · Folder | Terminal over an explorer: ~/.claude → skills; focus pulls to the terminal, which types `mkdir -p ~/.claude/skills/pr-description`; the new folder appears with "● Created" · "Folder name = skill name". Avatar: corner. |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | Explorer: SKILL.md appears inside pr-description, called out large ("Exactly this name, in capitals"); the cursor clicks it and an editor opens: fences, name and description type with a moving line highlight ("Frontmatter · Name + when to use it"), then the body dims the frontmatter and types git diff and What / Why / Changes ("Body · Instructions, in plain English"). Avatar: corner. |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | Claude Code panel (Claude logo) and a skills list showing names + descriptions only; the request types in, a beam runs from it to pr-description ("● Loaded"), the card opens to the full file while the transcript shows Skill(pr-description), Bash(git diff…) and the What / Why / Changes reply. "Same format, every time." Dim "Vague" card ("Helps with PRs.") vs glowing "✓ Specific" card. Avatar: out. |

Sound: a new synthesized palette from `tools/make-sfx.mjs` (deterministic, seeded): sub (soft sub hit, panels
arriving), key / keys (tight mechanical taps), click (UI click), tick (rows, markers), stream (output), riser (airy,
push-ins), scan (glassy sweep, Claude reads), confirm (glassy two-note, Matched / Loaded / Specific), vague (low muted
falling tone), pad (very quiet dark drone under the whole film, vol 0.05). `tools/build-sfx.mjs` reads clip lengths
from `assets/sfx/lengths.json`. Voiceover as placed: see voiceover.json (s01 0.05 / 3.55 / 8.7,
s02 0.2, s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 / 2.3 / 10.05).

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
