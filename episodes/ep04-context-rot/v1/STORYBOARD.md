# Episode 04 · What is context rot? (85 s, avatar narrator)

What context rot is, two examples (everyday and coding), why it happens in four drawn steps (a step tracker
counts them), and how to fight it. Follows ep03 ("What is context?": the desk, tokens, 1M ≈ 2,000 pages). The script
was reviewed by a separate Opus agent for accuracy, natural speech and pacing.

## Facts used (checked 2026-10-09)

- **What it is.** "As token count grows, accuracy and recall degrade, a phenomenon known as context rot." Claude docs,
  *Context windows* (platform.claude.com/docs/en/build-with-claude/context-windows). Claude Code best practices: "When
  the context window is getting full, Claude may start 'forgetting' earlier instructions or making more mistakes." The
  voice says "Nothing's deleted. It just slowly loses track": the facts are still in the context, they just get used
  worse. The s02 graph is an illustrative shape with no numbers.
- **Examples (s03, s07).** Illustrative, labelled "Example" on screen: a $500 budget forgotten 200 messages later; a
  "don't edit the migrations folder" rule forgotten after hours of logs and file reads (the voice and the card say
  "hours", not "3 hours", because Claude Code auto-compacts long before that); the old and new copies of auth.js both
  in context (earlier Read results and diffs stay in context in a coding agent).
- **Step 1: each token looks back at every token before it.** Anthropic Engineering, *Effective context engineering
  for AI agents* (29 Sep 2025): the transformer "enables every token to attend to every other token across the entire
  context. This results in n² pairwise relationships for n tokens." The voice says "looks back at every token before it"
  (causal attention), which makes the pair count exact: n(n−1)/2, so 4 → 6, 8 → 28, 1,000,000 → 499,999,500,000 ≈ 500
  billion.
- **Step 2: focus gets spread thin.** Same post: LLMs have an "attention budget"; "As its context length increases, a
  model's ability to capture these pairwise relationships gets stretched thin"; "Models develop their attention patterns
  from training data distributions where shorter sequences are typically more common than longer ones." In each
  attention head a token's weights sum to 1 (softmax), so more tokens means smaller shares on average. The The/cat/sat
  split and the practice-texts chart are illustrative and labelled.
- **Step 3: the middle gets lost.** Liu et al., "Lost in the Middle: How Language Models Use Long Contexts" (TACL
  2023): "performance is often highest when relevant information occurs at the beginning or end of the input context,
  and significantly degrades when models must access relevant information in the middle of long contexts". It tested
  2023 models, so the voice says "often" and the source is dated on screen.
- **Step 4: look-alikes compete.** Chroma, "Context Rot: How Increasing Input Tokens Impacts LLM Performance" (Hong,
  Troynikov, Huber, 14 Jul 2025; 18 models including Claude): "Even a single distractor reduces performance relative
  to the baseline (needle only), and adding four distractors compounds this degradation further." Also: "Across all
  models, we see significantly higher performance on focused prompts compared to full prompts" (~300 vs ~113k tokens).
- **Fixes (s08).** Claude Code best practices: "/clear frequently between tasks to reset the context window entirely";
  "/compact <instructions>"; CLAUDE.md is "a special file that Claude reads at the start of every conversation".
  Effective context engineering: "the smallest set of high-signal tokens". Commands appear on screen only.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.3 | Hook | "What is context rot?" · And why AI forgets what you told it. |
| s02 | 3.3–12.7 | What it is | Drawn graph: how much is in the context → how well it uses each detail; the line slips as a dot rides it; "Nothing's deleted. Just harder to use."; Claude docs quote |
| s03 | 12.7–25.9 | Examples | Everyday: "My budget is $500." · 200 messages later · "This $900 hotel is perfect!" ✕ Over budget. Coding: "> Don't edit the migrations folder." · hours of logs · "Edited migrations/004_users.sql" ✕ Forgot the rule |
| s04 | 25.9–36.9 | Step 1 | Each token looks back at every token before it: 4 dots / 6 links, 8 dots / 28 links, then a dense ring: 1,000,000 tokens ≈ 500 billion links |
| s05 | 36.9–47.5 | Step 2 | One token's attention bar = 100%: The / cat / sat, then countless slivers. "Same 100%. Thinner slices." Practice-texts chart, mostly short |
| s06 | 47.5–56.1 | Step 3 | A row of 12 pages under a U-curve; ticks at start and end; the middle fades, "?" |
| s07 | 56.1–66.5 | Step 4 | Look-alike pairs ($500 / sister's $2,000; auth.js old / new) swap places. "More look-alikes, more mix-ups" |
| s08 | 66.5–77.8 | How to fight it | Isometric steps: New topic? New chat. (/clear) · Long chat? Summarize it (/compact) · Repeat what matters (Rules → CLAUDE.md) · Only what it needs (Fewer look-alikes) |
| s09 | 77.8–85 | End card | More context, more to lose · New topic? New chat. · Repeat what matters · In Claude Code: /clear and /compact · Follow pill |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | Why does AI forget what you told it earlier? |
| s02 | 0.3 | It's called context rot. |
| s02 | 2.0 | The more its context holds, the worse it uses any one detail. |
| s02 | 6.0 | Nothing's deleted. It just slowly loses track. |
| s03 | 0.3 | You tell it your budget: five hundred dollars. |
| s03 | 2.9 | Two hundred messages later, it suggests a nine hundred dollar hotel. |
| s03 | 6.9 | Or in code: don't touch the migrations folder. Hours of logs later, it edits a migration. |
| s04 | 0.3 | So why does it happen? Step one. |
| s04 | 2.8 | Each token looks back at every token before it. |
| s04 | 5.6 | Four tokens make six links. A million make five hundred billion. |
| s05 | 0.3 | Step two. Each token has a fixed amount of attention to share. |
| s05 | 5.0 | More tokens, thinner slices. |
| s05 | 7.4 | And it was trained mostly on shorter texts. |
| s06 | 0.3 | Step three. Researchers found AI often uses the start and end best. |
| s06 | 5.5 | Stuff in the middle is the easiest to miss. |
| s07 | 0.3 | Step four. Look-alikes compete. |
| s07 | 2.9 | Your budget and your sister's. The old version of a file and the new one. |
| s07 | 7.5 | The more look-alikes, the more mix-ups. |
| s08 | 0.3 | So how do you fight it? |
| s08 | 1.8 | New topic? New chat. |
| s08 | 3.6 | Long chat? Get a summary and start fresh. |
| s08 | 6.9 | Repeat the facts that matter. |
| s08 | 8.8 | And give it only what it needs. |
| s09 | 0.3 | Context rot is real, but a tidy desk keeps it in check. |
| s09 | 4.6 | Follow for more AI basics. |

## Avatar

title peek (s01) → top right (s02) → out (s03, the panels fill the box) → small top-right corner (s04) → bottom right
(s05, s06) → corner (s07) → out (s08, the isometric steps fill the box) → end (s09). Doubt on the hook, on "the worse
it uses any one detail" and on "the easiest to miss"; smile on the end card. Every stop checked with snapshots.

Runtime 85 s: over the 60 s guideline in DESIGN.md. To shorten, fold step 1 into step 2 (about 9 s), or drop the
coding half of s03 (step 4 has a coding example too).
