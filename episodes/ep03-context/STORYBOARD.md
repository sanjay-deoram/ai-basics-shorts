# Episode 03 · What is context? (81.5 s, avatar narrator)

v2 (2026-10-09). It answers the two questions straight away, what context is and why AI needs it, then covers how it's
used and what "1M context" means. It ends with too little, too much, and many topics in one chat (context rot). The
desk image runs through the whole video: context is what's on Claude's desk right now. v1 (library → desk, three desks;
71.8 s) is kept as `renders/ep03-context-v1.mp4`.

The script was reviewed twice by a separate Opus agent for natural speech, accuracy and pacing.

## Facts used (checked 2026-10-09)

- **What context is.** "The 'context window' refers to all the text a language model can reference when generating a
  response, including the response itself. This is different from the large corpus of data the language model was
  trained on, and instead represents a 'working memory' for the model." Claude docs, *Context windows*
  (platform.claude.com/docs/en/build-with-claude/context-windows). → s02 desk, s03 training vs. you.
- **What goes in it.** "Everything in the request counts toward the context window: the system prompt, every message
  in `messages` (including tool results, images, and documents), and your tool definitions." Same page. → s02 sheets.
- **How it's used.** Each turn's input "contains all previous conversation history plus the current user message";
  each reply "becomes part of the input for the next turn"; "previous turns are preserved completely." Same page. → s04
  ("Claude gets the whole chat again, not just your new message").
- **1M.** Claude Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5, among others, have a 1M-token context window (Claude
  docs, *Context windows*). 200K tokens is "about 500 pages of text" (support.claude.com, *How large is the context
  window on paid Claude plans?*), so 1M ≈ 2,500 pages on that count. The 1M models use a newer tokenizer that produces
  "approximately 30 percent more tokens for the same text" (Claude docs, *Glossary*, Tokens), so ≈ 1,900. The voice and
  the screen say "about 2,000 pages", with a footnote. The token split in s05 is illustrative and labelled "Example split".
- **Too little.** "On average, I see more people giving too little context to LLMs than too much." Andrew Ng, *The
  Batch*, issue 295, 2 Apr 2025 (deeplearning.ai/the-batch/issue-295). On screen with [AI] for "LLMs". The voice says
  "AI expert Andrew Ng" and spells it "Ing" in voiceover.json so the TTS says it right.
  Anthropic agrees: "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."
  (Claude docs, *Prompting best practices*).
- **Too much / context rot.** "More context isn't automatically better. As token count grows, accuracy and recall
  degrade, a phenomenon known as context rot." Claude docs, *Context windows*. Anthropic Engineering, *Effective
  context engineering for AI agents* (29 Sep 2025): find "the smallest possible set of high-signal tokens".
- **Many topics in one chat.** Claude Code best practices: "/clear: reset context between unrelated tasks. Long
  sessions with irrelevant context can reduce performance"; "the kitchen sink session"; "When the context window is
  getting full, Claude may start 'forgetting' earlier instructions or making more mistakes." s08 shows a long chat
  ("200 messages later"), so the slip is plausible; the risotto reply is labelled "Example".
- **Dinner example** (s06, s07, s08): illustrative, labelled "example". The curry was checked by hand: vegan
  (chickpeas, spinach, coconut milk, onion, garlic, curry paste), one pan, about 25 min. Parmesan isn't vegan.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.3 | Hook | "What is context?" · And why does AI need it? Avatar peeks under the title |
| s02 | 3.3–12.9 | What it is | The desk from above, "Everything Claude can see right now"; four sheets drop as they're named: Your message · The chat so far · Files & photos · Instructions (system prompt, CLAUDE.md) |
| s03 | 12.9–20.9 | Why it needs it | Bookshelf: what it learned (tons of general knowledge). Desk: what it knows about you (nothing). "You & your task" flies onto the desk: "Only what you tell it" |
| s04 | 20.9–29.5 | How it's used | A chat grows; each send, a band sweeps the whole chat and the counter reads "Claude gets 1 / 3 / 5 messages"; the context rail keeps growing |
| s05 | 29.5–41.1 | What 1M means | One page; "Context is everything" split into tokens; "1M = a million tokens"; pull back to a grid of 2,000 pages, "≈ 2,000 pages", footnote |
| s06 | 41.1–56.1 | Too little | Ng's quote, big, then up top; `Plan a quick dinner.` → Claude has to guess: creamy chicken pasta · VAGUE; with context (4, vegan friend, 30 minutes, one pan, each highlighted as said) → one-pan chickpea curry · CLEAR |
| s07 | 56.1–63.3 | Too much | The note "One friend is vegan." buried under a recipe book, old emails, shopping lists… "+ 300 more pages" |
| s08 | 63.3–73.9 | Many topics → context rot | One chat scrolls: Dinner → Trip → Email → 200 messages later → Back to dinner → "Creamy parmesan risotto!" ✕ Not vegan (example) · Context rot · The more it holds, the more details slip |
| s09 | 73.9–81.5 | End card | Give it what it needs · Skip the rest · New topic? New chat. · In Claude Code: /clear · Follow pill |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | What is context? And why does AI need it? |
| s02 | 0.3 | Context is everything Claude can see while it answers. |
| s02 | 3.6 | Your message. |
| s02 | 4.5 | The chat so far. |
| s02 | 5.9 | Files and photos. |
| s02 | 7.2 | And any instructions you've given it. |
| s03 | 0.3 | Claude learned a lot in training, but nothing about you. |
| s03 | 3.3 | Anything about you or your task has to be in the context. |
| s04 | 0.3 | Each time you hit send, Claude gets the whole chat again, not just your new message. |
| s04 | 5.4 | So the context grows with every message. |
| s05 | 0.3 | But there's a limit, called the context window. It's counted in tokens, little pieces of words. |
| s05 | 5.8 | When you see one M context, that's a million tokens. About two thousand pages. |
| s06 | 0.3 | AI expert Andrew Ng says he sees more people give too little context than too much. |
| s06 | 6.0 | Ask for a quick dinner, and Claude has to guess. |
| s06 | 9.0 | Add the details: one vegan friend, thirty minutes, one pan. |
| s06 | 13.3 | Now it fits. |
| s07 | 0.3 | But more isn't always better. |
| s07 | 2.1 | Dump in everything just in case, and the one detail that matters gets buried. |
| s08 | 0.3 | Same with one long chat that jumps from topic to topic. |
| s08 | 3.5 | Claude can lose track of the vegan friend. |
| s08 | 5.9 | That's context rot. The more it holds, the more details slip. |
| s09 | 0.3 | So give Claude what it needs, and skip the rest. |
| s09 | 3.3 | New topic? New chat. |
| s09 | 5.2 | Follow for more AI basics. |

## Avatar

title peek (s01) → bottom left under the desk (s02) → bottom right (s03, s04) → small top-right corner (s05) → out
(s06, the cards fill the box) → bottom right (s07, s08 until the label) → end (s09). Smile on "everything Claude can
see", "has to be in the context" and the end card; doubt on "nothing about you", "gets buried" and "lose track of the
vegan friend". Every stop checked with snapshots.

Runtime 81.5 s: over the 60 s guideline in DESIGN.md. If it needs to be shorter, the cleanest cut is s05 (the 1M scene,
11.6 s), which could become its own short. Next cleanest: trim the Ng line in s06.
