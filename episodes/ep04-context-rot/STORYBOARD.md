# Episode 04 · What is context rot? (60 s, avatar narrator)

v2, rebuilt teacher-first. The lesson answers four questions in order, and the eyebrows name each one: what it is,
how to spot it, what to do, how to avoid it. One running example, a $500 Lisbon trip, carries all of them. The concrete
case comes first (s02) and the term is named after it (s03). Follows ep03 ("What is context?", where the desk and pages
were introduced).

v1 (85 s: four "why" steps covering attention links, the attention budget, lost in the middle and look-alikes, plus
four quick fixes) is kept in `v1/` and `renders/ep04-context-rot-v1.mp4`. It was cut because it had too many separate
ideas, no "how to spot it" part, no worked fix, and ran over the 60 s limit.

## Facts used (checked 2026-10-09)

- **What it is.** Claude docs, *Context windows* (platform.claude.com/docs/en/build-with-claude/context-windows): "As
  token count grows, accuracy and recall degrade, a phenomenon known as context rot." The on-screen definition reads
  "The longer the chat, the worse AI uses what's in it." The caption "Nothing's deleted. It just gets less attention."
  is accurate because the facts stay in the context and are simply used less well.
- **Why (one reason only).** Anthropic Engineering, *Effective context engineering for AI agents* (29 Sep 2025): LLMs
  have an "attention budget", and "As its context length increases, a model's ability to capture these pairwise
  relationships gets stretched thin." The voice says "its attention is spread thinner and thinner". The blush highlight
  (labelled "AI's attention") moves off the budget note and onto every page. This is an illustration, not a
  measurement.
- **Warning signs (s04).** Claude Code best practices: "When the context window is getting full, Claude may start
  'forgetting' earlier instructions or making more mistakes." The three signs are forgetting a stated fact, repeating a
  mistake that was already corrected, and using an outdated detail. The third one is backed by Chroma, "Context Rot"
  (14 Jul 2025): similar distractors in context lower accuracy. The examples are illustrative and start with "e.g.".
- **Fix (s05).** Summarize, then start a new chat with the summary. Claude Code best practices: "/compact
  <instructions>" (summarizes the conversation so far) and "/clear frequently between tasks to reset the context window
  entirely". Hotel prices are illustrative.
- **Habits (s06).** New topic, new chat (`/clear`). Key facts up front: CLAUDE.md is "a special file that Claude reads
  at the start of every conversation", and saved instructions do the same in the Claude app. Share only what it needs:
  Effective context engineering recommends "the smallest set of high-signal tokens".

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.0 | Hook | "What is context rot?" · What it is, how to spot it, how to fix it. |
| s02 | 3.0–14.4 | Example | A chat: "Lisbon trip. My budget is $500." ($500 highlighted) → food, weather, packing, day trips scroll it off the top → "A long chat later" → "This $900 hotel is perfect!" → ✕ You said $500 |
| s03 | 14.4–24.4 | What it is + why | "Context rot: the longer the chat, the worse AI uses what's in it." The desk holds the budget note, highlighted as AI's attention. Topic pages pile on, the highlight spreads to every page and fades on the note. "Nothing's deleted. It just gets less attention." |
| s04 | 24.4–34.0 | How to spot it | 3 warning signs: Forgets what you told it (e.g. Said $500 → picks $900) · Repeats a mistake you fixed · Uses details you changed |
| s05 | 34.0–44.6 | What to do | Weak: same long chat, "No! I said $500." → $650 → Still wrong. ↓ Summarize → new chat. Better: new chat starting with the summary (Budget: $500 total highlighted) → $70 a night → On budget. Footnote: /compact |
| s06 | 44.6–53.0 | How to avoid it | Isometric steps: New topic? New chat. (/clear) · Key facts up front (or saved instructions) · Share only what it needs |
| s07 | 53.0–60.0 | End card | Long chats bury details · Watch for forgotten facts · Summarize, then start fresh · In Claude Code: /compact and /clear · Follow pill |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | Why does AI forget what you told it? |
| s02 | 0.3 | You tell AI your trip budget: five hundred dollars. |
| s02 | 3.8 | Then you keep chatting. Food, weather, what to pack. |
| s02 | 7.4 | A long chat later, it suggests a nine hundred dollar hotel. |
| s03 | 0.3 | That's context rot. |
| s03 | 1.9 | Every message adds another page to its desk. |
| s03 | 4.8 | Your budget's still there, but its attention is spread thinner and thinner. |
| s04 | 0.3 | How do you spot it? |
| s04 | 1.5 | It forgets something you told it. |
| s04 | 3.5 | It repeats a mistake you already fixed. |
| s04 | 6.1 | Or it uses details you changed. |
| s05 | 0.3 | When you see it, don't just keep correcting it. |
| s05 | 3.0 | Ask for a summary of the key facts, then start a new chat with it. |
| s05 | 7.6 | Clean desk. Now it sticks to your budget. |
| s06 | 0.3 | To avoid it in the first place: |
| s06 | 1.9 | New topic? New chat. |
| s06 | 3.7 | Keep key facts up front. |
| s06 | 5.4 | And only share what it needs. |
| s07 | 0.3 | Long chats bury details. When you spot it, start fresh. |
| s07 | 4.5 | Follow for more AI basics. |

## Avatar

title peek (s01) → bottom right (s02; the chat stays in y 330–1030) → corner (s03, s04) → out (s05 cards, s06 isometric
steps) → end (s07). He looks doubtful on the hook, on "nine hundred dollar hotel" and on the first warning sign, and
smiles on the end card. Every stop was checked with snapshots.
