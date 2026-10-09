/* Eggshell Studio motion kit.
   Every helper adds tweens to a paused GSAP timeline at a scene-local time (seconds) and returns
   the time its motion ends, so scenes can chain beats. Timings and eases are documented in DESIGN.md. */
(function () {
  const EASE = {
    enter: "power3.out",
    exit: "power2.in",
    move: "power2.inOut",
    draw: "power2.inOut",
    pop: "back.out(2.2)",
    rise: "back.out(1.4)",
    stamp: "back.out(3)",
  };

  /* ---------- Spark ---------- */
  const FACES = {
    neutral:
      '<g class="eyes"><ellipse cx="39" cy="46" rx="3.6" ry="5.4"/><ellipse cx="61" cy="46" rx="3.6" ry="5.4"/><circle class="glint" cx="40.2" cy="43.6" r="1.1"/><circle class="glint" cx="62.2" cy="43.6" r="1.1"/></g><path class="ink-line" d="M43 61 Q50 67 57 61"/>',
    confused:
      '<g class="eyes"><ellipse cx="39" cy="47" rx="3.6" ry="5.4"/><circle cx="61" cy="47" r="3"/><circle class="glint" cx="40.2" cy="44.6" r="1.1"/></g><path class="ink-line" d="M32 36.5 L44 39.5"/><path class="ink-line" d="M55 37 Q61 32.5 67.5 35.5"/><path class="ink-line" d="M41 63 q4.5 -3.5 9 0 t9 0"/>',
    happy:
      '<path class="ink-line" d="M33 48 Q39 40.5 45 48"/><path class="ink-line" d="M55 48 Q61 40.5 67 48"/><path class="fill" d="M40 57 Q50 58 60 57 Q59 70 50 70 Q41 70 40 57 Z"/><path class="tongue" d="M44.5 65.5 Q50 62.5 55.5 65.5 Q53.5 69.6 50 69.7 Q46.5 69.6 44.5 65.5 Z"/>',
    explain:
      '<g class="eyes"><ellipse cx="43" cy="45" rx="3.6" ry="5.4"/><ellipse cx="65" cy="45" rx="3.6" ry="5.4"/><circle class="glint" cx="44.2" cy="42.6" r="1.1"/><circle class="glint" cx="66.2" cy="42.6" r="1.1"/></g><ellipse class="fill" cx="54" cy="62" rx="4" ry="4.6"/>',
    talk:
      '<g class="eyes"><ellipse cx="39" cy="45" rx="3.6" ry="5.4"/><ellipse cx="61" cy="45" rx="3.6" ry="5.4"/><circle class="glint" cx="40.2" cy="42.6" r="1.1"/><circle class="glint" cx="62.2" cy="42.6" r="1.1"/></g><path class="ink-line smile" d="M43 60 Q50 66 57 60"/><ellipse class="fill mouth" cx="50" cy="62" rx="4.5" ry="0.6"/>',
    talkhappy:
      '<path class="ink-line" d="M33 47 Q39 39.5 45 47"/><path class="ink-line" d="M55 47 Q61 39.5 67 47"/><path class="ink-line smile" d="M42 60 Q50 67 58 60"/><ellipse class="fill mouth" cx="50" cy="62" rx="4.5" ry="0.6"/>',
  };

  function mountSparks(scope) {
    scope.querySelectorAll(".spark:not([data-mounted])").forEach((el) => {
      const start = el.dataset.mood || "neutral";
      const faces = Object.keys(FACES)
        .map((m) => `<svg class="spark-face" data-mood="${m}" viewBox="0 0 100 100" style="opacity:${m === start ? 1 : 0}" aria-hidden="true">${FACES[m]}</svg>`)
        .join("");
      el.innerHTML = `<div class="spark-shadow"></div><div class="spark-halo" data-layout-allow-overflow></div><div class="spark-body"><div class="spark-swirl" data-layout-allow-overflow></div>${faces}</div><span class="spark-q" data-layout-allow-overflow>?</span>`;
      el.dataset.mounted = "1";
    });
  }

  // Breathing, slow color swirl and a blink every 3.2s between start and end.
  function sparkIdle(tl, spark, start, end) {
    const body = spark.querySelector(".spark-body");
    const swirl = spark.querySelector(".spark-swirl");
    const len = Math.max(0.5, end - start);
    const half = 1.7;
    const reps = Math.max(1, Math.floor(len / half)) - 1;
    tl.fromTo(body, { scaleX: 1, scaleY: 1 }, { scaleX: 1.035, scaleY: 0.965, transformOrigin: "50% 100%", duration: half, ease: "sine.inOut", yoyo: true, repeat: reps }, start);
    tl.fromTo(swirl, { rotation: 0 }, { rotation: (360 * len) / 9, duration: len, ease: "none" }, start);
    for (let t = start + 1.4; t < end - 0.3; t += 3.2) blink(tl, spark, t);
    return end;
  }

  function blink(tl, spark, at) {
    const eyes = spark.querySelectorAll(".spark-face .eyes");
    tl.to(eyes, { scaleY: 0.08, transformOrigin: "50% 50%", duration: 0.07, ease: "power1.in", yoyo: true, repeat: 1 }, at);
    return at + 0.14;
  }

  // Swap expression: neutral | confused | happy | explain. opts.y = Spark's resting y if it has moved;
  // opts.hop = false keeps a happy Spark in place (use it for the pointer, which moves by x/y).
  function sparkMood(tl, spark, mood, at, opts = {}) {
    const y0 = opts.y ?? 0;
    spark.querySelectorAll(".spark-face").forEach((f) => {
      tl.to(f, { opacity: f.dataset.mood === mood ? 1 : 0, duration: 0.12, ease: "none" }, at);
    });
    tl.to(spark.querySelector(".spark-q"), { opacity: mood === "confused" ? 1 : 0, duration: 0.2 }, at);
    tl.to(spark.querySelector(".spark-halo"), { opacity: mood === "happy" ? 1 : 0, duration: 0.35 }, at);
    tl.to(spark, { rotation: mood === "confused" ? -10 : mood === "explain" ? 6 : 0, duration: 0.45, ease: EASE.rise }, at);
    if (mood === "happy" && opts.hop !== false) {
      tl.fromTo(spark, { y: y0 }, { y: y0 - 50, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 3 }, at);
    }
    return at + 0.45;
  }

  // Layout offset of el inside ancestor, unaffected by transforms (preview scaling, zooms).
  function offsetIn(el, ancestor) {
    let x = 0, y = 0, n = el;
    while (n && n !== ancestor) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y };
  }

  /* ---------- lip sync ---------- */
  // window.EggLipsync = { fps, data } comes from assets/lipsync.js (tools/lipsync.mjs): one char 0-9 per
  // frame of the whole episode = how loud the voiceover is. Drives the .mouth of the talk faces.
  function lipsync(tl, spark, offset, from, to) {
    const L = window.EggLipsync;
    if (!L) return to;
    const mouths = spark.querySelectorAll(".spark-face .mouth");
    const smiles = spark.querySelectorAll(".spark-face .smile");
    const box = { t: from };
    const apply = () => {
      const i = Math.floor((offset + box.t) * L.fps);
      const a = i >= 0 && i < L.data.length ? (L.data.charCodeAt(i) - 48) / 9 : 0;
      mouths.forEach((m) => { m.setAttribute("ry", (0.6 + a * 6.6).toFixed(2)); m.setAttribute("rx", (4.5 + a * 2.6).toFixed(2)); });
      smiles.forEach((sm) => { sm.style.opacity = a > 0.08 ? 0 : 1; });
    };
    apply();
    tl.fromTo(box, { t: from }, { t: to, duration: to - from, ease: "none", onUpdate: apply }, from);
    return to;
  }

  // Episode start time of a scene (read from its host slot in index.html), for lipsync offsets.
  function sceneStart(id) {
    const host = document.querySelector(`[data-composition-id="${id}"][data-composition-src]`);
    return host ? +host.getAttribute("data-start") || 0 : 0;
  }

  /* ---------- general motion ---------- */
  function pop(tl, els, at, opts = {}) {
    tl.fromTo(els, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: opts.dur ?? 0.55, ease: EASE.pop, stagger: opts.stagger ?? 0.08 }, at);
    return at + (opts.dur ?? 0.55);
  }

  function fadeUp(tl, els, at, opts = {}) {
    tl.fromTo(els, { opacity: 0, y: opts.y ?? 36 }, { opacity: 1, y: 0, duration: opts.dur ?? 0.55, ease: EASE.enter, stagger: opts.stagger ?? 0.08 }, at);
    return at + (opts.dur ?? 0.55);
  }

  function fadeOut(tl, els, at, opts = {}) {
    tl.to(els, { opacity: 0, y: opts.y ?? -20, duration: opts.dur ?? 0.35, ease: EASE.exit }, at);
    return at + (opts.dur ?? 0.35);
  }

  // Wrap every character of el's text in a span (keeps nested spans like .egg-hl), then reveal at cps.
  function typeOn(tl, el, at, opts = {}) {
    const cps = opts.cps ?? 34;
    if (!el.dataset.split) {
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            [...n.textContent].forEach((ch) => {
              const s = document.createElement("span");
              s.className = "c";
              s.textContent = ch;
              frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1) walk(n);
        });
      };
      walk(el);
      el.dataset.split = "1";
    }
    const chars = el.querySelectorAll(".c");
    tl.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.001, ease: "none", stagger: 1 / cps }, at);
    return at + chars.length / cps;
  }

  function highlight(tl, el, at, opts = {}) {
    tl.fromTo(el, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: opts.dur ?? 0.45, ease: EASE.move }, at);
    return at + (opts.dur ?? 0.45);
  }

  function stamp(tl, el, at, shakeTarget) {
    tl.fromTo(el, { scale: 1.8, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.32, ease: EASE.stamp }, at);
    if (shakeTarget) shake(tl, shakeTarget, at + 0.12);
    return at + 0.32;
  }

  function shake(tl, el, at) {
    tl.to(el, { keyframes: { x: [0, -10, 8, -5, 2, 0] }, duration: 0.32, ease: "none" }, at);
    return at + 0.32;
  }

  // Camera punch: scale a wrapper toward an origin, optionally ease back later with zoomOut.
  function zoom(tl, el, at, opts = {}) {
    tl.to(el, { scale: opts.scale ?? 1.18, transformOrigin: opts.origin ?? "50% 45%", duration: opts.dur ?? 0.8, ease: EASE.move }, at);
    return at + (opts.dur ?? 0.8);
  }

  function progress(tl, bar, start, end) {
    tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: Math.max(0.01, end - start), ease: "none" }, start);
    return end;
  }

  // Line drawing: every [data-draw="n"] in scope reveals in order n. Strokes draw on; text and
  // other nodes fade up. data-dur overrides the per-stroke duration.
  function draw(tl, scope, at, opts = {}) {
    const gap = opts.gap ?? 0.4;
    const base = opts.dur ?? 0.7;
    const items = [...scope.querySelectorAll("[data-draw]")].sort((a, b) => +a.dataset.draw - +b.dataset.draw);
    let end = at;
    items.forEach((el) => {
      const t = at + +el.dataset.draw * gap;
      const dur = +(el.dataset.dur || base);
      if (/^(path|line|polyline|polygon|circle|ellipse|rect)$/.test(el.tagName.toLowerCase())) {
        el.setAttribute("pathLength", "1");
        el.style.strokeDasharray = "1 1.1";
        tl.fromTo(el, { strokeDashoffset: 1.02, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: dur, ease: EASE.draw }, t);
        tl.set(el, { opacity: 1 }, t + 0.001);
      } else {
        tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: EASE.enter }, t);
      }
      end = Math.max(end, t + dur);
    });
    return end;
  }

  function checks(tl, list, at, opts = {}) {
    const gap = opts.gap ?? 0.22;
    [...list.children].forEach((li, i) => {
      const t = at + i * gap;
      tl.fromTo(li, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, ease: EASE.enter }, t);
      tl.fromTo(li.querySelector(".tick"), { scale: 0 }, { scale: 1, duration: 0.4, ease: EASE.pop }, t + 0.12);
    });
    return at + list.children.length * gap + 0.45;
  }


  // Seek-safe number tick: writes fmt(value) into el as the playhead moves.
  function count(tl, el, from, to, at, opts = {}) {
    const fmt = opts.fmt || ((v) => Math.round(v).toLocaleString("en-US"));
    const box = { v: from };
    el.textContent = fmt(from);
    tl.fromTo(box, { v: from }, { v: to, duration: opts.dur ?? 1.2, ease: opts.ease ?? "power2.out", onUpdate: () => { el.textContent = fmt(box.v); } }, at);
    return at + (opts.dur ?? 1.2);
  }

  const TOKEN_TINTS = ["rgba(4, 71, 255, 0.12)", "rgba(255, 122, 192, 0.24)", "rgba(255, 71, 4, 0.14)"]; // keep in sync with --tok-* in eggshell.css

  // A counter that moves through several values over the scene. Every change is a tween on one
  // proxy, so scrubbing backwards restores the right number. Usage:
  //   const reads = Egg.meter(tl, el); reads(9, 1.0); reads(0, 4.3, 0.15); reads(18, 4.45, 1.1);
  function meter(tl, el, fmt = (v) => Math.round(v).toLocaleString("en-US"), start = 0) {
    const box = { v: start };
    el.textContent = fmt(start);
    const upd = () => { el.textContent = fmt(box.v); };
    return (v, at, dur = 0.8, ease = "none") => {
      tl.to(box, { v, duration: dur, ease, onUpdate: upd }, at);
      return at + dur;
    };
  }

  // Token split: words appear, cut marks draw between the pieces, then each piece gets its tint.
  // Markup: .egg-tokens > (.egg-token | .egg-cut)*
  function tokens(tl, wrap, at, opts = {}) {
    const toks = wrap.querySelectorAll(".egg-token");
    const cuts = wrap.querySelectorAll(".egg-cut");
    tl.set(toks, { backgroundColor: "rgba(0,0,0,0)" }, 0);
    tl.fromTo(cuts, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.25, ease: EASE.pop, stagger: opts.cutGap ?? 0.12 }, at);
    const tintAt = at + cuts.length * (opts.cutGap ?? 0.12) + 0.2;
    toks.forEach((t, i) => {
      tl.to(t, { backgroundColor: TOKEN_TINTS[i % 3], duration: 0.25, ease: "none" }, tintAt + i * (opts.tintGap ?? 0.1));
    });
    return tintAt + toks.length * (opts.tintGap ?? 0.1) + 0.25;
  }

  // Grow bars (.egg-bar) from zero to their CSS width.
  function bars(tl, els, at, opts = {}) {
    tl.fromTo(els, { scaleX: 0 }, { scaleX: 1, duration: opts.dur ?? 0.7, ease: EASE.enter, stagger: opts.stagger ?? 0.12 }, at);
    return at + (opts.dur ?? 0.7) + (els.length - 1) * (opts.stagger ?? 0.12);
  }


  /* ---------- Spark pointer ---------- */
  // Mount a pointer into a full-frame layer. labels: one string per stop.
  // opts.origin {x, y}: no flying Spark; the leader is drawn from this fixed point (e.g. beside the narrator
  // avatar's face) and each pointTo places its label with opts.label {x, y, side}.
  function pointer(layer, labels, opts = {}) {
    const size = opts.size ?? 120;
    layer.classList.add("egg-pointer");
    layer.setAttribute("data-layout-allow-overflow", "");
    layer.innerHTML =
      `<svg class="ptr-svg" viewBox="0 0 1080 1920" aria-hidden="true"><line class="ptr-line" x1="0" y1="0" x2="0" y2="0"/><circle class="ptr-dot" r="8" cx="0" cy="0"/></svg>` +
      (opts.origin ? "" : `<div class="spark ptr-spark" data-mood="${opts.mood || "explain"}" style="--s:${size}px"></div>`) +
      labels.map((t) => `<span class="ptr-label">${t}</span>`).join("");
    mountSparks(layer);
    return { size, gap: opts.gap ?? 230, shown: false, origin: opts.origin, spark: layer.querySelector(".ptr-spark"), line: layer.querySelector(".ptr-line"), dot: layer.querySelector(".ptr-dot"), labels: [...layer.querySelectorAll(".ptr-label")] };
  }

  // Glide Spark to hover over target {x, y} (frame px), draw the leader to it and show label i.
  // The first call pops Spark in place. opts: dx, dy (Spark offset from target), side ("left"|"right"), dur.
  function pointTo(tl, P, target, i, at, opts = {}) {
    if (P.origin) return pointFrom(tl, P, target, i, at, opts);
    const s = P.size, dur = opts.dur ?? 0.45;
    const sx = target.x + (opts.dx ?? 0), sy = target.y + (opts.dy ?? -P.gap);
    const line = { x1: sx, y1: sy + s / 2 + 10, x2: target.x, y2: target.y };
    const pos = { x: sx - s / 2, y: sy - s / 2 };
    if (!P.shown) {
      tl.set(P.spark, pos, 0);
      tl.set(P.line, { attr: line }, 0);
      tl.set(P.dot, { attr: { cx: target.x, cy: target.y } }, 0);
      pop(tl, P.spark, at);
      tl.fromTo([P.line, P.dot], { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" }, at + 0.2);
      P.shown = true;
    } else {
      tl.to(P.spark, { ...pos, duration: dur, ease: EASE.move }, at);
      tl.to(P.line, { attr: line, duration: dur, ease: EASE.move }, at);
      tl.to(P.dot, { attr: { cx: target.x, cy: target.y }, duration: dur, ease: EASE.move }, at);
    }
    const lab = P.labels[i];
    const side = opts.side || (sx > 560 ? "left" : "right");
    if (side === "right") lab.style.left = sx + s / 2 + 18 + "px";
    else lab.style.right = 1080 - (sx - s / 2 - 18) + "px";
    lab.style.top = sy - 26 + "px";
    P.labels.forEach((l, k) => { if (k !== i) tl.to(l, { opacity: 0, duration: 0.15, ease: "none" }, at); });
    tl.fromTo(lab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: EASE.enter }, at + dur * 0.6);
    return at + dur;
  }

  // Origin pointer: the leader grows from P.origin to the target, the dot lands, label i fades in at opts.label.
  function pointFrom(tl, P, target, i, at, opts = {}) {
    const dur = opts.dur ?? 0.45, o = P.origin;
    if (!P.shown) {
      tl.set(P.line, { attr: { x1: o.x, y1: o.y, x2: o.x, y2: o.y } }, 0);
      tl.set(P.dot, { attr: { cx: target.x, cy: target.y }, opacity: 0 }, 0);
      tl.to(P.line, { attr: { x2: target.x, y2: target.y }, duration: dur, ease: EASE.move }, at);
      tl.to(P.dot, { opacity: 1, duration: 0.15, ease: "none" }, at + dur - 0.05);
      P.shown = true;
    } else {
      tl.to(P.line, { attr: { x2: target.x, y2: target.y }, duration: dur, ease: EASE.move }, at);
      tl.to(P.dot, { attr: { cx: target.x, cy: target.y }, duration: dur, ease: EASE.move }, at);
    }
    const lab = P.labels[i], L = opts.label;
    if (L.side === "left") lab.style.right = 1080 - L.x + "px"; else lab.style.left = L.x + "px";
    lab.style.top = L.y + "px";
    P.labels.forEach((l, k) => { if (k !== i) tl.to(l, { opacity: 0, duration: 0.15, ease: "none" }, at); });
    tl.fromTo(lab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: EASE.enter }, at + dur * 0.6);
    return at + dur;
  }

  function pointerHide(tl, P, at) {
    tl.to([P.spark, P.line, P.dot, ...P.labels].filter(Boolean), { opacity: 0, duration: 0.3, ease: EASE.exit }, at);
    return at + 0.3;
  }

  /* ---------- isometric steps ---------- */
  const NS = "http://www.w3.org/2000/svg";
  const r1 = (v) => Math.round(v * 10) / 10;
  const pts = (arr) => arr.map((p) => `${r1(p[0])},${r1(p[1])}`).join(" ");

  function splitTitle(text) {
    const words = text.split(" ");
    if (words.length < 3) return [text];
    let best = 1, bestDiff = Infinity;
    for (let i = 1; i < words.length; i++) {
      const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
  }

  // Build blocks, bridges, labels and the travelling dot into svg. steps: [{title, sub, repeat?}].
  function isoBuild(svg, steps, opts = {}) {
    const id = opts.id || "iso";
    const n = steps.length;
    const A = opts.A ?? 150, B = A * 0.5774, H = opts.H ?? 60;
    const top = opts.top ?? 560, bottom = opts.bottom ?? 1450, mid = opts.mid ?? 520;
    const cy0 = top + B;
    const dy = n > 1 ? Math.min((bottom - B - H - cy0) / (n - 1), 230) : 0;
    const dx = dy / 0.5774;
    const P = steps.map((s, i) => ({ x: n > 1 ? mid + (i % 2 === 0 ? -dx / 2 : dx / 2) : mid, y: cy0 + i * dy }));

    let html = `<defs>
      <radialGradient id="${id}-tint" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#0447ff" stop-opacity=".5"/><stop offset=".55" stop-color="#ff7ac0" stop-opacity=".35"/><stop offset="1" stop-color="#ff4704" stop-opacity=".55"/></radialGradient>
      <radialGradient id="${id}-dot" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".18" stop-color="#f1e8ff"/><stop offset=".55" stop-color="#9d86ff"/><stop offset=".82" stop-color="#ff7ac0"/><stop offset="1" stop-color="#ff4704"/></radialGradient>
    </defs>`;

    for (let i = 0; i < n - 1; i++) {
      const dir = P[i + 1].x >= P[i].x ? 1 : -1;
      const s = [P[i].x + (dir * A) / 2, P[i].y + B / 2];
      const e = [P[i + 1].x - (dir * A) / 2, P[i + 1].y - B / 2];
      html += `<path class="iso-bridge" data-i="${i}" d="M${r1(s[0])} ${r1(s[1])} L${r1(e[0])} ${r1(e[1])}"/>`;
    }

    const flat = (p) => `matrix(${r1((A / 200) * 100) / 100} ${-r1((B / 200) * 100) / 100} ${r1((A / 200) * 100) / 100} ${r1((B / 200) * 100) / 100} ${r1(p.x)} ${r1(p.y)})`;
    const flatOld = (p) => `matrix(${A / 200} ${B / 200} ${-A / 200} ${B / 200} ${r1(p.x)} ${r1(p.y)})`;
    P.forEach((p, i) => {
      const { x, y } = p;
      const topF = [[x, y - B], [x + A, y], [x, y + B], [x - A, y]];
      const left = [[x - A, y], [x, y + B], [x, y + B + H], [x - A, y + H]];
      const right = [[x, y + B], [x + A, y], [x + A, y + H], [x, y + B + H]];
      const rep = steps[i].repeat
        ? `<path class="iso-rep" transform="${flatOld(p)}" d="M80 0 A80 80 0 1 1 40 -69.3 M28.2 -94.7 L40 -69.3 L12.1 -66.9"/>`
        : "";
      html += `<g class="iso-block" data-i="${i}"><g class="iso-pulse">
        <polygon class="iso-face iso-left" points="${pts(left)}"/>
        <polygon class="iso-face iso-right" points="${pts(right)}"/>
        <polygon class="iso-face iso-top" points="${pts(topF)}"/>
        <polygon class="iso-tint" points="${pts(topF)}" fill="url(#${id}-tint)" opacity="0"/>
        <text class="iso-num" transform="${flat(p)}">${i + 1}</text>${rep}
      </g></g>`;
    });

    P.forEach((p, i) => {
      const onRight = n === 1 || i % 2 === 0;
      const lx = onRight ? p.x + A + 44 : 90;
      const lines = splitTitle(steps[i].title);
      const y0 = p.y - (lines.length === 2 ? 30 : 0);
      let g = `<g class="iso-label" data-i="${i}">`;
      lines.forEach((l, k) => { g += `<text class="iso-lab-h" x="${r1(lx)}" y="${r1(y0 + k * 58)}">${l}</text>`; });
      if (steps[i].sub) g += `<text class="iso-lab-s" x="${r1(lx)}" y="${r1(y0 + lines.length * 58 - 6)}">${steps[i].sub}</text>`;
      html += g + "</g>";
    });

    html += `<g class="iso-dot"><g class="iso-dot-in"><circle r="30" fill="url(#${id}-dot)"/><circle r="30" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/></g></g>`;
    svg.insertAdjacentHTML("beforeend", html);
    return { P, A, B, H, n, steps, svg };
  }

  // at: array of step start times. Step 0 rises; each later step draws its bridge, rises, then the
  // dot travels and lands. Returns { end, lands: [time the dot lands on each step] }.
  function isoAnimate(tl, L, at) {
    const svg = L.svg;
    const blocks = svg.querySelectorAll(".iso-block");
    const labels = svg.querySelectorAll(".iso-label");
    const bridges = svg.querySelectorAll(".iso-bridge");
    const dot = svg.querySelector(".iso-dot");
    const dotIn = svg.querySelector(".iso-dot-in");
    const lift = 16;
    const lands = [];
    tl.set(dot, { x: L.P[0].x, y: L.P[0].y - lift }, 0);

    const land = (i, t) => {
      const block = blocks[i];
      tl.fromTo(block.querySelector(".iso-pulse"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, t);
      tl.fromTo(block.querySelector(".iso-tint"), { opacity: 0 }, { opacity: 0.75, duration: 0.5, ease: "power1.out" }, t);
      fadeUp(tl, labels[i], t + 0.1, { y: 20 });
      lands[i] = t;
    };

    at.forEach((t, i) => {
      if (i === 0) {
        tl.fromTo(blocks[0], { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE.rise }, t);
        tl.fromTo(dotIn, { scale: 0 }, { scale: 1, duration: 0.5, ease: EASE.pop }, t + 0.9);
        land(0, t + 0.9);
        return;
      }
      const br = bridges[i - 1];
      br.setAttribute("pathLength", "1");
      br.style.strokeDasharray = "1 1.1";
      tl.fromTo(br, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 0.6, ease: EASE.draw }, t);
      tl.fromTo(blocks[i], { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE.rise }, t + 0.2);
      tl.to(dot, { x: L.P[i].x, y: L.P[i].y - lift, duration: 1.0, ease: EASE.move }, t + 0.4);
      land(i, t + 1.4);
    });

    let end = lands[lands.length - 1] + 0.6;
    const last = L.n - 1;
    if (L.steps[last].repeat) {
      const rep = blocks[last].querySelector(".iso-rep");
      rep.setAttribute("pathLength", "1");
      rep.style.strokeDasharray = "1 1.1";
      const t0 = lands[last] + 0.6;
      tl.fromTo(rep, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 0.7, ease: EASE.draw }, t0);
      const p = L.P[last], R = 80, k = L.A / 200, kb = L.B / 200;
      const orb = (a) => ({ x: p.x + k * R * (Math.cos(a) - Math.sin(a)), y: p.y + kb * R * (Math.cos(a) + Math.sin(a)) - lift });
      const frames = [{ ...orb(0), duration: 0.3, ease: EASE.move }];
      for (let j = 1; j <= 32; j++) frames.push({ ...orb((j / 16) * 2 * Math.PI), duration: 2.0 / 32, ease: "none" });
      frames.push({ x: p.x, y: p.y - lift, duration: 0.4, ease: EASE.move });
      tl.to(dot, { keyframes: frames }, t0 + 0.4);
      end = t0 + 0.4 + 2.7;
    }
    return { end, lands };
  }

  window.Egg = {
    EASE, mountSparks, offsetIn, lipsync, sceneStart, sparkIdle, sparkMood, blink, pop, fadeUp, fadeOut, typeOn, highlight,
    stamp, shake, zoom, progress, draw, checks, count, meter, tokens, bars, pointer, pointTo, pointerHide, isoBuild, isoAnimate,
  };
})();
