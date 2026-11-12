# Episode 14 · Create a Claude skill in under 60 seconds (57.15 s, avatar narrator)

*Under 60 seconds* series (see `.claude/skills/under-60/SKILL.md`). Source: Claude Academy, *Introduction to Agent
Skills · Creating your first skill*
(https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill). The worked example is the
lesson's own: a personal `pr-description` skill in Claude Code.

## Style · CLAUDE variant

The Claude / Anthropic product look (claude.ai, Claude Code). Warm paper #FAF9F5, #F0EEE6 panels, white cards with
#E8E6DC hairlines, 16 px radii, almost no shadow; ink #141413, warm grays; clay #D97757 is the one bright color (progress
line, eyebrow mark, highlighter wash, keys), olive for "Specific". Source Serif 4 headlines and labels, Inter body and
chips (sentence case), Geist Mono code. s04's editor is a light artifact-style card; s03 and s05 keep a warm dark
terminal / Claude Code window. Motion is calm ease-out (no back/elastic eases, no stamp spin). Theme:
`assets/claude.css` (re-points the Eggshell tokens and components) + `assets/claude.js` (softer Egg.pop / stamp / shake).
Avatar: same stops as the base, with a warm clay-cream glow. Same voice, slots, sound and lesson as `ep14-skill-60s`;
added for the grid: s02's pile fans so each PR shows its own writing, s05 shows the three PRs as What / Why / Changes
under "Same format, every time."

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

## Scenes (57.0 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0 already reads "Create a Claude skill" and a huge "60 · under · seconds" that settles with a thump; the 60 pulses on "sixty" and shrinks into the "Under 60 seconds" chip. A SKILL.md page drops in and its template types in (---, name: pr-description, description: Use when…, ---, 1. Run git diff…), the Claude logo lands on "Claude"; a "Write a PR description" request arrives, a dotted line joins it to the page and the page lights up. "Step by step": chips 1 Folder · 2 SKILL.md · 3 Ask. Avatar: large peek, bottom right. |
| s02 | 10.75–15.35 | The example | Three PR descriptions land in a messy pile ("fixed stuff", a wall of text, loose bullets), then straighten into a column with the same What / Why / Changes shape. Avatar: corner. |
| s03 | 15.35–22.8 | Step 1 · Folder | A file tree draws ~/.claude/ → skills/; a terminal types `mkdir -p ~/.claude/skills/pr-description`; the new folder pops in · "Folder name = skill name". Avatar: corner. |
| s04 | 22.8–39.6 | Step 2 · SKILL.md | Path chip; one file drops in, named SKILL.md ("Exactly that name, in capitals"). It opens into an editor card: frontmatter, name and description typed with the run bar ("Name + when to use it"), then git diff and What / Why / Changes typed as they're said ("Instructions, in plain English"). Avatar: corner. |
| s05 | 39.6–57.0 | Step 3 · Ask + payoff (Claude Code UI) | Claude Code window (compact banner with the pixel mascot, input box); the request types in. The skill list shows names + descriptions only; on "matches" the request is sent and pr-description lights up; its card opens to the full file while the transcript shows Skill(pr-description), Bash(git diff…), then the What / Why / Changes reply (example text). "Same format, every time." Weak "Helps with PRs." (Vague) vs better "Writes PR descriptions. Use when the user asks for a PR." (Specific). Hard stop, last frame holds ~1.8 s. Avatar: out. |

Sound: ep13's palette (copied, with tools/make-sfx.mjs). Voiceover as placed: see voiceover.json (s01 0.05 / 3.55 / 8.7,
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
