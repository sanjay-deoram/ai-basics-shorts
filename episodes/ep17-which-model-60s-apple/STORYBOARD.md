# Episode 17 · Which Claude model should you build with? In under 60 seconds (59.16 s, avatar narrator)

*Under 60 seconds* series (see `.claude/skills/under-60/SKILL.md`). Source: Addy Osmani, *Which Claude model should you
build with? Fable, Opus, Sonnet, or Haiku* (https://claude.dev/blog/which-claude-model-should-you-build-with/,
Nov 9 2026). The worked example: one app with four jobs, each handed to a model by the post's three rules.

## Style · APPLE variant

Same look as `ep16-daily-brief-60s-apple` (white s01, #F5F5F7 after; near-black type, one accent blue #0071E3; Inter
Tight headlines; white cards with soft shadows; calm expo/power ease-outs). Theme: `assets/apple.css` (+ the ep17 shared
`.a-job` job card, `.a-mod` model chip, `.a-check`) and `assets/apple.js` (+ `Apple.icons`: tag, chat, bug, db, bolt
line icons). Claude is shown only with the Claude logo. Narrator: the Sanjay avatar in the round video-call tile, large
under s01, small bottom right from s02 to the end. Sound: the ep14/ep16 apple palette.

## Script (158 words)

| Beat | Line |
|---|---|
| Cold open | Here's how to pick the right Claude model, in under sixty seconds. |
| Name it | Four, from small to big: Haiku, Sonnet, Opus and Fable. Smaller is cheaper and faster; bigger handles harder work. |
| Set up the example | Say your app has four jobs: tagging ten thousand tickets, a chat reply a customer waits on, a tricky bug, and a big migration. |
| Rule 1 · Opus | Rule one: start on Opus, the daily driver, at medium effort. Effort is how long it thinks first. The tricky bug stays here. |
| Rule 2 · Down | Rule two: move down for simple jobs, or when someone's waiting. Tagging goes to Haiku, at a fortieth of the price. The chat reply goes to Sonnet: it's fast. |
| Rule 3 · Up | Rule three: if it falls short, don't jump yet. Give it a way to check its work, like a test, then raise the effort. Only then move up: the migration goes to Fable. |
| Payoff | And compare cost per task, not price per token: on one coding test, Fable matched Opus at max effort, for about half the cost. |

Voice: Fish Audio "sanjay", then sped up 3% locally (`ffmpeg -af atempo=1.03`, pitch kept) so the episode lands under
60 s with a 1.7 s end hold. The sped-up files keep their content-hash names, so `tools/voiceover.mjs` reuses them; a
regenerated line would come back at normal speed and needs the same `atempo` pass.

## Scenes (59.16 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–12.5 | Cold open + the four | Frame 0: "Which Claude model?"; "model?" tints on "the right Claude model"; "Under 60 seconds" pill. "Four": four gray tiles; "from small to big": they grow; each turns into its model card on its name (Claude logo, Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.2). A scale line under them: "Cheaper · faster" (Haiku) and "Harder work" (Fable). Avatar large below. |
| s02 | 12.5–20.68 | The example | "Your app has four jobs": Tag 10,000 tickets (counts up), Reply in chat, Fix a tricky bug, Migrate the database, each with a gray "Model?" tag. Avatar in the corner from here on. |
| s03 | 20.68–29.08 | Rule 1 · Opus | "Start on Opus"; the Opus 5.5 card, "The daily driver". Effort control (low · medium · high · xhigh · max) slides to medium; "how long it thinks before it answers": the thinking bar grows as the control steps to max, back to medium. The bug job lands: Opus 5.5 ✓. |
| s04 | 29.08–39.25 | Rule 2 · Haiku and Sonnet | "Move down"; "Simple jobs", "Someone's waiting". Tickets → Haiku 5.5 ✓; input price per million tokens, Opus $4.00 vs Haiku $0.10, bars to scale, "1/40 the price". Chat → Sonnet 5.5 ✓; "Where's my order?" / "It ships today." / Fast. |
| s05 | 39.25–49.33 | Rule 3 · Fable | "Falls short?": the migration on Opus 5.5, red ✕ "Falls short". "Don't jump yet. In this order:" 1 Check its own work (Tests pass ✓), 2 Raise the effort (medium → high), 3 Then move up (→ Fable). The chip swaps to Fable 5.2, ✕ becomes ✓. |
| s06 | 49.33–59.16 | Payoff | "Cost per task, not per token". Price per token: Opus 5.5 $4, Fable 5.2 $8, "2× per token". FrontierCode 2.0, one coding test: score Opus 5.5 · max 45.5%, Fable 5.2 · high 45.3%, "Same score"; cost per task bars, Fable about half, "≈ ½ the cost" rings. Hard stop, ~1.7 s hold. |

Voiceover as placed: see `voiceover.json` (s01 0.05 / 3.85, every other scene 0.17).

## Facts used (from the post)

- Four generally available models: Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.2 (Mythos 5.2 is verification-only, left
  out). Haiku: "high-volume, cost-sensitive tasks", fastest; Sonnet: fast, "well-scoped tasks"; Opus: "our daily driver
  for complex coding and knowledge work"; Fable: "the most ambitious, open-ended technical work".
- "Start most work on Opus 5.5 at its default effort level, `medium`." Effort levels low · medium · high · xhigh · max;
  higher effort means longer thinking, more tool calls and self-checking, at more latency.
- Down: Haiku for "classification, routing, and extraction"; Sonnet for replies a person waits on ("start Sonnet 5.5 at
  `low` or `medium`"). The ticket-tagging and chat jobs are illustrations of those.
- Prices (Claude API list, input / output per million tokens): Haiku 5.5 $0.10 / $0.50 for prompts up to 100K tokens
  ($0.50 / $2.50 above), Sonnet 5.5 $2 / $10, Opus 5.5 $4 / $20, Fable 5.2 $8 / $40. "A fortieth": $0.10 vs $4 input
  (and $0.50 vs $20 output), short prompts only.
- When a model falls short, in order: "Check that the model can verify its own work, with a test, a build or a
  script", "Raise effort one level", "Move to the next model up". Fable for major refactors and migrations.
- Payoff: "A higher price per token doesn't always mean a higher cost per task." FrontierCode 2.0: Fable 5.2 at `high`
  45.3% vs Opus 5.5 at `max` 45.5%, "for roughly half the cost per task" (the post cites this from a linked post).
  The cost-per-task bars are relative (no dollar figure given); the chat text and the job cards are illustrations.
