# Looks

Theme layers for the W47+ episodes. An episode is built once in the apple look (`assets/apple.css` + `assets/apple.js`,
the `a-*` classes and `Apple.*` helpers); each look restyles the same scenes by loading `assets/look.css` after
apple.css and `assets/look.js` after apple.js. `studio/tools/make-looks.mjs <slug>` copies `episodes/<slug>-apple`
to `episodes/<slug>-<look>` for every look here and wires the files in. Voice, timing and lesson stay identical.

- **reel**: full-bleed colour per scene, heavy black type, hard offset shadows, dark code windows, snappy back-out motion.
- **soft**: drifting pastel fields, frosted white cards, lighter display weight, slow sine eases.
- **mono**: off-white and black, hairlines, no shadows, one terracotta accent, masked-feel quick fades.
- **whiteboard**: marker on a whiteboard: Caveat handwriting, marker outlines, red/blue/green ink, an aluminium frame.
- **papercut**: kraft tabletop, cream construction-paper cards with grain and drop shadows, Fredoka + Courier Prime.
