// Apple-style motion helpers: calm ease-out fades, slides and scales, no bounce. Seek-safe GSAP on the scene timeline;
// each returns the time its motion ends. Typing and the code run bar still come from Egg.typeOn / Egg.codeRun.
window.Apple = (() => {
  const end = (at, o, d) => at + (o.dur ?? d);
  // fade in while sliding up
  const rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: o.y ?? 40 }, { opacity: 1, y: 0, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.8); };
  // fade in while settling from slightly smaller
  const zoom = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, scale: o.from ?? 0.94 }, { opacity: 1, scale: 1, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.8); };
  const fade = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0 }, { opacity: o.to ?? 1, duration: o.dur ?? 0.5, ease: "power1.out" }, at); return end(at, o, 0.5); };
  const out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, y: o.y ?? 0, scale: o.scale ?? 1, duration: o.dur ?? 0.3, ease: "power2.in" }, at); return end(at, o, 0.3); };
  // .a-tint: the accent copy of the word fades in
  const tint = (tl, els, at, o = {}) => {
    const on = (els instanceof Element ? [els] : [...els]).map((el) => el.querySelector(".on"));
    tl.to(on, { opacity: 1, duration: o.dur ?? 0.5, ease: "power1.inOut", stagger: o.stagger ?? 0 }, at);
    return end(at, o, 0.5);
  };
  return { rise, zoom, fade, out, tint };
})();
