# Episode 23 · Why long Claude Code sessions got cheaper, in under 60 seconds (57.48 s, avatar narrator)

*Under 60 seconds* series, W47 T6 (posting Sun Nov 22). Script, caption, YouTube title and fact list approved 2026-11-14
(`growth/topics/2026-W47-scripts.md`, T6). Facts only from that list; no source is cited in the voice.

## Style · APPLE (base build)

ep21 apple look plus the W47 kit (end of `assets/apple.css`). Other looks: `node studio/tools/make-looks.mjs ep23-cheaper-long-sessions-60s`.

## Script (152 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | Here's why long Claude Code sessions got cheaper, in under sixty seconds. |
| s02 | 4.76 | Say you ask Claude Code to fix a bug. |
| s03 | 7.77 | Every turn, it re-sends the whole conversation in tokens, small pieces of words, including your ask, the files it read, and every tool result. |
| s04 | 16.68 | For every token Claude writes, it now reads three hundred twenty-four, up from one hundred eighty-nine in March. |
| s05 | 23.97 | Reading a cached token, one saved from an earlier turn, is now sixty percent cheaper. |
| s06 | 29.72 | Claude Code also breaks the cache less often. Refreshing your login or adding instructions mid-conversation are less likely to reset it, so input that misses the cache fell by more than half. |
| s07 | 41.32 | And Opus five point five needs fewer turns for the same job. Together, that's an estimated forty percent cheaper than Opus five. |
| s08 | 49.32 | Run slash usage to see how much of yours is cached reads, because no single number holds for every codebase. |

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–4.59 | Frame 0: the full title + big blue "60 seconds"; "cheaper" tints; chip "cached reads: 60% cheaper" (Claude mark). |
| s02 bug | 4.59–7.60 | "Fix a bug": Claude Code terminal `> fix the failing test in auth.test.ts`; Turn 1 · your ask. |
| s03 resend | 7.60–16.51 | "1 · Every turn re-sends it all": tokens = pieces of words (fix · the · fail ing · test); Turn 1 / 2 / 3 stacks (your ask; + auth.ts + test output; + the edit + test output), ≈4k / 11k / 19k tokens. |
| s04 ratio | 16.51–23.80 | "324 read per 1 written": 1 token written; bars to scale, now 324 : 1 and March 189 : 1; "A long session is mostly reading." |
| s05 cache | 23.80–29.55 | "Cached reads: 60% cheaper": turn 3's blocks from turn 2 light up (cached); price to read a cached token 100 → 40; "Cache reads are most of what coding work costs." |
| s06 harness | 29.55–41.15 | "It breaks the cache less often": refresh your login, add instructions mid-conversation, load a tool on demand → ✓ kept; input that misses the cache shrinks, "more than half gone". |
| s07 model | 41.15–49.15 | "Fewer turns for the same job": Opus 5 lane 7 turns, Opus 5.5 lane 4 turns, same bug fixed; "Together": cache reads 60% cheaper, misses down by more than half, fewer turns → ≈ 40% cheaper than Opus 5 · estimate. |
| s08 usage | 49.15–57.48 | "Run /usage": the terminal panel (marked "example"), cached reads highlighted; "No single number holds for every codebase." "Measure yours." Hard stop. |

## Illustrative parts

Every token count in the stack (≈4k / 11k / 19k), the test and file names (auth.test.ts, auth.ts), the turn counts in s07
(7 vs 4), and the /usage panel's layout and numbers (81% / 12% / 7%, marked "example"). The 100 → 40 price bar is the 60%
from the article on an index of 100. Not shown: the 2.6× context growth, the 20% input/output price cut, the 30%-faster output.
