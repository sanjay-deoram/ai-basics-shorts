# Episode 06 · Part 2 of 2 · How does RAG work? (50.8 s, avatar narrator)

Step by step through basic RAG with the same example as Part 1 (`../ep06-rag-part1`): a question only someone inside
the company could answer, "Can I expense a home office chair?", and the company's internal docs. Stands on its own:
the hook asks how RAG works and promises to follow one question through it, the subtitle spells out the name, and every term is explained in plain words the first time (chunks, an embedding model =
turns text into numbers that capture its meaning, a vector database). The eyebrow names each step: Setup · done once
→ Step 1 · Retrieve → Step 2 · Augment → Step 3 · Generate, so the three letters of the name map onto what you see.
The answer matches Part 1's ($300 a year, receipts within 30 days).

## Facts used (checked 2026-10-12)

- **The steps** (Anthropic, *Introducing Contextual Retrieval*, 2024-09-19, anthropic.com/news/contextual-retrieval):
  preprocessing = "Break down the knowledge base … into smaller chunks of text, usually no more than a few hundred
  tokens; Use an embedding model to convert these chunks into vector embeddings that encode meaning; Store these
  embeddings in a vector database that allows for searching by semantic similarity." At runtime "the vector database
  is used to find the most relevant chunks based on semantic similarity to the query. Then, the most relevant chunks
  are added to the prompt sent to the generative model." (s02 → s03 → s04; s04 footnote.)
- **Same flow at OpenAI**: files added to a vector store are "automatically chunked, embedded, and indexed" (default
  800-token chunks, 400 overlap), searched with a natural-language query, and the results plus the query go to a
  model "to get back a grounded response". OpenAI, *Retrieval* guide, developers.openai.com/api/docs/guides/retrieval.
- **Name**: Retrieving → Augment → Generating, OpenAI, *Optimizing LLM Accuracy* (see Part 1).
- **Build your own** (end card): Anthropic does not make an embedding model; the Claude docs point to Voyage AI
  (platform.claude.com/docs/en/build-with-claude/embeddings). The Claude cookbook's basic RAG = chunk, embed, rank by
  cosine similarity, put the top chunks in a prompt (platform.claude.com/cookbook/capabilities-retrieval-augmented-generation-guide).
  The s04 prompt follows that shape in plain words ("Answer using these docs: … Question: …").
- Real chunks are bigger than one sentence (a few hundred tokens, Anthropic); the s02 footnote says so, and the
  one-sentence chunks are for legibility.
- **Every number on screen is real**, from the open model **all-MiniLM-L6-v2** (384 numbers, normalized), run locally
  with `@huggingface/transformers` 3.8.1 (`Xenova/all-MiniLM-L6-v2`, fp32, mean pooling), the same setup as ep02/ep05:
  - First numbers: New hires get 20 vacation days. (0.019, −0.012, 0.114) · Home office gear: up to $300 a year.
    (−0.032, 0.012, 0.053) · Flights over $500 need approval. (0.107, −0.007, 0.030) · Submit expense receipts in 30
    days. (0.014, 0.058, 0.014) · Laptops are replaced every 3 years. (−0.036, −0.020, 0.071) · the question "Can I
    expense a home office chair?" (0.033, 0.075, −0.008).
  - Cosine similarity to the question (s03 "Match"): home office gear **0.403**, expense receipts **0.365**, flights
    0.163, vacation days 0.149, laptops 0.119. Top 2 = the two about expenses (a clear gap to 0.163). Normalized
    vectors, so cosine similarity = dot product.
- The company, its docs and Claude's answer are illustrative, labelled "Example" / "Example answer" on screen.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.6 | Hook | "How does RAG work?" (RAG highlighted) · Retrieval-augmented generation, step by step. |
| s02 | 3.6–17.4 | Setup · done once | A page of the company's docs with its real words ("Example · Employee handbook · §7": the five sentences); dashed cut lines sweep across between the sentences one by one, the page dissolves and the pieces spread apart into outlined chunk cards; each drops through the embedding model into a row of the vector database with its real numbers · "Your docs, saved by meaning." The table stays on screen. |
| s03 | 17.4–30.3 | Step 1 · Retrieve | Same table. "Can I expense a home office chair?" types on as the voice asks it; the eyebrow appears on "step one" → "As numbers [0.033, 0.075, -0.008, …]" → "↓ Compare with every chunk"; a Match column counts up the real similarities, the rows re-sort, the top 2 (both about expenses) light up · "The 2 closest chunks win." |
| s04 | 30.3–44.5 | Step 2 · Augment → Step 3 · Generate | The prompt builds: "Answer using these docs:" + the 2 chunks (fly up from the table) + the question; the eyebrow turns to step 3; Claude logo on "Claude"; "Yes. You can expense up to $300 a year for it. Submit the receipt within 30 days." (source pill) · "Answered from your docs." |
| s05 | 44.5–50.8 | End card | Retrieve the right chunks · Add them to the prompt · Answer from your docs · Build one: embedding model + vector DB + Claude · sources · follow pill |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | How does RAG work? Let's follow one question. |
| s02 | 0.3 | But before anyone asks, the app splits your company's docs into small chunks. |
| s02 | 5.1 | An embedding model turns each chunk into numbers that capture its meaning. |
| s02 | 9.9 | The app saves them in a vector database, ready for questions. |
| s03 | 0.3 | Now you ask: can I expense a home office chair? |
| s03 | 3.6 | Step one, retrieve. Your question becomes numbers too, |
| s03 | 7.5 | and the database finds the chunks closest in meaning: |
| s03 | 10.45 | the two about expenses. |
| s04 | 0.3 | Step two, augment. Those two chunks go into the prompt, along with your question. |
| s04 | 5.9 | Step three, generate. Claude reads the prompt and answers from your docs. |
| s04 | 10.85 | Yes, you can: up to 300 dollars a year. |
| s05 | 0.3 | Retrieve, augment, generate. That's RAG. |
| s05 | 3.85 | Follow for more AI basics. |

"RAG" is written "rag" in the voice text so the voice says it as a word; "$300" as "300 dollars".

The script is one walk-through: the hook promises to follow one question; "before anyone asks" sets up the docs (so
"Setup" never competes with "Step one"); "now you ask" says the question out loud before the steps use it; each step
hands to the next ("your question becomes numbers too", "those two chunks", "Claude reads the prompt"); and "Yes, you
can" answers the question as it was asked.

## Avatar

title peek (s01) → corner (s02–s04; content above y 485 stays left of x 830) → end (s05). Doubt on "How does RAG
work?"; smiles on "the two about expenses", on "Yes, you can: up to 300 dollars a year" and on the end card. Every stop checked with snapshots.

## History

- 2026-10-12, first cut: a shoe store's help docs ("Can I return my shoes after 40 days?"). Switched the same day to
  Part 1's internal company question, so both parts share one specific example.
- 2026-10-12, voiceover rewritten to flow as one walk-through (it felt jumpy: "how is it used?" was never answered,
  "First" then "Step one" sounded like two first steps, "your question" came before any question was asked, and
  "Yes, up to 300 dollars" had no lead-in). Scenes retimed to the new lines; 42.5 s → 50.8 s.
