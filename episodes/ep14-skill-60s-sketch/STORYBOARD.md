# Episode 14 · Create a Claude skill in under 60 seconds · sketch variant (57.15 s, avatar narrator)

Restyle of `episodes/ep14-skill-60s` in a hand-drawn whiteboard-app look: off-white paper with a faint dot grid, rough
double-stroke ink shapes that draw on stroke by stroke, pastel hachure fills and sticky notes, a hand-lettered font
(Virgil, OFL) with Cascadia Code (OFL) for code, a hand-drawn cursor. Shapes come from rough.js 4.6.6 (MIT, vendored in
`assets/vendor`, seeded so every render draws the same wobble) through `assets/sketch.js` (`Sk.*`); theme in
`assets/sketch.css`. Voice, timing, slots, script and beats are the original's.

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

## Scenes (57.15 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0 already reads "Create a Claude skill" in hand lettering and a huge hand-drawn "60 · under · seconds" that lands with a flap. A highlighter swipes under "skill"; on "sixty" a red marker loop circles the 60, which shrinks into a yellow sticky "under 60 sec". A sketched SKILL.md card draws on (blue hachure header, template types in), the Claude logo spins onto it on "Claude"; a violet speech bubble "Write a PR description" sticks on, a hand-drawn arrow runs to the card and a green outline picks it. "Step by step": three hachure boxes 1 Folder → 2 SKILL.md → 3 Ask draw on, joined by arrows. Avatar: large peek bottom right on a blue hachure disc. |
| s02 | 10.9–15.5 | The example | "Pull request descriptions" writes on; three pastel sticky notes stick on in a tilted pile, each in pencil a different way ("fixed stuff", a wall of text, loose bullets). On "the same way every time" they slide into a straight column, the old text rubs out, each gets What / Why / Changes rows with scribbled lines and a green tick. Avatar: corner. |
| s03 | 15.5–22.95 | Step 1 · Folder | Circled "1" + "Make a folder"; a sketched dark terminal draws in. Hand-drawn folders joined by arrows: ~/.claude/ → skills/ (highlighted) → an empty dashed folder that waits; the terminal types `mkdir -p ~/.claude/skills/` then `pr-description`, and the dashed folder becomes a green hachure pr-description/ · "folder name = skill name". Avatar: corner. |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | Circled "2" + "Add SKILL.md", the path in pencil, an open yellow folder. A page appears and the hand-drawn cursor drags it into the folder; "SKILL.md" with a red underline, "exactly that name, in CAPS". The board wipes and a paper card sticks on: the frontmatter is handwritten line by line as it's said ("pr-description" and "Use when…" highlighted), boxed in blue · "name + when to use it"; then the instructions, boxed in green · "instructions, in plain English": git diff, three sections, a green tick on What, Why, Changes. Avatar: corner. |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | Circled "3" + "Just ask"; a sketched Claude Code window (logo in the title bar, input box with a hachure send button); the request types in. Three skill sticky notes show only name + description (highlighted) · "up front: name + description only". On "matches" the cursor clicks send, the request lands in the transcript, a red arrow runs to pr-description ("match!"), a green outline picks it and the others dim; it opens into the full SKILL.md card while the transcript shows Skill(pr-description), Bash(git diff…) and the What / Why / Changes reply. "Same format, every time." with a blue underline; weak (red hachure, ✗ "vague") vs better (green hachure, ✓ "specific", "Use when…" highlighted). Hard stop, last frame holds. Avatar: out. |

Chrome: a pencil track at the top of the safe box with an ink line growing along it.

Sound: a new synthesized whiteboard-desk palette (`tools/make-sfx.mjs`, no library sounds): pencil `scratch` and
hachure `scribble` for strokes, marker `squeak` for loops, highlighter `swipe`, `write` (handwriting), `stick`
(sticky notes), `slide`, `thud`, `flap` (frame 0), `erase`, `tick`, `tap`, soft `keys` and mouse `click`, and
wooden `claude` (kalimba chord), `match`, `bonk` (vague) and `done`. `tools/build-sfx.mjs` now reads
`assets/sfx/lengths.json` for their lengths. Voiceover as placed: see voiceover.json (s01 0.05 / 3.55 / 8.7, s02 0.2,
s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 / 2.3 / 10.05).

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
