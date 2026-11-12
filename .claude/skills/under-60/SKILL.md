---
name: under-60
description: Makes an "Under 60 seconds" short (e.g. "How RAG works in 60 seconds"), from the topic to a rendered MP4. Use when asked for an under-60 / in-60-seconds video on any AI topic.
argument-hint: <topic, e.g. "vector embeddings"> [reference YouTube URL]
---

# Under 60 seconds

One episode of the *Under 60 seconds* series: one concept, explained by walking one concrete example through how it
works, in under 60 seconds. The **explaining** is fixed; the animations are new for every episode. The worked
example is `episodes/ep13-rag-60s/` (open `STORYBOARD.md` for the script and the scene table, and `renders/` for the
video).

All production rules still come from `CLAUDE.md` and `studio/DESIGN.md` (palette, avatar, safe box, `Egg.*`
helpers, the checks). This file adds only what makes the series different.

## The script formula

Write the voiceover first. Every episode follows these beats, in this order:

| Beat | ~Time | What the voice does | ep13 (RAG) |
|---|---|---|---|
| Cold open | 0–3 s | States the topic and the promise in one line. No title card, channel name or "in this video". | "Here's how rag works, in sixty seconds." |
| Name it | 3–10 s | Unpacks the name (an acronym, or the term itself) and promises to take it apart **by watching it work**. | "Rag stands for retrieval-augmented generation. Let's take it one word at a time, by watching it work." |
| Set up the example | 10–16 s | "Say you…": one concrete, everyday example that the rest of the video follows from start to finish. | "Say you have a question. That's your query. And the answer is buried somewhere in a pile of documents." |
| Mechanism | 3–4 beats, 5–10 s each | One step of how it works per beat, done to the example. Each piece of the name is **named at the moment it happens** ("That's X: …"). | "That's retrieval: the database hands back the documents closest in meaning to your query." |
| Payoff | last 5–7 s | What you get, plus the honest limit. The video ends on this line. | "…so it's far less likely to make things up." |

Voice rules:

- **140–160 words.** Sanjay's voice reads them in 44–48 s; with the gaps that lands at 48–55 s.
- Plain, second person ("you", "your question"), short sentences. Explain every term inline the first time it is
  said, in apposition: "its embedding: a list of numbers that captures what it means".
- Hand each beat to the next with the example ("those documents", "your question", "Next,"), so it reads as one walk-through.
- Every promise the opening makes is paid off on screen (if the name is unpacked, each part is named when it happens).
- State limits honestly ("far less likely", "not never"). Use real facts, real numbers where possible, and record them
  with sources in `STORYBOARD.md` (DESIGN.md §11).
- The video ends on the payoff line: no recap, no end card, no "follow for more".
- Spell acronyms in the voice text as they should be spoken ("rag" for RAG).

**Done when** the script fits the five beats, is 140–160 words, and every term and promise is paid off. Show the
user the script before generating the voice (regenerating the voice costs Fish Audio credits).

### With a reference video

If the user gives a reference short, take only its **pacing and order of ideas**, never its words or visuals.
Get its transcript with word timings: `pip install --target <scratchpad>/pylib yt-dlp`, then
`PYTHONPATH=<scratchpad>/pylib python -m yt_dlp --skip-download --write-auto-subs --sub-langs "en.*" --sub-format vtt --write-info-json -o short <url>`.
Map its beats onto the formula above and write our own lines. Record the reference beats in `STORYBOARD.md`
(internal only).

## The look of the series

- **New animations every episode.** Design each scene for this topic. Earlier episodes on the same subject are
  references for facts only; their scenes are not reused (user rule).
- **One scene per beat**, cut on the voice's pauses: hook (~9 s, includes "Name it"), setup (~6 s), one scene per
  mechanism beat, and the payoff folded into the last mechanism scene.
- **The example is the through-line.** The same object (the question card, the documents) travels from scene to
  scene: a scene can end with it on screen and the next scene starts on the same frame (ep13 s04 → s05).
- **The eyebrow tracks the name**: each mechanism scene's eyebrow is the piece being named ("R · Retrieval",
  "A · Augmented", "G · Generation"), so the opening's promise is visible.
- Draw each idea as something you can picture (a database drum, a meaning map, a prompt card) with ink strokes,
  cards and the living dot, then confirm it with a short label.
- **Hard stop:** the last scene has no exit fade; its final frame holds 1.5–2 s after the last word.
- The avatar narrates as usual; step him out for any scene that fills the safe box.

## Production steps

1. `git checkout -b <slug>` from `main`. Work only on that branch; push only if the user asks, never to `main`.
2. `node studio/tools/new-episode.mjs <slug>` (slug like `ep14-embeddings-60s`); delete the sample scenes.
3. Write `STORYBOARD.md`: reference beats (if any), the script, the facts with sources.
4. Write the lines into `voiceover.json` (one line per sentence group, `scene` set), run `node tools/voiceover.mjs`,
   and read each line's measured length.
5. Lay out the timeline from those lengths: 0.25–0.3 s between lines in a scene, 0.4–0.5 s across a cut, first line
   at 0.15–0.2 s into its scene. Set each line's `at`, the scene slots and the episode length in `index.html` (root,
   narrator, chrome `duration`), and `LEN` / `PATH` / `EXPR` in `compositions/narrator.html`. Run
   `node tools/voiceover.mjs --place` and check it reports no overlaps.
6. Build the scenes (load `/hyperframes-core` first). Time each move to the word it shows, estimated from its place in
   the line.
7. `node tools/lipsync.mjs`, `node tools/build-sfx.mjs`, `npx hyperframes check` (0 errors; short-hold warnings are
   expected at this pace), then snapshot every scene and every avatar stop and look at them. Fix overlaps and
   re-snapshot.
8. `npx hyperframes render -o renders/<slug>-hq.mp4`, then shrink it (about 30 s; it halves the size with no visible loss,
   VMAF ~96) and delete the `-hq` file:
   `ffmpeg -i renders/<slug>-hq.mp4 -c:v libx264 -preset slow -crf 22 -c:a copy -movflags +faststart renders/<slug>.mp4`.
   Don't pass `--crf` to `hyperframes render` instead: it encodes with a faster preset and the file comes out bigger.
   Confirm the final MP4 has an audio stream.
9. Update `STORYBOARD.md` (scene table, voiceover as placed) and commit on the branch.

For the same episode in several looks, use `/style-variants` (compare by snapshot, render only the kept styles).

**Done when** the MP4 is rendered, under 60 s, has audio, every scene was checked in snapshots, and the user has the
path to the video.
