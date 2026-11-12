// Arc.*: pixel sprites and stepped motion for the arcade variant. Everything is tl.set / steps() so a seek to
// any frame gives the same picture. Original, generic sprites (no existing game's art).
(() => {
  const PAL = { k: "#07071a", w: "#f4f1ff", g: "#9aa0c8", y: "#ffd23f", o: "#ff8a3c", r: "#ff4d6d", p: "#ff7ac8", c: "#3fe0ff",
    n: "#5df58a", e: "#2a9d58", b: "#3b6cff", v: "#6a4fd8", d: "#3b2f7a", t: "#d97757", m: "#fff3d6", u: "#b5651d" };
  const SPRITES = {
    folder: [".kkkkk........", "kyyyyykkkkkkk.", "kyyyyyyyyyyyyk", "kooooooooooook", "koyyyyyyyyyyok", "koyyyyyyyyyyok", "koyyyyyyyyyyok", "koyyyyyyyyyyok", "koyyyyyyyyyyok", "kooooooooooook", ".kkkkkkkkkkkk."],
    scroll: [".kkkkkkkkkk.", "kmmmmmmmmmmk", "kuuuuuuuuuuk", ".kmmmmmmmmk.", ".kmkkkkkkmk.", ".kmmmmmmmmk.", ".kmkkkkmmmk.", ".kmmmmmmmmk.", ".kmkkkkkkmk.", "kuuuuuuuuuuk", "kmmmmmmmmmmk", ".kkkkkkkkkk."],
    chest: ["..kkkkkkkkkk..", ".kuuuuuuuuuuk.", "kuuyuuuuuuyuuk", "kuuuuuuuuuuuuk", "kkkkkkkkkkkkkk", "kyyyyykkyyyyyk", "kuuuuukyykuuuk", "kuuuuukkkkuuuk", "kuuuuuuuuuuuuk", "kuuyuuuuuuyuuk", "kuuuuuuuuuuuuk", "kkkkkkkkkkkkkk"],
    chestOpen: [".kkkkkkkkkkkk.", "kuuuuuuuuuuuuk", "kuuyuuuuuuyuuk", "kkkkkkkkkkkkkk", ".kyyyyyyyyyyk.", ".kyywyyyywyyk.", "kkkkkkkkkkkkkk", "kyyyyykkyyyyyk", "kuuuuuuuuuuuuk", "kuuyuuuuuuyuuk", "kuuuuuuuuuuuuk", "kkkkkkkkkkkkkk"],
    bubble: [".kkkkkkkkkk.", "kwwwwwwwwwwk", "kwwwwwwwwwwk", "kwkkwkkwkkwk", "kwwwwwwwwwwk", "kwwwwwwwwwwk", ".kkkwwkkkkk.", "...kwk......", "...kk......."],
    star: ["....y....", "....y....", "...yyy...", "yyyyyyyyy", ".yyyyyyy.", "..yyyyy..", "..yy.yy..", ".yy...yy.", ".y.....y."],
    hero: ["....cc....", "....cc....", ".cccccccc.", "cccccccccc", "cwkccccwkc", "cwkccccwkc", "cccccccccc", "cccppppccc", ".cccccccc.", ".cc....cc."],
    trophy: ["kyyyyyyyyyk", "yyyyyyyyyyy", "y.yyyyyyy.y", "y.yyywyyy.y", ".yyyyyyyyy.", "..yyyyyyy..", "...yyyyy...", "....yyy....", "....yyy....", "..ooooooo..", ".ooooooooo."],
    check: [".......nn", "......nn.", ".....nn..", "nn..nn...", ".nnnn....", "..nn....."],
    cross: ["rr...rr", ".rr.rr.", "..rrr..", ".rr.rr.", "rr...rr"],
    arrow: ["y....", "yy...", "yyy..", "yyyy.", "yyy..", "yy...", "y...."],
    gem: [".ccccc.", "ccwcccc", "ccccccc", ".ccccc.", "..ccc..", "...c..."],
    d6: [".yyy.", "y...y", "y....", "yyyy.", "y...y", "y...y", ".yyy."],
    d0: [".yyy.", "y...y", "y..yy", "y.y.y", "yy..y", "y...y", ".yyy."],
  };
  // <i class="sp" data-sp="folder" data-px="8" data-swap="y:n,o:e"></i> becomes an SVG of rects, px per cell
  function sprites(scope) {
    scope.querySelectorAll("[data-sp]").forEach((el) => {
      const rows = SPRITES[el.dataset.sp], px = +(el.dataset.px || 8), swap = {};
      (el.dataset.swap || "").split(",").filter(Boolean).forEach((s) => { const [a, b] = s.split(":"); swap[a] = b; });
      const w = rows[0].length, h = rows.length;
      let out = "";
      rows.forEach((row, y) => {
        for (let x = 0; x < w; ) {
          const ch = row[x]; let n = 1;
          while (x + n < w && row[x + n] === ch) n++;
          if (ch !== ".") out += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${PAL[swap[ch] || ch]}"/>`;
          x += n;
        }
      });
      el.style.width = w * px + "px"; el.style.height = h * px + "px";
      el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${out}</svg>`;
    });
  }
  const arr = (els) => (els instanceof Element ? [els] : [...els]);
  // blink in: on, off, on (hidden until then)
  function show(tl, els, at, opts = {}) {
    arr(els).forEach((el, i) => {
      const t = at + i * (opts.stagger || 0);
      gsap.set(el, { opacity: 0 });
      tl.set(el, { opacity: 1 }, t).set(el, { opacity: 0 }, t + 0.05).set(el, { opacity: 1 }, t + 0.1);
    });
    return at;
  }
  function hide(tl, els, at) {
    arr(els).forEach((el) => tl.set(el, { opacity: 0 }, at).set(el, { opacity: 1 }, at + 0.05).set(el, { opacity: 0 }, at + 0.1));
  }
  // fall from above in hard steps, with one small bounce
  function drop(tl, el, at, opts = {}) {
    const dur = opts.dur ?? 0.24;
    gsap.set(el, { opacity: 0 });
    tl.set(el, { opacity: 1 }, at);
    tl.fromTo(el, { y: opts.from ?? -160 }, { y: 0, duration: dur, ease: "steps(4)", immediateRender: false }, at);
    tl.set(el, { y: -12 }, at + dur + 0.06).set(el, { y: 0 }, at + dur + 0.14);
    return at + dur;
  }
  function shake(tl, el, at, amp = 12) {
    [amp, -amp, amp / 2, -amp / 2].forEach((x, i) => tl.set(el, { x, y: i % 2 ? amp / 3 : -amp / 3 }, at + i * 0.045));
    tl.set(el, { x: 0, y: 0 }, at + 0.18);
  }
  // flip a style property between two values n times, then leave it on `end`
  function flash(tl, els, at, prop, a, b, n = 3, end = a) {
    for (let i = 0; i < n * 2; i++) tl.set(els, { [prop]: i % 2 ? b : a }, at + i * 0.07);
    tl.set(els, { [prop]: end }, at + n * 2 * 0.07);
  }
  // steady blink (cursors, PRESS START) between from and to; ends visible
  function blink(tl, el, from, to, period = 0.5) {
    let on = true;
    for (let t = from; t < to; t += period / 2, on = !on) tl.set(el, { opacity: on ? 1 : 0 }, t);
  }
  const type = (tl, el, at, cps = 30) => Egg.typeOn(tl, el, at, { cps });
  // stepped move
  const move = (tl, el, at, vars, n = 5, dur = 0.3) => tl.to(el, { ...vars, duration: dur, ease: `steps(${n})` }, at);
  window.Arc = { sprites, show, hide, drop, shake, flash, blink, type, move };
})();
