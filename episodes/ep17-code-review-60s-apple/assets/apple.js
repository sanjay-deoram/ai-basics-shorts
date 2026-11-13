// Apple-style motion helpers: calm ease-out fades, slides and scales, no bounce. Seek-safe GSAP on the scene timeline;
// each returns the time its motion ends. Typing and the code run bar still come from Egg.typeOn / Egg.codeRun.
window.Apple = (() => {
  const end = (at, o, d) => at + (o.dur ?? d);
  // fade in while sliding up
  const rise = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, y: o.y ?? 40 }, { opacity: 1, y: 0, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.8); };
  // fade in while settling from slightly smaller
  const zoom = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0, scale: o.from ?? 0.94 }, { opacity: 1, scale: 1, duration: o.dur ?? 0.8, ease: "expo.out", stagger: o.stagger ?? 0 }, at); return end(at, o, 0.8); };
  const fade = (tl, els, at, o = {}) => { tl.fromTo(els, { opacity: 0 }, { opacity: o.to ?? 1, duration: o.dur ?? 0.5, ease: "power1.out" }, at); return end(at, o, 0.5); };
  const out = (tl, els, at, o = {}) => { tl.to(els, { opacity: 0, y: o.y ?? 0, scale: o.scale ?? 1, duration: o.dur ?? 0.3, ease: "power2.in" }, at); return end(at, o, 0.3); };
  // .a-tint: the accent copy of the word fades in
  const tint = (tl, els, at, o = {}) => {
    const on = (els instanceof Element ? [els] : [...els]).map((el) => el.querySelector(".on"));
    tl.to(on, { opacity: 1, duration: o.dur ?? 0.5, ease: "power1.inOut", stagger: o.stagger ?? 0 }, at);
    return end(at, o, 0.5);
  };
  // ep17 · fill every [data-ic] with its line icon (tag, chat, bug, db, bolt; shield, person, doc, warn, lock)
  const ICONS = {
    tag: '<path d="M6 21 L21 6 H34 V19 L19 34 Z" /><circle cx="27.5" cy="12.5" r="2.4" />',
    chat: '<path d="M6 10 Q6 6 10 6 H30 Q34 6 34 10 V23 Q34 27 30 27 H17 L10 33 V27 Q6 27 6 23 Z" />',
    bug: '<circle cx="20" cy="10" r="4" /><ellipse cx="20" cy="24" rx="8" ry="10" /><path d="M12 19 H6 M12 25 H5 M12 31 H7 M28 19 H34 M28 25 H35 M28 31 H33 M20 15 V34" />',
    db: '<ellipse cx="20" cy="9" rx="12" ry="4" /><path d="M8 9 V31 Q8 35 20 35 Q32 35 32 31 V9 M8 20 Q8 24 20 24 Q32 24 32 20" />',
    bolt: '<path d="M23 4 L9 23 H19 L17 36 L31 17 H21 Z" />',
    // ep17 code review
    shield: '<path d="M20 4 L33 9 V19 C33 27 27 33 20 36 C13 33 7 27 7 19 V9 Z" />',
    person: '<circle cx="20" cy="13" r="7" /><path d="M6 36 C6 26 12 22 20 22 C28 22 34 26 34 36" />',
    doc: '<path d="M10 4 H24 L31 11 V36 H10 Z M24 4 V11 H31 M15 19 H26 M15 25 H26 M15 31 H22" />',
    warn: '<path d="M20 5 L36 33 H4 Z M20 15 V24 M20 29 V29.5" />',
    lock: '<rect x="9" y="18" width="22" height="16" rx="3" /><path class="shk" d="M14 18 V13 A6 6 0 0 1 26 13 V18" />',
  };
  const icons = (root) => root.querySelectorAll("[data-ic]").forEach((el) => {
    el.innerHTML = `<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="${el.dataset.stroke || "#1d1d1f"}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[el.dataset.ic]}</g></svg>`;
  });
  return { rise, zoom, fade, out, tint, icons };
})();
