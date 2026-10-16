# Episode 09 · What is tool use? (49.3 s, avatar narrator)

One question, "Weather in Tokyo?", followed through tool use in real Python: the tool, the request, Claude's
tool call, your app running it, the result appended to `messages`, and the answer. The narration is **one continuous
voice take** (no per-line takes) so it flows; scene cuts sit on its word timings. Each step shows its real
code in a dark code card (syntax colours, line numbers, a run bar that steps line by line as the voice explains it),
while a **prompt panel** in the lower half (compositions/prompt.html) grows one block per step, so the viewer sees
exactly what gets added to the prompt. No sources are named in the video (series rule since ep09).

## Facts used (checked 2026-10-15; internal only)

- Tool definition = name + description + input_schema (JSON Schema); Claude sees only that and the results, never the
  code. Anthropic docs, Define tools / How tool use works (platform.claude.com/docs/en/agents-and-tools/tool-use/).
- Tool definitions go into the prompt: the API builds a system prompt from them (and they cost input tokens). Same docs. (s03, panel block 1)
- Claude replies with a `tool_use` block (name + input) and stops; it never executes anything itself. Same docs;
  Microsoft "AI agents for beginners" 04: "A tool call is what is returned, not the final answer." (s04, s05)
- Your app runs the function and sends a `tool_result` back in a user message; the whole conversation is sent again
  and Claude answers from it. Anthropic docs; OpenAI function-calling guide. (s05, s06, panel blocks 3–4)
- Without a tool, a model can't know live weather and may make it up (Hugging Face agents course, Unit 1 · Tools). (s02, s04 "doesn't guess")
- `stop_reason` is "tool_use" when Claude asks for a tool and "end_turn" when it's done; the request needs `model`,
  `max_tokens`, `tools`, `messages`; the tool_result goes back in a user message with `tool_use_id`. Anthropic docs.
- The weather, 22°C and light rain, is an illustrative example. The cards show the full `input_schema` and pass
  `tool_use_id`; the follow-up `create` must send `tools` again ("same args"). s08 reads `resp.content[-1].text`, not
  `[0]`, because on models that think by default `[0]` can be a thinking block.
- Code reviewed against the Anthropic Python SDK docs by a second agent, 2026-10-15.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–3.55 | Hook | "What is tool use?", "…and how does it work?", `get_weather("Tokyo")` types. Avatar: title. |
| s02 | 3.55–10.05 | On its own (whiteboard) | Claude + "Words in, words out." · drawn weather crossed out · "Unless… + a tool": an f( ) box connects to the weather and the cross lifts. Avatar: corner. |
| s03 | 10.05–16.0 | 1 · The tool | tools.py: the function, then the tool dict. Drawn boxes below: "Your app · runs here" (the function) and "Claude sees only this" (Name, Description, Inputs, on the voice). |
| s04 | 16.0–21.15 | 2 · The request | `client.messages.create(model, max_tokens, tools=[tool], messages=[…])`; run bar on tools → panel block 1, on messages → block 2; drawn arrow "Both become Claude's prompt". |
| s05 | 21.15–27.75 | 3 · Claude's reply | "Needs live data", "Sunny, probably?" struck; REPL: stop_reason 'tool_use', block.name 'get_weather', block.input {'location': 'Tokyo'}. |
| s06 | 27.75–31.4 | 4 · Your app runs it | Claude ("Never runs code") → ticket → Your app → Weather API; `result = get_weather(**block.input)` runs, result comment. |
| s07 | 31.4–35.0 | 5 · Add the result | `messages += [assistant reply, user tool_result]` and `client.messages.create(...)`; blocks 3 and 4 land, then the whole prompt lights. |
| s08 | 35.0–40.5 | 6 · Claude answers | REPL: stop_reason 'end_turn', print(text); a dot carries the prompt up; "It's 22°C and raining lightly in Tokyo." |
| s09 | 40.5–49.3 | End card | "That's tool use" · Claude asks for a tool · Your app runs it · Claude answers (each ticks as it's said) · follow pill. Avatar: end. |

The prompt panel (compositions/prompt.html) spans s04–s08.

## Voiceover (Sanjay, one take at speed 0.95; source of truth: voiceover.json)

Tone: a friendly chemistry prof, about 4/10 on enthusiasm. `[excited]` tags (start and recap) are Fish Audio delivery
cues: not spoken, and skipped by lipsync. No stock "AI" phrasing ("here's the trick"); the recap says each
end-card point in full.

"[excited] What is tool use, and how does it actually work? On its own, Claude can only write text, so it can't check the weather in Tokyo, unless you give it a tool! A tool is just a function in your app, with a name, a description, and the inputs it needs. You send that tool list along with your question, so Claude sees both in its prompt. Claude notices it needs live data, so instead of guessing, it replies with a tool call: get weather, Tokyo. But Claude never runs that code itself. Your app does! Then it adds the result to the messages and sends everything back. And now Claude can answer for real: it's twenty-two degrees and raining lightly in Tokyo. [excited] So that's tool use! Claude asks for a tool, your app runs it, and Claude answers. Follow for more AI basics!"

Scene cuts and visual beats follow the take's word onsets (`hyperframes transcribe`, whisper small.en). If the text
changes, regenerate, re-transcribe, and move the slots in index.html (prompt.html follows them automatically).
