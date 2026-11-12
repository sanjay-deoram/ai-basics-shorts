/* ep15 reel helpers, on top of Egg.* (assets/eggshell.js). Every helper adds tweens to a paused timeline at a
   scene-local time and returns when its motion ends. All state is driven from tweens/onUpdate, so seeking works. */
(function () {
  const W = 1080, DUR = 0.36, PEAK = 70;

  // A directional motion blur: one SVG filter per element, std-dev set from a tween (axis "x" or "y").
  function blurFor(el, id) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.innerHTML = `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0 0"/></filter>`;
    el.parentNode.insertBefore(svg, el);
    const fe = svg.querySelector("feGaussianBlur");
    return (amt, axis = "x") => {
      fe.setAttribute("stdDeviation", axis === "x" ? `${amt.toFixed(1)} 0` : `0 ${amt.toFixed(1)}`);
      el.style.filter = amt > 0.4 ? `url(#${id})` : "none";
    };
  }

  // Whip-pan: the camera slides a whole frame sideways with a smear. The outgoing scene uses "out" and the
  // incoming one "in" over the same 0.36 s window (the slots overlap by DUR), so the two read as one pan.
  function whip(tl, cam, setBlur, at, dir) {
    const p = { v: 0 };
    const apply = () => {
      const v = p.v;
      gsap.set(cam, { x: dir === "in" ? W * (1 - v) : -W * v });
      setBlur(PEAK * Math.sin(Math.PI * v));
    };
    if (dir === "in") apply();   // an "out" leaves the build state to the scene's own entry
    tl.fromTo(p, { v: 0 }, { v: 1, duration: DUR, ease: "power3.inOut", onUpdate: apply }, at);
    return at + DUR;
  }

  // Word-by-word headline: every .w (and em) lands at its spoken time; the accent word swings in bigger.
  function words(tl, el, times) {
    const ws = el.querySelectorAll(".w");
    ws.forEach((w, i) => {
      const t = times[Math.min(i, times.length - 1)];
      if (w.tagName === "EM") tl.fromTo(w, { opacity: 0, y: 36, scale: 1.25, rotation: -6 }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.42, ease: "back.out(2.2)", transformOrigin: "0% 80%" }, t);
      else tl.fromTo(w, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, t);
    });
    return times[times.length - 1] + 0.42;
  }

  // Rows that appear one after another (terminal transcript lines).
  function rows(tl, els, times, opts = {}) {
    [...els].forEach((r, i) => tl.fromTo(r, { opacity: 0, x: opts.x ?? -14 }, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }, times[i]));
    return times[times.length - 1] + 0.22;
  }

  // Elapsed-time chip text, m:ss, counting from a to b seconds.
  function clock(tl, el, a, b, at, dur) {
    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const p = { s: a };
    el.textContent = fmt(a);
    tl.fromTo(p, { s: a }, { s: b, duration: dur, ease: "none", onUpdate: () => (el.textContent = fmt(p.s)) }, at);
    return at + dur;
  }

  // A braille spinner in a text node, for running commands.
  function spin(tl, el, at, dur) {
    const F = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏", p = { f: 0 };
    tl.fromTo(p, { f: 0 }, { f: Math.round(dur * 12), duration: dur, ease: "none", onUpdate: () => (el.textContent = F[Math.floor(p.f) % F.length]) }, at);
    return at + dur;
  }

  window.Reel = { blurFor, whip, words, rows, clock, spin, DUR };
})();
