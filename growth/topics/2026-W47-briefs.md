# Week 47: source briefs (internal)

Notes on the seven articles in `2026-W47.md`, taken 2026-11-14. Use these when writing the scripts and when recording
facts in each episode's `STORYBOARD.md`. Anything not in a brief is **not** in the article, so don't claim it. An
example we make up must be marked as illustrative.

---

## T1 · Building always-on agents
William Hu, Nov 13 2026. https://claude.com/resources/articles/building-always-on-agents

**User's note:** show the visuals, with code and diagrams. Label files clearly so it's obvious what we're doing. The
viewer shouldn't have to second-guess anything.

- **Definition:** "Always-on agents are stateful and proactive, meaning they manage context across sessions and take
  actions without direct supervision."
- **"Not actually always on."** That phrase only describes how it feels to the user. The agent sleeps most of the
  time and wakes for brief **runs**: it gets an event, does the task, saves what happened, and sleeps again. The cycle
  repeats indefinitely. A run works inside a **session**, which is the transcript of messages and tool calls.
- **Five primitives: an event inbox, timers, memory, permissions, an outbox.**
  - **Inbox:** user messages, webhooks, scheduled tasks and background jobs all write to one inbox instead of calling
    the agent directly. The inbox is usually a database table; a handler writes to it and a worker reads from it.
    - Only one worker runs per inbox.
    - Events are deduplicated by source ID.
    - Several quick messages are batched into one reply.
    - A new event either resumes a session (for example a user reply) or starts a new one.
  - **Timers** make it proactive. There are two kinds:
    - A **follow-up** is a deadline the agent sets for itself, for example to check on a reply.
    - A **schedule** recurs, for example a daily newsletter.
    - A scheduler polls the timer store. When a timer is due, the scheduler adds an event to the inbox.
  - **Memory** is files in durable storage, so it outlives the worker.
    - Example layout: `instructions.md`, `index.md` and `reported.md` load on every run. The `notes/` and `progress/`
      folders are read when needed.
    - Rule: "memory should only hold what the agent can't look up again". For anything that lives elsewhere, store a
      pointer.
    - `reported.md` records what the agent has already told the user, so it doesn't repeat itself.
    - `progress/` holds one file per ongoing task: what's done and what's left.
  - **Permissions** are "where always-on agents carry the most risk": a run holds the user's access and runs unattended.
    - For each tool call, the agent proceeds, blocks, or waits for approval.
    - A credential proxy outside the agent adds the real credentials.
    - **Deferred tool call:** the run ends and the session is saved mid-call. The user sees an approval card. Their
      answer comes back as an inbox event, which starts a new run that resumes the session.
  - **Outbox:** the user gets the outcome, not a live stream. A run ends in one of three ways: it sends a message, it
    decides nothing needs sending, or it asks for permission or input. Advice: "start quiet and then earn more of the
    user's attention over time."
- **No worked example in the article.** The script needs one we make up and label as illustrative, for example an agent
  that watches your pull requests or follows up on an unanswered email.
- Number: "Opus 5.5 cost 78% less per solved task than Opus 5" on one long-horizon coding benchmark. This is optional
  and probably not needed.

## T2 · How to use Opus 5.5 as your daily driver
Aleksandra Todorova, Nov 12 2026.
https://claude.com/resources/articles/using-claude-opus-5-5-as-your-daily-driver-for-knowledge-work

- Opus 5.5 is the default model on the Pro, Max, Ultra and Team plans, and Anthropic recommends leaving it selected for
  research, analysis, memos, reports, spreadsheets and decks.
- **The habits to change:**
  - In the **first message**, say what done looks like: the goal, the finished output, and when to stop and ask.
    Don't drip-feed instructions.
  - **Drop "think hard."** Thinking is always on and scales with the request and the effort level. Removing the phrase
    made replies start sooner, with no clear drop in quality.
  - **Start at Medium effort**, which is the default. On Anthropic's evals, Opus 5.5 at Medium matched or beat Opus 5
    at High. Move to High only when Medium stalls. To change it, click the model name next to the send button, then
    Effort.
  - **Attach the chart** or screenshot instead of retyping its numbers.
  - **Ask for the finished file** (a spreadsheet, document or deck), not an outline.
  - Name the specific styles you don't want. "Avoid a generic look" just swaps one default for another.
  - Give it your house style.
  - Connect your files and systems with connectors.
- **Rule of thumb:** if the output disappoints, raise the effort first. Move up a model only if Claude had the
  context, clearly tried, and still got it wrong.
- **The article's demo:** a hypothetical retail company whose growth slowed.
  - The manager's note lists four theories. The folder holds spreadsheets of sales by store and PDFs from the
    leadership off-site.
  - The prompt, at Medium effort, starts "Growth slowed a lot this year..." and ends "Please test each of the four
    theories against the data and tell me which ones hold up."
  - Result: none of the four held up, though one couldn't be fully ruled out. Claude found an explanation nobody had
    raised: new stores opened too close to existing ones and pulled sales from them. The pattern only showed when
    stores were filtered by distance to a new store, and Claude backed it with a regression of sales against distance.
  - Deliverables: a doc with charts and a slider showing how sales change with distance, then board slides that open
    with the answer.
- **Numbers:**
  - An automated grader checked every figure in 18 research reports, and 16 passed.
  - On a merger model, Opus 5.5 took 63 minutes and Opus 5 took 93, at half the cost.
  - Prices per million tokens, input / output: Opus 5.5 $4 / $20, Sonnet 5.5 $2 / $10, Haiku 5.5 $0.10 / $0.50,
    Fable 5.2 $8 / $40.

## T3 · Uber's CISO on an insider threat program for AI
Interview with Philip Martin, Uber's CISO, Oct 13 2026. No byline.
https://claude.com/resources/articles/uber-s-ciso-on-building-an-insider-threat-program-for-ai

The user gave no topic wording; the angle is ours. Naming Uber as the subject is the "named company" hook that works
for us (LEARNINGS W1). Saying "according to…" in the voice is still not allowed.

- **Thesis:** AI agents need the same kind of insider threat program companies already run for their employees.
  - Quote: "Every company already runs an insider threat program for its people. Nobody argues about that."
  - Quote: "Frontier models introduce the same risk."
  - Companies already accept data retention and monitoring for staff, because people sometimes act outside their role.
    Agents can too.
- Uber handles "over 40 million trips and delivery orders a day."
- **Uber's AI security architecture has three parts:**
  1. An **LLM gateway** that "builds a perimeter" and controls how AI is used inside Uber.
  2. **Enterprise Frontier Safeguards**, built with Anthropic: classifier output on the models. Anthropic can't access
     Uber's data without permission, and Uber decides what happens when a safeguard fires.
  3. **AI Detection and Response (ADR)**, which Uber open-sourced. It gathers "real-time telemetry" and takes
     "real-time action in the agent harnesses". It detects when an agent acts outside its bounds and responds in real
     time. The safeguards feed into ADR as a data source, and ADR combines them into Uber's detection, "much like a
     traditional cybersecurity one".
- **Priority 1: real-time detection and intervention,** as close as possible to the person typing the prompt.
  - Example: telling them "You probably don't want to do that."
  - Example: flagging a tool or destination the model is about to use that Uber doesn't want.
- **Priority 2: learning new patterns.** Analysts, often with help from an LLM, find behaviors nobody expected and build
  them into the real-time safeguards. Martin says "constraints create new behaviors", so the cycle repeats.
- **Not in the article:** agent identity, permission scoping, behavioral baselines, logging details and kill switches.
  Don't claim them.
- There's no detailed case study. Any scenario (for example an agent about to send data to an unknown site) is
  illustrative.

## T4 · Claude Code in the cloud
Addy Osmani, Oct 6 2026, a field guide. https://claude.dev/blog/claude-code-in-the-cloud/

- **Local vs cloud:**
  - A local session is tied to your laptop: it shares your working tree, uses your credentials, and stops when the
    laptop sleeps.
  - A cloud session runs on a machine of its own. "Each task gets a fresh virtual machine with your repository cloned
    onto a new branch."
  - The VM has about 4 vCPUs, 16 GB of RAM and 30 GB of disk.
  - Branches are prefixed `claude/`. The session runs in auto mode.
- **Security:**
  - "Your GitHub token never enters the VM. A proxy holds it, and the session gets a short-lived credential that can
    push only to its own working branch."
  - Other traffic goes through a network allowlist. The levels are None, Trusted (the default: package registries,
    GitHub, major cloud SDK hosts), Custom and Full.
- **Ways to start:** claude.ai/code, the mobile app, the desktop app, Slack, or the terminal with
  `claude --cloud "<task>"`. Push your commits first: the VM clones your GitHub remote.
- **The result** is a branch, and optionally a pull request through **Create PR**. You can follow a session or steer it
  from your phone.
- `claude --teleport` pulls a session onto your laptop: it fetches the branch and loads the whole conversation. It
  needs a clean working tree and a pushed branch.
- **Parallel sessions:** every task gets its own VM and branch. In the author's experiment on "tidepool", a small Node
  API that predicts tides:
  - Three sessions started within 16 seconds of each other, and all three were done 87 seconds after the first began.
  - **Flaky test:** a race in `TtlCache.get`. The fix stored the in-flight promise, and the suite then ran 40 times
    with 0 failures.
  - **Docs:** a rewrite of `docs/API.md` to match `src/server.js` found 5 errors.
  - **Logger:** `src/logger.js` now emits JSON lines.
  - Lesson: sessions don't know about each other, so split the work along file boundaries.
- **Cost and limits:**
  - Included with Pro, Max, Team and Enterprise at no extra cost, drawing on the same usage limits.
  - Idle VMs are reclaimed, so commit the work you care about.
  - Stay local for local databases, VPN-only services, GPUs, simulators, or tight visual loops.

## T5 · How Anthropic's sales team rebuilt inbound with Claude Managed Agents
Carl Johnson, Sep 30 2026.
https://claude.com/resources/articles/how-anthropics-sales-team-rebuilt-inbound-with-claude-managed-agents

- **Before:** a buyer filled in the Contact Sales form, a business development rep qualified the lead, then passed it to
  an account executive.
  - Customers sometimes waited "multiple days".
  - There were "tens of thousands of inbound requests every month", and the team "couldn't keep up".
  - Most questions were simple, and their answers were already in the docs: what a plan costs, whether there's a seat
    minimum, whether HIPAA requirements can be met.
- **After: a buying agent** on Claude Managed Agents (beta), which handles "hosting, session management and tool
  orchestration". The builder brings "the prompt, the tools, and the knowledge base."
  - It lives on the Contact Sales and Pricing pages, in the product, in emails and in Claude.ai. It's opt-in: the
    customer chooses the agent or a rep.
  - It asks a few follow-ups (what they're trying to solve, their current Claude usage) and answers pricing, security
    and data questions from the docs and a knowledge base.
  - It recommends a plan and seat count, sometimes Team instead of Enterprise for small teams, which the article calls
    "a feature".
  - Every conversation ends one of three ways:
    1. A purchase, straight to checkout.
    2. A hand-off to a rep "along with the full conversation details" and the reason it escalated.
    3. A quick answer.
- "Thousands of conversations a day, around the clock."
- **Results:**
  - Escalated leads become opportunities "more than twice as often" as leads from the old form, and close "about five
    days faster".
  - The share of conversations that needed a person to close fell by about half.
  - Ojas, an inside sales rep, closes a deal in about 6 emails instead of about 10, and his closed-won deals are up
    2.5x.
- **How it was built:**
  - One engineer, in a few weeks: "a prompt, a handful of tools, and Claude".
  - Every change is a version: "v7 about a week into internal testing". Changes go to a staging agent first.
  - The goal prompt worked better than a flowchart: "Your goal is to understand customer requirements, qualify
    prospects, and recommend the best plan."
- **Not in the article:** lead scoring, sub-agents, a CRM, or automated email drafting. Don't show them.

## T6 · Opus 5.5 is built for coding sessions that use more context
Michael Segner, Sep 24 2026.
https://claude.com/resources/articles/claude-opus-5-5-built-for-coding-sessions-that-use-more-context

- **How coding sessions changed, Mar → Sep 2026:**
  - Claude works 3.3× longer per prompt, makes 40%+ more model calls per prompt, and needs 68% fewer interruptions.
  - Context per request grew **2.6×**.
  - The ratio of input to output tokens went from **189:1 to 324:1**, so a session is mostly reading.
  - Prompts per session stayed steady.
- **Three changes:**
  1. **Price:** input and output tokens are 20% cheaper, and **reading a cached token is 60% cheaper**. Cache reads are
     most of what agentic and coding work costs.
  2. **Harness (Claude Code):** "Input that misses the cache decreased by more than 50%", even as sessions got longer.
     - Refreshing a login, adding instructions mid-conversation, and loading tools on demand are less likely to break
       the cache.
     - Changing the effort level mid-session doesn't reset the cache.
     - Forked subagents start from the parent's cache.
  3. **Model:** Opus 5.5 needs fewer turns and tool calls for the same task, and writes output 30%+ faster than Opus 5.
- **Overall:** about 40% cheaper to run than Opus 5 on typical token-billed workloads. This is an estimate.
- **Tips:**
  - Run `/usage` in Claude Code to see how much of your usage is cached reads.
  - Pick the model at the start of a session; don't switch mid-way.
  - Compact before stepping away, not after.
  - On an API key, set the one-hour cache lifetime.
- **Caveats:**
  - "No single number holds for every codebase, so measure it."
  - Short, mechanical tasks take about as many turns as before.
- **Not in the article:** context window sizes and benchmark scores. Don't invent them.
- **Concept to teach:** each turn re-sends the whole conversation, and the part already in the cache is read cheaply.
  Any token counts in an example are illustrative.

## T7 · How we made claude.ai 3× faster in two weeks
Raymond Wang, Sam Attard, Issac G., Sep 23 2026. https://claude.dev/blog/how-we-made-claude-ai-faster/

- **The sprint:** two weeks in August. Claude ran the performance work through Claude Tag in Slack, on an internal
  model roughly like Opus 5.5.
  - Humans set the goals and approved every change.
  - Over 3,000 merged changes, with no customer-facing incident or rollback.
- **What was measured:** Claude used usage data to pick four journeys that cover 95% of activity: launching the app,
  starting a conversation, loading a conversation, and sending a message. That gave 13 measurements.
- **Headline results (p75):**
  - A fresh load of claude.ai, until you can type: 3.1 s → 0.55 s.
  - A new Claude Code session: 0.8 s → 0.3 s.
  - On average **3.1× faster** across the 13 (geometric mean).
  - "Tens of thousands of user-hours of waiting" saved every day (an estimate).
- **The loop:**
  1. Someone flags a slow spot.
  2. Claude builds a benchmark that reproduces it.
  3. Claude opens small PRs behind a flag.
  4. Claude watches the deploy and the field data.
  5. If it got faster, the benchmark is ratcheted down: "any PR that raised the instruction counts of those paths failed
     CI, and a daily job lowered each ceiling." If not, the flag goes off and Claude tries again.
  - CI counts CPU instructions instead of milliseconds, because wall-clock timing is too noisy.
- **Wins:**
  - **Static composer:** an HTML copy of the message box is baked into the page, so you can type while React loads.
    On throttled 4G, input was accepted at 0.36 s instead of 2.93 s.
  - Hovering over a conversation prefetches it.
  - Sidebar re-renders fell 90%.
- **Hidden finds:**
  - A leftover `location.reload()` caused "half a million hidden reloads a day".
  - Em dashes and curly quotes in code blocks made V8 store the string as UTF-16, pushing syntax highlighting onto a
    slow path and freezing the page for about 1 s. The fix copies the block into a one-byte string: 1.0 s → 0.35 s.
  - The composer's typing path had 6,900 React hooks re-rendering on every keystroke.
- **Streaming:** held 120 fps, an 8.33 ms budget per frame.
- **Guardrails:** human approval on every PR, short-lived flags, and rollout to employees, then 1% of users, then
  everyone.
- Quote: "With Claude, measuring something makes it tractable."
