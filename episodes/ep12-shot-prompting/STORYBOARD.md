# Episode 12 · Zero-shot vs one-shot vs few-shot prompting (65.6 s, live IDE look, for developers)

v3, built 2026-10-18 (render: `renders/ep12-shot-prompting.mp4`). Audience: junior devs and up. The whole short
happens inside one dark editor + terminal window, so the code keeps evolving instead of cutting between scenes.
v1–v2 were a hand-drawn sketchbook look the user turned down; they're archived in `explorations/ep12-sketchbook/`.

## Look

- `assets/ide.css`: Tokyo-Night-style palette, Geist Mono for code, Inter for UI and captions; header pills for the
  three techniques; a 940 × 930 editor window (title bar + tabs, editor, terminal/network panel, status bar with
  the Claude logo and the model); a caption strip under the window. All UI text passes WCAG AA (`hyperframes check`).
- `compositions/ide.html` drives the window for the whole episode: command palette, hover doc, typed code with
  green diff bars for inserted lines, a camera that frames the lines being explained, a peek of `TICKET`, a red
  squiggle and inline error, an inline hint ("examples: Low · High? Medium?"), terminal runs, a network panel and a
  README tab. `s01`–`s07` carry the caption strip only.
- Narrator: the Sanjay avatar in a round "pair-programming" cam bubble under the window, bottom right; its ring and
  mic dot follow the voice level. He's on screen the whole time on the strip the window leaves empty.

## Code (`code/`)

`zero_shot.py`, `one_shot.py`, `few_shot.py` are exactly the three states of `triage.py` on screen; `tickets.py`
holds `TICKET` and the `Priority` enum (shown in a peek). Messages API with `claude-opus-5-5`; few-shot examples are
user/assistant turn pairs ahead of the real ticket. Simplified for the video: the label is read from
`reply.content[-1]` (the text block after the thinking block), no error handling, no refusal fallback
(server-side `fallbacks` would add two lines). `request_size.py` measures the JSON body of each request for the
network panel: 200 B (1 message) vs 520 B (7 messages), so 320 B of examples ride along on every call.

Terminal outputs are illustrative (labelled on screen): no API key was available to run the calls. The zero-shot
`ValueError` is the real message format of `Priority("…")` for an unknown value.

## Facts (checked 2026-10-18; never cited in the video)

IBM, "Zero-shot vs. few-shot prompting" and "One-shot prompting": zero-shot = no examples; one-shot = exactly one;
few-shot = typically 3–5, more consistent output and anchored format at the cost of a longer prompt; start
zero-shot and add examples when output is inconsistent. The example tickets are IBM's.

## Script

Rewritten for developers, reviewed in a fresh context (2026-10-18). Applied: zero-shot sends the instruction *and*
the ticket; "a shot is an input paired with the output you want"; "more consistent" (not "far more reliable");
"a missing password reset email"; "you add" two more examples (three in total); "inconsistent" instead of "drift".
One Sanjay take at speed 1.0 (66.2 s raw, `assets/vo/s01-db5447fe.untrimmed.mp3`); the 12 pauses longer than 0.4 s
trimmed to 0.3 s → 64.0 s. Word timings: `assets/vo/transcript.json`.

"[excited] Let's look at zero-shot, one-shot, and few-shot prompting. A shot is one example, an input paired with the output you want back. Say you're sorting support tickets into high, medium, or low. Zero-shot sends your instruction and the ticket, and nothing else. The model will probably label a locked account high, but it picks its own format, so one call returns a word, and the next returns a sentence that breaks your parser. One-shot puts one example ahead of the real ticket. You write a user turn with a missing password reset email, then an assistant turn that answers low. Now the replies copy that format, but the model has only seen low, so it has to guess where high begins. Few-shot uses three to five examples that cover the whole scale, so you add a payment outage marked high, and an invoice question marked medium. The labels get more consistent, and the format holds. The cost is a longer prompt, because every request carries those examples again. [excited] So zero-shot is the instruction alone, one-shot adds a single example, and few-shot adds a handful. Start with zero-shot, and add examples when the answers come back inconsistent. Follow for more AI basics!"

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 | 0–3.6 | Command palette "> shot" lists zero_shot.py / one_shot.py / few_shot.py as they're said; the header pills light. |
| s02 | 3.6–7.6 | Hover doc: "shot (noun) · one example: an input paired with the output you want back", input / output rows. |
| s03 | 7.6–22.7 | triage.py types itself (zero-shot). Zoom to `system=` (High / Medium / Low glow), then to the single user message; peek of `TICKET`; hint "1 message · no examples". Runs: `Priority.HIGH`, then a sentence → Traceback / ValueError, red squiggle + inline error on line 14. |
| s04 | 22.7–36.4 | Diff-inserts `EX_LOW`, then the user turn and the assistant turn ("Low" glows). Run: `Priority.HIGH`. Hint "examples: Low · High? Medium?"; run: `Priority.MEDIUM  # a guess`. |
| s05 | 36.4–47.5 | Inserts `EX_HIGH`, `EX_MED`, then the four example turns; hint "examples: Low · High · Medium"; zoom out to the whole file; `for i in 1 2 3` → `Priority.HIGH` ×3. |
| s06 | 47.5–52 | NETWORK tab: zero_shot.py 1 msg 200 B; few_shot.py calls 1–3, 7 msgs 520 B each, the 320 B of examples highlighted on every call. |
| s07 | 52–65.6 | README.md tab: the three rows, "Start with zero-shot. Add examples when the answers come back inconsistent.", "★ Follow for more AI basics". |
