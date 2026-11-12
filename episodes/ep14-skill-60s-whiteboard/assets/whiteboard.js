// Whiteboard motion kit: a pencil that draws every stroke (stroke-dashoffset draw-on, the hand
// following the stroke point by point), writes svg <text> (a clip that opens left to right while the hand zigzags
// along the line), and an eraser that wipes a box clean. All positions come from the scene's one full-frame
// <svg class="wb-ink" viewBox="0 0 1080 1920">, so svg user units = canvas pixels.
//
//   WB.ready().then(() => { const B = WB.board(root, tl); B.draw(".x", 1.2, 0.5); B.write(".t", 2, 0.8); ... })
// Calls must be made in time order (the hand keeps one position); every tween is absolute and seek-safe.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const COLOR = { red: "#d42a2f", blue: "#1f5ed4", green: "#17914a", grey: "#6f757c" };
  const INK = "#1d2126";
  const OFF_Y = 2250;

  // a pencil, lead tip at (0,0), leaning down-right; the lead (.band) takes the colour being drawn
  const HAND = `<svg viewBox="-40 -30 400 460" aria-hidden="true"><g transform="rotate(-27)" stroke="#3a2f25" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-6 16 L-17 50 H17 L6 16 Z" fill="#f1d3a6"/>
    <path class="band" d="M0 0 L-6 16 H6 Z" fill="${INK}"/>
    <rect x="-17" y="50" width="34" height="190" fill="#f5b82e"/>
    <path d="M-6 52 V238 M6 52 V238" stroke="#d39a1c" stroke-width="3"/>
    <rect x="-17" y="240" width="34" height="26" fill="#c9ccd1"/>
    <path d="M-17 248 H17 M-17 258 H17" stroke="#9a9ea5" stroke-width="2.5"/>
    <rect x="-17" y="266" width="34" height="30" rx="8" fill="#ef8a8a"/>
  </g></svg>`;
  // felt whiteboard eraser, centred on (0,0)
  const ERASER = `<svg viewBox="-130 -60 260 120" aria-hidden="true"><g transform="rotate(-8)" stroke="#2b2b2b" stroke-width="3.5" stroke-linejoin="round">
    <rect x="-110" y="-10" width="220" height="40" rx="6" fill="#4b4f55"/>
    <rect x="-104" y="-44" width="208" height="40" rx="12" fill="#e9b949"/>
    <path d="M-80 -24 H80" stroke="#b98d22" stroke-width="4"/>
  </g></svg>`;

  const ready = () => Promise.all([document.fonts.load('700 40px "Caveat"'), document.fonts.load('600 40px "Caveat"')]).then(() => document.fonts.ready);

  function board(root, tl) {
    const ink = root.querySelector(".wb-ink");
    const mk = (cls, html) => { const d = document.createElement("div"); d.className = cls; d.innerHTML = html || ""; root.appendChild(d); return d; };
    const hand = mk("wb-hand", HAND), eraser = mk("wb-eraser", ERASER);
    const band = hand.querySelector(".band");
    const $ = (s) => (typeof s === "string" ? [...root.querySelectorAll(s)] : s instanceof Element ? [s] : [...s]);
    let pos = { x: 760, y: OFF_Y }, free = 0, clipN = 0, bandColor = INK;
    gsap.set(hand, { x: pos.x, y: pos.y });
    gsap.set(eraser, { x: -400, y: -400, opacity: 0 });

    const glob = (el, x, y) => { const p = new DOMPoint(x, y).matrixTransform(el.getCTM()); return { x: p.x, y: p.y }; };
    const colorOf = (el) => { for (const c in COLOR) if (el.classList.contains(c)) return COLOR[c]; return INK; };
    const tint = (el, at) => { const c = colorOf(el); if (c !== bandColor) { tl.set(band, { attr: { fill: c } }, Math.max(0, at - 0.12)); bandColor = c; } };

    function moveTo(x, y, t0, t1, ease) {
      if (t1 - t0 < 0.015) tl.set(hand, { x, y }, t1);
      else tl.fromTo(hand, { x: pos.x, y: pos.y }, { x, y, duration: t1 - t0, ease: ease || "power2.inOut", immediateRender: false }, t0);
      pos = { x, y }; free = t1;
    }
    // travel to the next stroke's start, arriving at `at`
    const go = (x, y, at) => moveTo(x, y, Math.max(free, at - (pos.y > 1900 ? 0.4 : 0.28)), at);
    function follow(pts, at, dur) {
      go(pts[0].x, pts[0].y, at);
      const seg = dur / (pts.length - 1);
      for (let i = 1; i < pts.length; i++)
        tl.fromTo(hand, { x: pts[i - 1].x, y: pts[i - 1].y }, { x: pts[i].x, y: pts[i].y, duration: seg, ease: "none", immediateRender: false }, at + seg * (i - 1));
      pos = pts[pts.length - 1]; free = at + dur;
    }
    const sample = (el, L) => {
      const n = Math.max(2, Math.min(90, Math.round(L / 18)));
      return Array.from({ length: n + 1 }, (_, k) => { const p = el.getPointAtLength((L * k) / n); return glob(el, p.x, p.y); });
    };

    // hide strokes now, so nothing shows before it's drawn
    const prep = (els) => els.forEach((e) => { const L = e.getTotalLength(); gsap.set(e, { strokeDasharray: `${L + 2} ${L + 20}`, strokeDashoffset: L + 3 }); });
    const hideText = (els) => els.forEach(clipFor);
    function clipFor(e) {
      if (e._wb) return e._wb;
      const b = e.getBBox();
      const cp = document.createElementNS(NS, "clipPath"), r = document.createElementNS(NS, "rect");
      cp.id = `wbc-${(root.closest("[data-composition-id]") || root).getAttribute("data-composition-id")}-${(clipN += 1)}-${Math.round(b.x)}-${Math.round(b.y)}`;
      r.setAttribute("x", b.x - 8); r.setAttribute("y", b.y - 14); r.setAttribute("height", b.height + 28); r.setAttribute("width", 0);
      cp.appendChild(r); (e.ownerSVGElement || ink).appendChild(cp);
      e.setAttribute("clip-path", `url(#${cp.id})`);
      return (e._wb = { b, r });
    }

    const B = {
      hand,
      // draw strokes in order; dur is split by length. o.hand=false: no hand (a quick secondary stroke)
      draw(sel, at, dur, o = {}) {
        const els = $(sel); prep(els);
        const lens = els.map((e) => e.getTotalLength()), total = lens.reduce((a, b) => a + b, 0);
        let t = at;
        els.forEach((e, i) => {
          const d = (dur * lens[i]) / total;
          tl.to(e, { strokeDashoffset: 0, duration: d, ease: "none" }, t);
          if (o.hand !== false) { tint(e, t); follow(sample(e, lens[i]), t, d); }
          t += d;
        });
        return t;
      },
      // write svg <text> lines in order; dur split by width
      write(sel, at, dur, o = {}) {
        const els = $(sel), boxes = els.map(clipFor);
        const total = boxes.reduce((a, w) => a + w.b.width, 0);
        let t = at;
        els.forEach((e, i) => {
          const { b, r } = boxes[i], d = (dur * b.width) / total, f = i === 0 ? o.from || 0 : 0;
          gsap.set(r, { attr: { width: b.width * f } });
          tl.fromTo(r, { attr: { width: b.width * f } }, { attr: { width: b.width + 18 }, duration: d, ease: "none", immediateRender: false }, t);
          if (o.hand !== false) {
            tint(e, t);
            const n = Math.max(2, Math.round(b.width / 26));
            const pts = Array.from({ length: n + 1 }, (_, k) => glob(e, b.x + b.width * (f + ((1 - f) * k) / n), b.y + b.height * (k % 2 ? 0.42 : 0.78)));
            follow(pts, t, d);
          }
          t += d;
        });
        return t;
      },
      prep: (sel) => prep($(sel)),
      hideText: (sel) => hideText($(sel)),
      pop(sel, at, o = {}) {
        tl.fromTo($(sel), { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: o.dur ?? 0.35, ease: "back.out(2.2)", stagger: o.stagger ?? 0.06 }, at);
      },
      // hand leaves the board (default: straight down)
      away(at, to = {}) { moveTo(to.x ?? pos.x + 140, to.y ?? OFF_Y, Math.max(free, at), Math.max(free, at) + (to.dur ?? 0.4), "power2.in"); },
      // hand rests at a point (eases there)
      rest(x, y, at, dur = 0.4) { moveTo(x, y, Math.max(free, at), Math.max(free, at) + dur, "power2.out"); },
      // eraser wipes the box clean (zigzag rows), then els are gone
      erase(els, box, at, dur = 0.5) {
        const w = mk("wb-wipe");
        gsap.set(w, { left: box.x, top: box.y, width: box.w, height: 0 });
        root.insertBefore(w, hand);
        const rows = Math.max(1, Math.round(box.h / 120));
        const pts = [];
        for (let r = 0; r < rows; r++) {
          const y = box.y + ((r + 0.5) * box.h) / rows, l = box.x + 70, rr = box.x + box.w - 70;
          pts.push(r % 2 ? { x: rr, y } : { x: l, y }, r % 2 ? { x: l, y } : { x: rr, y });
        }
        tl.set(eraser, { x: pts[0].x, y: pts[0].y - 40, opacity: 1 }, at);
        const seg = dur / pts.length;
        pts.forEach((p, i) => {
          const prev = i ? pts[i - 1] : { x: pts[0].x, y: pts[0].y - 40 };
          tl.fromTo(eraser, { x: prev.x, y: prev.y }, { x: p.x, y: p.y, duration: seg, ease: "none", immediateRender: false }, at + i * seg);
        });
        tl.fromTo(w, { height: 0 }, { height: box.h, duration: dur, ease: "none", immediateRender: false }, at);
        tl.set(eraser, { opacity: 0 }, at + dur + 0.04);
        tl.set($(els), { opacity: 0 }, at + dur);
        tl.set(w, { opacity: 0 }, at + dur);
        return at + dur;
      },
      // the Claude mark (12 terracotta rays + dot), drawn ray by ray; returns the end time
      claude(cx, cy, size, at, dur, o = {}) {
        const g = document.createElementNS(NS, "g");
        const k = size / 100;
        g.setAttribute("transform", `translate(${cx - size / 2} ${cy - size / 2}) scale(${k})`);
        const R = [[50, 44, 50, 4.92], [52.91, 44.75, 67.39, 18.62], [55.25, 47.09, 87.01, 29.48], [56, 49.79, 82.18, 48.88], [55.14, 53.09, 87.85, 72.74], [53.09, 55.14, 68.95, 81.54], [50.21, 56, 51.51, 93.21], [46.91, 55.14, 32.47, 79.18], [44.91, 53.18, 10.99, 74.38], [44, 49.9, 12.29, 49.34], [44.75, 47.09, 13.79, 29.93], [47.09, 44.75, 33.94, 21.03]];
        const rays = R.map(([a, b, c, d]) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", `M${a} ${b} L${c} ${d}`); return p; });
        rays.forEach((p) => { p.setAttribute("fill", "none"); p.setAttribute("stroke", "#D97757"); p.setAttribute("stroke-width", "9.5"); p.setAttribute("stroke-linecap", "round"); g.appendChild(p); });
        const dot = document.createElementNS(NS, "circle");
        dot.setAttribute("cx", 50); dot.setAttribute("cy", 50); dot.setAttribute("r", 9); dot.setAttribute("fill", "#D97757");
        g.appendChild(dot); (o.parent || ink).appendChild(g);
        gsap.set(dot, { opacity: 0 });
        tl.to(dot, { opacity: 1, duration: 0.1, ease: "none" }, at);
        const end = B.draw(rays, at, dur, o);
        g.classList.add("wb-claude");
        return end;
      },
      get t() { return free; },
    };
    return B;
  }

  // fonts loaded, then build with the scene laid out: a hidden clip (display:none) has no text metrics, so its
  // ancestors are shown just for the build, then restored
  function build(root, fn) {
    return ready().then(() => {
      const saved = [];
      for (let el = root; el && el !== document.documentElement; el = el.parentElement)
        if (getComputedStyle(el).display === "none") { saved.push([el, el.style.display]); el.style.display = "block"; }
      try { fn(); } finally { saved.forEach(([el, d]) => { el.style.display = d; }); }
    });
  }

  window.WB = { ready, board, build };
})();
