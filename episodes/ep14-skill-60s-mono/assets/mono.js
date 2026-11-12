// Mono motion helpers: masked line reveals, quiet fades, hairline draws. All seek-safe GSAP on the scene timeline.
window.Mono = (() => {
  const list = (els) => (els instanceof Element ? [els] : [...els]);
  const spans = (els) => list(els).flatMap((el) => (el.classList.contains("m-line") ? [el.firstElementChild] : [...el.querySelectorAll(".m-line > span")]));
  // text slides up out of its clip, line by line
  const reveal = (tl, els, at, o = {}) => tl.fromTo(spans(els), { yPercent: 118 }, { yPercent: 0, duration: o.dur ?? 0.9, ease: "expo.out", stagger: o.stagger ?? 0.09 }, at);
  // ... and leaves through the top of it
  const conceal = (tl, els, at, o = {}) => tl.to(spans(els), { yPercent: -118, duration: o.dur ?? 0.38, ease: "power3.in", stagger: o.stagger ?? 0.04 }, at);
  const fade = (tl, els, at, o = {}) => tl.fromTo(els, { opacity: 0, y: o.y ?? 28 }, { opacity: o.to ?? 1, y: 0, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0 }, at);
  const out = (tl, els, at, o = {}) => tl.to(els, { opacity: 0, duration: o.dur ?? 0.25, ease: "power2.in" }, at);
  const draw = (tl, els, at, o = {}) => tl.fromTo(els, { scaleX: 0 }, { scaleX: 1, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0, transformOrigin: "0 50%" }, at);
  return { reveal, conceal, fade, out, draw };
})();
