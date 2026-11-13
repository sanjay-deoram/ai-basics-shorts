# Episode 17 (apple cut) · How the Claude Code team does code review, in under 60 seconds (59.6 s, avatar narrator)

`ep17-code-review-60s`'s script, voice and timing (`assets/vo`, `voiceover.json`, the vo block in `index.html`,
`assets/lipsync.js`, every scene slot and line `at`) rebuilt in the apple look. Source, script, the trims and the
facts (and what is illustrative): see `../ep17-code-review-60s/STORYBOARD.md`. A variant changes the look, never the
lesson: same eight beats, same diagrams, same through-line (the "Fix: empty config crash" chip).

## Style · APPLE variant

Same look as `ep17-which-model-60s-apple` (white s01, #F5F5F7 after; near-black type, one accent blue #0071E3; Inter
Tight headlines with one word tinted blue as it is said; white cards with soft shadows; macOS windows; calm expo/power
ease-outs, no bounce, no tilted stamps). Theme: `assets/apple.css` plus this episode's shared parts at its end
(`.a-fix` the fix chip, `.a-trk` the 4-layer tracker, `.a-sev` Important · Nit · Pre-existing tags, `.a-vote`
ballots) and `assets/apple.js` (`Apple.icons` + shield, person, doc, warn, lock). Each layer scene has the eyebrow
"Layer N of 4", the tracker on the eyebrow row, the layer name as the headline and the fix chip under it at (90, 430).
Claude is shown only with the Claude logo. Narrator: the Sanjay avatar in the round video-call tile, large under s01,
small bottom right from 3.95 s to the end (every scene keeps x > 750, y > 1300 empty). Sound: the apple palette
(air, tap, pop, tick, marker, whoosh-short, stream, claude, chime, impact-bass-1).

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–4.3 | Cold open | White. Frame 0: "How the Claude Code team does code review" and the Claude mark (the thumbnail); the mark pulses on "Claude Code", "code review" tints blue. "Under 60 seconds" frosted pill, stopwatch hand sweeping. A pull request window fills in, a blue read-line moves down the diff, a Claude comment pops off it. Avatar large below. |
| s02 | 4.3–14.6 | The flood → layers | Three Claude marks send changes into a to-scale block chart (1 block = 500 a day): May 2,500 (gray), Sept 30,000+ (blue). The Sept pile slides into one gate with one reviewer and jams; four dashed blue layers catch changes as they fall; "One gate" struck, "Layers" tints. |
| s03 | 14.6–19.06 | Example · one bug fix | "Fix the crash when the config file is empty." types into a blue message bubble; Claude writes the fix in a config.ts window (−1 +1). It folds into the fix chip; "Follow the fix." and a four-stop route; the stops turn blue as the path runs through them. |
| s04 | 19.06–26.32 | Layer 1 · On your machine | Dark terminal on a laptop base: run tests ✓, build ✓, lint ✓; "Shows the output, not just "done"". Writer card (context full of chips) vs Reviewer card (only "the change", a blue read-bar sweeps it). |
| s05 | 26.32–35.84 | Layer 2 · AI review | The chip gets an "In review" tag; four Claude marks probe their own bands of the pull request at once, four findings pin. Vote table under three voter marks: two posted (blue ring, Important / Pre-existing), two struck (style, not real); the tag legend. |
| s06 | 35.84–41.32 | Layer 3 · Blocking checks | Checks card: security review, lint, type checks, tests on every platform, build, "…and dozens more" tick blue; Claude review "1 open finding". The blue Merge button locks, greys and shakes: "Blocked until it's fixed or answered". |
| s07 | 41.32–48.52 | Layer 4 · People, by risk | Docs typo, our fix and the riskiest code path drop through a risk classifier into Low (0, no approver), Medium (1 blue person) and High (2). "The classifier rates the change, not who wrote it". |
| s08 | 48.52–59.6 | Results → Findings, not approvals | June → Sept strip; merged pull requests bar doubles ("More than 2×"), rollback share shrinks to 60% with a dashed −40% ghost ("Down over 40%"). Then the AI reviewer card (dashed Approve struck, "never", the two findings posted) and a person's card (real blue Approve); "Findings, not approvals." lands on top. Hard stop, ~2 s hold. |
