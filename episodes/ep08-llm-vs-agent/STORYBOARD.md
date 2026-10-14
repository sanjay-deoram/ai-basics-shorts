# Episode 08 · LLM vs AI agent: what's the difference? (53.6 s, avatar narrator)

One request, sent twice. "Book a table for 2, Friday 7pm." goes to an LLM, which gives advice and stops. Then it goes to
an agent, which is the same model wrapped with tools, memory and a loop, and the agent gets the booking done. The
episode is built on JetBrains' explainer (the user's suggested source) and its one-line summary: "An LLM answers
questions, and an agent completes tasks." Motion is whiteboard ink, with a camera that zooms in and out in every scene:
s02 pulls back from the LLM box, s03 pulls back from 2× to reveal the agent around the same box, s04 opens close on
"Think", s05 opens on the request, pulls back to the run log and pushes in on "asks you first", and s06 moves from one
half to the other before pulling back.

## Facts used (checked 2026-10-12)

- **LLM**: "An LLM (large language model) takes a prompt and context as input, generates output, and stops." It is
  stateless and has no built-in tool access. JetBrains, *LLMs vs. AI Agents: What Is the Difference?*
  (jetbrains.com/pages/ai-agents/llms-vs-ai-agents). Used in s02 ("words in, words out", "then it stops") and in the s06
  facts line ("One reply · no tools · then it stops").
- **Agent**: "a system that wraps one or more models with tools, memory, orchestration logic"; the LLM is one part
  inside it. Its defining feature is the reasoning loop: it "reasons about what to do next, takes an action, observes
  the result, and continues until the task is complete". Orchestration also "checks permissions before sensitive
  actions". Same JetBrains page. Used in s03 (LLM + tools + memory + loop), s04 (think → act → check, until done), and
  s05 ("Asks you first" before it books).
- **Summary line**: "An LLM answers questions, and an agent completes tasks." Same JetBrains page (s06, voice).
- **Second source**: Anthropic, *Building effective agents* (2024-12-19, anthropic.com/engineering/building-effective-agents):
  agents "are typically just LLMs using tools based on environmental feedback in a loop". This matches s03 and s04.
- **The dinner booking** (s02, s05) is illustrative and labelled on screen ("Example · same request", and the end card
  says "The dinner booking is an illustrative example"). Luigi's, Roma Trattoria, the memory and the calendar are made
  up. Booking a table is a real kind of agent task (browser agents do it).

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–4.0 | Hook | "LLM vs AI agent: what's the difference?" ("difference" highlighted). Below it, an ink LLM box draws on "LLM", then "vs", and an agent pops on "AI agent". |
| s02 | 4.0–14.4 | 1 · The LLM | Opens at 1.6× on the box as it draws: "LLM · Large language model". Pulls back, then arrows draw: "Words in" and "Words out". The request types on, a living dot carries it into the box, and the advice comes out (taupe card): "Try Luigi's or Roma Trattoria. Call them to book a table." The camera leans in. On "Then it stops" a stop chip pops and the box goes grey. Label: "It answers. You do the rest." |
| s03 | 14.4–22.8 | 2 · The AI agent | Opens at 2× on the same box, then pulls back: an outline badged "AI agent" draws around it. Tools draw (search + calendar), then memory (a notebook), then a loop arrow around the model, each on its word. Label: "An agent = LLM + tools + memory + a loop." |
| s04 | 22.8–29.6 | How an agent works | Opens close on "Think". Three arcs: Think (plans the next step) → Act (uses a tool) → Check (looks at the result). A living dot runs the loop on the voice, then laps it on "loops". A DONE stamp lands on "done". Label: "Think, act, check. Repeat until it's done." |
| s05 | 29.6–41.6 | Example · same request | The same request, sent to an agent. The run log builds step by step, each with a drawn icon, while the dot walks the rail and finished steps turn ink. Memory "You love Italian food" → Search "3 Italian places open Fri 7pm" → Calendar "Friday 7pm is free" → Asks you first "Book Luigi's at 7pm for 2?" (push in, then "Yes") → Books it "Luigi's · Fri 7pm · for 2". A DONE stamp lands on the request. Label: "It doesn't just answer. It gets it done." |
| s06 | 41.6–48.0 | The difference | Top half: "An LLM answers questions." with "One reply · no tools · then it stops". A "vs" rule. Bottom half: "An AI agent completes tasks." with "Tools · memory · loops until done". The camera moves from one half to the other, then pulls back to show both. |
| s07 | 48.0–53.6 | End card | LLM: words in, words out · Agent: LLM + tools + loop · One answers. One acts. · example note + sources · follow pill. |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | What's the difference between an LLM and an AI agent? |
| s02 | 0.3 | An LLM, a large language model, reads your words and writes words back. |
| s02 | 5.4 | Ask it to book dinner, and you get advice. Then it stops. |
| s03 | 0.3 | An AI agent wraps that same model in a system, |
| s03 | 3.7 | with tools it can use, memory, and a loop. |
| s04 | 0.2 | It thinks, takes an action, checks the result, and loops until the job is done. |
| s05 | 0.3 | Same request, given to an agent. |
| s05 | 2.5 | It remembers you love Italian, searches for open tables, and checks your calendar. |
| s05 | 7.1 | It asks before booking, then books it. Done. |
| s06 | 0.3 | So, an LLM answers questions. An agent completes tasks. |
| s07 | 0.3 | That's the difference. |
| s07 | 2.0 | Follow for more AI basics. |

Visual beats are timed to word onsets. Each line was transcribed on its own with `hyperframes transcribe`
(whisper small.en), and the times are kept in the scene comments.

## Avatar

title peek (s01) → corner (s02–s06; content above y 485 stays left of x 830, zooms included) → end (s07). Doubt on
"What's the difference…" and on "Then it stops". Smiles on "Done" (s05), on "An agent completes tasks" and on the end
card. Every stop checked with snapshots.
