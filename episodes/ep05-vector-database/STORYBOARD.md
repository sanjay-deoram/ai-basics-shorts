# Episode 05 · What is a vector database? (59.8 s, avatar narrator)

For new developers: what a vector database is, how semantic search works, and how "chat with your PDF" gets a PDF into
one. One running example carries the whole lesson: a lease PDF and the question "Can I have a dog?". The problem comes
first (Ctrl+F finds 0 results for "dog", yet "Pets are not allowed." is on the page), then embeddings (whiteboard), then
the three steps of a PDF chat app, each named in the eyebrow: upload (chunk → vector → row), ask (the pgvector query
sorts the rows by distance), answer (the top row + the question go to Claude = RAG). Builds on ep02 (embeddings), but
stands alone. The narration uses everyday developer words: table, rows, query, SQL, Postgres.

## Facts used (checked 2026-10-09)

- **pgvector** (github.com/pgvector/pgvector README): `CREATE EXTENSION vector;` and a `vector(n)` column type
  (`embedding vector(3)` in its example); distance operators `<->` L2, `<#>` negative inner product, **`<=>` cosine
  distance**, `<+>` L1; nearest-neighbour query `SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;`. Exact
  search by default; HNSW / IVFFlat indexes give approximate search, trading some recall for speed (not shown).
- Cosine distance = 1 − cosine similarity, so the lowest distance is the closest meaning (s05 footnote: "lower = closer").
- **RAG flow** (Claude Academy, *Building with the Claude API* → "The full RAG flow", see ep02's STORYBOARD.md): split
  documents into chunks, embed each chunk, store the vectors, embed the question with the same model, find the most
  similar chunks, put them in the prompt with the question. RAG = retrieval-augmented generation.
- Real chunks are usually larger than one sentence (Claude Academy → "Text chunking strategies"); the footnote in s04
  says so, and the one-sentence chunks here are for legibility.
- Pinecone, Chroma and Qdrant are other vector databases (end-card footnote).
- **Every number on screen is real**, from the open model **all-MiniLM-L6-v2** (384 numbers, normalized), run locally
  with `@huggingface/transformers` 3.8.1 (`Xenova/all-MiniLM-L6-v2`, fp32, mean pooling), the same setup as ep02:
  - "dog" starts −0.053, 0.014, 0.007, 0.069 (s03). "Can I have a dog?" starts −0.050, −0.002, 0.033 (s05).
  - Map (s03): PCA of the six words' vectors (one scale on both axes): dog (−0.465, 0.138), cat (−0.448, 0.045), pets
    (−0.501, −0.069), rent (0.362, −0.667), deposit (0.521, 0.324), payment (0.531, 0.230). Cosine similarity
    dog↔pets 0.704, dog↔cat 0.661, dog↔rent 0.261.
  - Lease chunks (s04/s05): first two numbers, and cosine distance to "Can I have a dog?":
    Rent is due on the 1st. (0.001, −0.037) 0.913 · Pets are not allowed. (0.073, 0.057) **0.502** ·
    No smoking indoors. (0.135, 0.068) 0.857 · Deposit returned in 30 days. (0.038, 0.026) 0.942 ·
    Quiet hours: 10 pm to 8 am. (−0.021, −0.019) 0.928. Sorted: pets, smoking, rent, quiet hours, deposit.
  - Ctrl+F: none of the five lines contains "dog", so a keyword search finds 0 results.
- Lease.pdf and Claude's answer are an illustrative example, labelled "Example" / "Example answer" on screen.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.0 | Hook | "What is a vector database?" · The trick behind "chat with your PDF." |
| s02 | 3.0–10.3 | The problem | Lease.pdf in a viewer; Ctrl+F "dog" → ✕ 0 results; the page dims, "Pets are not allowed." is highlighted · "Same meaning. Different words." |
| s03 | 10.3–20.7 | Embeddings (whiteboard) | An embedding model is drawn; "dog" drops in, its vector prints out, brace "384 numbers", "= a vector". The vector shrinks into a dot on a map; cat, pets, rent, deposit, payment pop in at their real spots; dog + pets pulse, the animals are lassoed · "Similar meaning → close vectors." |
| s04 | 20.7–34.5 | Step 1 · Upload | Lease.pdf drops in; its lines peel off into 5 chunk cards; each drops through the embedding model into a row of `lease_chunks` (id, content, embedding vector(384)) with its real vector · "Your vector database." · Postgres + pgvector. The table stays on screen. |
| s05 | 34.5–45.0 | Step 2 · Ask | Same table. "Can I have a dog?" → its vector → SQL `SELECT content FROM lease_chunks ORDER BY embedding <=> $1 LIMIT 1;`. The embedding column turns into each row's distance (counts up), the rows re-sort closest first, "Pets are not allowed." (0.502) on top · "Closest row = best match." |
| s06 | 45.0–53.5 | Step 3 · Answer | Prompt the app sends (From the PDF: Pets are not allowed. / Question: Can I have a dog?) → the Claude logo → "No. Your lease says pets aren't allowed." (Source: Lease.pdf · row 2) · "That's RAG." Retrieval-Augmented Generation. |
| s07 | 53.5–59.8 | End card | Embeddings: text → vectors · Similar meaning sits close · Vector DB: nearest rows win · Try it: pgvector · Pinecone · Chroma · Qdrant · Follow pill |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | How does chat with your PDF actually work? |
| s02 | 0.3 | Say you search your lease for dog. |
| s02 | 2.8 | Zero results. |
| s02 | 4.0 | But it's right there: pets are not allowed. |
| s03 | 0.3 | The fix is an embedding model. |
| s03 | 2.2 | It turns text into a list of numbers, called a vector. |
| s03 | 5.6 | Similar meanings get similar numbers, so dog and pets land close together. |
| s04 | 0.3 | When you upload a PDF, the app splits it into chunks, |
| s04 | 4.1 | turns each chunk into a vector, |
| s04 | 6.2 | and saves them as rows in a table. |
| s04 | 8.35 | That's your vector database. Here, it's just Postgres with P G vector. |
| s05 | 0.3 | Now you ask: can I have a dog? |
| s05 | 2.4 | Your question becomes a vector too. |
| s05 | 4.4 | The query sorts the rows by distance, closest first. |
| s05 | 7.75 | Top result: pets are not allowed. |
| s06 | 0.3 | Then the app sends that row and your question to Claude. |
| s06 | 3.4 | So it answers from your PDF, not from memory. |
| s06 | 6.4 | That pattern is called RAG. |
| s07 | 0.3 | Vector databases search by meaning, not by matching words. |
| s07 | 4.3 | Follow for more AI basics. |

"pgvector" is written "P G vector" in the voice text so the voice says it the way developers do.

## Avatar

title peek (s01) → bottom right (s02; the viewer stays in y 300–925, the label at y 962) → corner (s03–s06; content
above y 485 stays left of x 830) → end (s07). Doubt on the hook and on "Zero results"; smiles on "dog and pets land
close together", on "Top result" and on the end card. Every stop was checked with snapshots.
