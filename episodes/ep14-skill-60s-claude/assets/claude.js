/* "Claude" variant motion: gentle and precise, never bouncy. Loaded after eggshell.js; it swaps the springy Egg eases
   for ease-outs and softens pop / stamp / shake, so every scene's existing Egg.* calls move the calm way. */
(() => {
  Object.assign(Egg.EASE, { pop: "power3.out", rise: "power3.out", stamp: "power3.out" });
  Egg.pop = (tl, els, at, o = {}) => {
    tl.fromTo(els, { scale: 0.94, opacity: 0, y: 10 }, { scale: 1, opacity: 1, y: 0, duration: o.dur ?? 0.5, ease: "power3.out", stagger: o.stagger ?? 0.08 }, at);
    return at + (o.dur ?? 0.5);
  };
  Egg.stamp = (tl, el, at) => {
    tl.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, at);
    return at + 0.4;
  };
  Egg.shake = (tl, el, at) => {
    tl.to(el, { keyframes: { x: [0, -5, 4, -2, 0] }, duration: 0.4, ease: "none" }, at);
    return at + 0.4;
  };
})();
