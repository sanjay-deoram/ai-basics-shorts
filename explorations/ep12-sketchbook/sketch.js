/* Sketchbook motion helpers (window.Sk) for the hand-drawn episode format.
   Shapes come from rough.js with a fixed seed per shape, so every render draws the same wobbly line.
   Everything is placed from fixed page coordinates (never measured from the DOM) and animated on the
   scene's one paused GSAP timeline, so any frame can be seeked. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    paper: "#fbf8f1", card: "#fffdf8", ink: "#2a2724", soft: "#5b554d", pencil: "#a39c90",
    red: "#d2383e", orange: "#c7650a", green: "#22844a", blue: "#2560d0", purple: "#7240c2", teal: "#0b7f86",
    hl: "#ffd43b",
  };
  // Calm by default (v2, after "the sketching noise is overdone"): one gently wobbling stroke per line.
  const BASE = { roughness: 0.75, bowing: 0.7, stroke: C.ink, strokeWidth: 3.2, hachureGap: 11, fillWeight: 2.2, disableMultiStroke: true };

  // ---------- drawing shapes (rough.js) ----------
  // Sk.shape(svg, kind, args, opts) → <g>. kind: rectangle | ellipse | circle | line | linearPath | curve | path | polygon.
  // opts.seed fixes the wobble; opts.cls / opts.id tag the group so a scene can find it again.
  function shape(svg, kind, args, opts = {}) {
    const { cls, id, ...o } = opts;
    const g = rough.svg(svg)[kind](...args, { ...BASE, seed: 7, ...o });
    g.querySelectorAll("path").forEach((p) => p.setAttribute("pathLength", "1"));
    if (cls) g.setAttribute("class", cls);
    if (id) g.setAttribute("id", id);
    svg.appendChild(g);
    return g;
  }
  // A rounded box as a path (rough.js has no round rect).
  function roundRect(x, y, w, h, r) {
    return `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
  }
  // Hand-drawn arrow along points [[x,y],…]; the head is two short strokes at the last point.
  function arrow(svg, pts, opts = {}) {
    const g = document.createElementNS(NS, "g");
    if (opts.cls) g.setAttribute("class", opts.cls);
    svg.appendChild(g);
    const o = { ...opts, cls: undefined };
    const line = shape(svg, pts.length > 2 ? "curve" : "line", pts.length > 2 ? [pts] : [pts[0][0], pts[0][1], pts[1][0], pts[1][1]], o);
    const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = opts.head || 30;
    const h1 = [b[0] - L * Math.cos(ang - 0.45), b[1] - L * Math.sin(ang - 0.45)];
    const h2 = [b[0] - L * Math.cos(ang + 0.45), b[1] - L * Math.sin(ang + 0.45)];
    const head = shape(svg, "linearPath", [[h1, b, h2]], { ...o, seed: (o.seed || 7) + 1 });
    g.appendChild(line); g.appendChild(head);
    return g;
  }
  // A marker highlighter swipe behind text: a thick translucent stroke from (x1,y) to (x2,y).
  function highlight(svg, x1, x2, y, opts = {}) {
    const g = shape(svg, "line", [x1, y, x2, y + (opts.tilt || -4)], { stroke: opts.color || C.hl, strokeWidth: opts.width || 40, roughness: 0.8, bowing: 0.6, seed: opts.seed || 3, disableMultiStroke: true });
    g.setAttribute("opacity", opts.opacity ?? 0.55);
    g.style.mixBlendMode = "multiply";
    g.querySelectorAll("path").forEach((p) => (p.style.strokeLinecap = "butt"));
    return g;
  }

  // A speech bubble: rounded box with a tail pointing up at (tx) from its top edge.
  function bubble(svg, x, y, w, h, tx, opts = {}) {
    const r = 22, t = tx;
    const d = `M${x + r} ${y} H${t - 18} L${t} ${y - 30} L${t + 18} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
    return shape(svg, "path", [d], { fill: opts.fill || "#ffffff", fillStyle: "solid", strokeWidth: 3.2, ...opts });
  }
  // A four-point sparkle (the doodled "AI" mark).
  function sparkle(svg, x, y, r, opts = {}) {
    const k = r * 0.18;
    const d = `M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r} Z`;
    return shape(svg, "path", [d], { fill: opts.fill || C.hl, fillStyle: "solid", strokeWidth: 3, ...opts });
  }

  // A hand-drawn ring that lives inside the element it circles, so it is always centred on the word whatever its
  // width: an SVG stretched over the element's box (plus padding), with a non-scaling stroke.
  function ring(el, opts = {}) {
    const px = opts.padX ?? 18, py = opts.padY ?? 12;
    el.style.position = "relative";
    el.style.display = "inline-block";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("data-layout-allow-overflow", "");
    Object.assign(svg.style, { position: "absolute", left: `-${px}px`, top: `-${py}px`, width: `calc(100% + ${2 * px}px)`, height: `calc(100% + ${2 * py}px)`, overflow: "visible", pointerEvents: "none" });
    el.appendChild(svg);
    const g = shape(svg, "ellipse", [50, 52, 97, 94], { stroke: opts.color || C.ink, strokeWidth: opts.width || 4, roughness: 0.5, bowing: 0.4, seed: opts.seed || 9 });
    g.querySelectorAll("path").forEach((p) => p.setAttribute("vector-effect", "non-scaling-stroke"));
    return g;
  }

  // A hand-drawn underline that lives inside the element (same idea as ring): always exactly under the word.
  function underline(el, opts = {}) {
    el.style.position = "relative";
    el.style.display = "inline-block";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 10");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("data-layout-allow-overflow", "");
    Object.assign(svg.style, { position: "absolute", left: "-4px", width: "calc(100% + 8px)", bottom: `${opts.drop ?? -10}px`, height: "12px", overflow: "visible", pointerEvents: "none" });
    el.appendChild(svg);
    const g = shape(svg, "path", ["M1 6 C 25 3, 55 8, 99 4"], { stroke: opts.color || C.ink, strokeWidth: opts.width || 4, roughness: 0.4, bowing: 0.3, seed: opts.seed || 13 });
    g.querySelectorAll("path").forEach((p) => p.setAttribute("vector-effect", "non-scaling-stroke"));
    return g;
  }

  // ---------- the prompt card and its example notes (s03–s05) ----------
  // The same card in every technique scene: instruction, three note spots, the new issue, "Priority:".
  // Zero-shot leaves the spots empty (dashed), one-shot fills one, few-shot fills all three.
  const NOTES = [
    { text: "My password reset email hasn't arrived.", label: "Low", cls: "c-green", bg: "#fff1a1" },
    { text: "The payment system is down.", label: "High", cls: "c-red", bg: "#ffd9e1" },
    { text: "A question about my invoice.", label: "Medium", cls: "c-orange", bg: "#d9ecff" },
  ];
  const CARD = { x: 100, y: 470, w: 840, h: 580, noteX: [132, 392, 652], noteY: 616, noteW: 252, noteH: 218 };
  function promptCard(page, ink, opts = {}) {
    const n = opts.notes || 0, seed = opts.seed || 1;
    const add = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); const el = t.content.firstElementChild; page.appendChild(el); return el; };
    const card = shape(ink, "path", [roundRect(CARD.x, CARD.y, CARD.w, CARD.h, 24)], { fill: C.card, fillStyle: "solid", strokeWidth: 3.2, seed });
    const kicker = add(`<span class="sk-abs sk-kicker" style="left:132px;top:494px">your prompt</span>`);
    const ins = add(`<span class="sk-abs sk-body sk-w" style="left:132px;top:540px">Rate this issue: <span class="pw p-hi">High</span>, <span class="pw p-md">Medium</span> or <span class="pw p-lo">Low</span>.</span>`);
    const spots = CARD.noteX.map((x, i) => shape(ink, "path", [roundRect(x, CARD.noteY, CARD.noteW, CARD.noteH, 10)], { stroke: C.pencil, strokeWidth: 2.6, strokeLineDash: [10, 10], seed: seed + 10 + i }));
    const notes = NOTES.slice(0, n).map((d, i) => {
      const el = add(`<div class="sk-sticky" style="left:${CARD.noteX[i]}px;top:${CARD.noteY}px;background:${d.bg}"><div class="tape"></div><div class="nt sk-w">${d.text}</div><div class="nl"><span class="pre">Priority:</span> <span class="lab ${d.cls}">${d.label}</span></div></div>`);
      const lab = el.querySelector(".lab");
      return { el, text: el.querySelector(".nt"), line: el.querySelector(".nl"), lab, ring: ring(lab, { color: C[d.cls.slice(2)], seed: seed + 20 + i, padX: 14, padY: 8 }) };
    });
    const is1 = add(`<span class="sk-abs sk-body sk-w" style="left:132px;top:868px">Issue: I can't access my account,</span>`);
    const is2 = add(`<span class="sk-abs sk-body sk-w" style="left:132px;top:922px">and my report is due today.</span>`);
    const is3 = add(`<span class="sk-abs sk-body sk-w c-soft" style="left:132px;top:984px">Priority:</span>`);
    return { card, kicker, ins, spots, notes, issue: [is1, is2, is3] };
  }

  // ---------- animation ----------
  // Draw strokes on: every path in the given groups, one after another, total dur seconds.
  // Filled (solid) paths fade in once their turn comes.
  function draw(tl, groups, at, dur = 0.6, opts = {}) {
    const list = [].concat(groups).filter(Boolean);
    const paths = list.flatMap((g) => (g.tagName === "path" ? [g] : [...g.querySelectorAll("path")]));
    const strokes = paths.filter((p) => p.getAttribute("stroke") && p.getAttribute("stroke") !== "none");
    const per = dur / Math.max(1, opts.together ? 1 : strokes.length);
    paths.forEach((p) => gsap.set(p, { opacity: 0 }));
    let t = at;
    paths.forEach((p) => {
      const isStroke = strokes.includes(p);
      if (isStroke) {
        p.setAttribute("stroke-dasharray", "1 1.2");
        p.setAttribute("stroke-dashoffset", "1");
        tl.set(p, { opacity: 1 }, t);
        tl.to(p, { attr: { "stroke-dashoffset": 0 }, duration: per, ease: opts.ease || "power1.inOut" }, t);
        if (!opts.together) t += per;
      } else {
        tl.to(p, { opacity: 1, duration: 0.25, ease: "none" }, t);
      }
    });
    return at + dur;
  }
  // Erase drawn groups or nodes (a quick fade, like a rubber).
  function erase(tl, nodes, at, dur = 0.25) {
    tl.to([].concat(nodes), { opacity: 0, duration: dur, ease: "power1.in" }, at);
    return at + dur;
  }
  // Hand-write a line of text: a left-to-right reveal at cps characters per second (or opts.dur).
  function write(tl, el, at, opts = {}) {
    const n = (el.textContent || "").length;
    const dur = opts.dur ?? Math.max(0.25, n / (opts.cps || 28));
    gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)" });
    tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease: opts.ease || "none" }, at);
    return at + dur;
  }
  // Write several lines one after another.
  function writeLines(tl, els, at, opts = {}) {
    let t = at;
    [...els].forEach((el) => (t = write(tl, el, t, opts) + (opts.gap ?? 0.05)));
    return t;
  }
  // Pop in with a little wobble (stickers, bubbles, labels).
  function pop(tl, els, at, opts = {}) {
    const r = opts.rot ?? 0;
    tl.fromTo([].concat(els), { opacity: 0, scale: opts.from ?? 0.4, rotation: r - 8 },
      { opacity: 1, scale: 1, rotation: r, duration: opts.dur ?? 0.45, ease: "back.out(2.2)", stagger: opts.stagger ?? 0.08 }, at);
    return at + (opts.dur ?? 0.45);
  }
  // Slap a paper thing (polaroid, card) onto the page: it flies in from below, rotated, and settles.
  function slap(tl, el, at, opts = {}) {
    const r = opts.rot ?? -3;
    tl.fromTo(el, { opacity: 0, y: opts.dy ?? 420, x: opts.dx ?? 0, rotation: r + (opts.spin ?? 14), scale: 1.08 },
      { opacity: 1, y: 0, x: 0, rotation: r, scale: 1, duration: opts.dur ?? 0.55, ease: "back.out(1.3)" }, at);
    return at + (opts.dur ?? 0.55);
  }
  // Camera: put page point (px, py) at frame point (fx, fy) with zoom s.
  function focus(tl, cam, px, py, s, at, dur = 0.8, opts = {}) {
    const fx = opts.fx ?? 540, fy = opts.fy ?? 860;
    const v = { x: fx - px * s, y: fy - py * s, scale: s };
    if (dur <= 0) { tl.set(cam, v, at); return at; }
    tl.to(cam, { ...v, duration: dur, ease: opts.ease || "power2.inOut" }, at);
    return at + dur;
  }
  // Back to the whole page.
  function home(tl, cam, at, dur = 0.8) {
    tl.to(cam, { x: 0, y: 0, scale: 1, duration: dur, ease: "power2.inOut" }, at);
    return at + dur;
  }
  // Camera: fit the page box [x1, y1, x2, y2] inside the social-safe box (x 90–950, y 250–1480) and centre it,
  // never zooming past opts.max (1.3). Whatever is framed is always fully in view.
  function frame(tl, cam, box, at, dur = 0.8, opts = {}) {
    const [x1, y1, x2, y2] = box, S = [90, 250, 950, 1480];
    const s = Math.min((S[2] - S[0]) / (x2 - x1), (S[3] - S[1]) / (y2 - y1), opts.max ?? 1.3);
    return focus(tl, cam, (x1 + x2) / 2, (y1 + y2) / 2, s, at, dur, { fx: (S[0] + S[2]) / 2, fy: (S[1] + S[3]) / 2, ease: opts.ease });
  }
  // A quick punch-in on the current framing (scale up and back), for emphasis.
  function punch(tl, el, at, amt = 1.05) {
    tl.to(el, { scale: amt, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, at);
    return at + 0.36;
  }
  // Line boil: hand-drawn animation re-draws every line a few times a second. A displacement filter whose
  // noise seed steps fps times a second gives the same shimmer. Put class="sk-boil" on what should boil
  // and call Sk.boil once per scene; the filter id is unique per scene.
  function boil(tl, scope, id, from, to, opts = {}) {
    if (!opts.on) return to;   // v2: off (the user found the line boil too busy); pass { on: true } to bring it back
    const fps = opts.fps || 8;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.innerHTML = `<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${opts.freq || 0.022}" numOctaves="2" seed="1" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${opts.scale || 3.2}" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    scope.appendChild(svg);
    const turb = svg.querySelector("feTurbulence");
    scope.querySelectorAll(".sk-boil").forEach((el) => (el.style.filter = `url(#${id})`));
    let k = 0;
    for (let t = from; t < to; t += 1 / fps) tl.set(turb, { attr: { seed: (k++ % 4) + 1 } }, t);
    return to;
  }
  // Leave the page: the sheet is torn off upward, like flipping to a fresh page of the pad.
  function pageOut(tl, el, at, dur = 0.4) {
    tl.to(el, { y: -260, rotation: -4, opacity: 0, duration: dur, ease: "power2.in", transformOrigin: "50% 0%" }, at);
    return at + dur;
  }

  window.Sk = { C, NOTES, CARD, shape, roundRect, arrow, highlight, bubble, sparkle, ring, underline, promptCard, frame, draw, erase, write, writeLines, pop, slap, focus, home, punch, boil, pageOut };
})();
