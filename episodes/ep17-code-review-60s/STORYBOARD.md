# Episode 17 · How the Claude Code team does code review, in under 60 seconds (59.6 s, avatar narrator)

An *Under 60 seconds* episode (`/under-60`): cold open, one example walked through, hard stop. The source is the
Anthropic engineering post "How the Claude Code team does code review" (Addy Osmani, Morgan Westlee Lunt, Qing Wang,
15 Oct 2026, https://claude.dev/blog/solving-code-review-at-anthropic/). No reference video.

The "name" unpacked is the post's idea, **layers, not one gate**. The example is one bug fix, followed through four
of those layers. Each layer's eyebrow names it (`Layer 1 · On your machine` … `Layer 4 · People, by risk`), and a
four-segment tracker beside it fills in as the layers go by. The fix chip ("Fix: empty config crash") is the
through-line. It is born in s03 and carried frame-to-frame into s04 and s05. It reappears in s06 and is sorted in s07.
The two findings posted in s05 come back as comments in s08.

The user asked for "lots and lots of visuals and diagrams", so every scene is a diagram: a to-scale block chart, a
one gate vs layers comparison, a route map, a laptop terminal, two context windows, parallel probes over a diff, a
vote table, a checks panel with a lock, a risk classifier with bins, two bar charts, and the findings vs approvals lanes.

## Script (Sanjay, speed 1.0; 152 words, 54.2 s of speech)

"Here's how the Claude Code team does code review, in under sixty seconds. With agents writing code, Anthropic's daily
changes jumped from twenty-five hundred to over thirty thousand. Nobody can read all that, so they stack layers, not
one gate. Say you ask Claude to fix a bug. Let's follow the fix through each layer. Layer one, on your machine: Claude
runs the tests, then a second Claude, with fresh eyes, rereads the change. Layer two, in review: several agents hunt
for bugs at once. Another group votes on each finding, and it's only posted if enough agree it's real. Layer three:
security review and checks. Any open finding blocks the merge. Layer four: people, scaled by risk. Docs need no
approver, normal changes one, the riskiest two. In three months, merged changes more than doubled, and the rollback
rate fell over forty percent. The AI never approves. It only posts findings."

The approved draft (161 words) came out at 56 s of speech, which with the gaps ran past 60 s. Two lines were
tightened, and only those two were regenerated:
- "…Claude runs the tests and shows the output. Then a second Claude, with fresh eyes, rereads the change." became
  one line without "and shows the output". The terminal and the "Shows the output, not just 'done'" callout still show it.
- "Layer two: the fix goes up for review, and several agents…" became "Layer two, in review: several agents…".

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–4.3 | Cold open | The Claude mark and "How the Claude Code team does code review" are on screen from frame 0, so the thumbnail is the title. "code review" is highlighted as it is said. An "Under 60 seconds" stopwatch chip sweeps. A small pull request is read by a lens and a Claude comment pops off it. Avatar: large peek, bottom right. |
| s02 | 4.3–14.6 | The flood → layers, not one gate | Three Claude marks (agents writing code) throw changes into a block chart, 1 block = 500 changes a day: May 2,500 (5 blocks), Sept 30,000+ (60 blocks), counted up. On "Nobody can read all that" the Sept pile slides left, jams against one gate with one reviewer, and shakes. On "so they stack layers" four sieve layers draw on the right and changes fall through them, a few caught at each. On "not one gate" the gate dims and its label is struck. Avatar: corner. |
| s03 | 14.6–19.06 | Example · one bug fix | "Fix the crash when the config file is empty." types into a You → Claude card. The Claude mark pops, and the fix appears in a code card (config.ts, −1 +1). On "Let's follow the fix" the card folds into the fix chip. A four-stop route draws under it (On your machine · AI review · Blocking checks · People, by risk), and on "through each layer" the path runs through all four. Avatar: corner. |
| s04 | 19.06–26.32 | Layer 1 · On your machine | A laptop draws, and its terminal runs tests, build and lint, each ticked. Beside it: "Claude, who wrote it" and "Shows the output, not just 'done'". "Then a second Claude, with fresh eyes": two context panels. The writer's is full of how it got there (token chips: your ask, plan, try 1, error log, try 2, notes, …). The reviewer's holds only "the change", and a scan bar sweeps it on "rereads the change". Avatar: corner. |
| s05 | 26.32–35.84 | Layer 2 · AI review | The fix chip drops into a pull request's header (the diff as bars). Four Claude marks pop, and on "hunt for bugs at once" each probes its own band of the diff in parallel. Four numbered findings pin to lines. "Another group votes": the pins fly into a vote table under three voter marks, and each finding gets three ballots. The two everyone agrees on are posted (ink border) and tagged IMPORTANT ("Same crash, another file") and PRE-EXISTING ("Cache never clears"). "Rename a variable" (style) and "Maybe a race condition?" (not real) are struck and dropped. A legend shows the three tags: Important · Nit · Pre-existing. Avatar: out. |
| s06 | 35.84–41.32 | Layer 3 · Blocking checks | The checks panel for the pull request: security review, lint, type checks, tests on every platform, build, "…and dozens more", and Claude review. Each starts as a spinning ring. Security review passes on its name, and the rest tick through on "and checks". Claude review shows "1 open finding". On "blocks the merge" the Merge button's lock snaps shut, the button greys out and shakes: "Blocked until it's fixed or answered". Avatar: corner. |
| s07 | 41.32–48.52 | Layer 4 · People, by risk | A queue of three changes (a docs typo, our fix, the riskiest code path) sits beside a risk classifier funnel. Below are three bins, LOW · MEDIUM · HIGH, with dashed approver slots and a lower → higher risk arrow. Each change drops through the classifier as it is named: the docs typo into LOW ("0", No approver), our fix into MEDIUM (one person turns solid), the riskiest change into HIGH (two people). Foot: "The classifier rates the change, not who wrote it". Avatar: corner. |
| s08 | 48.52–59.6 | Results → Findings, not approvals | A June → Sept strip with one dot a month. Merged pull requests: Sept's bar grows to twice June's ("More than 2×"). Share of changes rolled back: Sept's bar starts level with June's and shrinks to 60% on "fell", leaving a dashed −40% ghost ("Down over 40%"). Then two lanes. The AI reviewer's Approve button is dashed and struck ("never"), and a person's Approve button is real. On "It only posts findings" the two findings from s05 post as comments, and "Findings, not approvals." lands on top. Hard stop: the last frame holds 2.0 s. Avatar: corner, smiling. |

Sound: the ep13 palette (paper, pen, marker, air, taps, ticks, typing, drops, Claude's bell) plus library pops,
clicks, whooshes, sparkle and chime. Cues are in each scene's `<head>`, placed by `tools/build-sfx.mjs`.

## Voiceover as placed (source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.15 | Here's how the Claude Code team does code review, in under sixty seconds. |
| s02 | 0.18 | With agents writing code, Anthropic's daily changes jumped from twenty-five hundred to over thirty thousand. |
| s02 | 6.49 | Nobody can read all that, so they stack layers, not one gate. |
| s03 | 0.18 | Say you ask Claude to fix a bug. Let's follow the fix through each layer. |
| s04 | 0.18 | Layer one, on your machine: Claude runs the tests, then a second Claude, with fresh eyes, rereads the change. |
| s05 | 0.18 | Layer two, in review: several agents hunt for bugs at once. |
| s05 | 4.59 | Another group votes on each finding, and it's only posted if enough agree it's real. |
| s06 | 0.18 | Layer three: security review and checks. Any open finding blocks the merge. |
| s07 | 0.18 | Layer four: people, scaled by risk. Docs need no approver, normal changes one, the riskiest two. |
| s08 | 0.18 | In three months, merged changes more than doubled, and the rollback rate fell over forty percent. |
| s08 | 6.02 | The AI never approves. It only posts findings. |

## Facts used (internal only; source: the post above, read 2026-11-13)

- Changes landing per day in Anthropic's monorepo: "from about 2,500 in May to more than 30,000 in September". The
  blocks are to scale (1 block = 500).
- Manual line-by-line review is "incredibly difficult if not impossible" at that pace → "Nobody can read all that".
- The post's "Layers, not one gate" figure covers six layers plus rollback. The video names four: author verification
  before the PR, Claude code review, blocking checks (security review plus CI), and risk-based human approval. Merge
  queue, flags, gradual release and rollback are left out for time.
- Layer 1: before a PR, Claude runs tests, build and lint and shows the output instead of saying it's done. A subagent
  reviews the diff "with fresh context". The terminal output in s04 is illustrative.
- Layer 2: "Several agents look for bugs at the same time", then "a separate group votes on each finding, and it only
  gets posted if enough of them agree it's real". Findings are posted inline, sorted by severity, and tagged
  Important, Nit or Pre-existing. Style and cleanup findings are dropped. **Illustrative:** the post doesn't give the
  number of agents (4 shown), voters (3 shown) or the vote threshold, and the four findings are invented for the example.
- Layer 3: open findings from the bug review or the security review block the merge. Every finding must be fixed or
  answered with a reason. CI runs lint, type checks, tests on every platform and build ("dozens of checks").
- Layer 4: a classifier sets the risk tier from the change, not the author. Low (docs, copy, internal-only, additive
  behind a flag) needs no human approval once automated review and security checks are green. Medium (ordinary
  changes and some sensitive areas) needs one person. High (the riskiest code, and paths that always need two) needs two.
- Results for the Claude Code repo, June → September: merged PRs "more than doubled", and the share needing a revert
  "fell by more than 40 percent". The bars are drawn at the stated minimum (2× and 0.6×), and the footnote says so.
- "Approving a pull request is still a human call; the product posts findings, not approvals." An agent's approval
  never counts as a person's.
- The example fix (config.ts, `config.theme?.name ?? "light"`) is illustrative: real, correct TypeScript, not from the post.
