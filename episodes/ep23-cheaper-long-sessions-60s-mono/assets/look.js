// MONO motion: quick, precise fades with a short rise; exits drop down (same signatures as Apple.*).
(() => {
  const A = window.Apple, end = (at, o, d) => at + (o.dur ?? d);
  A.rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: Math.min(o.y ?? 40, 24) }, { opacity: 1, y: 0, duration: (o.dur ?? 0.8) * 0.75, ease: "power4.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.6); };
  A.out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, y: 24, duration: o.dur ?? 0.3, ease: "power4.in" }, at); return end(at, o, 0.3); };
})();
