# Episode 14 · Create a Claude skill in under 60 seconds · whiteboard variant (57.15 s, avatar narrator)

Visual variant of `episodes/ep14-skill-60s`: same script, voice, timing and avatar, restyled as a classic whiteboard
animation (RSA-Animate / VideoScribe feel). A bright whiteboard with a gloss sheen, aluminium frame and marker tray
(compositions/chrome.html); black dry-erase line art with red / blue / green accents; Caveat handwriting
(assets/fonts/Caveat-var.woff2, OFL). A drawn pencil draws every stroke and writes every line as it
reveals, and a felt eraser wipes the board between ideas (assets/whiteboard.js `WB.*`, assets/whiteboard.css). The
Claude mark is drawn ray by ray wherever Claude is meant.

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
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0: the hand is already writing "Create a Claude skill"; it underlines "skill" in red, writes "under" and scribbles a huge red "60s" beside a stopwatch doodle whose needle sweeps on "sixty". The eraser wipes them. A page is drawn and the SKILL.md template written on it (---, name, description, ---, 1. Run git diff…), the Claude mark drawn on it on "Claude"; a speech bubble "Write a PR description", an arrow to the page, green rays light it up. Erased; "step by step": 1 Folder · 2 SKILL.md · 3 Ask with folder / page / bubble doodles. Content above y 800, the hand leaves to the lower left. Avatar: large peek, bottom right. |
| s02 | 10.9–15.5 | The example | "The example" / "PR descriptions"; three papers sketched in a tilted pile, each written differently ("fixed stuff", a rambling wall, loose bullets). On "the same way every time" they straighten into a column, the mess clears, each reads What / Why / Changes and gets a green check. Avatar: corner. |
| s03 | 15.5–22.95 | Step 1 · Folder | "Step 1" / "Make a folder"; a folder tree drawn branch by branch: ~/.claude/ → skills/ (underlined); a doodled terminal where the hand writes `$ mkdir -p ~/.claude/skills/` then `pr-description` (green); the last branch and the green pr-description/ folder, "= the skill name". Avatar: corner. |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | "Step 2" and the path; a folder and a page are drawn, the page drops in; "SKILL.md" written big with a red double underline and "exactly that name, in CAPITALS". Erased; one big page: fences, name and description written as said, a red margin bracket "name + when to use it"; a divider, "instructions, in plain English", then git diff and What / Why / Changes written as said, and a green check. Avatar: corner. |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | "Step 3 · Just ask"; a prompt box where the hand writes "> write a PR description for my changes"; the Claude mark "reads names + descriptions only" over three skill cards (names, then descriptions). On "matches": green underline, an arrow and a green loop on pr-description; the others fade; a page opens with the full file and both steps get ticked. Erased: "Same format, every time." with three identical pages; weak "Helps with PRs." (red X, "vague") vs specific "Writes PR descriptions. Use when the user asks for a PR." (green check, underline, "specific"); the weak card shakes and fades, a small Claude mark with a red "?" beside it. Hand leaves, last frame holds. Avatar: out. |

Sound: a new synthesized whiteboard palette (tools/make-sfx.mjs): scribble (doodle strokes), write (handwriting),
squeak, cap (marker uncap), erase (felt eraser passes), thump (board knock), clock (stopwatch ticks), ding (lightbulb),
pop, tick (check-mark flick), shuffle (papers straightening), nope (red X), swish (avatar moves) and the Claude bell.
Voiceover as placed: see voiceover.json (s01 0.05 / 3.55 / 8.7, s02 0.2, s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 /
2.3 / 10.05).

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
