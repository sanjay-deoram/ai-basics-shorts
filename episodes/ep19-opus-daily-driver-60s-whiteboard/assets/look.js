// WHITEBOARD motion: pieces are "drawn" on with a left-to-right wipe; exits are an eraser-like wipe away.
(() => {
  const A = window.Apple, end = (at, o, d) => at + (o.dur ?? d);
  A.rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: (o.dur ?? 0.8) * 0.9, ease: "power1.inOut", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.72); };
  A.out = (tl, els, at, o = {}) => { tl.to(els, { clipPath: "inset(0% 0% 0% 100%)", duration: o.dur ?? 0.3, ease: "power1.in" }, at); return end(at, o, 0.3); };
})();
