# Week 47 scripts: seven *Under 60 seconds* voiceovers (for approval)

Written 2026-11-14 for the topics in `2026-W47.md`, from the briefs in `2026-W47-briefs.md` only. **Approved by the user 2026-11-14**, with T1 switched to the "What is" title and T7 keeping "three times faster" (the article's headline; the exact 3.1× is on the last frame). Episodes get made in T order.

| T | Day | Slug | Title (on screen at frame 0) | Words | Scenes | Est. runtime |
|---|---|---|---|---|---|---|
| T1 | Tue Nov 17 | `ep18-always-on-agents-60s` | What is an always-on agent? | 150 | 6 | ≈ 58 s |
| T2 | Wed Nov 18 | `ep19-opus-daily-driver-60s` | How to use Opus 5.5 as your daily driver | 153 | 6 | ≈ 59 s |
| T3 | Thu Nov 19 | `ep20-uber-agent-insiders-60s` | Why Uber treats AI agents like insiders | 149 | 8 | ≈ 59 s |
| T4 | Fri Nov 20 | `ep21-claude-code-cloud-60s` | How Claude Code runs in the cloud | 153 | 7 | ≈ 60 s |
| T5 | Sat Nov 21 | `ep22-anthropic-sales-agent-60s` | How Anthropic's sales team rebuilt inbound with an agent | 150 | 6 | ≈ 58 s |
| T6 | Sun Nov 22 | `ep23-cheaper-long-sessions-60s` | Why long Claude Code sessions got cheaper | 152 | 8 | ≈ 60 s |
| T7 | Mon Nov 23 | `ep24-claude-ai-faster-60s` | How Claude made claude.ai 3× faster in two weeks | 149 | 7 | ≈ 59 s |

**Review (Opus, 2026-11-14).** Sonnet 5.5 wrote the drafts; these fixes were made in review:
- **T1:** the agent no longer "sends the quote". It's your quote, and the agent only sets the follow-up timer. The
  closing line now reads "a good one starts quiet".
- **T3:** cut the forty-million-trips line, which wasn't connected to anything. The figure stays on screen in s01.
  "Frontier models" is explained inline, and the gateway is shown acting on the request.
- **T4:** "flaky test" became "a test that fails at random" in the voice.
- **T5:** "opportunities" became "real sales opportunities", and the payoff ends on "about five days faster". The
  "about half" figure moved to the screen.
- **T6:** "tokens" is explained inline. The 30%-faster output is no longer counted in the cost (it saves waiting
  time, not money), Opus 5.5 is named, and "an estimated forty percent" replaces the hedge clause.
- **T7:** "someone flags it" became "someone reports the slow spot", so "flag" means only the on/off switch. The
  instruction count is explained before the ratchet that uses it. The 3.1 s → 0.55 s result is credited to all the
  fixes, not to the one shown.

**How to read this.** Word counts are whitespace-separated words of the exact spoken text (a hyphenated word like "always-on" counts as one, and "claude dot A I" as four). Est. runtime = speech at 2.8 words per second (ep17: 152 words = 54.2 s) plus about 0.5 s per scene and the 1.5 s hard-stop hold; ep17 landed at 59.6 s on the same sum. Scene times in each sketch use the same estimate and will move when the real voice is measured.

**House rules checked on every script:** the first line is the title and ends "in under sixty seconds"; each beat is full sentences; no source is cited in the voice; every number is in its brief; each example is walked through every beat; the last line is the payoff.

---

## T1 · Tue Nov 17 · What is an always-on agent?

- **Slug:** `ep18-always-on-agents-60s`
- **On-screen title (frame 0):** "What is an always-on agent?", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** The W2 form ("What is X?" has held better than "how X works"), chosen by the user. The answer starts with the article's own surprise, "it's not actually always on".
- **Length:** 150 words ≈ 54 s of speech, est. runtime ≈ 58 s.

### Script

> What is an always-on agent? Here's the answer, in under sixty seconds. It's not actually always on. It sleeps, wakes for a short run to do one job, saves what happened, and goes back to sleep. Say you want an agent that chases a customer who hasn't answered your quote. First, everything that wakes it, like your request, goes into one inbox. Second, a timer makes it proactive. The agent sets itself a follow-up timer for Wednesday, and when it's due, an event lands in the inbox. Third, memory lives in files, so it outlives each run. The agent keeps an instructions file, a progress file for each task, and a record of what you've already been told. Last, a risky step like sending the follow-up waits for your approval. You get the outcome, not a live stream, so a good one starts quiet and earns more of your attention.

**Word count: 150**

### Beats

- **Cold open** (s01): "What is an always-on agent? Here's the answer, in under sixty seconds."
- **Name it** (s01): "It's not actually always on. It sleeps, wakes for a short run to do one job, saves what happened, and goes back to sleep."
- **Set up the example** (s02): "Say you want an agent that chases a customer who hasn't answered your quote."
- **Mechanism 1** (s03): "First, everything that wakes it, like your request, goes into one inbox."
- **Mechanism 2** (s04): "Second, a timer makes it proactive. The agent sets itself a follow-up timer for Wednesday, and when it's due, an event lands in the inbox."
- **Mechanism 3** (s05): "Third, memory lives in files, so it outlives each run. The agent keeps an instructions file, a progress file for each task, and a record of what you've already been told."
- **Mechanism 4 + Payoff** (s06): "Last, a risky step like sending the follow-up waits for your approval. You get the outcome, not a live stream, so a good one starts quiet and earns more of your attention."

### Through-line

The **Acme quote task**: your request card ("Chase Acme about the quote") becomes an inbox row, then the timer, then `progress/acme-quote.md`, then the approval card. The same four files are labelled in every scene that shows them.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–13 s** · **Cold open + name it.** Frame 0 is the title, with a big 60 in ember under it. A toggle labelled "Always on" flips off. The living dot (the agent) curls up asleep, and a loop diagram draws: *Asleep → Event arrives → Run (does one job) → Saves what happened → Asleep*. On "short run" the Run arc lights and gets the tag "run = one wake-up". Labels are plain: `event: customer replied`, `run`, `saved`, `asleep`.
2. **s02 · ≈13–19 s** · **Setup · your request.** You type to the agent: `Chase Acme about the quote if they haven't replied by Wednesday.` The dot wakes, and the line folds into a task card, **Task · Acme quote**, which is the through-line.
3. **s03 · ≈19–23 s** · **1 · Inbox.** The task card drops into a table labelled `INBOX (a database table)`. Three sources arrow into it: *You*, *Webhooks*, *Scheduled jobs*. The row reads `ev-101 · you · "Chase Acme about the quote…"`. The dot wakes and one worker arrow reads the row. A small label says "One worker per inbox".
4. **s04 · ≈23–33 s** · **2 · Timer.** The agent writes a timer for itself: `follow-up · acme-quote · due Wed 09:00`. A clock sweeps to Wed 09:00, the scheduler checks the timer store, and a new row lands in the inbox: `ev-102 · timer · follow-up acme-quote`. Tag: "A follow-up is a deadline the agent sets for itself." The dot wakes again.
5. **s05 · ≈33–45 s** · **3 · Memory (files).** A folder panel titled `agent-memory/` (durable storage, so it survives the run) draws in. Each file opens as it is named, with a tag. `instructions.md` → "how to behave", showing:
    ```
    You chase quotes for Dana's studio.
    - Follow up once if a customer is silent for 2 days.
    - Never offer a discount.
    - Ask me before sending anything.
    ```
    `progress/acme-quote.md` → "what's done, what's left", showing:
    ```
    Quote sent Mon 09:02.
    Done: PDF sent to Acme.
    Left: follow up Wed if no reply.
    ```
    `reported.md` → "what you've already been told", showing `Mon: told Dana the quote went to Acme.` The run ends, the dot sleeps, and the files stay lit.
6. **s06 · ≈45–56 s** · **4 · Approval, then payoff.** The Wednesday run drafts the follow-up and hits `send_email`. An approval card appears: `Send this to Acme? "Hi, just checking you got the quote on Monday…"` with [Approve] [Don't send]. The run ends and the session is saved, so the dot sleeps while it waits. Your tap comes back as `ev-103 · you · approved`, which wakes the dot, and one line leaves through an OUTBOX slot: `Followed up with Acme. Waiting on a reply.` Beside it, two faded chips show the other endings: `nothing to send`, `needs you`. Last frame: "Start quiet. Earn more of your attention." Hard stop.

### Caption (same for every style variant)

```text
What is an always-on agent? Explained in 60 seconds.
The agent mostly sleeps. An inbox, a timer and a few files let it wake up, do one job and remember what it already told you.
What's the first job you'd hand an always-on agent?

#ai #aiagents #claude #softwareengineer
```

**YouTube title (51 characters):** What Is an Always-On Agent? Explained in 60 Seconds

### Facts used

- Always-on agents "are stateful and proactive"; they "manage context across sessions and take actions without direct supervision". Not used in the voice, only the idea. (T1 article, William Hu, Nov 13 2026.)
- "Not actually always on": it sleeps most of the time and wakes for brief runs: it gets an event, does the task, saves what happened, sleeps again. (T1 article.)
- Inbox: user messages, webhooks, scheduled tasks and background jobs all write to one inbox, usually a database table. Only one worker runs per inbox. The voice says "one inbox"; the table and single worker are on screen. (T1 article.)
- Timers: a follow-up is a deadline the agent sets for itself. A scheduler polls the timer store and, when a timer is due, adds an event to the inbox. (T1 article.)
- Memory is files in durable storage that outlive the worker. `instructions.md`, `index.md` and `reported.md` load on every run; `notes/` and `progress/` are read when needed. `reported.md` records what the agent already told the user. `progress/` holds one file per ongoing task: what's done and what's left. (T1 article.)
- Permissions: a run holds the user's access and runs unattended. A deferred tool call ends the run and saves the session mid-call. The user sees an approval card, and their answer returns as an inbox event that starts a new run, which resumes the session. (T1 article.)
- Outbox: the user gets the outcome, not a live stream. A run ends by sending a message, deciding nothing needs sending, or asking for permission or input. "Start quiet and then earn more of the user's attention over time." (T1 article.)
- **Illustrative (the article has no example):** the whole Acme quote scenario, Dana's studio, the contents of the three files, event ids, timer times, the follow-up wording and the outbox line. Real file and folder names (`instructions.md`, `reported.md`, `progress/`) come from the article's example layout.
- Not used: the 78%-cheaper-per-task benchmark figure (optional in the brief).

---

## T2 · Wed Nov 18 · How to use Opus 5.5 as your daily driver

- **Slug:** `ep19-opus-daily-driver-60s`
- **On-screen title (frame 0):** "How to use Opus 5.5 as your daily driver", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** The user's wording, almost verbatim, so it matches the search phrase. It is a how-to, which saves well (W3), and the retail twist (nobody had raised it) is the reward.
- **Length:** 153 words ≈ 55 s of speech, est. runtime ≈ 59 s.

### Script

> Here's how to use Opus five point five as your daily driver, in under sixty seconds. Say growth slowed at your retail company, and your manager has four theories to test. Habit one: put everything in your first message. Say what the goal is, what the finished output looks like, and when to stop and ask. Habit two: drop "think hard". Thinking is always on, and removing the phrase made replies start sooner, with no clear drop in quality. Habit three: leave effort on Medium, the default. In testing, Medium matched or beat Opus five at High, so move up only when Medium stalls. Habit four: ask for the finished file, not an outline. Claude tested all four theories against your sales data, and none held up, though one couldn't be fully ruled out. It also found what nobody had raised. New stores opened too close to old ones and pulled sales away.

**Word count: 153**

### Beats

- **Cold open** (s01): "Here's how to use Opus five point five as your daily driver, in under sixty seconds."
- **Set up the example** (s01): "Say growth slowed at your retail company, and your manager has four theories to test."
- **Mechanism 1** (s02): "Habit one: put everything in your first message. Say what the goal is, what the finished output looks like, and when to stop and ask."
- **Mechanism 2** (s03): "Habit two: drop "think hard". Thinking is always on, and removing the phrase made replies start sooner, with no clear drop in quality."
- **Mechanism 3** (s04): "Habit three: leave effort on Medium, the default. In testing, Medium matched or beat Opus five at High, so move up only when Medium stalls."
- **Mechanism 4** (s05): "Habit four: ask for the finished file, not an outline."
- **Payoff** (s06): "Claude tested all four theories against your sales data, and none held up, though one couldn't be fully ruled out. It also found what nobody had raised. New stores opened too close to old ones and pulled sales away."
- *Formula note:* "Name it" is folded into the cold open and the setup, because the term is plain. Each mechanism scene's eyebrow names the piece being shown.
- *Formula note:* the habits are the mechanism; the retail example is the setup and the payoff.

### Through-line

The **manager's note and folder**: four theories and two files (`sales-by-store.xlsx`, `leadership-offsite.pdf`). They become the first message, then each theory is stamped, then the finding is shown on a map.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–12 s** · **Cold open + the example.** Frame 0 is the title, with a big 60. Under it, a claude.ai composer with the Claude mark and a `Opus 5.5` chip. A manager's note drops in: *"Why did growth slow? Four theories:"* with the four below, next to a folder holding `sales-by-store.xlsx` and `leadership-offsite.pdf`. Theories (illustrative): `1 We raised prices too much` · `2 Online rivals took our shoppers` · `3 We ran fewer promotions` · `4 Our best staff left`.
2. **s02 · ≈12–21 s** · **Habit one · first message.** The message types into the composer: `Growth slowed a lot this year…`, then three bracketed parts light up in turn, tagged **Goal**, **Finished output** and **When to stop and ask**: `…I need a doc I can share, then slides for the board.` / `Stop and ask me if a store's data looks wrong.` (middle lines illustrative). It ends `Please test each of the four theories against the data and tell me which ones hold up.` The files attach.
3. **s03 · ≈21–30 s** · **Habit two · drop "think hard".** The message gains `Think hard about this.` and the phrase is struck through. A dot labelled "Thinking: always on" pulses beside the composer regardless. Two reply bars race: the one without the phrase starts first and is labelled "Reply starts sooner"; both finish with the same quality tick ("no clear drop in quality"). Schematic, not to scale.
4. **s04 · ≈30–39 s** · **Habit three · effort.** A cursor clicks the model name next to the send button; a menu opens: `Effort`, with **Medium (default) ✓** and **High**. Two bars: *Opus 5.5 · Medium* as tall as or taller than *Opus 5 · High* ("on evals"), with a rule line "Move to High only when Medium stalls".
5. **s05 · ≈39–43 s** · **Habit four · finished file.** Two outputs side by side: an outline (a bulleted list, struck) and a finished file: a document page titled `Why growth slowed`, with a chart and a slider handle, and a deck thumbnail beside it. The finished file glows.
6. **s06 · ≈43–58 s** · **Payoff · the finding.** The four theory cards each get a stamp: three read **Doesn't hold up** and one reads **Can't be fully ruled out** (theory 3, illustrative). A store map appears with a new store ringed; stores are recoloured by distance and a scatter chart draws `sales change vs distance to the new store` (illustrative points) with a regression line sloping up with distance. Headline: **New stores opened too close to existing ones.** The board slide opens with that sentence as its title. Hard stop.

### Caption (same for every style variant)

```text
How to use Opus 5.5 as your daily driver, explained in 60 seconds.
Four habits for better answers: one complete first message, no "think hard", Medium effort, and ask for the finished file.
Which habit will you try first?

#ai #claude #aitools #techcareers
```

**YouTube title (53 characters):** Opus 5.5 as Your Daily Driver: 4 Habits in 60 Seconds

### Facts used

- Opus 5.5 is the default model on Pro, Max, Ultra and Team plans, and the article recommends leaving it selected for research, analysis, memos, reports, spreadsheets and decks. (T2 article, Aleksandra Todorova, Nov 12 2026.) Only used as background for the "daily driver" title.
- Habit 1: in the first message, say what done looks like: the goal, the finished output, and when to stop and ask; don't drip-feed instructions. (T2 article.)
- Habit 2: drop "think hard". Thinking is always on and scales with the request and effort level; removing the phrase made replies start sooner with no clear drop in quality. (T2 article.)
- Habit 3: start at Medium effort (the default). On evals, Opus 5.5 at Medium matched or beat Opus 5 at High. Move to High only when Medium stalls. Change it by clicking the model name next to the send button, then Effort. (T2 article.)
- Habit 4: ask for the finished file (a spreadsheet, document or deck), not an outline. (T2 article.)
- Demo: a hypothetical retail company whose growth slowed. The manager's note lists four theories; the folder has spreadsheets of sales by store and PDFs from the leadership off-site. The prompt, at Medium effort, starts "Growth slowed a lot this year..." and ends "Please test each of the four theories against the data and tell me which ones hold up." Result: none of the four held up, though one couldn't be fully ruled out. Claude found that new stores opened too close to existing ones and pulled sales from them. The pattern showed only when stores were filtered by distance to a new store, and Claude backed it with a regression of sales against distance. Deliverables: a doc with charts and a distance slider, then board slides that open with the answer. (T2 article.)
- **Illustrative:** the wording of the four theories and which one "can't be ruled out"; the middle lines of the first message (finished output, when to ask); the scatter points; the file names `sales-by-store.xlsx` and `leadership-offsite.pdf`; the doc and slide titles.
- Not used: the 16-of-18 reports figure, the 63 vs 93 minute merger model, the per-token prices.

---

## T3 · Thu Nov 19 · Why Uber treats AI agents like insiders

- **Slug:** `ep20-uber-agent-insiders-60s`
- **On-screen title (frame 0):** "Why Uber treats AI agents like insiders", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** Named-company curiosity (W1): why would a company that moves forty million trips a day treat a chatbot like an employee? The answer is the insider-threat idea. Uber is named as the subject, never cited, and we use no Uber logo.
- **Length:** 149 words ≈ 53 s of speech, est. runtime ≈ 59 s.

### Script

> Here's why Uber treats AI agents like insiders, in under sixty seconds. Every company watches its people for insider threats, because staff sometimes act outside their role. Frontier models, the most capable AI, carry the same risk. Say an agent is about to send customer data to a site Uber doesn't want. First, every request passes through a gateway, a perimeter that controls how AI gets used. Second, safeguards built with Anthropic check what the models produce, and Uber decides what happens when one fires. Third, a system called AI Detection and Response watches in real time and catches the agent acting outside its bounds. It steps in, close to the person typing, with a nudge like, you probably don't want to do that. Then analysts hunt for behavior nobody expected and feed it back into the safeguards. But new limits create new behavior, so the loop never ends.

**Word count: 149**

### Beats

- **Cold open** (s01): "Here's why Uber treats AI agents like insiders, in under sixty seconds." The forty-million-trips counter runs on screen under the title (not spoken).
- **Name it** (s02): "Every company watches its people for insider threats, because staff sometimes act outside their role. Frontier models, the most capable AI, carry the same risk."
- **Set up the example** (s03): "Say an agent is about to send customer data to a site Uber doesn't want."
- **Mechanism 1** (s04): "First, every request passes through a gateway, a perimeter that controls how AI gets used."
- **Mechanism 2** (s05): "Second, safeguards built with Anthropic check what the models produce, and Uber decides what happens when one fires."
- **Mechanism 3** (s06): "Third, a system called AI Detection and Response watches in real time and catches the agent acting outside its bounds."
- **Mechanism 4** (s07): "It steps in, close to the person typing, with a nudge like, you probably don't want to do that."
- **Payoff** (s08): "Then analysts hunt for behavior nobody expected and feed it back into the safeguards. But new limits create new behavior, so the loop never ends."

### Through-line

The **upload request**: an agent task card `upload customers.csv → unknown-site.example` that is stopped, flagged and nudged at each layer. The same card appears in every scene.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–9 s** · **Cold open.** Frame 0 is the title with a big 60. Under it a counter runs up to `40,000,000+ trips and delivery orders / day`, with small city-grid dots lighting up. The word "Uber" is text only: no logo.
2. **s02 · ≈9–17 s** · **Name it · insiders.** Two rows of badge cards. *Employees*: `badge · activity logged · data retained · monitored` under a stamp **Insider threat program**. *AI agents*: `?`. A line draws from "staff sometimes act outside their role" to a small figure stepping over a dotted line. On "Frontier models carry the same risk" the agent row fills in with the same four chips.
3. **s03 · ≈17–23 s** · **Setup · the request.** The agent task card pops in: `tool: upload` · `file: customers.csv` · `to: unknown-site.example`, marked **illustrative**. It slides toward a wall labelled "Uber".
4. **s04 · ≈23–27 s** · **1 · Gateway.** A ring draws around a block of AI traffic and the card passes through one door labelled `LLM gateway · controls how AI is used inside Uber`. Eyebrow: "1 · Gateway".
5. **s05 · ≈27–34 s** · **2 · Safeguards.** A checker panel `Enterprise Frontier Safeguards · built with Anthropic` reads the model's output. The card trips it: `Safeguard fired: destination not on the allowed list`. A selector shows the options Uber chooses between (illustrative: **allow · warn · block**), labelled "Uber decides". Foot: "Anthropic can't see Uber's data without permission."
6. **s06 · ≈34–42 s** · **3 · Detection.** A live telemetry feed scrolls into a panel `AI Detection and Response (ADR) · open-sourced`, with a small "safeguards" arrow feeding it as one data source. A red row appears: `agent acted outside its bounds: upload to unknown-site.example`. A radar-ping label says "real time".
7. **s07 · ≈42–49 s** · **3 · The nudge.** A person typing a prompt in a chat box. A speech bubble pops next to the box: *"You probably don't want to do that."* The card stops short of the wall. Label: "as close as possible to the person typing".
8. **s08 · ≈49–58 s** · **Payoff · the loop.** An analyst (with a small Claude mark: "often with help from an LLM") studies a new pattern, illustrative: `agent splits the file into small uploads`. It becomes a new row in the safeguards panel. The agent then tries a new route, and the loop arrow spins. Last line on screen: "Constraints create new behaviors." Hard stop.

### Caption (same for every style variant)

```text
How Uber treats AI agents like insiders, explained in 60 seconds.
A gateway, safeguards and real-time detection, plus a loop that keeps learning new behavior.
Do you watch your AI tools the way you watch your people?

#ai #aisecurity #cybersecurity #techcareers
```

**YouTube title (46 characters):** Uber's AI Insider Threat Program in 60 Seconds

### Facts used

- Thesis: AI agents need the same kind of insider threat program companies already run for employees. "Every company already runs an insider threat program for its people." "Frontier models introduce the same risk." Companies already accept data retention and monitoring for staff because people sometimes act outside their role; agents can too. (T3 article, interview with Philip Martin, Uber's CISO, Oct 13 2026.)
- Uber handles "over 40 million trips and delivery orders a day". (T3 article.)
- Three parts: (1) an LLM gateway that "builds a perimeter" and controls how AI is used inside Uber; (2) Enterprise Frontier Safeguards, built with Anthropic, classifier output on the models; Anthropic can't access Uber's data without permission and Uber decides what happens when one fires; (3) AI Detection and Response (ADR), open-sourced by Uber, which collects real-time telemetry and takes real-time action in the agent harnesses; the safeguards feed into ADR as a data source. (T3 article.)
- Priority 1: real-time detection and intervention as close as possible to the person typing the prompt, e.g. telling them "You probably don't want to do that", or flagging a tool or destination Uber doesn't want. (T3 article.)
- Priority 2: analysts, often with help from an LLM, find behaviors nobody expected and build them into the real-time safeguards; "constraints create new behaviors", so the cycle repeats. (T3 article.)
- **Illustrative (no case study in the article):** the customers.csv upload, `unknown-site.example`, the safeguard's allow/warn/block options, the "splits the file" pattern, the badge-card wording. The article has nothing on agent identity, permission scoping, behavioral baselines, logging details or kill switches, and the scenes show none of them.

---

## T4 · Fri Nov 20 · How Claude Code runs in the cloud

- **Slug:** `ep21-claude-code-cloud-60s`
- **On-screen title (frame 0):** "How Claude Code runs in the cloud", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** Not a named-company story, so the hook is the concrete experiment: three jobs, three machines, done in under a minute and a half. Plain "how" title with the product name first for search.
- **Length:** 153 words ≈ 55 s of speech, est. runtime ≈ 60 s.

### Script

> Here's how Claude Code runs in the cloud, in under sixty seconds. Say your app has a test that fails at random, out-of-date docs, and a logger that should print JSON. You hand each job to Claude in the cloud. Each task gets a fresh virtual machine, with your repository cloned onto a new branch, so push your commits first. Your GitHub token never enters that machine. A proxy holds it and gives the session a short-lived credential that can push only to its own branch. Because every task has its own machine, all three run at once. In one experiment, all three finished within eighty-seven seconds of the first one starting. The sessions can't see each other, so split the work along file boundaries. Each job comes back as a branch you can turn into a pull request. For a local database, a VPN-only service, or a GPU, stay on your laptop.

**Word count: 153**

### Beats

- **Cold open** (s01): "Here's how Claude Code runs in the cloud, in under sixty seconds."
- **Set up the example** (s02): "Say your app has a test that fails at random, out-of-date docs, and a logger that should print JSON. You hand each job to Claude in the cloud."
- **Mechanism 1** (s03): "Each task gets a fresh virtual machine, with your repository cloned onto a new branch, so push your commits first."
- **Mechanism 2** (s04): "Your GitHub token never enters that machine. A proxy holds it and gives the session a short-lived credential that can push only to its own branch."
- **Mechanism 3** (s05): "Because every task has its own machine, all three run at once. In one experiment, all three finished within eighty-seven seconds of the first one starting."
- **Mechanism 4** (s06): "The sessions can't see each other, so split the work along file boundaries."
- **Payoff** (s07): "Each job comes back as a branch you can turn into a pull request. For a local database, a VPN-only service, or a GPU, stay on your laptop."
- *Formula note:* "Name it" is folded into the cold open and the setup, because the term is plain. Each mechanism scene's eyebrow names the piece being shown.

### Through-line

The **three job cards** (flaky test, docs, logger) from the author's `tidepool` experiment. Each becomes a VM, then a branch, then a pull request. The article's example is real; only the branch names after the `claude/` prefix are ours.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–5 s** · **Cold open.** Frame 0 is the title with a big 60. Three small cards float from a laptop up into a cloud.
2. **s02 · ≈5–15 s** · **Setup · three jobs.** A repo tree `tidepool/` (a small Node API that predicts tides) with `src/server.js`, `src/logger.js` and `docs/API.md`. Three job cards pin to it: `Fix the flaky test (a race in TtlCache.get)`, `Rewrite docs/API.md to match src/server.js`, `Make src/logger.js emit JSON lines`. A terminal runs the command for each: `claude --cloud "fix the flaky TtlCache.get test"`.
3. **s03 · ≈15–22 s** · **1 · A machine per task.** First the terminal runs `git push origin main` ("push first: the VM clones your GitHub remote"). Then three boxes spin up, each tagged `fresh VM · ~4 vCPUs · 16 GB RAM · 30 GB disk`, with the repo cloned and a branch chip: `claude/fix-flaky-ttl-test`, `claude/rewrite-api-docs`, `claude/json-logger` (names after `claude/` illustrative).
4. **s04 · ≈22–32 s** · **2 · The token stays out.** One VM zooms. Outside it, a padlocked box `your GitHub token` sits behind a gate labelled `proxy`. The VM receives only a small key: `short-lived credential · push to claude/fix-flaky-ttl-test only`. A push to `main` bounces off with a red ✗ (illustrative attempt).
5. **s05 · ≈32–42 s** · **3 · In parallel.** Three lanes and a stopwatch. The lanes start within 16 s of each other (offsets 0:00 · 0:09 · 0:16 illustrative), and all three tick ✓ by `1:27`, "87 s after the first began". Results: `flaky test: suite ran 40× · 0 failures`, `API.md: 5 errors fixed`, `logger: JSON lines`.
6. **s06 · ≈42–47 s** · **3 · File boundaries.** Dashed walls between the three sessions, with a note "Sessions don't know about each other". The three jobs touch different files, `the cache test`, `docs/API.md`, `src/logger.js`, and no file is shared. A fourth, struck-out job that edits two of those files shows a clash icon.
7. **s07 · ≈47–58 s** · **Payoff · a branch back.** Three branches slide into a list, each with a **Create PR** button; one is clicked and a pull request opens. Then a footer panel: **Stay local for:** `local databases · VPN-only services · GPUs · simulators · tight visual loops`. Hard stop.

### Caption (same for every style variant)

```text
Claude Code in the cloud, explained in 60 seconds.
Every task gets its own virtual machine and branch, so three jobs can run at once and come back as pull requests.
Would you run your next bug fix in the cloud?

#ai #claudecode #cloudcomputing #softwareengineer
```

**YouTube title (48 characters):** Claude Code in the Cloud Explained in 60 Seconds

### Facts used

- "Each task gets a fresh virtual machine with your repository cloned onto a new branch." The VM has about 4 vCPUs, 16 GB of RAM and 30 GB of disk. Branches are prefixed `claude/`. (T4 article, Addy Osmani, Oct 6 2026.) The VM spec is on screen, not in the voice.
- "Your GitHub token never enters the VM. A proxy holds it, and the session gets a short-lived credential that can push only to its own working branch." (T4 article.)
- Start from the terminal with `claude --cloud "<task>"`. Push your commits first: the VM clones your GitHub remote. (T4 article.)
- The result is a branch, optionally a pull request through Create PR. (T4 article.)
- Parallel experiment on "tidepool", a small Node API that predicts tides: three sessions started within 16 seconds of each other and all three were done 87 seconds after the first began. Flaky test: a race in `TtlCache.get`, fixed by storing the in-flight promise, suite then ran 40 times with 0 failures. Docs: a rewrite of `docs/API.md` to match `src/server.js` found 5 errors. Logger: `src/logger.js` now emits JSON lines. Lesson: sessions don't know about each other, so split the work along file boundaries. (T4 article.)
- Stay local for local databases, VPN-only services, GPUs, simulators or tight visual loops. (T4 article.)
- **Illustrative:** the three branch names after `claude/`, the start offsets inside the 16 s, the blocked push to `main`, and the struck-out fourth job. Not used: the network allowlist levels, `claude --teleport`, the cost and idle-VM notes.

---

## T5 · Sat Nov 21 · How Anthropic's sales team rebuilt inbound with an agent

- **Slug:** `ep22-anthropic-sales-agent-60s`
- **On-screen title (frame 0):** "How Anthropic's sales team rebuilt inbound with an agent", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** Named-company story (W1): a company using its own product to fix its own bottleneck. "Inbound" is defined in the second sentence so the title does not lose non-sales viewers.
- **Length:** 150 words ≈ 54 s of speech, est. runtime ≈ 58 s.

### Script

> Here's how Anthropic's sales team rebuilt inbound with an agent, in under sixty seconds. Inbound means the people who contact sales first. Say you fill in the Contact Sales form. A rep qualifies you, then passes you on, and you could wait days. With tens of thousands of requests a month, the team couldn't keep up, yet most questions were simple, like what a plan costs. So one engineer built a buying agent. It asks what you're trying to solve, then answers from the docs. It recommends a plan, sometimes the Team plan instead of Enterprise. Every conversation ends one of three ways. You can buy at checkout, get a quick answer, or be handed to a person, with the full conversation and the reason it escalated. Those hand-offs become real sales opportunities more than twice as often as the old form's leads, and they close about five days faster.

**Word count: 150**

### Beats

- **Cold open** (s01): "Here's how Anthropic's sales team rebuilt inbound with an agent, in under sixty seconds."
- **Name it** (s01): "Inbound means the people who contact sales first."
- **Set up the example** (s02, s03): "Say you fill in the Contact Sales form. A rep qualifies you, then passes you on, and you could wait days. With tens of thousands of requests a month, the team couldn't keep up, yet most questions were simple, like what a plan costs."
- **Mechanism 1** (s04): "So one engineer built a buying agent. It asks what you're trying to solve, then answers from the docs. It recommends a plan, sometimes the Team plan instead of Enterprise."
- **Mechanism 2** (s05): "Every conversation ends one of three ways. You can buy at checkout, get a quick answer, or be handed to a person, with the full conversation and the reason it escalated."
- **Payoff** (s06): "Those hand-offs become real sales opportunities more than twice as often as the old form's leads, and they close about five days faster."

### Through-line

The **buyer's question card** (`What does a plan cost?`) that waits in the old queue and is answered in the new flow. The two other real questions (seat minimum, HIPAA) ride along.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–9 s** · **Cold open + name it.** Frame 0 is the title with a big 60. A Contact Sales form, with fields *Name*, *Work email* and *How can we help?*, shows "inbound" highlighted as it is defined, with an arrow "people who contact sales first".
2. **s02 · ≈9–17 s** · **Setup · the old path.** You submit the form; the question card `What does a plan cost?` enters a chain: **Form → Business development rep (qualifies) → Account executive**. A clock beside the queue ticks to "multiple days".
3. **s03 · ≈17–25 s** · **The backlog.** A pile of requests counts up to "tens of thousands / month", and a little person labelled "team" is buried ("couldn't keep up"). Three cards lift out of the pile, tagged *answer already in the docs*: `What does a plan cost?`, `Is there a seat minimum?`, `Can we meet HIPAA requirements?`.
4. **s04 · ≈25–36 s** · **1 · The buying agent.** The Contact Sales page now has two buttons: `Talk to the buying agent` and `Talk to a rep` (opt-in). A chat opens with a small Claude mark on the agent's avatar. Agent: `What are you trying to solve?` You: `Support tickets for a team of 15` (illustrative). It answers from a docs chip and a knowledge-base chip, then: `For a team your size, I'd suggest Team.` (illustrative). A caption shows what the builder brought: **the prompt · the tools · the knowledge base**, and "one engineer".
5. **s05 · ≈36–47 s** · **2 · Three endings.** The conversation forks into three lanes: **Checkout** (a cart with a Buy button), **Quick answer** (one reply bubble), **Hand-off** (a card to a rep: `Handed to a rep · full conversation attached · Reason: needs a custom security review`, illustrative reason).
6. **s06 · ≈47–57 s** · **Payoff · results.** Two bar pairs. *Escalated leads becoming opportunities*: old form = 1×, agent hand-offs = "more than 2×" (drawn at 2×). *Days to close*: a bar shortens by "about five days" on "faster". Foot (on screen only): "Conversations that needed a person to close: down about half". Hard stop.

### Caption (same for every style variant)

```text
How Anthropic's sales team rebuilt inbound with an AI agent, explained in 60 seconds.
Simple questions get answered from the docs, and people take the hand-offs.
What would you hand to an agent first in your own sales inbox?

#ai #aiagents #claude #techcareers
```

**YouTube title (50 characters):** Anthropic's AI Sales Agent Explained in 60 Seconds

### Facts used

- Before: a buyer filled in the Contact Sales form, a business development rep qualified the lead, then passed it to an account executive; customers sometimes waited "multiple days". (T5 article, Carl Johnson, Sep 30 2026.)
- "Tens of thousands of inbound requests every month" and the team "couldn't keep up". Most questions were simple and answered in the docs: what a plan costs, whether there's a seat minimum, whether HIPAA requirements can be met. (T5 article.)
- After: a buying agent on Claude Managed Agents (beta). The builder brings "the prompt, the tools, and the knowledge base". It lives on the Contact Sales and Pricing pages, in the product, in emails and in Claude.ai, and it is opt-in: the customer chooses the agent or a rep. It asks follow-ups, answers pricing, security and data questions from the docs and a knowledge base, and recommends a plan and seat count, sometimes Team instead of Enterprise for small teams. (T5 article.) The voice says "a plan" and omits seat count.
- Every conversation ends one of three ways: a purchase straight to checkout; a hand-off to a rep "along with the full conversation details" and the reason it escalated; or a quick answer. (T5 article.)
- Results: escalated leads become opportunities "more than twice as often" as leads from the old form and close "about five days faster"; the share of conversations needing a person to close fell by about half. (T5 article.) The five-day figure is on screen only.
- Built by one engineer in a few weeks ("a prompt, a handful of tools, and Claude"); the goal prompt "Your goal is to understand customer requirements, qualify prospects, and recommend the best plan." (T5 article.) The voice says only "one engineer".
- **Illustrative:** the buyer's "team of 15" reply, the plan recommendation line, the escalation reason, and the form's field names. Not shown, because the article doesn't mention them: lead scoring, sub-agents, a CRM, automated email drafting. Not used: Ojas's 6-vs-10-email figure and 2.5×.

---

## T6 · Sun Nov 22 · Why long Claude Code sessions got cheaper

- **Slug:** `ep23-cheaper-long-sessions-60s`
- **On-screen title (frame 0):** "Why long Claude Code sessions got cheaper", with the big **60** and "seconds" under it in the accent colour.
- **Angle:** A "why" title with a surprise in it (longer sessions, lower cost). The idea underneath, that every turn re-sends the whole conversation, is a foundational term in the W2 sense, and it ends on the viewer's own action (`/usage`).
- **Length:** 152 words ≈ 54 s of speech, est. runtime ≈ 60 s.

### Script

> Here's why long Claude Code sessions got cheaper, in under sixty seconds. Say you ask Claude Code to fix a bug. Every turn, it re-sends the whole conversation in tokens, small pieces of words, including your ask, the files it read, and every tool result. For every token Claude writes, it now reads three hundred twenty-four, up from one hundred eighty-nine in March. Reading a cached token, one saved from an earlier turn, is now sixty percent cheaper. Claude Code also breaks the cache less often. Refreshing your login or adding instructions mid-conversation are less likely to reset it, so input that misses the cache fell by more than half. And Opus five point five needs fewer turns for the same job. Together, that's an estimated forty percent cheaper than Opus five. Run slash usage to see how much of yours is cached reads, because no single number holds for every codebase.

**Word count: 152**

### Beats

- **Cold open** (s01): "Here's why long Claude Code sessions got cheaper, in under sixty seconds."
- **Set up the example** (s02): "Say you ask Claude Code to fix a bug."
- **Mechanism 1** (s03): "Every turn, it re-sends the whole conversation in tokens, small pieces of words, including your ask, the files it read, and every tool result."
- **Mechanism 2** (s04): "For every token Claude writes, it now reads three hundred twenty-four, up from one hundred eighty-nine in March."
- **Mechanism 3** (s05): "Reading a cached token, one saved from an earlier turn, is now sixty percent cheaper."
- **Mechanism 4** (s06): "Claude Code also breaks the cache less often. Refreshing your login or adding instructions mid-conversation are less likely to reset it, so input that misses the cache fell by more than half."
- **Mechanism 5** (s07): "And Opus five point five needs fewer turns for the same job. Together, that's an estimated forty percent cheaper than Opus five."
- **Payoff** (s08): "Run slash usage to see how much of yours is cached reads, because no single number holds for every codebase."
- *Formula note:* "Name it" is folded into the cold open and the setup, because the term is plain. Each mechanism scene's eyebrow names the piece being shown.

### Through-line

The **growing conversation stack**: turn 1 holds your ask; turn 2 adds a file and a tool result; turn 3 adds more. The block already stored glows as the cache. The same stack is in every scene.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–5 s** · **Cold open.** Frame 0 is the title with a big 60. A Claude Code terminal prompt sits under it with a small price tag chip "cached: 60% cheaper".
2. **s02 · ≈5–9 s** · **Setup · the bug.** The terminal, with the Claude mark: `> fix the failing test in auth.test.ts` (illustrative). Turn 1 box appears: **Your ask**.
3. **s03 · ≈9–16 s** · **1 · Every turn re-sends everything.** The stack grows: turn 2 = *your ask + auth.ts (file it read) + `npm test` output (tool result)*, turn 3 = *all of that + the new result*. Each turn's box contains the earlier boxes. Token labels `4k → 11k → 19k` (illustrative).
4. **s04 · ≈16–23 s** · **2 · The ratio.** Two to-scale bars, "tokens read per token written": *March* 189 : 1 and *September* 324 : 1. The September bar is 1.7× the March one (324/189).
5. **s05 · ≈23–28 s** · **3 · Cache reads.** The part of the stack already stored (turns 1–2) lights up and is labelled **cached: read at 60% off**. A price bar shows 100 → 40 for a cached token, with "Cache reads are most of what agentic and coding work costs".
6. **s06 · ≈28–40 s** · **4 · The harness breaks it less.** Three wrenches approach the cached block: `refresh your login`, `add instructions mid-conversation`, `load a tool on demand`. The block stays lit and each wrench gets a faint "less likely to reset it". A bar: *input that misses the cache* falls by more than half (a ghost bar at 50%).
7. **s07 · ≈40–50 s** · **5 · The model, then the total.** Two lanes run the same bug fix: *Opus 5* takes more turns and tool calls, and *Opus 5.5* takes fewer. A footer adds up the three changes: `≈ 40% cheaper than Opus 5 · estimate`. The 30%-faster output is not shown here, because it saves waiting time, not money.
8. **s08 · ≈50–57 s** · **Payoff · measure yours.** The terminal runs `/usage` and a panel shows a line `cached reads` as a share of usage (illustrative panel, number marked as an example). Last line on screen: "No single number holds for every codebase. Measure yours." Hard stop.

### Caption (same for every style variant)

```text
Why long Claude Code sessions got cheaper, explained in 60 seconds.
Every turn re-sends the whole conversation, and a cached read now costs 60% less.
Have you checked how much of your usage is cached?

#ai #claudecode #llm #softwareengineer
```

**YouTube title (48 characters):** Claude Code Costs: Why Long Sessions Got Cheaper

### Facts used

- March to September 2026: context per request grew 2.6×; the ratio of input to output tokens went from 189:1 to 324:1, so a session is mostly reading. (T6 article, Michael Segner, Sep 24 2026.) The 2.6× is not in the voice or on screen.
- Price: input and output tokens are 20% cheaper, and reading a cached token is 60% cheaper; cache reads are most of what agentic and coding work costs. (T6 article.) The voice uses only the 60%.
- Harness: "Input that misses the cache decreased by more than 50%" even as sessions got longer. Refreshing a login, adding instructions mid-conversation and loading tools on demand are less likely to break the cache. Changing the effort level mid-session doesn't reset it. (T6 article.)
- Model: Opus 5.5 needs fewer turns and tool calls for the same task and writes output 30%+ faster than Opus 5. (T6 article.)
- Overall: about 40% cheaper to run than Opus 5 on typical token-billed workloads. This is an estimate, and the voice says so. (T6 article.)
- Run `/usage` in Claude Code to see how much of your usage is cached reads. "No single number holds for every codebase, so measure it." Short, mechanical tasks take about as many turns as before (on screen only if there's room). (T6 article.)
- **Concept (from the brief):** each turn re-sends the whole conversation, and the part already in the cache is read cheaply. **Illustrative:** every token count in the stack, the test and file names, and the `/usage` panel's layout and numbers (the article gives none). Not used: context window sizes and benchmark scores, which the article doesn't give.

---

## T7 · Mon Nov 23 · How Claude made claude.ai 3× faster in two weeks

- **Slug:** `ep24-claude-ai-faster-60s`
- **On-screen title (frame 0):** "How Claude made claude.ai 3× faster in two weeks", with the big **60** and "seconds" under it in the accent colour. The title shows "3×"; the voice says "three times" (like 60 → "sixty").
- **Angle:** Named-company story with a number in the title (W1). The title is the article's own claim, and the voice keeps the honest limit: a person approved every change. The respelling "claude dot A I" is for the voice only.
- **Length:** 149 words ≈ 53 s of speech, est. runtime ≈ 59 s.

### Script

> Here's how Claude made claude dot A I three times faster in two weeks, in under sixty seconds. Say the message box is slow, because you can't type until the page loads. First, someone reports the slow spot. Second, Claude builds a benchmark that reproduces it. Third, Claude opens small pull requests behind a flag, an on-off switch, and watches real-world timings. The benchmark counts CPU instructions, not milliseconds, because clock timing is too noisy. If it got faster, a daily job lowers the allowed count, and any pull request that raises it fails. If not, the flag goes off and Claude tries again. One fix bakes an HTML copy of the message box into the page, so you can type while the rest loads. Overall, the wait before you can type fell from three point one seconds to about half a second, and a person approved every change.

**Word count: 149**

### Beats

- **Cold open** (s01): "Here's how Claude made claude dot A I three times faster in two weeks, in under sixty seconds."
- **Set up the example** (s02): "Say the message box is slow, because you can't type until the page loads."
- **Mechanism 1** (s03): "First, someone reports the slow spot. Second, Claude builds a benchmark that reproduces it. Third, Claude opens small pull requests behind a flag, an on-off switch, and watches real-world timings."
- **Mechanism 2** (s04): "The benchmark counts CPU instructions, not milliseconds, because clock timing is too noisy."
- **Mechanism 3** (s05): "If it got faster, a daily job lowers the allowed count, and any pull request that raises it fails. If not, the flag goes off and Claude tries again."
- **Mechanism 4** (s06): "One fix bakes an HTML copy of the message box into the page, so you can type while the rest loads."
- **Payoff** (s07): "Overall, the wait before you can type fell from three point one seconds to about half a second, and a person approved every change."
- *Formula note:* "Name it" is folded into the cold open and the setup, because the term is plain. Each mechanism scene's eyebrow names the piece being shown.

### Through-line

The **message box** (the composer): greyed and blocked in s02, flagged, benchmarked, fixed with an HTML copy, then accepting typing at once in the last scene.

### Scene sketch

Everything sits in the safe box (x 90–950, y 220–1500). The Sanjay avatar peeks large at the cold open, then sits in the corner and steps out on any scene that fills the box. Files, code and terminals show the lines quoted.

1. **s01 · ≈0–7 s** · **Cold open.** Frame 0 is the title with a big 60. A claude.ai window (with the Claude mark) sits beside a stopwatch, and a big "3×" is on the title.
2. **s02 · ≈7–13 s** · **Setup · the slow box.** The same window, with the message box greyed and a blocked caret. A page-load bar fills to `3.1 s` labelled "fresh load, until you can type". You tap the box and nothing happens.
3. **s03 · ≈13–26 s** · **Loop · flag, benchmark, small PRs.** Three steps down the page. 1) A Slack message to Claude: `The message box takes about 3 seconds before it accepts typing.` 2) A benchmark card: `bench: fresh load → first input` that replays the slow spot. 3) A small pull request, `Static composer (behind flag static-composer)`, with a flag switch and a 6-line diff (illustrative):
    ```ts
    if (flags.staticComposer) {
      hydrateFrom(document.getElementById("composer-static"));
    }
    ```
    A line chart labelled `deploy + field data` follows it.
4. **s04 · ≈26–31 s** · **CPU instructions, not milliseconds.** Two meters side by side. *Milliseconds*: `41 · 38 · 52 · 44 ms` jitters. *CPU instructions*: `1.90M · 1.90M · 1.90M` stays flat. Label: "wall-clock timing is too noisy" (all numbers illustrative).
5. **s05 · ≈31–43 s** · **The ratchet.** A CI panel. Case A (faster): the daily job lowers the allowed count, `composer path ceiling 1.90M → 1.88M instructions` (illustrative numbers), and a PR that raises it shows **✗ failed CI**. Case B (not faster): the flag switches OFF and an arrow loops back to "Claude tries again".
6. **s06 · ≈43–51 s** · **The fix · static composer.** A page-load timeline on throttled 4G. Top: the old page, input accepted at `2.93 s`. Bottom: an HTML copy of the message box is baked into the page, and the caret blinks and takes typing at `0.36 s`, while a bar "React loading…" keeps running underneath.
7. **s07 · ≈51–58 s** · **Payoff · result.** A counter runs `3.1 s → 0.55 s` for the fresh load, labelled "all fixes together". An **Approved by a person** stamp lands on the pull request. Foot: "Employees → 1% of users → everyone". Small line: "3.1× faster on average across 13 measurements." Hard stop.

### Caption (same for every style variant)

```text
How Claude made claude.ai 3× faster in two weeks, explained in 60 seconds.
A benchmark, a small pull request behind a flag, and a limit that only goes down.
Which part of your app feels slowest to you?

#ai #webperformance #claude #softwareengineer
```

**YouTube title (46 characters):** How Claude Made claude.ai 3x Faster in 2 Weeks

### Facts used

- The sprint: two weeks in August; Claude ran the performance work through Claude Tag in Slack, on an internal model roughly like Opus 5.5. Humans set the goals and approved every change. Over 3,000 merged changes, with no customer-facing incident or rollback. (T7 article, Raymond Wang, Sam Attard and Issac G., Sep 23 2026.) Only "two weeks" and "a person approved every change" are in the voice.
- On average 3.1× faster across 13 measurements (geometric mean), taken on four journeys that cover 95% of activity. The title and voice round this to three times. (T7 article.)
- p75 results: a fresh load of claude.ai until you can type, 3.1 s → 0.55 s. (T7 article.)
- The loop: someone flags a slow spot; Claude builds a benchmark that reproduces it; Claude opens small PRs behind a flag; Claude watches the deploy and the field data; if faster, the benchmark is ratcheted down ("any PR that raised the instruction counts of those paths failed CI, and a daily job lowered each ceiling"); if not, the flag goes off and Claude tries again. (T7 article.)
- CI counts CPU instructions instead of milliseconds because wall-clock timing is too noisy. (T7 article.)
- Static composer: an HTML copy of the message box is baked into the page so you can type while React loads. On throttled 4G, input was accepted at 0.36 s instead of 2.93 s. (T7 article.)
- Guardrails: human approval on every PR, short-lived flags, rollout to employees, then 1% of users, then everyone. (T7 article.)
- **Illustrative:** the Slack message wording, the flag name `static-composer`, the diff, the ceiling numbers, and the millisecond and instruction samples. Not used: the hidden finds (`location.reload()`, UTF-16 strings, 6,900 hooks), sidebar re-renders, prefetch, the 120 fps streaming figure.

---

## Things to check before approving

- **Voice spellings.** T7's voice text says "claude dot A I" (and the title shows `claude.ai`). "JSON", "CPU", "HTML", "GPU", "VPN" and "slash usage" are written as they should be spoken; listen to these in the first take before paying for the full episode.
- **Tightest runtimes.** T4 and T6 (≈ 60 s) are now the closest to the limit on the estimate. If the measured voice runs long, drop T4's "so push your commits first" (it's on screen) or T6's "Claude Code also breaks the cache less often."
- **Colon labels in T2.** "Habit one: …" mirrors ep17's "Layer three: …". If the colon reads as a list, switch to "Habit one, put…" with no change to the word count.
- **T1 hook length.** s01 holds the title, the "not actually always on" line and the loop diagram (≈ 13 s, longer than the ~9 s guide). It could split into a hook and a "what a run is" scene if the diagram needs room.
- **T7 "three times".** The article's number is 3.1× on average across 13 measurements. The voice keeps the title's rounder claim and shows the exact figure on the last frame.
- **T5 opt-in.** The article says customers choose the agent or a rep. That is shown in s04 but not said, to save words.
- **Illustrative examples** (T1 whole scenario, T3 upload request, parts of T5, T6 token counts and `/usage` panel, T7 diff and counters) are marked in each "Facts used" list so the episode storyboards can carry the same label.
