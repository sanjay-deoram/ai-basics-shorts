/* "Soft" variant motion kit: slow in-out eases, blur-to-sharp reveals, scale + blur dissolves.
   Each helper adds tweens to a paused GSAP timeline at a scene-local time. Typing still uses Egg.typeOn. */
window.Soft = (() => {
  const OUT = "power3.out", INOUT = "power2.inOut";
  // headline: split into words once, then each word comes into focus
  function words(tl, el, at, o = {}) {
    if (!el.dataset.split) {
      el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="sw">${w}</span>`).join(" ");
      el.dataset.split = "1";
    }
    tl.fromTo(el.querySelectorAll(".sw"), { opacity: 0, y: 18, filter: "blur(14px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: o.dur ?? 0.75, ease: OUT, stagger: o.stagger ?? 0.1 }, at);
  }
  // a card or label glides up into focus
  function rise(tl, els, at, o = {}) {
    tl.fromTo(els, { opacity: 0, y: o.y ?? 28, scale: o.scale ?? 0.97, filter: "blur(12px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: o.dur ?? 0.8, ease: OUT, stagger: o.stagger ?? 0 }, at);
  }
  // dissolve away: a little larger, out of focus
  function melt(tl, els, at, o = {}) {
    tl.to(els, { opacity: 0, scale: o.scale ?? 1.03, y: o.y ?? 0, filter: "blur(14px)", duration: o.dur ?? 0.45, ease: "power2.in" }, at);
  }
  // the whole scene pushes in very slowly, so nothing is ever perfectly still
  function push(tl, stage, dur) {
    tl.fromTo(stage, { scale: 1 }, { scale: 1.025, duration: dur, ease: "none" }, 0);
  }
  return { words, rise, melt, push, OUT, INOUT };
})();
