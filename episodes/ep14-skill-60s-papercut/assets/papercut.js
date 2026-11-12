/* Papercut motion kit: stop-motion on twos (12 fps). Every helper adds to a paused GSAP timeline at a scene-local
   time and returns when its motion ends. Text typing still uses Egg.typeOn (eggshell.js). */
(function () {
  const FPS = 12, F = 1 / FPS;
  // seeded generator (mulberry32): renders must be deterministic
  const rng = (s) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  // an ease held on twos: the base curve sampled once per 1/12 s
  const ease = (dur, base = "power2.out") => { const n = Math.max(1, Math.round(dur * FPS)), b = gsap.parseEase(base); return (p) => b(Math.min(1, Math.ceil(p * n - 1e-4) / n)); };
  const list = (x) => (x == null ? [] : x.length !== undefined && !x.tagName ? [...x] : [x]);
  const rot = (el) => +(el.dataset.r || 0);

  // scissor-cut outline: a few points per edge nudged inwards; data-torn="bottom" tears that edge
  function poly(r, torn) {
    const pts = [];
    ["top", "right", "bottom", "left"].forEach((side) => {
      const n = torn === side ? 26 : 5, amp = torn === side ? 11 : 3.5;
      for (let i = 0; i <= n; i++) {
        const p = (i / n) * 100, d = (r() * amp * (i === 0 || i === n ? 0.3 : 1)).toFixed(1) + "px";
        if (side === "top") pts.push(`${p.toFixed(1)}% ${d}`);
        else if (side === "right") pts.push(`calc(100% - ${d}) ${p.toFixed(1)}%`);
        else if (side === "bottom") pts.push(`${(100 - p).toFixed(1)}% calc(100% - ${d})`);
        else pts.push(`${d} ${(100 - p).toFixed(1)}%`);
      }
    });
    return `polygon(${pts.join(",")})`;
  }
  // cut-out letters: each glyph its own little piece, slightly off the line
  function letters(el, r) {
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 1) return letters(n, r);
      if (n.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w.trim()) return frag.appendChild(document.createTextNode(w));
        const cw = document.createElement("span"); cw.className = "cw";
        [...w].forEach((ch) => { const s = document.createElement("span"); s.className = "cl"; s.textContent = ch; gsap.set(s, { rotation: (r() - 0.5) * 9, y: (r() - 0.5) * 7 }); cw.appendChild(s); });
        frag.appendChild(cw);
      });
      n.replaceWith(frag);
    });
  }
  function dress(root, seed = 1) {
    const r = rng(seed);
    root.querySelectorAll(".pc:not(.folder):not(.logo-disc)").forEach((el) => el.style.setProperty("--cut", poly(r, el.dataset.torn)));
    root.querySelectorAll("[data-r]").forEach((el) => gsap.set(el, { rotation: rot(el) }));
    root.querySelectorAll(".cut-letters").forEach((el) => letters(el, r));
    return r;
  }

  // a piece slides / drops in from one side with a small turn, then settles with a tiny jitter
  function drop(tl, els, at, o = {}) {
    const dur = o.dur ?? 0.42, d = o.dist ?? 170, from = o.from || "top";
    list(els).forEach((el, i) => {
      const t = at + i * (o.stagger ?? 0), r = rot(el), x = o.x ?? 0, y = o.y ?? 0;
      gsap.set(el, { opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.fromTo(el, { x: x + (from === "left" ? -d : from === "right" ? d : 0), y: y + (from === "top" ? -d : from === "bottom" ? d : 0), rotation: r + (o.spin ?? 7) },
        { x, y, rotation: r, duration: dur, ease: ease(dur, "power2.out") }, t);
      tl.set(el, { rotation: r - 1.4 }, t + dur);
      tl.set(el, { rotation: r + 0.7 }, t + dur + F);
      tl.set(el, { rotation: r }, t + dur + 2 * F);
    });
    return at + dur + 2 * F;
  }
  // a piece is pulled off the table
  function out(tl, els, at, o = {}) {
    const dur = o.dur ?? 0.33, d = o.dist ?? 240, to = o.to || "top";
    list(els).forEach((el, i) => {
      const t = at + i * (o.stagger ?? 0);
      tl.to(el, { x: to === "left" ? `-=${d}` : to === "right" ? `+=${d}` : "+=0", y: to === "top" ? `-=${d}` : to === "bottom" ? `+=${d}` : "+=0", rotation: `+=${o.spin ?? 5}`, duration: dur, ease: ease(dur, "power2.in") }, t);
      tl.set(el, { opacity: 0 }, t + dur);
    });
    return at + dur;
  }
  const move = (tl, el, at, vars, dur = 0.5, base = "power2.inOut") => { tl.to(el, { ...vars, duration: dur, ease: ease(dur, base) }, at); return at + dur; };
  // turn a card over: hide the old face and show the new one edge-on
  function flip(tl, el, at, hide, show) {
    tl.to(el, { scaleX: 0.04, duration: 3 * F, ease: ease(3 * F, "power1.in") }, at);
    tl.set(list(hide), { opacity: 0 }, at + 3 * F);
    tl.set(list(show), { opacity: 1 }, at + 3 * F);
    tl.to(el, { scaleX: 1, duration: 3 * F, ease: ease(3 * F, "power1.out") }, at + 3 * F);
    return at + 6 * F;
  }
  // a folded panel opens from its crease
  function unfold(tl, el, at, o = {}) {
    const dur = o.dur ?? 0.33, ax = o.axis === "x" ? "scaleX" : "scaleY";
    gsap.set(el, { opacity: 0, transformOrigin: o.origin || "50% 0%" });
    tl.set(el, { opacity: 1 }, at);
    tl.fromTo(el, { [ax]: 0.05 }, { [ax]: 1, duration: dur, ease: ease(dur, "power1.out") }, at);
    tl.set(el, { [ax]: 1.03 }, at + dur);
    tl.set(el, { [ax]: 1 }, at + dur + F);
    return at + dur + F;
  }
  // a strip of tape / highlighter paper unrolls behind a word
  function mark(tl, el, at, dur = 0.33) { tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: dur, ease: ease(dur, "none") }, at); return at + dur; }
  // string is pulled along a path
  function string(tl, path, at, dur = 0.5) {
    path.setAttribute("pathLength", "1"); path.style.strokeDasharray = "1 1.1";
    tl.fromTo(path, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: dur, ease: ease(dur, "power1.inOut") }, at);
    return at + dur;
  }
  // a nudge: the piece wobbles in place for a few frames
  function jit(tl, el, at, amp = 2.5, n = 4) {
    const r = rot(el);
    for (let i = 0; i < n; i++) tl.set(el, { rotation: r + (i % 2 ? -amp : amp) * (1 - i / n) }, at + i * F);
    tl.set(el, { rotation: r }, at + n * F);
    return at + n * F;
  }
  // pop: a piece appears a little big and snaps to size (pins, stickers)
  function pop(tl, els, at, o = {}) {
    list(els).forEach((el, i) => {
      const t = at + i * (o.stagger ?? 0);
      gsap.set(el, { opacity: 0 });
      tl.set(el, { opacity: 1, scale: 1.5 }, t);
      tl.set(el, { scale: 0.9 }, t + F);
      tl.set(el, { scale: 1 }, t + 2 * F);
    });
    return at + 2 * F;
  }
  // the rubber stamp comes down, leaves its ink, lifts away
  function stamp(tl, handle, ink, at) {
    gsap.set([handle, ink], { opacity: 0 });
    tl.set(handle, { opacity: 1 }, at);
    tl.fromTo(handle, { y: -260, rotation: -10 }, { y: 0, rotation: -6, duration: 2 * F, ease: ease(2 * F, "power2.in") }, at);
    tl.set(ink, { opacity: 0.9, scale: 1.1 }, at + 3 * F);
    tl.set(ink, { scale: 1 }, at + 4 * F);
    tl.to(handle, { y: -320, duration: 3 * F, ease: ease(3 * F, "power2.in") }, at + 4 * F);
    tl.set(handle, { opacity: 0 }, at + 7 * F);
    return at + 7 * F;
  }
  // the whole table shifts a hair on threes, like a hand-shot frame
  function boil(tl, el, from, to, seed = 9) {
    const r = rng(seed);
    for (let t = from + 3 * F; t < to; t += 3 * F) tl.set(el, { x: (r() - 0.5) * 3, y: (r() - 0.5) * 3 }, t);
  }

  window.Cut = { FPS, F, rng, ease, dress, drop, out, move, flip, unfold, mark, string, jit, pop, stamp, boil };
})();
