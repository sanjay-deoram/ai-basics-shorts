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

## Scenes · MONO variant (57.15 s)

Minimal monochrome restyle: off-white #f7f7f5 and black #0a0a0a, one accent (Claude terracotta) only on the Claude mark and
the skill name; Inter Tight 600 display type with tight tracking, Geist Mono section labels, 1.5 px hairlines, large-radius
cards, black pills. The cut between sections is a full-screen black/white inversion. Theme: assets/mono.css + assets/mono.js
(Mono.reveal / conceal / fade / out / draw). Chrome: hairline progress line at y 220, section label, running timecode, and
below the safe box a soft gradient orb plus a waveform line driven by the voice loudness. Narrator: the Sanjay avatar in a
round tile inside a pill (live voice bars), bottom-left of the safe box (y 1332–1500) for s01–s04, out for s05.

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.9 | Cold open | White: frame 0 reads "Create a Claude skill" over a huge "60" (UNDER / SECONDS labels), hairline on "sixty seconds". Black: "A skill is a set of instructions." with a SKILL.md card typing its template; the Claude mark lands, "Claude picks it up on its own."; a "Write a PR description" pill joins the card by a hairline and it goes Idle → Loaded. White: 01 Folder / 02 SKILL.md / 03 Ask as ruled rows. |
| s02 | 10.9–15.5 | The example (black) | "Pull request descriptions." Three PR cards, each written differently (3 PRs / 3 formats); on "the same way every time" every body becomes What / Why / Changes ruled rows (1 format). |
| s03 | 15.5–22.95 | Step 1 · Folder (white) | "Make a folder." A ruled file tree builds ~/.claude → skills → <skill-name>; a black terminal types mkdir -p ~/.claude/skills/pr-description; the slot inverts into the NEW folder; "Folder name = skill name". |
| s04 | 22.95–39.75 | Step 2 · SKILL.md (black) | "Add one file." under the folder path, a hairline elbow and "1 file" pill, then SKILL.md in huge type ("Exactly that name, in capitals"). It opens as an editor: fences, name and description typed with a focus band (01 Name + when to use it); frontmatter dims and the instructions type as said (02 Instructions, in plain English). |
| s05 | 39.75–57.15 | Step 3 · Ask (white → black) | "Just ask." A black Claude Code window; the request types in. Skill list shows names + descriptions only ("Up front"); on "matches" pr-description inverts, rises and its instructions open ("Matched / full file loaded") while the transcript runs Skill → Bash(git diff) → What / Why / Changes. "Same format, every time." Black: "Keep it specific." weak (Vague, struck) vs better (Specific, "Use when…" underlined), then 1 Folder / 2 SKILL.md / 3 Ask. Hard stop. |

Sound (tools/make-sfx.mjs, synthesized, seeded): tick (soft UI tick), click (muted click), sub (low thump on each inversion),
swell (airy filtered swell), key / keys (quiet key taps), tone (one clean confirmation tone), pad (warm bed at 0.05 under
the voice). tools/build-sfx.mjs reads assets/sfx/lengths.json for clip lengths. Voiceover unchanged: see voiceover.json.

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
