# Episode 02 · Part 1 of 2 · What is an embedding? (65.6 s, avatar narrator)

Same cut, voice and scenes as `../ep02-embeddings-part1`, with the stippled Sanjay avatar in place of Spark
(`compositions/narrator.html`). The avatar moves around the frame into whatever space each scene leaves empty at that
moment: a large peek under the title, top right (s02), bottom right then across to bottom left (s03), bottom right
(s04), a smaller top-right corner for s05 (he draws its pointer leader from beside his chin), bottom left then bottom
right (s06), and centred above the end-card recap. He turns to face the content when he crosses sides. Mouths
change once per syllable (`tools/lipsync.mjs` writes the syllables from `voiceover.json`); doubtful brows on
"Not one letter matches" and "Is it exact?", a smile on "the same thing", "fingerprint" and the end card.
Avatar art: two Gemini sheets in `assets/avatar`, cut by `tools/cut-flipbook.py` and `tools/cut-expressions.py`.

Cut from the full episode in `../ep02-embeddings` (152.6 s) so it can be posted on its own. Facts, sources and the
real numbers are in that folder's STORYBOARD.md. Scenes s01–s06 are the full episode's s01–s06, unchanged; only
the title text and the end card are new. Voice: the same takes as the full episode (copied from its `assets/vo`),
plus the two end-card lines.

| Slot | Time | Scene | Beat |
|---|---|---|---|
| s01 | 0–3.5 | Title | "What is an embedding?" · Part 1 |
| s02 | 3.5–13.5 | The problem | dog / puppy: no letters in common, same meaning |
| s03 | 13.5–24.5 | The embedding model | Trained on 1B+ sentence pairs; dog ✓ puppy ✓ pizza ✕ fill-in-the-blank |
| s04 | 24.5–32.5 | Word → numbers | "puppy" → a tape of 384 real numbers |
| s05 | 32.5–49 | What the numbers mean | 1 number = 1 score; imagined names → ???; fingerprint strip |
| s06 | 49–57.6 | Is it exact? | A best guess; dog follows puppy's curve, pizza doesn't |
| s07 | 57.6–65.6 | End card | Text becomes numbers · Each number: a hidden score · Similar → similar numbers · A best guess, not exact · Next: Part 2 · Follow for Part 2 |

New voice lines: s07 @0.3 "So that's what an embedding is." · s07 @2.4 "In part two: how AI uses them. Follow so you
don't miss it!"
