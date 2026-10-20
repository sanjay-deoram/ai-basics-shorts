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
  return { words, out, type, pop };
})();
