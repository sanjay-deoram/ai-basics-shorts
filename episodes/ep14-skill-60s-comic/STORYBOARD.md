# Episode 14 · Create a Claude skill in under 60 seconds · pop-art comic variant (57.15 s, avatar narrator)

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

## Look (comic variant)

Pop-art comic book: cream paper with light grain, ink outlines and hard offset shadows, flat yellow / red / cyan,
Ben-Day dot fills, jagged starbursts, yellow caption boxes, speech bubbles with tails, Bangers + Comic Neue lettering
(OFL, local in assets/fonts), cyan/red misregistered shadows on big type. Theme: `assets/comic.css`; motion kit
`assets/comic.js` (`Cm.slam / sticker / ink / punch / shake / turn / draw / mark`, seeded bursts), plus `Egg.typeOn`,
`Egg.avatarTalk`, `Egg.progress`. Narrator: the Sanjay avatar inside an inked round panel with a halftone backing.

## Scenes (57.15 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Splash page | Frame 0: speed-line rays, "CREATE A CLAUDE SKILL" and a giant red burst "60 UNDER SECONDS!" slamming down. The 60 punches on "sixty", the burst flies off into a small "UNDER 60 SEC" badge. Panel "A skill = instructions" slams in and a SKILL.md template is lettered; the Claude mark pops on its corner. "Your request" panel with a speech bubble, a bolt across the gutter, ZAP!. "Step by step": three panels 1 Folder · 2 SKILL.md · 3 Ask! slam in. Avatar: title stop. |
| s02 | 10.9–15.5 | The example | Three messy PR panels tumble in ("fixed stuff", a wall of text, loose bullets), MESSY! sticker, then each is re-inked into the same What / Why / Changes layout. Avatar: corner. |
| s03 | 15.5–22.95 | Step 1 · Folder | STEP 1 burst; a terminal panel ("Meanwhile, in the terminal…") types `mkdir -p ~/.claude/skills/pr-description` (TYPE TYPE); the folder-tree panel draws ~/.claude/ → skills/ → pr-description/ with a NEW! burst and "Folder name = skill name". Avatar: corner. |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | STEP 2 burst, path caption; the file drops in (PLOP!), "SKILL.md" in big type, "Exactly that name, in capitals". Page turn to one big SKILL.md panel lettered line by line (SCRITCH!): a callout arrow "Name + when to use it" for the frontmatter, a brace "Instructions, in plain English" for git diff and What / Why / Changes, which then slam in as three small panels. Avatar: corner. |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | STEP 3 "JUST ASK!"; Claude Code window panel types the request. Three skill trading cards (name + description, "File: closed"); the request pops out as a bubble, a bolt hits pr-description: MATCH!, the others shade and fall. "Matched: full file loaded" panel, pan down: Bash(git diff…), then Claude's reply bubble (Claude mark on the tail) with What / Why / Changes. Page turn: "SAME FORMAT, EVERY TIME!" over three identical mini panels; showdown weak "Helps with PRs." (✗ VAGUE stamp, cracks, grey shade, ???) VS specific (rays, ✓ SPECIFIC burst). Last frame holds. Avatar: out. |

Sound: a synthesized comic palette from `tools/make-sfx.mjs` (seeded, rerun gives identical files; lengths in
`assets/sfx/lengths.json`, read by `tools/build-sfx.mjs`): thump (frame-0 slam), slam (panels), whoosh, pop and boing
(stickers), stab (brassy burst hits), scratch (pen lettering), type (terminal), page (page turns), zap (bolts), tick,
claude (Claude mark), wah (VAGUE), hit (SPECIFIC). Voiceover as placed: see voiceover.json (s01 0.05 / 3.55 / 8.7,
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
