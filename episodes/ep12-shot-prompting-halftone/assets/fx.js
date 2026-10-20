// ep12 restyles · small seek-safe motion helpers shared by the scenes (the avatar itself uses Egg.* from eggshell.js).
// Times passed in are scene-local seconds; EP(t) converts an episode time (the transcript) to scene-local.
window.FX = (() => {
  // Words rise in with a soft blur, one after another at the given times (or a fixed stagger).
  function words(tl, els, at, opts = {}) {
    const list = els instanceof Element ? [els] : [...els];
    list.forEach((el, i) => {
      const t = Array.isArray(at) ? at[i] : at + i * (opts.stagger ?? 0.12);
      tl.fromTo(el, { opacity: 0, y: opts.y ?? 34, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: opts.dur ?? 0.45, ease: "power3.out" }, t);
    });
  }
  function out(tl, els, at, opts = {}) {
    tl.to(els, { opacity: 0, y: opts.y ?? -24, filter: "blur(8px)", duration: opts.dur ?? 0.3, ease: "power2.in", stagger: opts.stagger ?? 0.02 }, at);
  }
  // Type text into el between at and at + dur (characters are derived from the playhead, so any frame can be seeked).
  function type(tl, el, text, at, dur) {
    const box = { n: 0 };
    el.textContent = "";
    tl.fromTo(box, { n: 0 }, { n: text.length, duration: dur, ease: "none", onUpdate: () => { el.textContent = text.slice(0, Math.round(box.n)); } }, at);
  }
  function pop(tl, els, at, opts = {}) {
    tl.fromTo(els, { opacity: 0, scale: opts.from ?? 0.6 }, { opacity: 1, scale: 1, duration: opts.dur ?? 0.45, ease: opts.ease ?? "back.out(1.8)", stagger: opts.stagger ?? 0.08 }, at);
  }
  // Masked line reveal: each .ln > span slides up out of its line box (the Swiss headline move).
  function rise(tl, els, at, opts = {}) {
    const list = els instanceof Element ? [els] : [...els];
    list.forEach((el, i) => {
      const t = Array.isArray(at) ? at[i] : at + i * (opts.stagger ?? 0.1);
      tl.fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: opts.dur ?? 0.55, ease: "expo.out" }, t);
    });
  }
  function sink(tl, els, at, opts = {}) {
    tl.to(els, { yPercent: -110, duration: opts.dur ?? 0.35, ease: "power3.in", stagger: opts.stagger ?? 0.04 }, at);
  }
  // Camera: frame rect r = {x, y, w, h} (scene px) around (cx, cy), never closer than max. Seek-safe tweens.
  function zoom(tl, cam, r, at, o = {}) {
    const s = Math.min(o.max ?? 1.6, (o.W ?? 900) / r.w, (o.H ?? 1100) / r.h);
    const x = (o.cx ?? 540) - (r.x + r.w / 2) * s, y = (o.cy ?? 880) - (r.y + r.h / 2) * s;
    tl.to(cam, { x, y, scale: s, duration: o.dur ?? 0.7, ease: o.ease ?? "expo.inOut" }, at);
  }
  function unzoom(tl, cam, at, o = {}) {
    tl.to(cam, { x: 0, y: 0, scale: 1, duration: o.dur ?? 0.6, ease: o.ease ?? "expo.inOut" }, at);
  }
  // Callout .co: the ring draws itself, then the label pops. off = when it fades (optional).
  function callout(tl, co, at, off) {
    tl.fromTo(co.querySelector("rect"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, at);
    const l = co.querySelector(".cl");
    if (l) tl.fromTo(l, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, at + 0.3);
    if (off != null) tl.to(co, { opacity: 0, duration: 0.25, ease: "none" }, off);
  }
  function arrow(tl, svg, at, dur = 0.45) {
    tl.fromTo(svg.querySelectorAll("path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut", stagger: 0.12 }, at);
  }
  function hl(tl, el, at) {
    tl.fromTo(el, { "--hl": 0 }, { "--hl": 1, duration: 0.4, ease: "power2.out" }, at);
  }
  return { words, out, type, pop, rise, sink, zoom, unzoom, callout, arrow, hl };
})();
