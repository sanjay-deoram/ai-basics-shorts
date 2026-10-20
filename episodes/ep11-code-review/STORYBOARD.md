# Episode 11 · How does the Claude Code team review code? (63.95 s, avatar narrator)

Built 2026-10-16 (render: `renders/ep11-code-review.mp4`). The "Built" section below records the real timings and
every change from the draft; the scene notes further down are the original plan.

## Built (2026-10-16, v4)

History: v1 54.8 s at speed 0.95 ("9/10 fast"). v2 60.35 s at 0.85 (question "Does anyone read code anymore?" removed,
calmer beats; "8/10"). v3 58.85 s at 0.9 ("8.5/10"). v4 (this build): full-sentence narration instead of compressed
lines and colon lists (the user's rule from now on: narration and on-screen labels are full sentences; short labels on
cards are fine). The risk tiers are three sentences with concrete examples, the tag list is no longer voiced, and the
recap says "agents review every pull request" and "risk sets how many people approve".

- **Voice:** one Sanjay take at speed 0.9 (62.38 s, 175 words counted by whitespace, tags excluded). Episode 63.95 s (1.4 s end hold). Cuts sit on the
  take's pauses (ffmpeg silencedetect -35 dB / 0.16 s, cross-checked with `hyperframes transcribe`,
  `assets/vo/transcript.json`).
- **Slots:** s01 0–5.4 · s02 5.4–9.75 · s03 9.75–15.5 · s04 15.5–19.0 · s05 19.0–22.75 · s06 22.75–27.85 ·
  s07 27.85–30.55 · s08 30.55–34.75 · s09 34.75–51.2 · s10 51.2–63.95. Rail overlay 9.75–52.15.
- **Avatar:** title 0.15 → out 5.15 · corner in 5.5 → out 18.85 · br in 27.9 → out 34.55 · end in 51.95. Smiles on
  "machines", "a fix or a reason" and the end card.
- **s06 (v4):** the vote takes the whole scene (5.1 s): flags lift into candidates, votes, tallies, the style-only and
  1/3 findings drop, and the two survivors are stamped POSTED on "real". The Important / Nit / Pre-existing legend and
  the posted-comment cards are gone (no longer voiced); the tags remain as labels on the s07 threads.
- **s07 (v4):** the `<=` in the fix's removed line is highlighted (it moved here from s06's punch-in); s08's opening
  copy of the frame keeps it.
- **s09 (v4):** one scene, 16.45 s, one tier per sentence (classifier → LOW with README.md / button-label chips, "0
  people" and "Once the checks are green." → MEDIUM "Normal product change · 1 person" → HIGH "Riskiest code · 2 people"
  → the bot bounces off the HUMAN slot). Notes as full sentences: "The change sets the tier, not the author." and "Only
  trusted authors get the lighter paths."
- **s10 (v4):** checks match the recap in full; set at 50 px (series default 60) so each fits on one line.
- **Hook (v2):** the title no longer turns into the question; the camera punches in on app.js as the logos stamp and
  90% counts, then holds.
- **Pacing (v2, v3):** beats spread out (fewer things move at once), tweens of about 0.5–0.6 s, longer holds on the
  48 passed punch-in, the gate drop (held zoomed to the cut) and the classifier table.
- **s08 security finding:** shown against a short second example file in the same PR, `auth.js` (line 9:
  `+console.log("token:", token);`), labelled EXAMPLE, so "Auth token written to the log" points at real code. The
  merge box lists both reviews (Bug review · 0 open, Security review · 1 open).
- **Rail:** draws at the start of s03 (zoomed in on station 1 on "Before the pull request", pulls back to all four,
  parks). Stations are numbered circles with labels under them (fits x 90–840 beside the corner avatar).
- **s05 flags:** lines 1, 2, 3, 3 (getItems errors, items null, off by one, style).
- **s07 → s08:** s07 doesn't fade; s08 opens on its exact last frame, then clears.
- **Kit (episode copy only):** `Egg.codeCard` gained `lang: "js"`, `lang: "sh"` and `opts.diff` / `opts.nums` (diff
  markers and tinted +/- lines in the lightened living colours), with matching CSS at the end of `eggshell.css`.

## Facts used (internal only)

All in RESEARCH.md with verbatim quotes (items marked **[used]**). The diff, comment texts, test counts, the security
finding and the replies are example data. The diff is real, correct JavaScript apart from its intended bug: `i <= n`
reads `items[n]`, which is `undefined`.

## Narration (one take; 175 words, `[excited]` tags not counted)

"[excited] How does the Claude Code team review code, when Claude writes about ninety percent of it? They didn't remove review. But they moved most of the reading to machines. Before the pull request, Claude runs the tests and shows the output, instead of saying it's done. A second agent reviews the diff in a fresh context. On every pull request, agents hunt for bugs in parallel. Other agents vote, and a finding only gets posted if enough of them agree it's real. Every finding needs a fix or a reason. Security gets its own review, and open findings block the merge. Then a classifier decides how many people must approve. A change to docs or button text needs no one, once the checks are green. A normal product change needs one person. The riskiest code needs two people. And a bot's approval never counts as a person's. [excited] So: Claude checks its own work, agents review every pull request, open findings block the merge, and risk sets how many people approve. Follow for more AI basics!"

**Runtime estimate (draft, before v4):** ep10 ran 162 words in 55.6 s at speed 1.0, about 2.95 words/s with its pauses. 151 words →
~51.5 s of speech + 0.15 s lead-in + ~1.2 s end hold ≈ **53–54 s** at speed 1.0. Speed 0.95 would land near 56–57 s,
still under 60. Times below are estimates; re-time every slot on the real take (silencedetect + `hyperframes transcribe`).

## Scenes

| Slot | Time (v4) | Scene | Narration slice |
|---|---|---|---|
| s01 | 0–5.4 | Hook | "How does the Claude Code team review code, when Claude writes about ninety percent of it?" |
| s02 | 5.4–9.75 | The reading moves (whiteboard) | "They didn't remove review. But they moved most of the reading to machines." |
| s03 | 9.75–15.5 | 1 · Claude shows its work | "Before the pull request, Claude runs the tests and shows the output, instead of saying it's done." |
| s04 | 15.5–19.0 | 1 · Fresh-context review | "A second agent reviews the diff in a fresh context." |
| s05 | 19.0–22.75 | 2 · The bug hunt | "On every pull request, agents hunt for bugs in parallel." |
| s06 | 22.75–27.85 | 2 · The vote | "Other agents vote, and a finding only gets posted if enough of them agree it's real." |
| s07 | 27.85–30.55 | 2 · Answer every finding | "Every finding needs a fix or a reason." |
| s08 | 30.55–34.75 | 3 · Security blocks | "Security gets its own review, and open findings block the merge." |
| s09 | 34.75–51.2 | 4 · Risk sets approvals | "Then a classifier decides how many people must approve. A change to docs or button text needs no one, once the checks are green. A normal product change needs one person. The riskiest code needs two people. And a bot's approval never counts as a person's." |
| s10 | 51.2–63.95 | Pull back + end card | "So: Claude checks its own work, agents review every pull request, open findings block the merge, and risk sets how many people approve. Follow for more AI basics!" |

### Pipeline rail (overlay, `compositions/rail.html`, s03–s10)

Four mono chips in a row at y 236–296, x 90–840 (clear of the `corner` avatar at x ≥ 864):
`1 BEFORE PR` · `2 AI REVIEW` · `3 SECURITY` · `4 APPROVAL`, joined by a thin stone line. The current chip fills ink
(eggshell text); past chips keep an ink tick. The iso dot slides along the line to the current chip on each step
change (`Egg.travel`, 0.6 s): at s03 (1), s05 (2), s08 (3), s09 (4). Scene content starts at y ≥ 340 while the rail
is up.

### s01 · Hook (0–6.05)

- **Narration:** "How does the Claude Code team review code, when Claude writes about ninety percent of it?"
- **Visuals:** Title types in at the top (y 260–520). A small light code card (`app.js`, 10 grey placeholder lines,
  x 90–600, y 840–1350) slides up; on "ninety percent" the camera punches in on it (1.05), a tiny Claude logo stamps
  into the gutter of 9 of the 10 lines, top to bottom, and the counter under it ticks `0% → 90%` with the kicker
  `WRITTEN BY CLAUDE`, then holds. (v2: the question "Does anyone read code anymore?", its title swap and the PR pile
  were removed.)
- **Avatar:** `title` stop (bottom right, beside the card).
- **On screen:** "How the Claude Code team reviews code" · `90%` · `WRITTEN BY CLAUDE`

### s02 · The reading moves (whiteboard, 7.4–12.0)

- **Narration:** "They didn't remove review. But they moved most of the reading to machines."
- **Visuals:** Whiteboard (x 150–930, y 520–1200). A long scroll of diff lines draws on the left; a drawn ink eye at
  its top scans down slowly (a short dotted scan line). On "didn't remove review" the word `Review` is drawn in a
  box over the scroll and stays. On "But they moved most of the reading" the scan line lifts off the eye and hops to
  three Claude logos on the right, which scan the scroll fast (three violet/ember/blush scan lines, staggered); the
  eye shrinks and moves to a small "decides" spot at the bottom. Last 0.8 s: the four rail chips draw full size across
  the middle, then the camera pulls back and the rail glides up and parks at y 236 (zoom-out handoff into s03).
- **Avatar:** `corner`.
- **On screen:** `Review` (boxed, stays) · label "The reading moves to machines." · rail chips.

### s03 · 1 · Claude shows its work (12.0–17.9)

- **Narration:** "Before the pull request, Claude runs the tests and shows the output instead of saying it's done."
- **Visuals:** Rail lights `1 BEFORE PR`. Weak vs better, stacked:
  - Weak (taupe card, y 360–560): Claude logo + bubble "Done! Everything works." On "instead of saying it's done" it
    gets struck through in ink (optional VAGUE stamp; kicker `SAYS`).
  - Better (ink code card, y 620–1180, kicker `SHOWS`), the commands type and their output lands line by line with
    the run bar (on "runs the tests" and "shows the output"):
    ```
    $ npm test
      ✓ getItems reads one page
      ✓ send retries on timeout
      48 passed · 0 failed
    $ npm run build
      build ok
    $ npm run lint
      0 problems
    ```
  - Camera punches in (1.04) on `48 passed · 0 failed` as "shows the output" lands, then settles.
- **Avatar:** `corner`.
- **On screen:** `SAYS` / `SHOWS` · "Show the output, not 'done'."

### s04 · 1 · Fresh-context review (17.9–21.4)

- **Narration:** "A second agent reviews the diff in a fresh context."
- **Visuals:** Left: Claude logo #1 with a tall column of chat bubbles behind it (the writing session, smoke lines).
  Right: Claude logo #2 pops in with an empty outlined box under it, kicker `FRESH CONTEXT`. The diff card (small,
  `sync.js · +4 −0`) slides from #1 into #2's empty box; the chat column stays behind on the left. Camera punches into
  #2's box as a scan line passes over the diff.
- **Avatar:** `corner`.
- **On screen:** `AGENT 2` · `FRESH CONTEXT` · "Reviews the diff"

### s05 · 2 · The bug hunt (21.4–25.0)

- **Narration:** "On every pull request, agents hunt for bugs in parallel."
- **Visuals:** Rail moves to `2 AI REVIEW`. A PR header card types (y 340–440): `#4187 · Send every item in the list`.
  Under it the diff code card (filename `sync.js`, line numbers, `+` lines tinted):
  ```
   const items = await getItems(url);
  +const n = items.length;
  +for (let i = 0; i <= n; i++) {
  +  send(items[i]);
  +}
  ```
  Three small Claude logos sit along the card's right edge, each with its own scan bar sweeping a different part of
  the diff at the same time. Each drops a small outlined flag in the gutter as it passes (4 flags total, lines 1, 1,
  2, 3). Under the card, smoke text: "Does it solve its problem, fit the system, or break something else?"
- **Avatar:** out (the card fills the box).
- **On screen:** `#4187 · Send every item in the list` · `AGENTS · IN PARALLEL` · the question line.

### s06 · 2 · The vote (22.75–27.85)

- **Narration:** "Other agents vote, and a finding only gets posted if enough of them agree it's real."
- **Visuals:** Opens on s05's last frame. The 4 flags lift out of the diff into 4 candidate cards; a row of three
  verifier logos votes on each in turn (✓ / ✕) and a tally shows how many agree:
  1. "Off by one: items[n] is undefined" · ✓ ✓ ✓ · 3/3 → POSTED
  2. "getItems() errors aren't caught" · ✓ ✓ ✓ · 3/3 → POSTED
  3. "items might be null" · ✓ ✕ ✕ · 1/3 → "not enough agree", falls away (on "enough of them agree")
  4. "Style: use for…of" · struck "style only · dropped" → falls away
  On "real" the camera pulls back and the two survivors are stamped POSTED. (v4: the tag names are no longer voiced,
  so the legend row and the `<=` punch-in moved out; the tags stay as quiet labels on the s07 threads, and the `<=` is
  highlighted in s07's fix.)
- **Avatar:** out.

### s07 · 2 · Answer every finding (31.2–34.1)

- **Narration:** "Every finding needs a fix or a reason."
- **Visuals:** The two comments become threads (y 360–1100). On "a fix": under the Important thread, a commit chip
  `fix: stop at n` and a 2-line diff:
  ```
  -for (let i = 0; i <= n; i++) {
  +for (let i = 0; i < n; i++) {
  ```
  then a `RESOLVED · FIXED` chip. On "a reason": the Pre-existing thread gets a reply "Not from this PR. Filed a
  follow-up." and a `RESOLVED · REASON` chip. Counter top right of the area: `Open findings 2 → 0`.
- **Avatar:** `br` (bottom of the box is empty here), slides out at the cut.
- **On screen:** `FIX` / `REASON` · `Open findings 0`

### s08 · 3 · Security blocks (34.1–38.0)

- **Narration:** "Security gets its own review, and open findings block the merge."
- **Visuals:** Rail moves to `3 SECURITY`. A second review card types under the PR header: `Security review` with
  one finding, "Auth token written to the log" (`OPEN`). Below it a merge box: `Bug review · 0 open` and
  `Security review · 1 open`. On "block the merge" a drawn ink gate bar drops across the `Merge` button (greyed,
  label `Blocked · 1 open finding`), with a small card shake. Camera punch-in on the button.
- **Avatar:** `bl`, out before the merge box lands if it overlaps (snapshot the stop).
- **On screen:** `Security review` · `OPEN` · `Merge blocked · 1 open finding`

### s09 · 4 · Risk sets how many people approve (34.75–51.2)

- **Narration:** "Then a classifier decides how many people must approve. A change to docs or button text needs no one, once
  the checks are green. A normal product change needs one person. The riskiest code needs two people. And a bot's
  approval never counts as a person's."
- **Visuals:** Rail moves to `4 APPROVAL`. PR `#4187` slides into a drawn `Classifier` box ("reads the change") and three
  empty tier rows appear (RISK · EXAMPLE · MUST APPROVE), with "The change sets the tier, not the author." under them.
  Then one tier per sentence, the iso dot travelling to each row as it's said:

  | Risk | Example | Must approve |
  |---|---|---|
  | `LOW` | Docs or button text (chips `README.md`, `"Save" → "Save draft"`) · "Once the checks are green." | 0 people |
  | `MEDIUM` | Normal product change | 1 person |
  | `HIGH` | Riskiest code | 2 people |

  After the LOW sentence: "Only trusted authors get the lighter paths." The dot settles back on MEDIUM (#4187 is a
  normal product change) and a `HUMAN · 1 PERSON` slot opens; on "a bot's approval" a Claude logo with `Approved` flies
  at it, bounces off and drops away; the slot reads "Needs a person."
- **Avatar:** out.

### s10 · Pull back + end card (51.2–63.95)

- **Narration:** "So: Claude checks its own work, agents review every pull request, open findings block the merge, and risk
  sets how many people approve. Follow for more AI basics!"
- **Visuals:** On "So:" the rail pulls back to full size mid-frame, all four stations ticked, the dot runs the whole
  line, and it fades. Then "That's the review" and four `egg-checks` (50 px so each is one line), each ticking as it's
  said: Claude checks its own work · Agents review every pull request · Open findings block the merge · Risk sets how
  many people approve. Follow pill on "Follow". Holds, no fade.
- **Avatar:** `end`, smiling.

## Draft voiceover.json line

```json
{
  "scene": "s01",
  "at": 0.15,
  "text": "[excited] How does the Claude Code team review code, when Claude writes about ninety percent of it? They didn't remove review. But they moved most of the reading to machines. Before the pull request, Claude runs the tests and shows the output, instead of saying it's done. A second agent reviews the diff in a fresh context. On every pull request, agents hunt for bugs in parallel. Other agents vote, and a finding only gets posted if enough of them agree it's real. Every finding needs a fix or a reason. Security gets its own review, and open findings block the merge. Then a classifier decides how many people must approve. A change to docs or button text needs no one, once the checks are green. A normal product change needs one person. The riskiest code needs two people. And a bot's approval never counts as a person's. [excited] So: Claude checks its own work, agents review every pull request, open findings block the merge, and risk sets how many people approve. Follow for more AI basics!"
}
```

Voice `sanjay`, speed 0.9 (v4; the draft planned 1.0). If the article-style delivery reads too flat, try `[excited]` only on the hook
and keep the body untagged; don't add exclamation marks to the body.

## Build notes

- Avatar stops to snapshot: s01 title (vs the code card), s02 corner (vs the whiteboard and rail chips), s03/s04
  corner (vs the rail), s07 br, s08 bl, s10 end. Out during s05, s06, s09.
- Code cards: ≤ 36 chars a line, ≤ 8 lines (longest code line is 35 chars). The `+`/`-` lines use the egg-code
  colours, not red/green.
- Left out for time (see RESEARCH.md): required CI as its own step (shown only as build/lint in s03), CLAUDE.md /
  REVIEW.md, the merge queue, flags and staged release, rollback, the reviewer evals and round cap, where humans stay,
  and the results numbers.

## Fact-check

Checked 2026-10-16 against the full article text (page downloaded and stripped, plus the figures' SVG text and
aria labels). Verdict: accurate in substance; four small fixes for overstatement, one RESEARCH.md quote corrected.
Narration stays 151 words; scene structure unchanged.

### Changes

1. **s06 narration (and voiceover line):** "Only findings they agree are real get posted" → "Only findings enough agree
   are real get posted". "They agree" reads as all verifiers; the article says a threshold: "it only gets posted if
   enough of them agree it's real."
2. **s10 narration, end-card check (and voiceover line):** "risk decides who approves" → "risk sets the approvals".
   The tier sets how many people approve, not who; who may take the lighter paths is a separate rule: "Only authors on
   the repo's trusted list get the lighter paths, mostly the team that owns it."
3. **s05 on-screen:** `3 AGENTS · IN PARALLEL` → `AGENTS · IN PARALLEL`. The article gives no number: "Several agents
   look for bugs at the same time." (Three logos on screen are fine as an illustration.)
4. **s09 table:** header "People who must approve" → "Human approvals"; LOW cell `0` → `0 · once checks are green`;
   added smoke line "Lighter paths: trusted authors only." Low is not a bare zero: "None required once automated
   review and security checks are green", and "Everyone else needs a second person to approve." Without this the
   "The change sets the tier, not the author" kicker alone could suggest anyone's low-risk change merges with no one.
5. **v4 narration (2026-10-16, coordinator-checked against RESEARCH.md):** the tiers are now full sentences with
   examples taken from RESEARCH.md's tier table: Low "Docs, copy, internal-only features, additive changes behind a
   flag" → "None required once automated review and security checks are green" (voiced as "a change to docs or button
   text needs no one, once the checks are green"; button text = copy); Medium "Ordinary product changes…" → "One
   person" ("a normal product change needs one person"); High "The highest-risk code…" → "Two people" ("the riskiest
   code needs two people"). "Then a classifier decides how many people must approve" follows "A classifier reads the
   change and picks its risk tier" / "no person, one, or two". The vote line keeps the article's threshold: "it only
   gets posted if enough of them agree it's real." The on-screen note "Only trusted authors get the lighter paths."
   stays, because the LOW sentence alone could suggest anyone's low-risk change merges with no one. The README.md and
   "Save" → "Save draft" chips are illustrative examples of docs and button-text changes.
6. **RESEARCH.md:** figure order ended "watch, fix or roll back" → "watch, fix forward or roll back" (figure: "a last
   step to watch, fix forward or roll back").

### Confirmed (no change)

- "Claude writes about ninety percent of it": "Claude writes about 90 percent of Claude Code's own code."
- (v1 only) "Does anyone read code anymore?": verbatim question in the article's opening; removed from the script in v2.
- "They didn't remove review. But they moved most of the reading to machines.": "We didn't remove review. But we did
  move most of the reading to machines".
- s03, Claude runs tests and shows output, before the PR: "We give Claude something it can run—like tests, a build or
  a screenshot ... and ask it to show the output instead of saying it's done." Build and lint in the s03 card match
  the figure: "Claude runs the tests, build and linter".
- s04: "Then a subagent reviews the diff with fresh context." / figure "a second agent reviews the diff in a fresh
  context".
- s05: "Every pull request gets a Claude review before a person looks." The on-screen question is verbatim: "does the
  change solve its problem, fit the system, or break something else?"
- s06: "a separate group votes on each finding"; style-only candidate dropped: "Findings that are only about style,
  diagnostics, or cleanup get dropped."; tags and "not the author's fault": "Each is tagged Important, Nit, or
  Pre-existing, so a bug the PR didn't introduce doesn't look like the author's fault."
- s07: "Every finding has to be answered. You either fix it or resolve the thread with a reason."
- s08: "Security gets its own automated review too." / "A PR can't merge while any finding from the bug review or the
  security review is still open." Narration says "open findings" (not only security ones), and the merge box shows
  both reviews, so the meaning is kept.
- s09 (v4 wording, see Changes 5): figure "A classifier sets the tier: no person, one, or two." / "A classifier reads the change and picks its risk
  tier." / "The change sets the tier, not the author." Table examples are fair shortenings of Low "Docs, copy...",
  Medium "Ordinary product changes...", High "The highest-risk code...". Bot approval: "An agent's approval never
  counts as a person's" and "Never let a bot's approval replace a required human's".
- Step order: before-PR checks → Claude review (hunt, vote, post, answer) → security review → risk-based approval
  matches figure A ("Before the pull request, the work is verified. On every pull request: required CI, Claude code
  review and security review, all automated, then a risk-based approval where a person decides."). Required CI is
  left out as its own step; nothing in the script puts it in the wrong place.
- Nothing contradicts the omitted sections (CI, merge queue, flags, rollback, evals, round cap, where humans stay).
- No sources, names or URLs in the voice or on screen.
- Example data (PR #4187, the `sync.js` diff, `48 passed`, comment and reply texts, the security finding) reads as
  illustration and asserts no article fact. Optional build note: the security finding "Auth token written to the log"
  doesn't match anything in the 4-line diff; consider a finding that fits the shown code, or show a second file in the
  diff header, so viewers aren't puzzled. Not a factual error.
- Style: tracks the article's voice (blunt questions, "didn't X. But Y.", flat one-line rules, colons before lists).
