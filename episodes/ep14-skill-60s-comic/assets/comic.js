/* Comic motion kit (Cm.*) for the pop-art variant. Like Egg.*: every helper adds tweens to a paused GSAP
   timeline at a scene-local time. Seeded only (no Math.random), so every render is identical. */
(function () {
  const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  // Jagged starburst polygon in a w×h box: n spikes, inner radius ratio, seeded jitter.
  function burstPoints(w, h, n, inner, seed) {
    const r = rng(seed), pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2 + (r() - 0.5) * 0.08;
      const k = i % 2 ? inner * (0.9 + r() * 0.2) : 0.9 + r() * 0.1;
      pts.push((w / 2 + Math.cos(a) * (w / 2) * k).toFixed(1) + "," + (h / 2 + Math.sin(a) * (h / 2) * k).toFixed(1));
    }
    return pts.join(" ");
  }

  // Draws every .cm-burst in scope: data-n spikes, data-inner ratio, data-fill colour, data-seed.
  function mount(scope) {
    scope.querySelectorAll(".cm-burst:not([data-mounted])").forEach((el, i) => {
      const w = el.offsetWidth || parseFloat(el.style.width), h = el.offsetHeight || parseFloat(el.style.height);
      const pts = burstPoints(w, h, +(el.dataset.n || 14), +(el.dataset.inner || 0.72), +(el.dataset.seed || i + 3));
      const fill = el.dataset.fill || "var(--yellow)";
      el.insertAdjacentHTML("afterbegin",
        `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true"><polygon points="${pts}" fill="var(--ink)" transform="translate(10 10)"/>` +
        `<polygon points="${pts}" fill="${fill}" stroke="var(--ink)" stroke-width="7" stroke-linejoin="miter"/></svg>`);
      el.dataset.mounted = "1";
    });
  }

  // A panel slams in: big and tilted to flat, with a little settle. opts.rot = resting tilt (deg).
  function slam(tl, el, at, opts = {}) {
    const rot = opts.rot ?? 0;
    tl.fromTo(el, { opacity: 0, scale: opts.from ?? 1.35, rotation: rot + (opts.tilt ?? -7), x: opts.x ?? 0, y: opts.y ?? -40 },
      { opacity: 1, scale: 1, rotation: rot, x: 0, y: 0, duration: opts.dur ?? 0.26, ease: "power4.in" }, at);
    tl.fromTo(el, { scaleX: 1.05, scaleY: 0.95 }, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "elastic.out(1.2, 0.45)", immediateRender: false }, at + (opts.dur ?? 0.26));
    return at + 0.56;
  }

  // A sticker / burst pops with overshoot and a wobble.
  function sticker(tl, el, at, opts = {}) {
    const rot = opts.rot ?? -8;
    tl.fromTo(el, { opacity: 0, scale: 0, rotation: rot - 25 }, { opacity: 1, scale: 1, rotation: rot, duration: opts.dur ?? 0.42, ease: "back.out(3.2)" }, at);
    return at + 0.42;
  }

  // Inked in from the left (clip wipe).
  function ink(tl, el, at, dur = 0.4) {
    tl.fromTo(el, { clipPath: "inset(-10% 100% -10% -5%)" }, { clipPath: "inset(-10% -5% -10% -5%)", duration: dur, ease: "power2.inOut" }, at);
    return at + dur;
  }

  function shake(tl, el, at, amp = 14) {
    tl.fromTo(el, { x: 0 }, { x: amp, duration: 0.06, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, at);
    tl.set(el, { x: 0 }, at + 0.5);
    return at + 0.5;
  }

  // A quick punch: scale up and back.
  function punch(tl, el, at, s = 1.12) {
    tl.to(el, { scale: s, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1 }, at);
    return at + 0.24;
  }

  // Page turn: everything slides off to the left, skewed.
  function turn(tl, els, at, dur = 0.3) {
    tl.to(els, { x: -1200, skewX: 8, duration: dur, ease: "power3.in", stagger: 0.02 }, at);
    return at + dur;
  }

  // Draw an SVG path on (stroke-dashoffset).
  function draw(tl, path, at, dur = 0.35) {
    path.setAttribute("pathLength", "1");
    path.style.strokeDasharray = "1 1.1";
    gsap.set(path, { strokeDashoffset: 1.02 });
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, at);
    return at + dur;
  }

  function mark(tl, el, at, dur = 0.4) {
    tl.fromTo(el, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: dur, ease: "power2.inOut" }, at);
    return at + dur;
  }

  window.Cm = { rng, burstPoints, mount, slam, sticker, ink, shake, punch, turn, draw, mark };
})();
