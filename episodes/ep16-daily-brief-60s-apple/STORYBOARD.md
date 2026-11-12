# Episode 16 · Build a daily brief agent in under 60 seconds (59.82 s, avatar narrator)

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
large under s01, small bottom right from s02 to the end. Sound: the ep14 apple palette.

## Script (167 words, revised 2026-11-12)

| Beat | Line |
|---|---|
| Cold open | Here's how to build an agent that briefs you every morning, in under sixty seconds. |
| Name it | A daily brief agent reads your Slack and GitHub on a schedule, and posts one short summary. |
| Set up the example | Say it's Tuesday: a hundred and forty messages, twenty-five pull requests. |
| Step 1 · Agent | Step one: agent dot M D. A model, its tools, and the steps, in plain English. The key rule: only put something in the brief if you need to act on it today. |
| Step 2 · Daily | Step two: deployment dot M D. Weekdays at seven thirty-two, with a five dollar cap per run. |
| Step 3 · Memory | Step three: memory: two folders kept between runs. Your preferences, which it can read but never change. And its own notes, like a bookmark for each source. |
| Step 3 · Bookmarks | A bookmark marks where it stopped reading. So even if a run is late, it starts right there, and nothing slips through. |
| Ship it | Then run ant apply, and every weekday morning, the brief arrives. |
| Payoff | If a source can't be read, the brief says so, instead of looking like a quiet day. |

Revised after the first cut (user feedback): the rule ("only what you'd act on today earns a line") was too vague, now
plain English with four of Tuesday's items sorted into the brief or skipped; memory wasn't explained (files? a
database?), now "two folders kept between runs" with what is in each and who can write it; "a late run misses nothing"
was too quick and unexplained, now its own scene (bookmark vs "the last 24 hours" on a timeline); "never a quiet day"
came out of nowhere, now it follows the brief arriving, with the failed source shown first. "No server to keep alive."
was cut.

## Scenes (59.82 s)

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–10.47 | Cold open + what it is | Frame 0: "Build a daily brief agent" and the post we're building (Daily brief, Tue Nov 17, three items). "Daily brief" tints on "briefs you"; "Under 60 seconds" pill. Then a flow: Agent (Claude logo) ← Slack + GitHub cards, "Weekdays · 7:32 AM" pill on "schedule", a line out to a small brief on "posts". Avatar large below. |
| s02 | 10.47–14.95 | The example | "Tuesday, 7:32 AM." Stat tiles count to 140 Slack messages and 25 pull requests while an overnight feed scrolls; "Which ones need you today?" Avatar in the corner from here to the end. |
| s03 | 14.95–25.64 | Step 1 · Agent + the rule | agent.md types as said (name, model, tools, then the 8 run steps); "The key rule": run bar on step 4. "Needs you today? It goes in.": four of Tuesday's items land sorted: Acme can't log in ✓ Goes in, Lunch order is in · Skip, 12 pull requests open · Skip (just a count), PR #482 needs your review ✓ Goes in; on "today" the two in-items ring and the skips fade. |
| s04 | 25.64–32.92 | Step 2 · Daily | deployment.md: agent, schedule (cron "32 7 * * 1-5", America/New_York), budget (amount "500" cents). Week strip fills Mon–Fri, "7:32 AM", "$5.00 cap per run · a run that hits it pauses". |
| s05 | 32.92–42.47 | Step 3 · Memory | "Two folders, kept between runs." preferences/ (yours: preferences.md with what to read, 8 lines at most, mention no one; the lock closes, "Agent: read only") and state/ (the agent's notes: bookmarks.json where it stopped reading, ledger.md what it already told you, runs/ a log of every run; "Agent: read + write"). "Each run opens both at /mnt/memory/". bookmarks.json lights on "bookmark". |
| s06 | 42.47–49.38 | Step 3 · Bookmarks | state/bookmarks.json (one timestamp per source) = Monday 7:33 AM. Timeline (not to scale): bookmark, Tue 7:32 scheduled, late run Tue 9:10. Without a bookmark (reads the last 24 hours): grey bar from Mon 9:10 and a red hatched gap, "missed"; with a bookmark: blue bar from Mon 7:33, "✓ Nothing slips through". |
| s07 | 49.38–59.82 | Ship it + payoff | Terminal: `ant apply deployment.md vault.yaml`, six resources tick in. "Every weekday morning": Mon–Fri 7:32 cards; "the brief arrives": the post lands, Posted. "If a source can't be read": Slack ✓ read, GitHub ✕ couldn't be read; the post's last line types "GitHub: couldn't be read this run." (ring, "Says so"); "without that line": "Nothing new today." (Looks like a quiet day), struck through. Hard stop, ~1.5 s hold. |

Voiceover as placed: see `voiceover.json` (s01 0.05 / 4.55, s02 0.18, s03 0.18 / 6.52, s04 0.18, s05 0.18, s06 0.18, s07 0.18 / 4.37).

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
