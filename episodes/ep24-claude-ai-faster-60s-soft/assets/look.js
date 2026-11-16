// SOFT motion: slower, floatier eases, a touch of blur on the way in (same signatures as Apple.*).
(() => {
  const A = window.Apple, end = (at, o, d) => at + (o.dur ?? d);
  A.rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: (o.y ?? 40) * 0.8, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: (o.dur ?? 0.8) * 1.15, ease: "sine.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.92); };
  A.zoom = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, scale: o.from ?? 0.94, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: (o.dur ?? 0.8) * 1.1, ease: "sine.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.88); };
  A.out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, filter: "blur(10px)", duration: o.dur ?? 0.3, ease: "sine.in" }, at); return end(at, o, 0.3); };
})();
