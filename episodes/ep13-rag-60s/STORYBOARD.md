# Episode 13 · How RAG works in 60 seconds (49.6 s, avatar narrator)

A new format: no title card, no setup, no "follow for more" outro. The first word is already the explainer, and the
video ends on the payoff. The pacing follows a reference short that did well (~515k views, 58 s): one idea every 4–6 s,
continuous narration, a cut on every pause. Only the pacing and the order of ideas come from it. Our words, our
Eggshell animation and the Sanjay avatar stay as they are (studio/DESIGN.md).

Covers the same ground as ep05 (vector database) and ep06 (RAG parts 1–2), in one pass, but every scene is new: no
visuals are reused from those episodes (user request, 2026-11-10).

## Reference beats (pacing source; internal only)

| Time | Beat in the reference |
|---|---|
| 0–3 | "Let's learn about RAG and how it works in 60 seconds" |
| 3–11 | Acronym: retrieval-augmented generation; "let's break each part down by how it works" |
| 11–17 | You have a question (the query) about a collection of documents |
| 17–27 | The documents live in a vector database: the raw text plus its embeddings (numbers) |
| 27–33 | The database returns the documents most similar to the query |
| 33–43 | Those documents go to an LLM together with the query |
| 43–51 | The LLM now has context plus the original question |
| 51–58 | It answers in context, with fewer chances of hallucinating. Hard stop. |

## Voiceover (Sanjay, one take at speed 1.0; ~150 words, same as the reference)

"Here's how RAG works, in sixty seconds. RAG stands for retrieval-augmented generation. Let's take it one word at a
time, by watching it work. Say you have a question. That's your query. And the answer is buried somewhere in a pile
of documents. In a RAG system, those documents live in a vector database. It keeps the raw text of each one, plus its
embedding: a list of numbers that captures what it means. That's retrieval: the database hands back the documents
closest in meaning to your query. Next, those documents go to a large language model, like Claude, together with your
question. That's the augmented part: the model now has the context it needs, and the question it has to answer. And
that's generation: it writes a reply grounded in your documents, so it's far less likely to make things up."

What changed from the reference, and why:
- "Let's learn about RAG…" became "Here's how RAG works": it starts on the topic, not on us.
- The reference promises to break down each word but never comes back to them. We name retrieval, augmented and
  generation at the moment each one happens, so the promise pays off.
- "Think of GPT-4 and ChatGPT" became "like Claude" (house rule: show Claude, with the Claude logo).
- "Has fewer chances of hallucination" became "far less likely to make things up": plainer wording, same claim.
  It's "less likely", not "never".

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–9.5 | Cold open + acronym | "How RAG works" (RAG highlighted), "In 60 seconds" chip. R · A · G drop in a column and each grows into its word as it's said; on "one word at a time" the words dim and an ink line marks R. Avatar: large peek, bottom right. |
| s02 | 9.5–15.5 | The query | "Your query" card types "Can I expense a home office chair?" (highlighted on "query"); six documents drop into a loose pile under it · "The answer is in there somewhere." Avatar: corner. |
| s03 | 15.5–25.3 | Vector database (whiteboard) | A database drum draws itself; six mini documents drop in through its lid · "Vector database". A record slides out: Raw text "Home office gear: up to $300 a year." + Embedding chips -0.032 · 0.012 · 0.053 · … 384 numbers, two records peeking behind · "Its meaning, as numbers." Avatar: corner. |
| s04 | 25.3–30.6 | R · Retrieval | Meaning map (illustration): five documents as dots; the query lands as the living dot; a search ring finds the two nearest, leaders draw to them, the rest dim; they come back out as cards ("Handed back · the 2 closest"). Dot distances follow the real similarity order. Avatar: out. |
| s05 | 30.6–49.6 | A · Augmented → G · Generation | The two cards rise into a "Prompt · sent to the model" card; Claude logo on "like Claude"; the question drops in. "Context" and "Question" label the parts as they're named. Generation: the prompt pulses toward Claude, the logo turns, the example answer types with "From 2 of your documents" · "Grounded in your docs." · "Far less likely to make things up, not never." Hard stop, last frame holds ~1.7 s. Avatar: corner. |

## Voiceover as placed (Sanjay, speed 1.0; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.15 | Here's how rag works, in sixty seconds. |
| s01 | 2.95 | Rag stands for retrieval-augmented generation. |
| s01 | 6.7 | Let's take it one word at a time, by watching it work. |
| s02 | 0.2 | Say you have a question. That's your query. |
| s02 | 2.65 | And the answer is buried somewhere in a pile of documents. |
| s03 | 0.2 | In a rag system, those documents live in a vector database. |
| s03 | 3.8 | It keeps the raw text of each one, plus its embedding: a list of numbers that captures what it means. |
| s04 | 0.2 | That's retrieval: the database hands back the documents closest in meaning to your query. |
| s05 | 0.2 | Next, those documents go to a large language model, like Claude, together with your question. |
| s05 | 5.75 | That's the augmented part: the model now has the context it needs, and the question it has to answer. |
| s05 | 11.35 | And that's generation: it writes a reply grounded in your documents, so it's far less likely to make things up. |

"RAG" is written "rag" in the voice text so it's said as a word.

## Facts used (internal only; check before the voice is recorded)

- RAG = retrieval-augmented generation (Lewis et al., 2020).
- A vector database stores each chunk's embedding and usually the raw text (or a reference to it) beside it;
  retrieval returns the nearest neighbours of the query's embedding. (In practice documents are split into chunks
  first; left out for the 60 s cut.)
- Grounding answers in retrieved text reduces hallucination but doesn't remove it.
- The expense-policy example ($300 a year) is example data, the same company example as ep06.
- Embedding numbers (s03) and the similarity order (s04) are real, from all-MiniLM-L6-v2 as measured for ep06
  (STORYBOARD there): home office gear 0.403, expense receipts 0.365, flights 0.163, vacation days 0.149, laptops 0.119;
  first numbers of "Home office gear: up to $300 a year." = -0.032, 0.012, 0.053. The 2-D map is an illustration.
