/* Sketch kit (ep14 sketch variant): rough ink shapes on rough.js, drawn on stroke by stroke on a paused GSAP
   timeline. Every shape gets a seed from a per-scene counter (Sk.seed(n) at the top of each scene), so a render
   always draws the same wobble. Helpers that animate take (tl, …, at) and return the time their motion ends. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    ink: "#1e1e1e", pencil: "#5f5c55", blue: "#1971c2", blueF: "#a5d8ff", yellowF: "#ffec99", marker: "#ffd43b",
    green: "#2f9e44", greenF: "#b2f2bb", red: "#e03131", redF: "#ffc9c9", violet: "#6741d9", violetF: "#d0bfff",
    paper: "#fbfaf6", clay: "#d97757",
  };
  let next = 1;
  const seed = (n) => { next = n; };
  // mulberry32: a small seeded random for hand-rolled jitter
  const rng = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  // An svg layer w×h (page pixels) appended to parent.
  function layer(parent, w = 1080, h = 1920, before) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    s.setAttribute("width", w); s.setAttribute("height", h);
    s.setAttribute("class", "sk-ink"); s.setAttribute("aria-hidden", "true");
    parent.insertBefore(s, before ? parent.firstChild : null);
    s.rc = rough.svg(s);
    return s;
  }

  // A rough shape: kind is a rough.js method (rectangle, ellipse, circle, line, linearPath, polygon, curve, path).
  function shape(s, kind, args, o = {}) {
    const opts = { roughness: 1.1, bowing: 1, stroke: C.ink, strokeWidth: 3, fillStyle: "hachure", hachureGap: 12, fillWeight: 2, hachureAngle: -41, seed: next++, ...o };
    delete opts.into;
    const g = s.rc[kind](...args, opts);
    g.querySelectorAll("path").forEach((p) => {
      p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round");
      const f = p.getAttribute("fill");
      p.dataset.k = f && f !== "none" ? "solid" : opts.fill && p.getAttribute("stroke") === opts.fill && opts.fill !== opts.stroke ? "fill" : "line";
    });
    (o.into || s).appendChild(g);
    return g;
  }
  const group = (s) => { const g = document.createElementNS(NS, "g"); s.appendChild(g); return g; };

  // An arrow through pts with a hand-drawn head at the last point.
  function arrow(s, pts, o = {}) {
    const g = group(s), opts = { strokeWidth: 3.5, ...o, into: g };
    shape(s, pts.length > 2 ? "curve" : "line", pts.length > 2 ? [pts] : [...pts[0], ...pts[1]], opts);
    const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = o.head ?? 28, sp = 0.5;
    shape(s, "linearPath", [[[b[0] - L * Math.cos(ang - sp), b[1] - L * Math.sin(ang - sp)], b, [b[0] - L * Math.cos(ang + sp), b[1] - L * Math.sin(ang + sp)]]], { ...opts, roughness: 0.8 });
    return g;
  }

  // A loose loop around (cx, cy), a bit more than one turn, like circling something with a marker.
  function loop(s, cx, cy, rx, ry, o = {}) {
    const r = rng(o.jitter ?? next * 7919), turns = o.turns ?? 1.15, n = Math.round(30 * turns), a0 = o.a0 ?? -2.3, pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + (i / n) * turns * Math.PI * 2, k = 1 + (r() - 0.5) * 0.06 + (i / n) * 0.07;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return shape(s, "curve", [pts], { roughness: 0.5, bowing: 0.4, strokeWidth: 5, disableMultiStroke: true, ...o });
  }

  // A highlighter swipe from x1 to x2 at baseline y (put the layer under the text).
  function mark(s, x1, y, x2, o = {}) {
    const g = shape(s, "line", [x1, y, x2, y - 3], { stroke: C.marker, strokeWidth: o.h ?? 34, roughness: 1.4, bowing: 0.5, disableMultiStroke: true, ...o });
    g.setAttribute("opacity", o.opacity ?? 0.6);
    g.querySelectorAll("path").forEach((p) => p.setAttribute("stroke-linecap", "butt"));
    return g;
  }
  const tick = (s, x, y, o = {}) => shape(s, "linearPath", [[[x, y], [x + 14, y + 17], [x + 42, y - 22]]], { stroke: C.green, strokeWidth: 5, roughness: 0.7, ...o });
  const cross = (s, x, y, d = 34, o = {}) => { const g = group(s); shape(s, "line", [x, y, x + d, y + d], { stroke: C.red, strokeWidth: 5, roughness: 0.8, ...o, into: g }); shape(s, "line", [x + d, y, x, y + d], { stroke: C.red, strokeWidth: 5, roughness: 0.8, ...o, into: g }); return g; };
  // A folder outline (tab top left) at x, y, w × h.
  const folder = (s, x, y, w, h, o = {}) => shape(s, "path", [`M${x} ${y + 14} L${x} ${y + h} L${x + w} ${y + h} L${x + w} ${y + 22} L${x + w * 0.42} ${y + 22} L${x + w * 0.36} ${y} L${x + 6} ${y} Z`], o);
  // A page with a folded corner.
  const page = (s, x, y, w, h, o = {}) => {
    const g = group(s), f = Math.min(w, h) * 0.22;
    shape(s, "path", [`M${x} ${y} L${x + w - f} ${y} L${x + w} ${y + f} L${x + w} ${y + h} L${x} ${y + h} Z`], { ...o, into: g });
    shape(s, "linearPath", [[[x + w - f, y], [x + w - f, y + f], [x + w, y + f]]], { stroke: o.stroke, strokeWidth: o.strokeWidth, roughness: 0.8, into: g });
    return g;
  };

  // A positioned card: a div with its own svg layer (local coordinates) under the content.
  function card(parent, x, y, w, h, cls = "") {
    const el = document.createElement("div");
    el.className = "sk-card " + cls;
    Object.assign(el.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
    parent.appendChild(el);
    const s = layer(el, w, h);
    return { el, s };
  }

  // A hand-drawn mouse pointer.
  function cursor(parent) {
    const el = document.createElement("div");
    el.className = "sk-cursor";
    el.innerHTML = '<svg viewBox="0 0 46 56" width="46" height="56"><path d="M4 3 C4 18 4 31 5 45 L15 36 L22 52 L30 48 L23 33 L37 32 Z" fill="#fff" stroke="#1e1e1e" stroke-width="3" stroke-linejoin="round"/></svg>';
    parent.appendChild(el);
    return el;
  }

  const prep = (p) => { p.setAttribute("pathLength", "1"); p.style.strokeDasharray = "1 1.1"; };
  // Draw g on: outlines stroke by stroke (seq: one after another), then the hachure scribbles in, solids fade in.
  function draw(tl, g, at, dur = 0.6, o = {}) {
    const ps = [...g.querySelectorAll("path")];
    const lines = ps.filter((p) => p.dataset.k === "line"), fills = ps.filter((p) => p.dataset.k === "fill"), solids = ps.filter((p) => p.dataset.k === "solid");
    let end = at;
    if (solids.length) { tl.fromTo(solids, { opacity: 0 }, { opacity: 1, duration: Math.min(0.3, dur), ease: "power1.out" }, at); end = at + Math.min(0.3, dur); }
    if (lines.length) {
      lines.forEach(prep);
      const each = o.seq ? dur / lines.length : dur;
      tl.fromTo(lines, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: each, ease: o.ease ?? "power1.inOut", stagger: o.seq ? each : 0 }, at);
      end = at + dur;
    }
    if (fills.length) {
      fills.forEach(prep);
      const ft = lines.length ? at + dur * 0.7 : at, fd = o.fillDur ?? Math.max(0.35, dur * 0.8);
      tl.fromTo(fills, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: fd, ease: "none" }, ft);
      end = Math.max(end, ft + fd);
    }
    return end;
  }
  // Write text on left to right, like a pen (a clip wipe). dur defaults to ~22 characters a second.
  function write(tl, el, at, o = {}) {
    const dur = o.dur ?? Math.max(0.2, el.textContent.length / (o.cps ?? 22));
    tl.fromTo(el, { clipPath: "inset(-40% 101% -40% -4%)" }, { clipPath: "inset(-40% -4% -40% -4%)", duration: dur, ease: o.ease ?? "none" }, at);
    return at + dur;
  }
  // Gone, like wiping the board: a quick fade with a small drift.
  function wipe(tl, els, at, dur = 0.3) {
    tl.to(els, { opacity: 0, y: "-=12", duration: dur, ease: "power2.in" }, at);
    return at + dur;
  }
  // Land on the paper: a drop with a slight overshoot and a final tilt.
  function land(tl, el, at, o = {}) {
    tl.fromTo(el, { opacity: 0, y: (o.y ?? 0) - (o.from ?? 70), rotation: (o.r ?? 0) * 2.5, scale: 1.04 },
      { opacity: 1, y: o.y ?? 0, rotation: o.r ?? 0, scale: 1, duration: o.dur ?? 0.45, ease: "back.out(1.6)" }, at);
    return at + (o.dur ?? 0.45);
  }

  window.Sk = { C, seed, rng, layer, shape, group, arrow, loop, mark, tick, cross, folder, page, card, cursor, draw, write, wipe, land };
})();
