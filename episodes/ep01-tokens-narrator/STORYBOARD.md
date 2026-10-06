# Episode 01 · What is a token? (60 s)

Facts used (checked 2026-10-06 against Anthropic's docs and the Claude API reference):
- For Claude, 1 token ≈ 3.5 English characters; exact counts vary by model and language.
- API list prices per 1M tokens (input / output): Haiku 4.5 $1 / $5 (200K context),
  Sonnet 5.5 $2 / $10, Opus 5.5 $4 / $20, Fable 5.1 $10 / $50 (1M context each).
- The model re-reads the whole conversation on every turn, so input tokens grow as a chat goes on.
- The token split in s02 is an illustrative example, labelled as such on screen.
- s06 live example (checked 2026-10-06): question "What does the ChatGPT Plus plan include?", so the question, the
  tokenizer and the price all come from OpenAI. The on-screen answer matches chatgpt.com/pricing (Plus: everything in
  Go, plus advanced reasoning models with GPT-6, expanded messages and uploads, better image creation, expanded deep
  research, memory and context, Projects, scheduled tasks and custom GPTs, expanded Codex usage, ChatGPT Work on desktop,
  web and mobile) and help.openai.com "What is ChatGPT Plus?" ($20/month, billed monthly).
  Tokens counted with OpenAI's open tokenizer for GPT-4o (o200k_base, npm gpt-tokenizer 3.4.0): prompt 16 (9 text + 7
  chat framing), answer 65. GPT-4o API price from developers.openai.com/api/docs/pricing: $2.50 in / $10.00 out per 1M
  (GPT-4o is retired inside ChatGPT but still sold on the API).
  16 × $2.50 / 1M = $0.00004; 65 × $10 / 1M = $0.00065; total $0.00069; × 10,000 = $6.90.

| Slot | Time | Scene | Beat |
|---|---|---|---|
| s01 | 0–3 | Title | "What is a token?" |
| s02 | 3–13 | Whiteboard + zoom in/out | "I love tokenization!" reads as one line, then is cut one piece at a time (0.7 s apart) into 5 tokens; "1 word → 2 tokens" note; 1 token ≈ 3.5 characters |
| s03 | 13–21 | Input / output flow | Prompt tokens fly into Spark (IN 1,200), answer tokens fly out (OUT 90) |
| s04 | 21–28 | Context window, zoom out | 4 squares (Haiku 200K) → 20 squares (1M) |
| s05 | 28–36 | Price bars, zoom in | Four models; output costs 5× input |
| s06 | 36–44 | Live cost example | Real question "What does the ChatGPT Plus plan include?" + real answer; GPT-4o: 16 tokens in ($0.00004) + 65 out ($0.00065) = $0.00069; ×10,000/day = $6.90 |
| s07 | 44–55 | Chat, behind the scenes | Turn 1: question split (reads 9), reply streams (writes 5). Turn 2: follow-up, whole chat re-read and counted (reads 18). Bars 9, 18, 30+ |
| s08 | 55–60 | End card | Four takeaways |

## Voiceover script

Voice: Young Sheldon (Fish Audio community voice), Fish Audio model `s2.1-pro-free`. Source of truth: `voiceover.json`; generate and place with
`FISH_API_KEY=… node tools/voiceover.mjs` (timing-only edits: `node tools/voiceover.mjs --place`).

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.20 | What's a token? And why should you care? |
| s02 | 0.05 | AI doesn't read words. It reads tokens. |
| s02 | 2.90 | I. |
| s02 | 3.80 | Love. |
| s02 | 4.70 | Token. |
| s02 | 5.80 | Ization. And the exclamation mark. |
| s02 | 8.50 | That's five tokens. |
| s03 | 0.60 | Everything you send, Claude reads as input tokens. |
| s03 | 4.00 | Everything it writes back is output tokens. |
| s04 | 0.30 | The context window is how much it can read at once. |
| s04 | 3.60 | Up to a million tokens. |
| s05 | 0.40 | You pay per million tokens. |
| s05 | 2.30 | Bigger models cost more. |
| s05 | 4.20 | And output costs five times more than input. |
| s06 | 0.50 | So what does one question cost? |
| s06 | 3.40 | Less than a cent. |
| s06 | 5.30 | Ten thousand a day? About ninety dollars. |
| s07 | 0.20 | Here's the catch. |
| s07 | 1.10 | Claude reads your question, then writes a reply. |
| s07 | 4.05 | Ask a follow-up, |
| s07 | 5.20 | and Claude rereads the whole chat. |
| s07 | 7.40 | Nine, then eighteen, then more. |
| s08 | 0.30 | So that's tokens. Tiny pieces, big deal. |
| s08 | 3.60 | Follow for more! |
