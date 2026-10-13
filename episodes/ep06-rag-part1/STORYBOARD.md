# Episode 06 · Part 1 of 2 · What is RAG? (42.3 s, avatar narrator)

For people who have never heard the term. Part 1 says what RAG is and why it exists; Part 2
(`../ep06-rag-part2`) shows how the lookup works, step by step. Each part stands on its own: neither assumes the
viewer saw the other or any earlier episode.

One specific example carries the whole part: a question only someone inside the company could answer, **"Can I
expense a home office chair?"**. On its own, the AI can't know (it says it doesn't have the expense policy and to ask
HR). Why: it learned from public text, and the company's handbook, policies and wiki are private. With RAG, the app
searches the company's docs (3,000 pages), grabs only the one section that answers it (Handbook §7.3 Home office:
"up to $300 a year for a desk, chair or monitor. Submit receipts within 30 days."), puts it in the prompt with the
question, and Claude answers: "Yes. You can expense up to $300 a year for it. Submit the receipt within 30 days." The
same AI gives both answers, so the only thing that changes is the lookup.

Hook (first 5 s): "AI knows the internet, but not your company." over "What is RAG? · How AI answers questions about your
company", then the employee's question types on (by 4.4 s) and Claude can't answer (by 8 s).

## Facts used (checked 2026-10-12)

- **RAG, in OpenAI's words** (s04 quote, verbatim): "RAG is the process of Retrieving content to Augment your LLM's
  prompt before Generating an answer." It is used "to give the model access to domain-specific context". The same
  guide compares in-context memory to an exam where "You have the textbook with you, and can look up the right
  information" (s04 label "An open-book exam for AI."), and uses RAG when the knowledge "wasn't in its training set"
  or is "proprietary information" (s02–s03: a company's private docs). OpenAI, *Optimizing LLM Accuracy*,
  developers.openai.com/api/docs/guides/optimizing-llm-accuracy.
- **RAG, in Anthropic's words**: "RAG is a method that retrieves relevant information from a knowledge base and
  appends it to the user's prompt"; models need "background knowledge … about the specific business they're being
  used for", and at runtime "the most relevant chunks are added to the prompt" (s05: only the relevant section goes
  in). Anthropic, *Introducing Contextual Retrieval*, 2024-09-19, anthropic.com/news/contextual-retrieval.
- **The term**: Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, NeurIPS 2020,
  arXiv:2005.11401 (end-card source).
- s03 says the AI learned from public text (websites, books, articles, code) and private company docs were never in
  its training: true of a company's internal handbook, policies and wiki, which aren't published.
- **Illustrative, labelled on screen**: the company, its 3,000 pages of docs, Handbook §7.3 and its $300 / 30-day
  policy, and both Claude answers ("Example · at your company", "Example answer"). The grid in s05 stands for the
  docs' sections; it isn't drawn to a count.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.2 | Hook | "What is RAG?" (RAG highlighted) · How AI answers questions about your company. |
| s02 | 3.2–10.0 | Can't know | "Can I expense a home office chair?" types on; Claude logo "without your company's docs"; taupe example answer "I don't have your company's expense policy. Check your handbook or ask HR." · ink stamp "✕ Can't know" · "It can't answer." |
| s03 | 10.0–17.8 | Why (whiteboard) | A circle "What it learned · from public text" (websites, books, articles, code); a stack of "Your company's docs" (handbook · policies · wiki) drawn outside it with a padlock; an ✕ between · "Private docs were never in its training." |
| s04 | 17.8–25.6 | The fix: RAG | OpenAI's definition; Retrieving / Augment / Generating light up as the voice says them; R Retrieve · A Augment · G Generate in plain words · "An open-book exam for AI." |
| s05 | 25.6–36.3 | With RAG | Same question; "Your company's docs · 3,000 pages" as a grid of sections; a scan line sweeps across, one section lights up (blush) and grows into "Only this part · Handbook §7.3: Home office: up to $300 a year for a desk, chair or monitor. Submit receipts within 30 days."; the rest fades, it slides under the question, a frame draws round both "= the prompt" → Claude logo → "Yes. You can expense up to $300 a year for it. Submit the receipt within 30 days." (source pill) · "✓ From your docs" · "Same AI. Now it knows your rules." |
| s06 | 36.3–42.3 | End card | AI never saw your docs · RAG finds the right part · Claude answers from it · sources · "Follow for Part 2: how it works" |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | AI knows the internet, but not your company. |
| s02 | 0.3 | Ask an AI about your company: can I expense a home office chair? |
| s02 | 4.6 | It can't answer. |
| s03 | 0.3 | AI learned from public text, like websites and books. |
| s03 | 3.95 | Your company's docs are private, so it never saw them. |
| s04 | 0.3 | The fix is RAG: retrieval-augmented generation. |
| s04 | 3.9 | Look up the right part of the docs first, then answer. |
| s05 | 0.3 | With RAG, the app searches your company's docs and grabs only the part it needs. |
| s05 | 4.95 | Then Claude answers from it: yes, up to 300 dollars a year. |
| s06 | 0.3 | That's RAG: look it up, then answer. |
| s06 | 2.85 | Follow for part two: how the lookup works. |

"RAG" is written "rag" in the voice text so the voice says it as a word, the way people do, and "$300" as "300
dollars" (both checked with a Whisper transcript of every take). Visual beats are timed to the words of each take
(Whisper word timings).

## Avatar

title peek (s01) → bottom right (s02; the chat stays above y 960) → corner (s03–s05; content above y 485 stays left
of x 830) → end (s06). Doubt on the hook and on "It can't answer."; smiles on "An open-book exam for AI.", on
"✓ From your docs" and on the end card. Every stop and both glides checked with snapshots.

## History

- 2026-10-12, first cut: a shoe store's help docs ("Can I return my shoes after 40 days?"). Replaced the same day at
  the user's request with an internal company question, so the example is specific and shows RAG grabbing only the
  part it needs from a large set of private docs.
