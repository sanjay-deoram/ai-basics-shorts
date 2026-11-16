# Episode 21 · How Claude Code runs in the cloud, in under 60 seconds (54.23 s, avatar narrator)

*Under 60 seconds* series, W47 T4 (posting Fri Nov 20). Source: Addy Osmani, *Claude Code in the cloud*
(https://claude.dev/blog/claude-code-in-the-cloud/, Oct 6 2026). Script approved 2026-11-14
(`growth/topics/2026-W47-scripts.md`: caption, YouTube title, full fact list). The example is the article's own
tidepool experiment.

## Style · APPLE (base build)

ep17 apple look plus the W47 kit (end of `assets/apple.css`). Other looks: `node studio/tools/make-looks.mjs ep21-claude-code-cloud-60s`.

## Script (153 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | Here's how Claude Code runs in the cloud, in under sixty seconds. |
| s02 | 4.05 | Say your app has a test that fails at random, out-of-date docs, and a logger that should print JSON. You hand each job to Claude in the cloud. |
| s03 | 12.83 | Each task gets a fresh virtual machine, with your repository cloned onto a new branch, so push your commits first. |
| s04 | 20.18 | Your GitHub token never enters that machine. A proxy holds it and gives the session a short-lived credential that can push only to its own branch. |
| s05 | 28.49 | Because every task has its own machine, all three run at once. In one experiment, all three finished within eighty-seven seconds of the first one starting. |
| s06 | 38.24 | The sessions can't see each other, so split the work along file boundaries. |
| s07 | 42.66 | Each job comes back as a branch you can turn into a pull request. |
| s07 | 46.57 | For a local database, a V P N only service, or a G P U, stay on your laptop. |

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–3.88 | Frame 0: "How Claude Code runs in the cloud" + big blue "60 seconds"; three job cards (test, docs, logger) float from a laptop into a cloud with the Claude mark. Avatar large below. |
| s02 jobs | 3.88–12.66 | "Three jobs": tidepool/ (src/server.js, src/ttl-cache.js, src/logger.js, docs/API.md); the three job cards as said; terminal `claude --cloud "fix flaky TtlCache.get test"`. |
| s03 vm | 12.66–20.01 | "1 · A fresh machine for each task": VM 1–3 (4 vCPU · 16 GB · 30 GB), tidepool/ cloned, branches claude/fix-flaky-ttl-test, claude/rewrite-api-docs, claude/json-logger; `git push origin main`, "Push first: each VM clones your GitHub remote." |
| s04 token | 20.01–28.32 | "2 · Your token never gets in": GitHub token ✕; the Proxy holds it (locked) and sends a short-lived credential into VM 1; push to its own branch ✓, push to main refused. |
| s05 parallel | 28.32–38.07 | "3 · All three at once": the clock runs 0:00 → 1:27; lanes start at 0, 9, 16 s and finish (suite ran 40× · 0 failures, 5 errors fixed, emits JSON lines); "All three done 87 s after the first began." |
| s06 files | 38.07–42.49 | "4 · Split by file": Session 1–3 behind dashed walls with src/ttl-cache.js, docs/API.md, src/logger.js; "Sessions don't know about each other."; Job 4: logger + docs struck, CLASH. |
| s07 branch | 42.49–54.23 | "A branch back": the three branches with Create PR; the first opens a pull request; "Stay on your laptop for": local databases, VPN-only services, GPUs, simulators, tight visual loops. Hard stop. |

## Illustrative parts

The branch names after `claude/`, the 0/9/16 s start offsets and the lane finish times inside the 87 s, the refused push
to main, the struck fourth job, src/ttl-cache.js as the cache file's name and the PR title. Everything else: the article.
