# Episode 14 · Create a Claude skill in under 60 seconds (57.15 s, avatar narrator) · papercut variant

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

## Scenes (57.15 s) · papercut variant

Look: a kraft-paper tabletop seen from above; every piece is cut from construction paper (tomato, mustard, teal, cream,
navy) with scissor-cut edges (`Cut.dress`), SVG-noise grain, soft drop shadows, washi tape, pushpins, red string, cut-out
Fredoka letters for headings and Courier Prime for code on index cards. Motion is stop-motion on twos (12 fps, `Cut.ease`
samples each curve once per 1/12 s): pieces drop / slide in with a turn and a settle jitter, unfold from a crease, get
pinned or taped, and the whole table "boils" a pixel on threes. Theme: `assets/papercut.css`, `assets/papercut.js` (the
`Cut.*` helpers); text typing still uses `Egg.typeOn`. Chrome: a paper ruler at the top with a red string pulled along it
by a pushpin (progress), plus a grain sheet that shifts on threes. Narrator: the Sanjay avatar as a taped photo card.

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open + what a skill is | Frame 0: "Create a / Claude / skill" in cut-out letters on paper strips and a huge cut-out red "60" (UNDER · seconds) that lands with a thud; a paper stopwatch ticks all scene. On "sixty" the 60 jumps, then is pulled away and an "Under 60 seconds" strip slides in. A SKILL.md sheet drops in and its template is typed; the Claude logo lands on it on "Claude". A torn "Write a PR description" note is pinned up, red string is pulled to the sheet, a mustard paper burst pops behind it. "Step by step": three pinned cards 1 Folder · 2 SKILL.md · 3 Ask. Avatar: large photo, lower right. |
| s02 | 10.9–15.5 | The example | Three PR descriptions are tossed into a crooked pile, each on different paper ("fixed stuff", a sticky with a wall of text, loose bullets); on "the same way every time" each flips over, lines up and shows the same What / Why / Changes strips, and gets a pushpin. Avatar: corner. |
| s03 | 15.5–22.95 | Step 1 · Folder | A ruled index card "TERMINAL" slides up; a navy ~/.claude/ folder lands, string runs to a mustard skills/ folder (pinned). Paper scissors snip across while `mkdir -p ~/.claude/skills/` is typed and a tomato folder drops in; on "P R description" the name is typed, a second string is pulled and a pr-description/ label is taped on. "Folder name = skill name". Avatar: corner. |
| s04 | 22.95–39.75 | Step 2 · SKILL.md | Path strip; the tomato folder's front flap drops open, a cream sheet slides in, cut-out letters spell SKILL.md and a mustard strip runs under it; "Exactly that name, in capitals" note. The folder is pulled away and the sheet unfolds into three panels: frontmatter (typed, a paper arrow hops to each line, "Name + when to use it"), instructions ("Instructions, in plain English", git diff, three sections) and the What / Why / Changes strips stuck on as they are said. Avatar: corner. |
| s05 | 39.75–57.15 | Step 3 · Ask + payoff | Claude Code as a navy paper window (cream header with the Claude logo, cut-square pixel mascot, a torn note as the input); the request is typed. Three skill index cards are pinned below showing only name + description (tape strips under each as they are said). On "matches" the request is sent, red string is pulled from the input to pr-description, the others are knocked crooked and slide off; the card unfolds its instructions while the transcript shows Skill(pr-description), Bash(git diff…) and the What / Why / Changes reply. "Same format, every time." in cut-out letters over three identical pinned PR cards; then a weak card stamped VAGUE by a rubber stamp and a better one stamped SPECIFIC, a paper star stuck on it with a ukulele + woodblock flourish. Hard stop, last frame holds. Avatar: out. |

Sound: a new synthesized craft-table palette from `tools/make-sfx.mjs` (seeded, no third-party audio): rustle, slide,
snip / snips (scissors), tape (peel + press), pin (pushpin thock), thud (cardboard), stamp, flip (page), fold (crease),
clack / typewriter, string (pulled), xylo / xylo-1..4 (glockenspiel C E G C for highlights), wood, knock, claude (two-note
mallet) and uke (ukulele strum + woodblock taps, the end flourish). `tools/build-sfx.mjs` reads
`assets/sfx/lengths.json` for each clip's length. Voiceover unchanged: see voiceover.json (s01 0.05 / 3.55 / 8.7, s02 0.2,
s03 0.2, s04 0.2 / 5.75 / 9.2, s05 0.2 / 2.3 / 10.05). Render: `renders/ep14-skill-60s-papercut.mp4`.

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
