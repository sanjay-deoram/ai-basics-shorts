// PAPERCUT motion: pieces drop onto the table with a little settle; exits lift off and away (same signatures as Apple.*).
(() => {
  const A = window.Apple, end = (at, o, d) => at + (o.dur ?? d);
  A.rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: -(o.y ?? 40), scale: 1.06 }, { opacity: 1, y: 0, scale: 1, duration: (o.dur ?? 0.8) * 0.8, ease: "back.out(1.4)", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.64); };
  A.out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, y: -60, scale: 1.04, duration: o.dur ?? 0.3, ease: "power2.in" }, at); return end(at, o, 0.3); };
})();
