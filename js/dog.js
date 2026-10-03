/* Cartoon dog drawn as inline SVG so it can bark, wag and age without image assets. */
(function () {
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const c = (v) => Math.max(0, Math.min(255, v + amt));
    const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function svg({ color = "#d9a441", eyesClosed = false, grey = false } = {}) {
    const dark = shade(color, -45);
    const light = shade(color, 45);
    const muzzle = grey ? "#d9d4cc" : light;
    const eye = eyesClosed
      ? '<path d="M150 58 q5 4 10 0" stroke="#2d2118" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
      : '<circle cx="155" cy="57" r="4.5" fill="#2d2118"/><circle cx="156.5" cy="55.5" r="1.4" fill="#fff"/>';
    const brow = grey ? '<path d="M148 48 q7 -4 14 0" stroke="#e8e4dd" stroke-width="3" fill="none" stroke-linecap="round"/>' : "";
    return `
<svg class="dog-svg" viewBox="0 0 210 160" role="img" aria-label="Cartoon dog">
  <ellipse cx="100" cy="150" rx="70" ry="6" fill="rgba(0,0,0,.12)"/>
  <g class="dog-tail"><path d="M42 88 Q18 70 26 44" stroke="${color}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
  <rect x="52" y="104" width="13" height="42" rx="6" fill="${dark}"/>
  <rect x="112" y="104" width="13" height="42" rx="6" fill="${dark}"/>
  <ellipse cx="88" cy="96" rx="52" ry="29" fill="${color}"/>
  <ellipse cx="92" cy="108" rx="34" ry="13" fill="${light}" opacity=".7"/>
  <rect x="66" y="108" width="13" height="40" rx="6" fill="${color}"/>
  <rect x="126" y="104" width="13" height="44" rx="6" fill="${color}"/>
  <path d="M120 70 Q132 90 128 104 L146 98 Q150 80 142 66 Z" fill="${color}"/>
  <rect x="122" y="76" width="24" height="7" rx="3" transform="rotate(-25 134 80)" fill="#2a9d8f"/>
  <circle cx="138" cy="86" r="4" fill="#f4c542"/>
  <g class="dog-head">
    <circle cx="146" cy="60" r="27" fill="${color}"/>
    <g class="dog-jaw"><path d="M156 76 Q172 90 188 78 L186 74 Q172 82 158 72 Z" fill="${dark}"/></g>
    <ellipse cx="172" cy="70" rx="19" ry="12" fill="${muzzle}"/>
    <ellipse cx="188" cy="65" rx="6" ry="5" fill="#2d2118"/>
    <path d="M172 78 q6 3 12 0" stroke="#2d2118" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${eye}${brow}
    <path class="dog-ear" d="M132 40 Q116 44 120 76 Q130 80 138 62 Z" fill="${dark}"/>
  </g>
</svg>`;
  }

  function mount(el, opts) {
    el.innerHTML = svg(opts);
  }

  function bark(el, seconds = 0.4) {
    if (!el) return;
    el.classList.remove("barking");
    void el.offsetWidth; // restart the animation
    el.classList.add("barking");
    clearTimeout(el._barkTimer);
    el._barkTimer = setTimeout(() => el.classList.remove("barking"), Math.max(400, seconds * 1000));
  }

  window.Dog = { mount, bark };
})();
