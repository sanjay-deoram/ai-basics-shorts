// REEL motion: snappier, punchier versions of the Apple helpers (same signatures). The scene exit is a whip to the left.
(() => {
  const A = window.Apple, end = (at, o, d) => at + (o.dur ?? d);
  A.rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: (o.y ?? 40) * 1.6 }, { opacity: 1, y: 0, duration: (o.dur ?? 0.8) * 0.7, ease: "back.out(1.7)", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.56); };
  A.zoom = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, scale: Math.min(o.from ?? 0.94, 0.7) }, { opacity: 1, scale: 1, duration: (o.dur ?? 0.8) * 0.7, ease: "back.out(2.2)", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.56); };
  A.out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, x: -260, duration: o.dur ?? 0.3, ease: "power3.in" }, at); return end(at, o, 0.3); };
})();
