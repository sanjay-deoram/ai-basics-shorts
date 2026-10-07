/* The word map shared by s04 and s05. Both scenes build it from here so the cut between them is invisible.
   Positions are real: all-MiniLM-L6-v2 embeddings of 8 words (384 numbers each), squashed to 2 numbers
   with PCA, x flipped so the animals sit on the left. Values and how they were made: STORYBOARD.md.
   Map space = frame pixels: x = CX + K·a, y = CY − K·b. */
(function () {
  const CX = 540, CY = 800, K = 600;
  // side: which side of the dot the word sits on (l | r)
  const WORDS = [
    { w: "puppy", a: -0.452, b: 0.352, side: "l" },
    { w: "dog", a: -0.381, b: 0.331, side: "r" },
    { w: "cat", a: -0.407, b: -0.289, side: "r" },
    { w: "kitten", a: -0.498, b: -0.327, side: "l" },
    { w: "fries", a: 0.522, b: 0.283, side: "l" },
    { w: "burger", a: 0.441, b: 0.208, side: "l" },
    { w: "pizza", a: 0.32, b: -0.141, side: "r" },
    { w: "taco", a: 0.456, b: -0.417, side: "l" },
  ];
  WORDS.forEach((d) => { d.x = +(CX + K * d.a).toFixed(1); d.y = +(CY - K * d.b).toFixed(1); });
  const at = (w) => WORDS.find((d) => d.w === w);

  // Axes and dots go into svg (an .egg-svg), the words into layer (a full-frame div).
  function build(svg, layer) {
    svg.insertAdjacentHTML(
      "beforeend",
      `<path class="ink thin map-axis" d="M130 ${CY} L950 ${CY}"/><path class="ink thin map-axis" d="M${CX} 470 L${CX} 1130"/>` +
        WORDS.map((d) => `<circle class="map-dot" data-w="${d.w}" cx="${d.x}" cy="${d.y}" r="11"/>`).join("")
    );
    layer.insertAdjacentHTML(
      "beforeend",
      WORDS.map((d) => {
        const pos = d.side === "l" ? `right:${(1080 - d.x + 20).toFixed(1)}px` : `left:${(d.x + 20).toFixed(1)}px`;
        return `<span class="map-word" data-w="${d.w}" style="${pos};top:${(d.y - 27).toFixed(1)}px">${d.w}</span>`;
      }).join("")
    );
    const by = (sel) => Object.fromEntries([...(sel === "dot" ? svg : layer).querySelectorAll(sel === "dot" ? ".map-dot" : ".map-word")].map((el) => [el.dataset.w, el]));
    return { axes: svg.querySelectorAll(".map-axis"), dots: by("dot"), words: by("word") };
  }

  window.WordMap = { CX, CY, K, WORDS, at, build };
})();
