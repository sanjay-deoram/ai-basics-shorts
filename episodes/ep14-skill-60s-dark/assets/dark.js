/* Dark variant motion kit. Like Egg.*: each helper adds tweens to a paused GSAP timeline at a scene-local time. */
(function () {
  const OUT = "expo.out";
  const CW = 0.6; // Geist Mono advance, em

  // a panel slides in on a tilted plane and settles flat
  function panelIn(tl, els, at, o = {}) {
    tl.fromTo(els, { opacity: 0, y: o.y ?? 80, rotationX: o.rx ?? 16, scale: 0.955, transformPerspective: 1500, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: o.dur ?? 0.95, ease: OUT, stagger: o.stagger ?? 0 }, at);
  }
  function rise(tl, els, at, o = {}) {
    tl.fromTo(els, { opacity: 0, y: o.y ?? 22 }, { opacity: 1, y: 0, duration: o.dur ?? 0.7, ease: OUT, stagger: o.stagger ?? 0 }, at);
  }
  // type monospace text (el: .dk-type) with a block caret that steps along; returns the end time
  function type(tl, el, at, o = {}) {
    const cps = o.cps ?? 30;
    const end = Egg.typeOn(tl, el, at, { cps });
    const n = el.querySelectorAll(".c").length;
    const caret = document.createElement("i");
    caret.className = "dk-caret";
    el.prepend(caret);
    const cw = parseFloat(getComputedStyle(el).fontSize) * CW;
    gsap.set(caret, { opacity: 0 });
    tl.set(caret, { opacity: 1 }, o.show ?? at);
    tl.fromTo(caret, { x: 0 }, { x: n * cw, duration: n / cps, ease: "steps(" + n + ")" }, at);
    if (o.hold !== Infinity) tl.set(caret, { opacity: 0 }, end + (o.hold ?? 0.25));
    return end;
  }
  // the key word takes the accent sheen
  function sheen(tl, el, at, dur = 0.9) {
    tl.fromTo(el, { backgroundPosition: "0% 0" }, { backgroundPosition: "100% 0", duration: dur, ease: "power2.out" }, at);
  }
  // a thin accent line scans down a panel (Claude reads it)
  function scan(tl, line, at, dist, dur = 0.7) {
    tl.fromTo(line, { y: 0, opacity: 0 }, { y: dist, opacity: 1, duration: dur, ease: "power1.inOut" }, at);
    tl.to(line, { opacity: 0, duration: 0.2, ease: "none" }, at + dur - 0.1);
  }
  // focus pull: dim and soften what is not the hero
  function dim(tl, els, at, on = true, o = {}) {
    tl.to(els, { opacity: on ? (o.to ?? 0.4) : 1, filter: on ? "blur(" + (o.blur ?? 2) + "px)" : "blur(0px)", duration: 0.5, ease: "power2.out" }, at);
  }
  // slow push-in on the whole stage, and the fade to the next scene
  function camera(tl, stage, dur, o = {}) {
    tl.fromTo(stage, { scale: 1 }, { scale: o.to ?? 1.03, duration: dur, ease: "none" }, 0);
    if (o.in !== false) tl.fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0);
    if (o.out !== false) tl.to(stage, { opacity: 0, duration: 0.25, ease: "none" }, dur - 0.25);
  }
  const CURSOR = '<svg viewBox="0 0 44 44"><path d="M8 5 L8 33 L15.5 26.5 L20.5 38 L25.5 35.8 L20.6 24.6 L30.5 24 Z" fill="#f7f8f8" stroke="#08090a" stroke-width="2" stroke-linejoin="round"/></svg><i class="rip"></i>';
  function cursor(el) { el.classList.add("dk-cursor"); el.innerHTML = CURSOR; gsap.set(el, { opacity: 0 }); gsap.set(el.querySelector(".rip"), { opacity: 0 }); return el; }
  function click(tl, el, at) {
    tl.to(el.querySelector("svg"), { scale: 0.82, duration: 0.09, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "20% 12%" }, at);
    tl.fromTo(el.querySelector(".rip"), { scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.45, ease: "power2.out" }, at);
  }

  window.Dk = { OUT, panelIn, rise, type, sheen, scan, dim, camera, cursor, click };
})();
