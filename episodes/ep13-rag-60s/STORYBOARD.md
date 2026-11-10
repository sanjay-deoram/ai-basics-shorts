# Episode 13 · How RAG works in 60 seconds (target ~55 s, avatar narrator)

A new format: no title card, no setup, no "follow for more" outro. The first word is already the explainer, and the
video ends on the payoff. The pacing follows a reference short that did well (~515k views, 58 s): one idea every 4–6 s,
continuous narration, a cut on every pause. Only the pacing and the order of ideas come from it. Our words, our
Eggshell animation and the Sanjay avatar stay as they are (studio/DESIGN.md).

Covers the same ground as ep05 (vector database) and ep06 (RAG parts 1–2), in one pass.

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

## Scenes (draft; timings to be set from the recorded take)

| Slot | ~Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3 | Cold open | No title card. "RAG" slams in big; "in 60 s" ticks in beside it. Avatar: peeks in. |
| s02 | 3–10 | The acronym | R · A · G open into Retrieval · Augmented · Generation, then fade back to three small letters held in the top corner (a progress tracker that lights up later). |
| s03 | 10–16 | The query | A question card types: "Can I expense a home-office chair?" (ep06's example), labelled "query". A messy pile of document cards sits beside it. |
| s04 | 16–26 | Vector database | The pile flies into a database drum. Each card splits into two: raw text, and a row of numbers (the embedding). |
| s05 | 26–32 | Retrieval | The query turns into numbers and drops among the dots; the 2–3 closest light up and come back out. "R" lights in the tracker. |
| s06 | 32–42 | Augmented | The chosen documents and the query card stack together and slide into the Claude logo. "A" lights. |
| s07 | 42–55 | Generation | An answer card writes out, citing the policy doc ("Yes, up to $300 a year"). A small "less made up" tick. "G" lights. Hard cut to black, no outro. |

## Facts used (internal only; check before the voice is recorded)

- RAG = retrieval-augmented generation (Lewis et al., 2020).
- A vector database stores each chunk's embedding and usually the raw text (or a reference to it) beside it;
  retrieval returns the nearest neighbours of the query's embedding. (In practice documents are split into chunks
  first; left out for the 60 s cut.)
- Grounding answers in retrieved text reduces hallucination but doesn't remove it.
- The expense-policy example ($300 a year) is example data, reused from ep06.
