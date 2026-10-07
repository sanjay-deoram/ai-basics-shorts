# Episode 02 · What is an embedding? (152.6 s, narrator)

Same format as `episodes/ep01-tokens-narrator`: the ep01 title and end card, one narrating Spark
(`compositions/narrator.html`) that lip-syncs to the voiceover, and new middle scenes. This episode runs past the
60 s guide in DESIGN.md on purpose: the user asked for slower pointing and a fuller explanation of the model, what
the numbers mean, how accurate they are, and how a database stores and searches them (2026-10-07).

Facts used (checked 2026-10-07):
- An embedding is "a numerical representation of the meaning contained in some text": an embedding model turns
  text into a long list of numbers, each a score for some quality of the text; the qualities are learned in
  training and aren't directly readable by people. (Claude Academy, *Building with the Claude API* → "Text
  embeddings".)
- Similar embeddings are found with cosine similarity, "the cosine of the angle between two vectors": near 1 = very
  similar, 0 = unrelated (perpendicular), −1 = opposite. (Claude Academy → "The full RAG flow".) Voyage AI embeddings
  are normalized, so cosine similarity equals the dot product and ranks the same as distance (Claude's embeddings docs).
- RAG flow: split documents into chunks, embed each chunk, store the vectors in a vector database ("a specialized
  database optimized for storing, comparing, and searching through long lists of numbers"), embed the question with
  the same model, find the most similar chunks, put them in the prompt with the question for Claude.
  (Claude Academy → "The full RAG flow" and "Text chunking strategies".)
- Anthropic doesn't make its own embedding model; Claude's docs point to Voyage AI, whose current models
  (voyage-4, voyage-4-large, voyage-4-lite) return 1,024 numbers by default.
  (platform.claude.com/docs/en/build-with-claude/embeddings.)
- Postgres stores embeddings with the pgvector extension (a `vector(n)` column); shown as an example in s10.
- all-MiniLM-L6-v2 was fine-tuned on over 1 billion sentence pairs (its Hugging Face model card): "1B+ sentence
  pairs" in s03.
- Every number on screen is real, from the open model **all-MiniLM-L6-v2** (384 numbers, normalized), run locally
  with `@huggingface/transformers` 3.8.1 (`Xenova/all-MiniLM-L6-v2`, fp32, mean pooling):
  - "puppy" starts −0.080, 0.035, 0.000, 0.031, −0.086, −0.020, … and ends 0.098 (all 384 in
    `assets/fingerprints.js`, with dog and pizza; values lie between −0.15 and 0.2).
  - Word similarity: dog↔puppy 0.80, dog↔pizza 0.35, puppy↔pizza 0.33.
  - s09 angles: the angle between two embeddings is arccos(cosine similarity): dog↔puppy arccos(0.80401) = 36.49°,
    dog↔pizza arccos(0.35298) = 69.33°. Each pair is drawn flat at its true angle.
  - Map (s07/s08): the 384 numbers of 8 words squashed to 2 with PCA (x flipped so animals sit left):
    dog (−0.381, 0.331), puppy (−0.452, 0.352), cat (−0.407, −0.289), kitten (−0.498, −0.327),
    pizza (0.320, −0.141), burger (0.441, 0.208), taco (0.456, −0.417), fries (0.522, 0.283).
  - s06 strips: all 384 numbers of puppy, dog and pizza, each lined up in puppy's order (sorted by puppy's values)
    so they can be compared by eye; a dotted copy of puppy's curve sits on the dog and pizza strips.
  - Search (s09): "My bike tire went flat" → "How to fix a punctured wheel" 0.44, "Choosing a bike helmet" 0.08,
    "Our store opening hours" 0.03. Keyword search picks the helmet page (the only shared word is "bike").
  - Handbook (s10–s12), 8 chunks, scored against "How many vacation days do I get?" (first two numbers):
    Staff get 15 vacation days a year. 0.71 (−0.002, 0.028) · Sick days need a note after 3 days. 0.42 ·
    Expense claims are due in 30 days. 0.33 (−0.057, 0.050) · Lunch is free on Fridays. 0.26 (−0.010, 0.047) ·
    The office is closed on public holidays. 0.23 · Laptops are replaced every 3 years. 0.21 ·
    The Wi-Fi password is on the fridge. 0.07 · Parking passes are at the front desk. −0.01. Question 0.049, 0.011.
  - s11 dot positions: PCA of the 8 chunks, question projected: vacation (−0.346, 0.140), expenses (−0.299, 0.313),
    Wi-Fi (0.483, −0.675), holidays (−0.070, 0.269), parking (0.678, 0.485), laptops (0.246, −0.046),
    sick days (−0.323, −0.224), lunch (−0.368, −0.263), question (−0.306, 0.025). Nearest on the map is vacation,
    matching the top score.
  - The handbook and Claude's answer are an illustrative example, labelled as such on screen.

| Slot | Time | Scene | Beat |
|---|---|---|---|
| s01 | 0–3.5 | Title | "What is an embedding?" Spark presents |
| s02 | 3.5–13.5 | The problem | "dog" / "puppy" letter tiles; a scanner checks each letter, 0 in common; ≠ drawn, zoom in, the slash wipes off: same meaning |
| s03 | 13.5–24.5 | The embedding model | A drawn model; a pile of text pages flies in (1B+ sentence pairs); fill-in-the-blank: dog ✓ puppy ✓ pizza ✕ in "I walked my ___ to the park." |
| s04 | 24.5–32.5 | Word → numbers | Same model; "puppy" drops in, a tape prints its real numbers, zoom in, a brace counts 384 |
| s05 | 32.5–49 | What the numbers mean | Puppy's numbers; Spark: 1 number = 1 score; imagined names (Is it an animal? 0.9, Is it food? 0.1); names turn to ???: learned, not labelled; all 384 drawn as a fingerprint strip |
| s06 | 49–57.6 | Is it exact? | "A best guess, learned from text"; puppy, dog and pizza strips in puppy's order: dog follows puppy's curve, pizza doesn't |
| s07 | 57.6–69.4 | A map of meaning | Zoomed ×2 on puppy's spot (−0.45, 0.35), pull back; 7 words pop in; animals and food lassoed; Spark points: dog + puppy neighbours (zoom in), pizza far away |
| s08 | 69.4–83.6 | Closeness score | Match cut on the map: dog–puppy 0.80, dog–pizza 0.35; then two columns on a 0–1 scale; Spark: fuzzy, not zero; closest wins |
| s09 | 83.6–106.2 | Cosine similarity | "score = cos(angle)"; each embedding as an arrow from one origin; dog and puppy arrows at their real angle 36.5° (score 0.80); the arrow swings to pizza, 69.3° (0.35); then to 0° (1.00, same direction) and 90° (0.00, unrelated), readouts following live |
| s10 | 106.2–117.8 | Search by meaning | "My bike tire went flat": keyword search matches "bike" → wrong page; embedding search scores 0.08 / 0.44 / 0.03, the wheel page rises to the top |
| s11 | 117.8–128 | Storing embeddings | A table frame (handbook_chunks: id, content, embedding); a drawn handbook is cut into chunks that drop into rows; each row gets its numbers; Postgres + pgvector as the example |
| s12 | 128–138.8 | Vector database | 8 chunk dots at their real positions; the question card shrinks into a dot; a search ring grows to the nearest chunk (vacation, 0.71) |
| s13 | 138.8–146.6 | Answering | Closest chunk + question packed into one prompt, flies into Spark (Claude); answer "You get 15 vacation days a year." |
| s14 | 146.6–152.6 | End card | Four takeaways, follow pill |

## Voiceover script

Voice and model as ep01 (Fish Audio community voice "Young Sheldon", `s2.1-pro-free`). Source of truth:
`voiceover.json`; generate and place with `FISH_API_KEY=… node tools/voiceover.mjs`, then `node tools/lipsync.mjs`.
Timing-only edits: `node tools/voiceover.mjs --place`. Every scene's animation is timed to these line starts.

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | What's an embedding? And why does AI need them? |
| s02 | 0.2 | To a computer, dog and puppy look nothing alike. |
| s02 | 4.3 | Not one letter matches. |
| s02 | 6.4 | But they mean almost the same thing. |
| s03 | 0.3 | That's where an embedding model comes in. |
| s03 | 2.6 | It's an AI trained on huge amounts of text. |
| s03 | 5.8 | It learned that dog and puppy fit into the same kinds of sentences. |
| s04 | 0.4 | Give it a word, and it turns the meaning into a list of numbers. |
| s04 | 4.6 | That whole list is the embedding. |
| s05 | 0.3 | So what do the numbers mean? |
| s05 | 2.1 | Each one is a score for some quality. Like: is it an animal? Is it food? |
| s05 | 8.1 | But nobody picked these. The model learned them, so we can't read them one by one. |
| s05 | 13.4 | Together, they're a fingerprint for meaning. |
| s06 | 0.3 | Is it exact? No. It's the model's best guess. |
| s06 | 3.9 | But similar meanings get similar fingerprints. |
| s07 | 0.3 | Squash all those numbers down to two, and each word gets a spot on a map. |
| s07 | 5.0 | Similar meanings land close together. |
| s07 | 7.4 | Dog and puppy are neighbours. Pizza? Way over here. |
| s08 | 0.3 | A computer can score how close two spots are. |
| s08 | 3.4 | Dog and puppy: point eight. Dog and pizza: point three five. |
| s08 | 8.3 | Pizza isn't zero, because scores are fuzzy. What matters is which is closest. |
| s09 | 0.3 | That score has a name: cosine similarity. |
| s09 | 3.9 | Picture each embedding as an arrow. It measures the angle between two arrows. |
| s09 | 8.8 | Dog and puppy: a small angle, so a high score. |
| s09 | 13.2 | Dog and pizza: a wider angle, so a lower score. |
| s09 | 17.4 | Pointing the same way scores one. At a right angle, zero. |
| s10 | 0.3 | So why use them? Search. |
| s10 | 3.1 | Keyword search spots the word bike, and gets it wrong. |
| s10 | 6.9 | Embedding search matches the meaning, and finds the fix. |
| s11 | 0.3 | Where do embeddings live? In a database. |
| s11 | 3.4 | Take a team handbook and split it into chunks. |
| s11 | 6.4 | Each row stores a chunk and its numbers. |
| s12 | 0.3 | A vector database searches those numbers by closeness. |
| s12 | 4.2 | Ask a question, and it becomes numbers too. |
| s12 | 7.2 | The database finds the nearest chunk. |
| s13 | 0.3 | That chunk goes to Claude, along with your question. |
| s13 | 4.3 | So Claude answers from the right page. |
| s14 | 0.3 | So that's embeddings: meaning, turned into numbers. |
| s14 | 3.8 | Follow for more! |
