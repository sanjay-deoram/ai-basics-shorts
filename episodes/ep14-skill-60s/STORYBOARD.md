# Episode 14 · How to build a Claude skill in 60 seconds (avatar narrator)

*Under 60 seconds* series (see `.claude/skills/under-60/SKILL.md`). Source: Claude Academy, *Introduction to Agent
Skills · Creating your first skill*
(https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill). The worked example is the
lesson's own: a personal `pr-description` skill in Claude Code.

## Script (~146 words, approved 2026-11-11)

| Beat | Line |
|---|---|
| Cold open | Here's how to build a Claude skill, in sixty seconds. |
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
| s01 | 0–10.75 | Cold open + what a skill is | "Build a Claude skill" (skill highlighted), "In 60 seconds" chip. A SKILL.md page drops in, its lines write, the Claude logo lands on "Claude"; a "Write a PR description" request arrives, a dotted line joins it to the page and the page lights up. "Step by step": chips 1 Folder · 2 SKILL.md · 3 Ask. Avatar: large peek, bottom right. |
| s02 | 10.75–15.35 | The example | Three PR descriptions land in a messy pile ("fixed stuff", a wall of text, loose bullets), then straighten into a column with the same What / Why / Changes shape. Avatar: corner. |
| s03 | 15.35–22.8 | Step 1 · Folder | A file tree draws ~/.claude/ → skills/; a terminal types `mkdir -p ~/.claude/skills/pr-description`; the new folder pops in · "Folder name = skill name". Avatar: corner. |
| s04 | 22.8–39.6 | Step 2 · SKILL.md | Path chip; one file drops in, named SKILL.md ("Exactly that name, in capitals"). It opens into an editor card: frontmatter, name and description typed with the run bar ("Name + when to use it"), then git diff and What / Why / Changes typed as they're said ("Instructions, in plain English"). Avatar: corner. |
| s05 | 39.6–57.0 | Step 3 · Ask + payoff (Claude Code UI) | Claude Code window (compact banner with the pixel mascot, input box); the request types in. The skill list shows names + descriptions only; on "matches" the request is sent and pr-description lights up; its card opens to the full file while the transcript shows Skill(pr-description), Bash(git diff…), then the What / Why / Changes reply (example text). "Same format, every time." Weak "Helps with PRs." (Vague) vs better "Writes PR descriptions. Use when the user asks for a PR." (Specific). Hard stop, last frame holds ~1.8 s. Avatar: out. |

Sound: ep13's palette (copied, with tools/make-sfx.mjs). Voiceover as placed: see voiceover.json (s01 0.15 / 3.3 / 8.5,
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
