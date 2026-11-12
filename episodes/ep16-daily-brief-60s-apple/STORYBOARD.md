# Episode 16 · Build a daily brief agent in under 60 seconds (55.15 s, avatar narrator)

*Under 60 seconds* series (see `.claude/skills/under-60/SKILL.md`). Sources: Anthropic, *Building effective agent
automations* (https://claude.dev/blog/building-effective-agent-automations/, Oct 8 2026) and the quickstart it walks
through, `anthropics/claude-quickstarts/managed-agents/daily-brief`
(https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/daily-brief). The worked example is the
quickstart's own: a weekday brief from two Slack channels and GitHub pull requests, posted to Slack.

## Style · APPLE variant

Same look as `ep14-skill-60s-apple`: white s01, #F5F5F7 after; near-black type, one accent blue #0071E3; huge tight
Inter Tight headlines; large white cards with soft shadows; macOS-style editor windows (agent.md, deployment.md,
bookmarks.json, Terminal); calm expo/power ease-outs, no bounce. Theme: `assets/apple.css` (+ the shared `.a-msg`
brief post added for this episode) and `assets/apple.js`. Narrator: the Sanjay avatar in the round video-call tile,
large under s01, small bottom right for s02–s05, out for s06. Sound: the ep14 apple palette.

## Script (142 words)

| Beat | Line |
|---|---|
| Cold open | Here's how to build an agent that briefs you every morning, in under sixty seconds. |
| Name it | A daily brief agent reads your Slack and GitHub on a schedule, and posts one short summary. |
| Set up the example | Say it's Tuesday: a hundred and forty messages, twenty-five pull requests. |
| Step 1 · Agent | Step one: agent dot M D. A model, its tools, and the steps, in plain English. The key rule: only what you'd act on today earns a line. |
| Step 2 · Daily | Step two: deployment dot M D. Weekdays at seven thirty-two, with a five dollar cap per run. |
| Step 3 · Memory | Step three: memory. Your preferences, which it can't edit, and bookmarks, so a late run misses nothing. |
| Ship it | Then run ant apply. Each morning, a fresh session reads from every bookmark, re-checks each item, and posts the brief. |
| Payoff | No server to keep alive. And a source it can't read says unreadable, never a quiet day. |

The first draft (159 words) read 55 s of voice; "Let's build one, step by step." was cut and two lines shortened to land at 50.2 s.

## Scenes (55.15 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.6 | Cold open + what it is | Frame 0: "Build a daily brief agent" and the post we're building (Daily brief, Tue Nov 17, three items). "Daily brief" tints on "briefs you"; "Under 60 seconds" pill. Then a flow: Agent (Claude logo) ← Slack + GitHub cards, "Weekdays · 7:32 AM" pill on "schedule", a line out to a small brief on "posts". Avatar large below. |
| s02 | 10.6–15.15 | The example | "Tuesday, 7:32 AM." Stat tiles count to 140 Slack messages and 25 pull requests while an overnight feed scrolls; "Which ones need you today?" Avatar corner. |
| s03 | 15.15–25.38 | Step 1 · Agent | agent.md types as said (name, model, tools, then the 8 run steps); "The key rule": run bar on step 4. Tip: weak "12 open reviews" (A count) vs better "PR #482 is blocked on your review · day 2" (Act today). Avatar corner. |
| s04 | 25.38–32.7 | Step 2 · Daily | deployment.md: agent, schedule (cron "32 7 * * 1-5", America/New_York), budget (amount "500" cents). Week strip fills Mon–Fri, "7:32 AM", "$5.00 cap per run · a run that hits it pauses". Avatar corner. |
| s05 | 32.7–40.18 | Step 3 · Memory | Two stores: preferences (lock, Read-only) and state (bookmarks.json, ledger.md, runs/). bookmarks.json opens; a timeline from Monday's bookmark to a late Tuesday 9:10 run, read span from the bookmark, "Nothing missed". Avatar corner. |
| s06 | 40.18–55.15 | Ship it + payoff | Terminal: `ant apply deployment.md vault.yaml`, six resources tick in. Session card Tue Nov 17 7:32 AM, "Fresh session": #support / #escalations read, GitHub unreadable; re-check: three still open, one resolved and dropped. The post lands, Posted. "No server to keep alive." The post's last line types "GitHub: unreadable this run." (ring, "Says so"); weak "Nothing new today." struck through. Hard stop, ~1.9 s hold. Avatar out. |

Voiceover as placed: see `voiceover.json` (s01 0.05 / 4.6, s02 0.18, s03 0.18 / 6.56, s04 0.18, s05 0.18, s06 0.18 / 7.45).

## Facts used (from the article and the repo)

- Reads Slack channels and GitHub pull requests, posts one short brief to a Slack channel every weekday morning; runs
  on Claude Managed Agents as a scheduled deployment, "so there is no server to keep alive". Six resource files applied
  with `ant apply`: agent, environment, two memory stores, vault, deployment. (README)
- `agent.md`: model and tools in the frontmatter (`model: claude-sonnet-5-5`, `agent_toolset_20260401`, an
  `mcp_toolset` for the GitHub MCP server), the eight run steps as the body. Step 4: "An item earns a line when the
  reader would act on it today… A count ("12 open reviews") is not an item." (agent.md)
- `deployment.md`: `expression: "32 7 * * 1-5"` (weekdays at 07:32), `timezone: America/New_York`, budget
  `amount: "500"` (cents, $5.00 per run); a run that reaches it pauses rather than fails. Body: "Write today's brief."
- Memory: `preferences` is read-only to the agent, re-read every run; `state` holds `bookmarks.json` (one bookmark per
  source), `ledger.md`, `notes.md`, `proposals.md`, `runs/<date>.md`. "Each source has a bookmark, so a late or skipped
  run loses nothing." Bookmark format from the article: `"slack": "2026-09-14T13:02:11Z"`.
- Each scheduled run is a fresh session; it re-checks every item against its live source before posting, and counts a
  post only when Slack answers `"ok": true` with a `ts`. "A source it could not read is reported as unreadable, never as
  a quiet day."
- 140 messages and 25 pull requests: the README's busy-day cost test ("two channels and two repositories with around
  140 messages and 25 pull requests").
- Code on screen is trimmed for length (fields such as `type: cron`, `type: limit`, `currency`, metadata and
  `configs` are left out). The `ant apply` result rows, the Slack/PR item texts, the dates and times (Tue Nov 17,
  7:34 AM, Tue 9:10 late run) and the session card are illustrations, not real output.
