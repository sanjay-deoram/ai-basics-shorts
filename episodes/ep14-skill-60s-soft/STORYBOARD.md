# Episode 14 · Create a Claude skill in under 60 seconds (57.15 s, avatar narrator) · soft variant

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

## Look: "soft" variant

Calm editorial film: drifting radial colour fields on near-white (compositions/backdrop.html; one hue pair per section,
cross-dissolving at each cut, seeded SVG grain), Inter Tight 500 sentence-case headlines that come into focus word by
word, frosted white cards (assets/soft.css `.glass`, translucent fills, no backdrop-filter), "Step N" pills, a thin
segmented progress line (chrome.html). Motion via assets/soft.js (`Soft.words / rise / melt / push`) plus `Egg.typeOn`.
The avatar sits in a round frosted tile: large under the s01 cold open, small at bottom centre for s02–s04, out in s05.

## Scenes (57.15 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0: "Create a Claude skill · in under · 60 · seconds", the 60 huge. Gradient underline on "Claude skill"; the 60 breathes on "sixty" and dissolves into an "Under 60 seconds" pill. A frosted SKILL.md card types its template, the Claude logo arrives on "Claude"; a "Write a PR description" request arrives and the card lights up. "Step by step": three pills 1 Folder · 2 SKILL.md · 3 Ask. |
| s02 | 10.9–15.5 | The example | "Pull request descriptions": three PR cards drift in out of line ("fixed stuff", a wall of text, loose bullets), then settle into one column with the same What / Why / Changes shape. |
| s03 | 15.5–22.95 | Step 1 · Folder | Terminal card types `mkdir -p ~/.claude/skills/pr-description`; a folder card fills ~/.claude → skills (tinted) → dashed slot → pr-description (mint). "Folder name = skill name". |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | Path pill; a file tile with the Claude logo, named SKILL.md ("Exactly that name, in capitals"); it grows into an editor card: frontmatter typed with lilac bands ("Name + when to use it"), then instructions with mint bands as each is said ("Instructions, in plain English"). |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | Light Claude Code card; the request types in. Skill list (names + descriptions only); on "matches" pr-description glows and opens to its instructions while the transcript shows Skill(pr-description), Bash(git diff…) and the What / Why / Changes reply. "Same format, every time." Weak "Helps with PRs." (Vague) vs better (Specific). Last frame holds. Avatar out. |

Sound: a new synthesized palette (tools/make-sfx.mjs → assets/sfx, lengths in lengths.json, read by tools/build-sfx.mjs):
felt-piano notes n1–n6 in D major pentatonic for reveals, `low` for the opening, `swell` for dissolves, `glass` ticks,
`key`/`keys` muted typing, `confirm` two-note payoff and a very quiet `pad` bed under the whole film. Voiceover as
placed: see voiceover.json (s01 0.05 / 3.55 / 8.7, s02 0.2, s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 / 2.3 / 10.05).

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
