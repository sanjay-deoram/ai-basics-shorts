# Skills used

Claude Code skills invoked while building these shorts (see `CLAUDE.md` for how they are used):

- `/hyperframes` — entry point for every video request; routes to the right HyperFrames workflow
- `/hyperframes-core` — composition contract (`data-*` timing, tracks, sub-compositions); loaded before writing any scene HTML
- `/claude-api` — Claude API reference

The HyperFrames skills install with `npx hyperframes skills update`.
