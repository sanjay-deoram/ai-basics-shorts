# Episode 02 · Part 2 of 2 · How AI uses embeddings (107.5 s, avatar narrator)

Same cut, voice and scenes as `../ep02-embeddings-part2`, with the stippled Sanjay avatar in place of Spark as the
narrator (`compositions/narrator.html`; the avatar code is `Egg.mountAvatar` / `Egg.avatarTalk` in
`assets/eggshell.js`). He moves into whatever space each scene leaves empty at that moment (bottom right, bottom
left, top right, a large peek under the title, centred on the end card) and steps out while a scene's pointer is
on screen. The pointers (s03, s04, s06, s07, s08) are now a small flying avatar head (`Egg.pointer`). In s09 the
Claude logo (`assets/claude-logo.svg`) stands for Claude, the AI the prompt flies into. Mouths: one beat per written syllable (`tools/lipsync.mjs`).

Cut from the full episode in `../ep02-embeddings` (152.6 s) so it can be posted on its own. Facts, sources and the
real numbers are in that folder's STORYBOARD.md. Scenes s03–s10 are the full episode's s07–s14 (renamed to this
part's slots, otherwise unchanged); the title and the recap are new. Voice: the same takes as the full episode
(copied from its `assets/vo`), plus the title line and the first recap line.

| Slot | Time | Scene | Beat |
|---|---|---|---|
| s01 | 0–4 | Title | "How AI uses embeddings" · Part 2 |
| s02 | 4–12.5 | Quick recap | The model draws in; "puppy" → a tape of 384 numbers (the full episode's s04, re-voiced as a recap) |
| s03 | 12.5–24.3 | A map of meaning | Squashed to 2 numbers; animals and food cluster; dog + puppy neighbours, pizza far away |
| s04 | 24.3–38.5 | Closeness score | dog–puppy 0.80, dog–pizza 0.35; fuzzy, not zero; closest wins |
| s05 | 38.5–61.1 | Cosine similarity | score = cos(angle); arrows at their real angles: dog↔puppy 36.5° (0.80), dog↔pizza 69.3° (0.35); 0° = 1, 90° = 0 |
| s06 | 61.1–72.7 | Search by meaning | Keyword search → wrong page; embedding search → the wheel page |
| s07 | 72.7–82.9 | Storing embeddings | Handbook → chunks → table rows with their numbers (Postgres + pgvector example) |
| s08 | 82.9–93.7 | Vector database | Dots by real position; the question lands; the nearest chunk wins (0.71) |
| s09 | 93.7–101.5 | Answering | Chunk + question → Claude (Spark) → "You get 15 vacation days a year." |
| s10 | 101.5–107.5 | End card | Four takeaways, follow pill |

New voice lines: s01 @0.2 "Part two: how does AI actually use embeddings?" · s02 @0.4 "Quick recap: an embedding
model turns a word's meaning into a list of numbers." (s02 @5.3 "That whole list is the embedding." and the s05
cosine lines are the full episode's takes.)
