# Episode 10 · What is the ReAct loop? (55.6 s, avatar narrator)

Follows on from ep09 (tool use). ReAct = reason + act: the agent thinks, acts with a tool, observes the result, and
loops until it can answer. Before the example, s03 answers "where do the tools come from?": the app sends its tool
list (name, description, inputs) with every request, and Claude can only pick from that list. The worked example,
"Do I need an umbrella for my next meeting?", needs two tools in a chain: the second call (the weather in Toronto)
depends on the first result (where the meeting is), which is why it's a loop and not a plan. A loop drawing
(compositions/loop.html) spans s04–s05: its dot draws the arrows, takes the chosen tool from a "Your tools" tray into
the Act box, carries each result to the eye, and leaves for Answer; in s05 it follows the code's run bar. The
narration is one continuous voice take; scene cuts sit on its pauses. No sources are named in the video.

v2 (2026-10-15, user feedback): Toronto instead of Osaka; new s03 on where tools come from; the loop redrawn as a
whiteboard drawing that the dot draws and works through (kit: `Egg.curve` / `Egg.travel`). v1 scenes are kept in the
session scratchpad only.

## Facts used (checked 2026-10-15; internal only)

- ReAct (Yao et al., 2022, "ReAct: Synergizing Reasoning and Acting in Language Models") interleaves reasoning
  traces with actions and observations, looping until the task is done. (s02, s04, s06)
- Client tools are defined by your app (name, description, input_schema) and sent in `tools` on every Messages API
  request; Claude can only call tools in that list (it sees the definitions, never the code). Claude API skill,
  shared/tool-use-concepts.md; ep09's facts. (s03, s05 "with the tools")
- In a native tool-use loop, Claude replies with `tool_use` blocks and `stop_reason == "tool_use"`; your app runs the
  tools, appends the assistant turn (full `resp.content`) and one user message with every `tool_result`
  (matching `tool_use_id`), and calls again; when `stop_reason` is anything else, the answer is in the reply. Claude API
  skill, python/claude-api/tool-use.md (Manual Agentic Loop). (s05)
- Capping the number of steps is standard practice so a loop can't run forever. (s05 edit)
- The Think lines in s04 paraphrase Claude's reasoning. On claude-opus-5-5, reasoning between tool calls comes back
  as thinking blocks whose text is empty unless `thinking.display: "updates"` is requested, so the trace illustrates
  the reasoning; it is not literal API output. The card is labelled "Example run". `get_weather(city="Toronto")` stands
  for a tool_use with input {"city": "Toronto"}.
- The meeting (3 pm, Toronto) and the weather (rain, 12°C) are example data.

## Code (code/react_agent.py)

- s03's tools.py is an exact excerpt of `TOOLS`; s05's agent.py is an exact excerpt of `agent()` (after the edit;
  before it, line 3 reads `while True:` and the last line isn't there). `python3 code/react_agent.py --fake` runs it
  offline against a scripted Claude that plays the s04 trace and checks the request shapes;
  `python3 code/react_agent.py` runs it for real (model claude-opus-5-5).
- Simplified for the video (also in the file's docstring): the answer is read from `content[-1]`; no error handling
  around tools; no streaming, no explicit effort, no refusal fallbacks.
- Reviewed by a second agent on 2026-10-15 (v1: "OK with fixes", no must-fixes; applied). v2 changes re-reviewed:
  second pass "OK" (TOOLS valid for the Messages API; "sent with every request" and "can only pick from this list"
  accurate for client tools; Claude may also answer with no tool). Applied its suggestion: the trace shows
  `get_weather(city="Toronto")` to match the schema.

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–2.9 | Hook | "What is the ReAct loop?", "…and how does it work?", `agent("Do I need an umbrella?")` types. Avatar: title. |
| s02 | 2.9–11.0 | What ReAct means (whiteboard) | "Reason + Act" (Re / Act highlighted). A thought cloud "Think" draws (bubbles pop); the dot draws the arrow to an f( ) box "Act" (it presses), then to an eye "Observe" (it blinks), then back ("and loops"), then out to "Answer". "Loop until it can answer." Avatar: corner, out at 10.75. |
| s03 | 11.0–18.5 | Where do the tools come from? | "Your app" box → arrow → Claude logo; a request card (`tools=TOOLS`, `messages=[…]`) flies along it twice, "Sent with every request". tools.py types the real TOOLS; the run bar lands on get_weather's name, description, inputs. "Claude can only pick from this list." |
| s04 | 18.5–34.8 | The loop, for real | "You ask: Do I need an umbrella for my next meeting?" The loop drawing runs it: Think puffs, the picked tool lights in the tray and flies into Act, "3 pm, Toronto" rides to the eye; Loop 2: get_weather, "Rain, 12°C"; Loop 3: out to Answer, which opens into the answer card. The trace card logs each step. |
| s05 | 34.8–46.45 | In Python (live code) | The drawing slides under agent.py; the run bar and the dot step together (create → Think, tools=TOOLS lights the tray, run(b) → Act, results → Observe, back to create, return → Answer). On "cap the steps": `while True:` struck → `for step in range(10):`, `return "Stopped after 10 steps"` types; counter "max 10 loops". |
| s06 | 46.45–55.6 | End card | "That's ReAct" · Claude thinks · Acts with a tool · Observes the result · Repeats until it's done · follow pill. Avatar: end. |

## Voiceover (Sanjay, one take at speed 1.0; source of truth: voiceover.json)

"[excited] What is the ReAct loop, and how does it work? ReAct is short for reason and act. The agent thinks, acts with a tool, observes the result, and loops until it can answer. But where do the tools come from? Your app sends a list with every request: each tool's name, what it does, and its inputs. Say you ask: do I need an umbrella for my next meeting? Claude thinks: where is it? It calls next meeting: three p.m., Toronto. Back around! What's the weather in Toronto? It calls get weather: rain. Now it has enough: yes, bring one! In Python, it's just a loop. Call Claude with the tools. If it asks for one, run it, add the result, and go again. When it stops asking, that's the answer. And cap the steps, so it can't loop forever. [excited] So that's ReAct! Claude thinks, acts with a tool, observes the result, and repeats until it's done. Follow for more AI basics!"

Speed 1.0 (not 0.95) keeps the episode under 60 s with the extra tools line. Scene cuts and visual beats follow the
take's pauses (ffmpeg silencedetect, -35 dB, 0.16 s) cross-checked with `hyperframes transcribe` (whisper small.en,
assets/vo/transcript.json). If the text changes, regenerate, re-time, and move the slots in index.html (loop.html
follows them).
