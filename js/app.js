(function () {
  "use strict";

  /* ======================================================================
     Helpers
     ====================================================================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };

  const BY_ID = Object.fromEntries(BREEDS.map((b) => [b.id, b]));
  const REGION = Object.fromEntries(REGIONS.map((r) => [r.id, r]));
  const SIZES = ["Toy", "Small", "Medium", "Large", "Giant"];
  const P = CREDITS.photos;

  /* ---------- Images: studio cutouts (product-photo style) or original photos ---------- */
  const ST = window.STUDIO || { adults: [], busts: [], puppies: [], seniors: [], stages: [] };
  const CUT = { adult: new Set(ST.adults), puppy: new Set(ST.puppies), senior: new Set(ST.seniors), stage: new Set(ST.stages) };
  const BUST = new Set(ST.busts);
  const studioPref = () => document.documentElement.dataset.studio || "auto";
  const studioOn = () => studioPref() !== "photo";
  const cutFor = (kind, id) => studioOn() && CUT[kind].has(id);
  const img = {
    adult: (id) => cutFor("adult", id) ? `/images/studio/${id}.webp` : `/images/breeds/${id}.jpg`,
    sm: (id) => cutFor("adult", id) ? `/images/studio/${id}-sm.webp` : `/images/breeds/${id}-sm.jpg`,
    photo: (id) => `/images/breeds/${id}.jpg`,
    photoSm: (id) => `/images/breeds/${id}-sm.jpg`,
    puppy: (id) => cutFor("puppy", id) ? `/images/studio/puppies/${id}.webp` : (P[id] && P[id].puppy ? `/images/puppies/${id}.jpg` : null),
    senior: (id) => cutFor("senior", id) ? `/images/studio/seniors/${id}.webp` : (P[id] && P[id].senior ? `/images/seniors/${id}.jpg` : null),
    stage: (k) => cutFor("stage", k) ? `/images/studio/stages/${k}.webp` : `/images/stages/${k}.jpg`
  };
  /** Class names for a frame holding this image: "studio" (+ "bust" for close-up portraits). */
  const frame = (kind, id) => {
    if (!cutFor(kind, id)) return "";
    const bustKey = kind === "adult" ? id : `${id}-${kind}`;
    return "studio" + (BUST.has(bustKey) ? " bust" : "");
  };
  const thumbCls = (id) => (cutFor("adult", id) ? ' class="cutimg"' : "");

  function applyStudio(pref) {
    if (pref === "auto") delete document.documentElement.dataset.studio;
    else document.documentElement.dataset.studio = pref;
  }
  applyStudio(store.get("pp-studio", "auto"));
  const effectiveStudio = () => { const p = studioPref(); return p === "auto" ? (isDarkTheme() ? "dark" : "light") : p; };
  function isDarkTheme() {
    const t = document.documentElement.dataset.theme;
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const studioToggle = () => `
    <div class="studio-toggle"><span>Background</span>
      <div class="seg" role="group" aria-label="Photo background">
        <button type="button" data-studio-set="light" aria-pressed="${effectiveStudio() === "light"}"><i class="swatch w"></i>White</button>
        <button type="button" data-studio-set="dark" aria-pressed="${effectiveStudio() === "dark"}"><i class="swatch d"></i>Dark</button>
        <button type="button" data-studio-set="photo" aria-pressed="${effectiveStudio() === "photo"}">📷 Photo</button>
      </div>
    </div>`;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-studio-set]");
    if (!b) return;
    const v = b.dataset.studioSet;
    store.set("pp-studio", v);
    applyStudio(v);
    const y = window.scrollY;
    route(true);
    window.scrollTo({ top: y });
  });
  const shortName = (b) => b.name.replace(/ \(.*\)$/, "");
  const sizeRank = (b) => SIZES.indexOf(b.size);
  const creditLine = (c) => c ? `Photo: ${c.artist} · ${c.license}` : "";
  const creditLink = (c) => c ? `<a class="credit" href="${esc(c.page)}" target="_blank" rel="noopener">${esc(creditLine(c))}</a>` : "";

  let toastTimer;
  function toast(msg) {
    $(".toast")?.remove();
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.remove(), 2200);
  }

  /* ---------- Favourites ---------- */
  const favs = new Set(store.get("pp-favs", []));
  const favBtn = (id) => `<button class="fav" type="button" data-fav="${id}" aria-pressed="${favs.has(id)}" aria-label="Save ${esc(BY_ID[id].name)}">${icon("heart")}</button>`;
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    const id = btn.dataset.fav;
    favs.has(id) ? favs.delete(id) : favs.add(id);
    store.set("pp-favs", [...favs]);
    $$(`[data-fav="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", String(favs.has(id))));
    toast(favs.has(id) ? `❤️ Saved ${shortName(BY_ID[id])}` : `Removed ${shortName(BY_ID[id])}`);
    if (state.breeds.favOnly && currentView === "breeds") renderBreedResults();
  });

  /* ---------- Theme ---------- */
  const themeBtn = $("#theme-btn");
  function isDark() {
    const t = document.documentElement.dataset.theme;
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeIcon() { themeBtn.innerHTML = icon(isDark() ? "sun" : "moon"); themeBtn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode"); }
  themeBtn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("pp-theme", next);
    try { localStorage.setItem("pp-theme", next); } catch { /* ignore */ }
    syncThemeIcon();
    if (studioPref() === "auto") { const y = window.scrollY; route(true); window.scrollTo({ top: y }); }
  });
  syncThemeIcon();

  /* ---------- Breed picker sheet ---------- */
  const pickerSheet = $("#picker-sheet");
  let pickerCb = null, pickerActive = null;
  function renderPicker() {
    const q = $("#picker-search").value.trim().toLowerCase();
    const html = REGIONS.map((r) => {
      const list = BREEDS.filter((b) => b.region === r.id && (!q || (b.name + b.country).toLowerCase().includes(q)));
      if (!list.length) return "";
      return `<div class="picker-group">${r.icon} ${esc(r.name)}</div>` + list.map((b) => `
        <button class="picker-item ${b.id === pickerActive ? "active" : ""}" type="button" data-pick="${b.id}">
          <img src="${img.sm(b.id)}"${thumbCls(b.id)} alt="" loading="lazy" width="44" height="44">
          <span><b>${esc(b.name)}</b><small>${b.flag} ${esc(b.country)} · ${esc(b.size)}</small></span>
        </button>`).join("");
    }).join("");
    $("#picker-list").innerHTML = html || `<p class="empty">No breeds match "${esc(q)}".</p>`;
  }
  function openPicker(active, cb) {
    pickerCb = cb; pickerActive = active;
    $("#picker-search").value = "";
    renderPicker();
    pickerSheet.hidden = false;
    setTimeout(() => $("#picker-search").focus(), 50);
  }
  $("#picker-search").addEventListener("input", renderPicker);
  $("#picker-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pick]");
    if (!b) return;
    pickerSheet.hidden = true;
    pickerCb && pickerCb(b.dataset.pick);
  });
  const pickerButton = (b, label = "Change breed") => `
    <button class="picker-btn" type="button" data-open-picker aria-label="${label}: currently ${esc(b.name)}">
      <img src="${img.sm(b.id)}"${thumbCls(b.id)} alt="" width="44" height="44">
      <span><b>${esc(b.name)}</b><small>${b.flag} ${esc(b.country)} · tap to change</small></span>
      ${icon("chev")}
    </button>`;

  /* ---------- Sheets ---------- */
  const careSheet = $("#care-sheet");
  function closeSheets() { careSheet.hidden = true; pickerSheet.hidden = true; const ms = $("#model-sheet"); if (ms && !ms.hidden) { ms.hidden = true; $("#model-slot").innerHTML = ""; } }
  $("#care-tab").addEventListener("click", (e) => { e.preventDefault(); careSheet.hidden = !careSheet.hidden; });
  $$(".sheet").forEach((s) => s.addEventListener("click", (e) => { if (e.target === s || e.target.closest("[data-close]")) s.hidden = true; }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheets(); });

  /* ---------- 3D & AR viewer ---------- */
  const modelSheet = $("#model-sheet");
  let mvLoading = null;
  function loadModelViewer() {
    if (customElements.get("model-viewer")) return Promise.resolve();
    if (!mvLoading) {
      mvLoading = new Promise((res, rej) => {
        const s = document.createElement("script");
        s.type = "module";
        s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
        s.onload = () => customElements.whenDefined("model-viewer").then(res);
        s.onerror = () => { mvLoading = null; rej(new Error("model-viewer failed to load")); };
        document.head.appendChild(s);
      });
    }
    return mvLoading;
  }
  const has3D = (id) => !!(window.MODELS && MODELS[id]);
  async function open3D(b) {
    const m = MODELS[b.id];
    $("#model-title").textContent = "3D view";
    $("#model-slot").innerHTML = `<p class="empty" style="color:#cfd6d9">Loading 3D model…</p>`;
    modelSheet.hidden = false;
    try { await loadModelViewer(); } catch { $("#model-slot").innerHTML = `<p class="empty" style="color:#cfd6d9">Couldn't load the 3D viewer. Check your connection.</p>`; return; }
    const c = m.credit;
    $("#model-slot").innerHTML = `
      <model-viewer src="${esc(m.glb)}" ${m.usdz ? `ios-src="${esc(m.usdz)}"` : ""} alt="3D model of a ${esc(b.name)}"
        camera-controls touch-action="pan-y" auto-rotate auto-rotate-delay="1500" rotation-per-second="18deg" autoplay
        shadow-intensity="1.1" shadow-softness="0.9" exposure="1.05" environment-image="neutral"
        ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" ar-placement="floor" interaction-prompt="auto">
        <button slot="ar-button" class="ar-btn" type="button"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/></svg>View in your space</button>
      </model-viewer>
      <div class="viewer-bottom">
        <div><h2>${b.flag} ${esc(b.name)}</h2><small>Drag to rotate · pinch to zoom · tap the dog to hear it${c ? ` · Model: <a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a> by ${esc(c.artist)} (${esc(c.license)})` : ""}</small></div>
        <button class="btn primary sm" type="button" id="mv-bark">🔊 Bark</button>
      </div>`;
    const mv = $("model-viewer", modelSheet);
    const bark = () => playSound(null, b.barks[0].s, b);
    $("#mv-bark").addEventListener("click", bark);
    mv.addEventListener("click", (e) => { if (!e.target.closest("[slot]")) bark(); });
  }
  modelSheet.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) { modelSheet.hidden = true; $("#model-slot").innerHTML = ""; } });

  /* ======================================================================
     Sound playback (shared)
     ====================================================================== */
  let vizRaf = 0;
  const levelBuf = new Uint8Array(64);
  function animateViz(viz, seconds) {
    cancelAnimationFrame(vizRaf);
    if (!viz) return;
    const bars = $$("i", viz);
    const end = performance.now() + seconds * 1000;
    const tick = (now) => {
      Sounds.levels(levelBuf);
      bars.forEach((bar, i) => {
        const v = levelBuf[2 + i * 2] || 0;
        bar.style.height = now < end ? `${4 + (v / 255) * 44}px` : "4px";
      });
      if (now < end) vizRaf = requestAnimationFrame(tick);
    };
    vizRaf = requestAnimationFrame(tick);
  }
  async function playSound(btn, type, breed, stageEl) {
    $$(".sound.playing").forEach((s) => s.classList.remove("playing"));
    btn && btn.classList.add("playing");
    const secs = await Sounds.play(type, breed ? breed.size : "Medium");
    if (!secs) { btn && btn.classList.remove("playing"); toast("🔇 Sound isn't available on this device"); return; }
    if (stageEl) {
      stageEl.classList.add("barking");
      clearTimeout(stageEl._t);
      stageEl._t = setTimeout(() => stageEl.classList.remove("barking"), secs * 1000);
      animateViz(stageEl.parentElement.querySelector(".viz"), secs);
    }
    clearTimeout(btn && btn._t);
    if (btn) btn._t = setTimeout(() => btn.classList.remove("playing"), secs * 1000);
  }
  const soundCard = (s, i) => `
    <button class="sound" type="button" data-sound="${s.s}" data-i="${i}">
      <span class="play">${icon("play")}</span>
      <b>${esc(s.t)} ${Sounds.isSimulated(s.s) ? `<span class="badge sim" title="No freely licensed recording exists yet">Simulated</span>` : `<span class="badge real">Real audio</span>`}</b>
      <span class="when">${esc(s.when)}</span>
      <span class="says">${esc(s.says)}</span>
    </button>`;

  /* ======================================================================
     Views
     ====================================================================== */
  const state = {
    breeds: { q: "", region: "", country: "", size: "", sort: "region", favOnly: false },
    breed: store.get("pp-breed", "indie"),
    adoptTab: "ready",
    quiz: { step: 0, answers: {} },
    costCurrency: "INR", costBreed: ""
  };
  if (!BY_ID[state.breed]) state.breed = "indie";
  const setBreed = (id) => { state.breed = id; store.set("pp-breed", id); };

  /* ---------- Home ---------- */
  const FACTS = [
    "A dog's nose print is unique, much like a human fingerprint.",
    "Dogs can smell 10,000 to 100,000 times better than humans.",
    "The Basenji doesn't bark; it yodels! Hear it in the Bark Lab.",
    "Puppies are born deaf and blind. Their eyes open at around 2 weeks.",
    "Indian Pariah dogs are one of the oldest dog types in the world.",
    "The Mudhol Hound serves in the Indian Army.",
    "Dogs dream like we do. Twitching paws in sleep are often dream-running.",
    "Great Danes are considered seniors at about 6, while Chihuahuas can live past 16.",
    "Dalmatian puppies are born completely white; their spots appear later.",
    "Huskies 'talk' and howl far more than they bark.",
    "Chocolate, grapes, onion and xylitol are among the most common dog poisonings at home."
  ];
  function renderHome() {
    const regionCover = { "south-asia": "rajapalayam", "east-asia": "shiba", arctic: "samoyed", europe: "german-shepherd", americas: "labrador", africa: "basenji", "middle-east": "afghan-hound", oceania: "cattle-dog" };
    const popular = ["labrador", "indie", "german-shepherd", "golden-retriever", "beagle", "shih-tzu", "husky", "pug", "rottweiler", "pomeranian"];
    const saved = [...favs].filter((id) => BY_ID[id]);
    let fi = Math.floor(Math.random() * FACTS.length);
    $("#view-home").innerHTML = `
      <div class="hero">
        <div>
          <span class="eyebrow">${icon("paw").replace("<svg", '<svg width="14" height="14"')} Your pocket guide to dogs</span>
          <h1>Learn, love &amp; <em>care</em> for every kind of dog.</h1>
          <p class="lead">${BREEDS.length} breeds from ${REGIONS.length} world regions with real photos and sounds. Find what each one loves, how it grows from puppy to senior, and how to be a great dog parent.</p>
          <form class="search" id="home-search" role="search">
            ${icon("search")}
            <input type="search" name="q" placeholder="Search a breed, country or trait…" aria-label="Search breeds">
          </form>
          <div class="hero-stats">
            <div><b>${BREEDS.length}</b><span>breeds</span></div>
            <div><b>${BREEDS.reduce((n, b) => n + b.barks.length, 0)}</b><span>bark meanings</span></div>
            <div><b>${new Set(BREEDS.map((b) => b.country)).size}</b><span>countries</span></div>
          </div>
        </div>
        <div class="collage">
          <a href="#breed/indie"><figure class="${frame("adult", "indie")}"><img src="${img.adult("indie")}" alt="Indian Pariah dog" fetchpriority="high"><figcaption>🇮🇳 Indie</figcaption></figure></a>
          <a href="#breed/golden-retriever"><figure class="${frame("adult", "golden-retriever")}"><img src="${img.sm("golden-retriever")}" alt="Golden Retriever"><figcaption>🇬🇧 Golden Retriever</figcaption></figure></a>
          <a href="#breed/husky"><figure class="${frame("adult", "husky")}"><img src="${img.sm("husky")}" alt="Siberian Husky"><figcaption>🇷🇺 Husky</figcaption></figure></a>
          <button class="bark-fab" type="button" id="hero-bark">🔊 Hear an Indie bark</button>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Explore by region</h2><a href="#breeds">All breeds →</a></div>
        <div class="region-grid">
          ${REGIONS.map((r) => `
            <a class="region-tile" href="#breeds/${r.id}">
              <img src="${img.photoSm(regionCover[r.id])}" alt="" loading="lazy">
              <b>${r.icon} ${esc(r.name)}</b>
              <small>${BREEDS.filter((b) => b.region === r.id).length} breeds</small>
            </a>`).join("")}
        </div>
      </div>

      ${saved.length ? `<div class="section"><div class="section-head"><h2>❤️ Your saved breeds</h2></div><div class="rail">${saved.map(breedCard).join("")}</div></div>` : ""}

      <div class="section">
        <div class="section-head"><h2>Popular breeds</h2><a href="#breeds">See all →</a></div>
        <div class="rail">${popular.map(breedCard).join("")}</div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Everything you need</h2></div>
        <div class="feature-grid">
          ${[
            ["#bark", "🔊", "Bark Lab", "Real barks, howls & whines, and what each breed is trying to say"],
            ["#timeline", "📈", "Life Stages", "How your breed looks and what it needs from puppy to senior"],
            ["#adopt", "🏡", "Adoption Guide", "Readiness check, costs, steps & the first 30 days"],
            ["#quiz", "🎯", "Breed Match Quiz", "Find a dog that fits your home and lifestyle"],
            ["#health", "🩺", "Health & Issues", "Warning signs, prevention & emergencies"],
            ["#food", "🍗", "Food Guide", "Safe, in-moderation & toxic foods"]
          ].map(([h, e, t, d]) => `<a class="feature" href="${h}"><span class="card-ic">${e}</span><span><b>${t}</b><small>${d}</small></span></a>`).join("")}
        </div>
      </div>

      <div class="section card fact">
        <span class="card-ic" style="background:var(--accent-container)">💡</span>
        <div><b>Did you know?</b><p id="fact-text">${esc(FACTS[fi])}</p></div>
        <button class="btn sm outline" id="fact-next" type="button">Next fact</button>
      </div>

      <div class="section card promo">
        <div>
          <span class="badge">Coming soon</span>
          <h2>PawPedia Food Shop 🛒</h2>
          <p>Vet-approved food, treats &amp; essentials delivered to your door. Join the waitlist for launch offers.</p>
        </div>
        <a class="btn" style="background:#fff;color:var(--teal-800)" href="#services/shop">Notify me</a>
      </div>`;
    $("#home-search").addEventListener("submit", (e) => {
      e.preventDefault();
      state.breeds.q = new FormData(e.target).get("q").trim();
      location.hash = "#breeds";
    });
    $("#hero-bark").addEventListener("click", () => playSound(null, "bark", BY_ID.indie));
    $("#fact-next").addEventListener("click", () => { fi++; $("#fact-text").textContent = FACTS[fi % FACTS.length]; });
  }

  function breedCard(id) {
    const b = typeof id === "string" ? BY_ID[id] : id;
    return `
      <a class="bcard" href="#breed/${b.id}">
        <div class="ph ${frame("adult", b.id)}">
          <img src="${img.sm(b.id)}" alt="${esc(b.name)}" loading="lazy" width="480" height="360">
          <span class="flag">${b.flag} ${esc(b.country)}${has3D(b.id) ? " · 🧊 3D" : ""}</span>
          ${favBtn(b.id)}
        </div>
        <div class="body">
          <h3>${esc(b.name)}</h3>
          <span class="meta">${esc(b.size)} · ${esc(b.weight)} · ${esc(b.lifespan)}</span>
          <div class="tags">${b.temperament.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </a>`;
  }

  /* ---------- Breeds explorer ---------- */
  function renderBreeds(regionArg) {
    const s = state.breeds;
    if (regionArg !== undefined) { s.region = REGION[regionArg] ? regionArg : ""; s.country = ""; }
    $("#view-breeds").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Breed encyclopedia</span>
        <h1>Discover ${BREEDS.length} dog breeds</h1>
        <p class="lead">Filter by region, country and size. Tap a breed for its personality, play style, food, ideal temperature, barks, life stages and health.</p>
      </div>
      <div class="filters">
        <div class="chips" id="region-chips" role="group" aria-label="Filter by region">
          <button class="chip" type="button" data-region="" aria-pressed="${!s.region}">🌐 All <span class="count">${BREEDS.length}</span></button>
          ${REGIONS.map((r) => `<button class="chip" type="button" data-region="${r.id}" aria-pressed="${s.region === r.id}">${r.icon} ${esc(r.name)} <span class="count">${BREEDS.filter((b) => b.region === r.id).length}</span></button>`).join("")}
        </div>
        <div class="filter-row">
          <label class="search">${icon("search")}<input type="search" id="breed-q" placeholder="Search breeds, countries, traits…" value="${esc(s.q)}" aria-label="Search breeds"></label>
          <select id="breed-country" aria-label="Country"></select>
          <select id="breed-size" aria-label="Size">
            <option value="">All sizes</option>${SIZES.map((z) => `<option ${s.size === z ? "selected" : ""}>${z}</option>`).join("")}
          </select>
          <select id="breed-sort" aria-label="Sort">
            ${[["region", "Group by region"], ["az", "A → Z"], ["energy", "Most energetic"], ["calm", "Calmest"], ["small", "Smallest first"], ["large", "Largest first"], ["first", "Best for first-timers"], ["quiet", "Quietest"]].map(([v, l]) => `<option value="${v}" ${s.sort === v ? "selected" : ""}>${l}</option>`).join("")}
          </select>
          <button class="chip" type="button" id="fav-only" aria-pressed="${s.favOnly}">❤️ Saved</button>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin:calc(var(--sp-2) * -1) 0 var(--sp-3)">${studioToggle()}</div>
      <div id="breed-results"></div>`;
    fillCountries();
    $("#region-chips").addEventListener("click", (e) => {
      const c = e.target.closest("[data-region]");
      if (!c) return;
      s.region = c.dataset.region; s.country = "";
      $$("#region-chips .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
      fillCountries(); renderBreedResults();
      history.replaceState(null, "", s.region ? `#breeds/${s.region}` : "#breeds");
    });
    $("#breed-q").addEventListener("input", (e) => { s.q = e.target.value; renderBreedResults(); });
    $("#breed-country").addEventListener("change", (e) => { s.country = e.target.value; renderBreedResults(); });
    $("#breed-size").addEventListener("change", (e) => { s.size = e.target.value; renderBreedResults(); });
    $("#breed-sort").addEventListener("change", (e) => { s.sort = e.target.value; renderBreedResults(); });
    $("#fav-only").addEventListener("click", (e) => { s.favOnly = !s.favOnly; e.currentTarget.setAttribute("aria-pressed", String(s.favOnly)); renderBreedResults(); });
    renderBreedResults();
  }
  function fillCountries() {
    const s = state.breeds;
    const countries = [...new Set(BREEDS.filter((b) => !s.region || b.region === s.region).map((b) => b.country))].sort();
    $("#breed-country").innerHTML = `<option value="">All countries</option>` + countries.map((c) => {
      const b = BREEDS.find((x) => x.country === c);
      return `<option value="${esc(c)}" ${s.country === c ? "selected" : ""}>${b.flag} ${esc(c)}</option>`;
    }).join("");
  }
  function renderBreedResults() {
    const s = state.breeds;
    const q = s.q.trim().toLowerCase();
    let list = BREEDS.filter((b) =>
      (!s.region || b.region === s.region) && (!s.country || b.country === s.country) && (!s.size || b.size === s.size) &&
      (!s.favOnly || favs.has(b.id)) &&
      (!q || [b.name, b.country, b.group, REGION[b.region].name, ...b.temperament].join(" ").toLowerCase().includes(q)));
    const sorters = {
      az: (a, b) => a.name.localeCompare(b.name), energy: (a, b) => b.energy - a.energy || a.name.localeCompare(b.name),
      calm: (a, b) => a.energy - b.energy || a.name.localeCompare(b.name), small: (a, b) => sizeRank(a) - sizeRank(b),
      large: (a, b) => sizeRank(b) - sizeRank(a), first: (a, b) => b.firstTime - a.firstTime, quiet: (a, b) => a.barkiness - b.barkiness
    };
    const out = $("#breed-results");
    if (!list.length) {
      out.innerHTML = `<div class="empty"><span>🐾</span>${s.favOnly && !favs.size ? "Tap the ♡ on any breed to save it here." : "No breeds match these filters."}</div>`;
      return;
    }
    const meta = `<div class="result-meta"><span>${list.length} breed${list.length > 1 ? "s" : ""}</span></div>`;
    if (s.sort === "region") {
      out.innerHTML = meta + REGIONS.map((r) => {
        const group = list.filter((b) => b.region === r.id);
        return group.length ? `<div class="region-group"><h2>${r.icon} ${esc(r.name)} <small>${group.length}</small></h2><div class="breed-grid">${group.map(breedCard).join("")}</div></div>` : "";
      }).join("");
    } else {
      list = [...list].sort(sorters[s.sort]);
      out.innerHTML = meta + `<div class="breed-grid">${list.map(breedCard).join("")}</div>`;
    }
  }

  /* ---------- Breed detail ---------- */
  const meter = (label, v, hint = "") => `<div class="meter"><div class="meter-top"><span>${label}</span><span>${hint || v + "/5"}</span></div><div class="bar"><i style="width:${v * 20}%"></i></div></div>`;
  const ul = (items) => `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

  function renderBreedDetail(b) {
    setBreed(b.id);
    const c = P[b.id] || {};
    const pup = img.puppy(b.id), sen = img.senior(b.id);
    $("#view-breed").innerHTML = `
      <a class="back" href="#breeds${state.breeds.region ? "/" + state.breeds.region : ""}">${icon("back").replace("<svg", '<svg width="16" height="16"')} All breeds</a>
      <div class="dhero">
        <div class="ph ${frame("adult", b.id)}"><img src="${img.adult(b.id)}" alt="${esc(b.name)}">${creditLink(c.adult)}</div>
        <div class="info">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:start">
            <div><span class="origin">${b.flag} ${esc(b.country)} · ${REGION[b.region].icon} ${esc(REGION[b.region].name)}</span><h1>${esc(b.name)}</h1></div>
            ${favBtn(b.id)}
          </div>
          <div class="tags">${b.temperament.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}<span class="tag">${esc(b.group)}</span></div>
          ${studioToggle()}
          <dl class="stats">
            <div class="stat"><dt>Size</dt><dd>${esc(b.size)}</dd></div>
            <div class="stat"><dt>Weight</dt><dd>${esc(b.weight)}</dd></div>
            <div class="stat"><dt>Lifespan</dt><dd>${esc(b.lifespan)}</dd></div>
            <div class="stat"><dt>Comfort temp</dt><dd>🌡️ ${esc(b.idealTemp)}</dd></div>
          </dl>
          <div class="btn-row">
            <button class="btn primary" type="button" id="d-bark">🔊 Hear it</button>
            ${has3D(b.id) ? `<button class="btn three-d" type="button" id="d-3d">🧊 View in 3D &amp; AR</button>` : ""}
            <a class="btn love" href="#services/get/${b.id}">❤️ I want this dog</a>
          </div>
        </div>
      </div>

      <nav class="tabs" id="d-tabs" aria-label="Sections">
        <a href="#" data-sec="d-overview" class="active">Overview</a>
        <a href="#" data-sec="d-barks">Barks</a>
        <a href="#" data-sec="d-life">Life stages</a>
        <a href="#" data-sec="d-food">Food &amp; climate</a>
        <a href="#" data-sec="d-health">Health</a>
      </nav>

      <section class="dsec" id="d-overview">
        <div class="card"><div class="meters">
          ${meter("Energy", b.energy)}${meter("Barking", b.barkiness)}${meter("Grooming needs", b.grooming)}
          ${meter("Apartment friendly", b.apartment)}${meter("Good with kids", b.kids)}${meter("First-time owner friendly", b.firstTime)}
          ${meter("Heat tolerance", b.heatTolerance)}${meter("Cold tolerance", b.coldTolerance)}
        </div></div>
        <div class="grid grid-2" style="margin-top:var(--sp-4)">
          <div class="card"><h2><span class="card-ic">🧠</span>Behaviour</h2><p>${esc(b.behaviour)}</p></div>
          <div class="card callout good"><h2><span class="card-ic">⭐</span>Best quality</h2><p>${esc(b.bestQuality)}</p></div>
          <div class="card"><h2><span class="card-ic">🎾</span>Loves to play</h2>${ul(b.play)}</div>
          <div class="card callout bad"><h2><span class="card-ic">🙅</span>Doesn't like</h2>${ul(b.dislikes)}</div>
        </div>
      </section>

      <section class="dsec" id="d-barks">
        <h2>🔊 What a ${esc(shortName(b))} is saying</h2>
        <div class="sound-list">${b.barks.map(soundCard).join("")}</div>
        <p class="note" style="margin-top:var(--sp-3)">Recordings are real dogs, pitched to this breed's size. <a href="#bark/${b.id}">Open in Bark Lab →</a></p>
      </section>

      <section class="dsec" id="d-life">
        <h2>📈 Life stages of a ${esc(shortName(b))}</h2>
        <div class="mini-life">
          <div class="card"><div class="${pup ? frame("puppy", b.id) : frame("adult", b.id)}"><img src="${pup || img.sm(b.id)}" alt="" loading="lazy"></div><h3>🐶 Puppy</h3><p class="small">${esc(b.life.puppy)}</p></div>
          <div class="card"><div class="${frame("adult", b.id)}"><img src="${img.sm(b.id)}" alt="" loading="lazy"></div><h3>💪 Adult</h3><p class="small">${esc(b.life.adult)}</p></div>
          <div class="card"><div class="${sen ? frame("senior", b.id) : frame("stage", "senior")}"><img src="${sen || img.stage("senior")}" alt="" loading="lazy"></div><h3>👴 Senior ${sen ? "" : '<span class="tag">generic photo</span>'}</h3><p class="small">${esc(b.life.senior)}</p></div>
        </div>
        <a class="btn tonal" style="margin-top:var(--sp-4)" href="#timeline/${b.id}">See the full ${esc(shortName(b))} timeline →</a>
      </section>

      <section class="dsec" id="d-food">
        <h2>🍗 Food &amp; climate</h2>
        <div class="grid grid-2">
          <div class="card"><h2><span class="card-ic">🥕</span>Good foods &amp; treats</h2>${ul(b.foods)}<a class="btn ghost sm" href="#food" style="padding-left:0">Full safe/toxic food guide →</a></div>
          <div class="card"><h2><span class="card-ic">🌡️</span>Temperature &amp; climate</h2><p><b>Comfort zone: ${esc(b.idealTemp)}</b></p><p>${esc(b.climate)}</p></div>
        </div>
      </section>

      <section class="dsec" id="d-health">
        <h2>🩺 Common issues &amp; how to overcome them</h2>
        <div class="issue-list">${b.issues.map(([i, f]) => `<div class="issue"><b>${esc(i)}</b><p>${esc(f)}</p></div>`).join("")}</div>
        <a class="btn ghost sm" href="#health" style="padding-left:0;margin-top:8px">General dog health guide →</a>
      </section>

      <div class="card cta-band">
        <div><h2>Ready to welcome a ${esc(shortName(b))}?</h2><p>Send us a query and we'll connect you with verified shelters and health-tested breeders.</p></div>
        <a class="btn" href="#services/get/${b.id}">Send a query</a>
      </div>`;

    $("#d-bark").addEventListener("click", (e) => playSound(null, b.barks[0].s, b));
    $("#d-3d")?.addEventListener("click", () => open3D(b));
    $$("#d-barks .sound").forEach((btn) => btn.addEventListener("click", () => playSound(btn, btn.dataset.sound, b)));
    const tabs = $$("#d-tabs a");
    tabs.forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.sec).scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) tabs.forEach((t) => t.classList.toggle("active", t.dataset.sec === en.target.id)); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".dsec").forEach((s) => io.observe(s));
    document.title = `${b.name} · PawPedia`;
  }

  /* ---------- Bark Lab ---------- */
  function renderBark(id) {
    if (id && BY_ID[id]) setBreed(id);
    const b = BY_ID[state.breed];
    $("#view-bark").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Bark Lab</span>
        <h1>What is your dog saying?</h1>
        <p class="lead">Every breed has its own voice. Pick a breed to hear its signature sounds and learn what they mean. Turn your volume up! 🔊</p>
      </div>
      <div class="card stage">
        <div>
          <div class="stage-photo" id="bark-photo">
            <span class="ring"></span><span class="ring"></span><span class="ring"></span>
            <div class="frame ${frame("adult", b.id)}"><img src="${img.adult(b.id)}" alt="${esc(b.name)}"></div>
          </div>
          <div class="viz" aria-hidden="true">${"<i></i>".repeat(24)}</div>
        </div>
        <div style="display:grid;gap:var(--sp-4)">
          ${pickerButton(b)}
          ${studioToggle()}
          <div class="meters" style="grid-template-columns:1fr">
            ${meter("How vocal is it?", b.barkiness, ["", "Very quiet", "Quiet", "Moderate", "Vocal", "Very vocal"][b.barkiness])}
          </div>
          <p class="muted" style="margin:0">${esc(b.behaviour)}</p>
          <div class="btn-row"><button class="btn primary" type="button" id="bark-main">🔊 Play its signature sound</button>${has3D(b.id) ? `<button class="btn three-d" type="button" id="bark-3d">🧊 3D &amp; AR</button>` : ""}<a class="btn outline" href="#breed/${b.id}">Breed profile</a></div>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>${esc(shortName(b))} signature sounds</h2></div>
        <div class="sound-list" id="bark-breed">${b.barks.map(soundCard).join("")}</div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Universal dog language</h2></div>
        <p class="muted" style="margin-top:calc(var(--sp-2) * -1)">Played in a ${esc(b.size.toLowerCase())} dog's voice. Always read the sound together with the body language.</p>
        <div class="sound-list" id="bark-universal">${BARKS.map((x, i) => soundCard({ ...x, when: x.when + ". " + x.body }, i)).join("")}</div>
      </div>
      <p class="note" style="margin-top:var(--sp-5)">🎙️ Real recordings come from Freesound contributors (CC0 / CC BY). The Basenji yodel and the Shiba/Basenji scream are simulated until a freely licensed recording is available. <a href="#credits">Sound credits</a></p>`;

    const stage = $("#bark-photo");
    $("[data-open-picker]", $("#view-bark")).addEventListener("click", () => openPicker(b.id, (nid) => { location.hash = `#bark/${nid}`; }));
    $("#bark-3d")?.addEventListener("click", () => open3D(b));
    $("#bark-main").addEventListener("click", () => playSound($("#bark-breed .sound"), b.barks[0].s, b, stage));
    $$("#bark-breed .sound, #bark-universal .sound").forEach((btn) => btn.addEventListener("click", () => playSound(btn, btn.dataset.sound, b, stage)));
  }

  /* ---------- Life timeline (breed-aware) ---------- */
  const GROWTH = {
    Toy:    { mature: 10, senior: 10, at12w: 0.45, at6m: 0.85, birth: 0.04 },
    Small:  { mature: 12, senior: 9,  at12w: 0.40, at6m: 0.8,  birth: 0.035 },
    Medium: { mature: 15, senior: 8,  at12w: 0.33, at6m: 0.65, birth: 0.025 },
    Large:  { mature: 18, senior: 7,  at12w: 0.28, at6m: 0.6,  birth: 0.018 },
    Giant:  { mature: 24, senior: 6,  at12w: 0.22, at6m: 0.5,  birth: 0.015 }
  };
  const STAGE_ICON = { newborn: "🍼", transitional: "👀", socialisation: "🧸", juvenile: "🐶", adolescent: "🛹", adult: "💪", senior: "👴" };
  const EXERCISE = ["", "about 30 minutes", "about 45 minutes", "about 1 hour", "1–1.5 hours", "2+ hours"];

  function parseWeight(w) {
    const m = w.match(/([\d.]+)\s*–\s*([\d.]+)/);
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : [10, 20];
  }
  const fmtKg = (lo, hi) => {
    const f = (x) => (x < 1 ? `${Math.round(x * 1000)} g` : `${x < 10 ? x.toFixed(1).replace(/\.0$/, "") : Math.round(x)} kg`);
    return lo < 1 && hi < 1 ? `${Math.round(lo * 1000)}–${Math.round(hi * 1000)} g` : `${f(lo)}–${f(hi)}`;
  };

  function stagesFor(b) {
    const g = GROWTH[b.size];
    const [lo, hi] = parseWeight(b.weight);
    const w = (f1, f2 = f1) => fmtKg(lo * f1, hi * f2);
    const matureLabel = g.mature >= 24 ? "2 years" : `${g.mature} months`;
    const big = b.size === "Large" || b.size === "Giant", tiny = b.size === "Toy" || b.size === "Small";
    const pup = img.puppy(b.id), sen = img.senior(b.id);
    const pupPhoto = pup ? { src: pup, label: `Real ${shortName(b)} puppy`, cls: frame("puppy", b.id) } : { src: img.adult(b.id), label: `Adult ${shortName(b)} (puppy photo coming soon)`, cls: frame("adult", b.id) };
    const adultPhoto = (label) => ({ src: img.adult(b.id), label, cls: frame("adult", b.id) });
    const T = Object.fromEntries(TIMELINE.map((t) => [t.id, t]));
    const foodExtra = big ? ` Use a ${b.size === "Giant" ? "giant" : "large"}-breed puppy formula for slow, steady growth, and don't add calcium.` : tiny ? " Small pups can get low blood sugar, so offer small, frequent meals." : "";
    return [
      { ...T.newborn, age: "0–2 weeks", weight: `≈ ${w(g.birth * 0.8, g.birth * 1.2)} at birth`, photo: { src: img.stage("newborn"), label: "Typical newborn puppies", cls: frame("stage", "newborn") }, credit: CREDITS.stages.newborn, note: null },
      { ...T.transitional, age: "2–4 weeks", weight: `≈ ${w(g.birth * 2, g.birth * 3.2)}`, photo: { src: img.stage("transitional"), label: "Typical 3–4 week-old pups", cls: frame("stage", "transitional") }, credit: CREDITS.stages.transitional, note: null },
      { ...T.socialisation, age: "3–12 weeks", weight: `≈ ${w(g.at12w * 0.85, g.at12w * 1.1)} by 12 weeks`, photo: pupPhoto, credit: pup ? P[b.id].puppy : P[b.id].adult, note: b.life.puppy },
      { ...T.juvenile, age: "3–6 months", weight: `≈ ${w(g.at6m * 0.9, g.at6m * 1.05)} by 6 months`, food: T.juvenile.food + foodExtra, photo: pupPhoto, credit: pup ? P[b.id].puppy : P[b.id].adult, note: b.life.puppy },
      { ...T.adolescent, age: `6 months – ${matureLabel}`, weight: `Nearing ${b.weight}`, photo: adultPhoto(`Young adult ${shortName(b)}`), credit: P[b.id].adult,
        note: (big ? "Growth plates close late in big breeds, so avoid forced running, stairs and jumping until fully grown. " : "") + `Expect ${b.energy >= 4 ? "a LOT of teenage energy" : "some teenage testing of rules"}. Stay consistent.` },
      { ...T.adult, age: `${matureLabel} – ${g.senior} years`, weight: b.weight, photo: adultPhoto(`Adult ${shortName(b)}`), credit: P[b.id].adult,
        note: `${b.life.adult} Daily exercise: ${EXERCISE[b.energy]}. Comfort temperature: ${b.idealTemp}.` },
      { ...T.senior, age: `${g.senior}+ years (lifespan ${b.lifespan})`, weight: `${b.weight} (watch for muscle loss)`, photo: sen ? { src: sen, label: `Real senior ${shortName(b)}`, cls: frame("senior", b.id) } : { src: img.stage("senior"), label: "Senior dog (generic photo)", cls: frame("stage", "senior") }, credit: sen ? P[b.id].senior : CREDITS.stages.senior,
        note: `${b.life.senior} Watch especially for: ${b.issues.map((i) => i[0].replace(/ \(.*\)/, "")).join(", ")}.` }
    ];
  }

  function renderTimeline(id) {
    if (id && BY_ID[id]) setBreed(id);
    const b = BY_ID[state.breed];
    const stages = stagesFor(b);
    const startIdx = store.get("pp-stage", 2);
    $("#view-timeline").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Life stages</span>
        <h1>From puppy to senior</h1>
        <p class="lead">Choose a breed to see how it looks, behaves, grows and what it needs at every stage, adjusted to its size and lifespan.</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--sp-3);align-items:center;justify-content:space-between">${pickerButton(b)}${studioToggle()}</div>
      <div class="stepper" role="tablist" aria-label="Life stages">
        ${stages.map((s, i) => `<button class="step" type="button" role="tab" data-i="${i}"><span class="dot">${STAGE_ICON[s.id]}</span><b>${esc(s.stage)}</b><small>${esc(s.age.split(" (")[0])}</small></button>`).join("")}
      </div>
      <div class="card" id="stage-card" aria-live="polite"></div>

      <div class="card section" id="age-calc">
        <h2><span class="card-ic">🎂</span>${esc(shortName(b))} age in human years</h2>
        <div class="row2" style="margin-top:var(--sp-3)">
          <div class="field"><label for="age-years">Dog's age (years)</label><input type="number" id="age-years" min="0" max="25" step="0.5" value="3"></div>
          <div class="field"><label for="age-size">Size</label><select id="age-size">${SIZES.map((z) => `<option ${z === b.size ? "selected" : ""}>${z}</option>`).join("")}</select></div>
        </div>
        <p class="age-result" id="age-result" aria-live="polite"></p>
        <p class="note">An estimate. Bigger dogs age faster after their first two years.</p>
      </div>`;

    function show(i) {
      store.set("pp-stage", i);
      const s = stages[i];
      $$(".step").forEach((st, j) => { st.classList.toggle("active", j === i); st.classList.toggle("done", j < i); st.setAttribute("aria-selected", String(j === i)); });
      $(".step.active")?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      $("#stage-card").innerHTML = `
        <div class="life-card">
          <div class="life-photo ${s.photo.cls || ""}">
            <img src="${s.photo.src}" alt="${esc(s.photo.label)}">
            <span class="badge label" style="background:var(--glass);color:var(--text)">${esc(s.photo.label)}</span>
            ${creditLink(s.credit)}
          </div>
          <div>
            <h2 style="font-size:var(--fs-xl)">${STAGE_ICON[s.id]} ${esc(s.stage)}</h2>
            <dl class="kv">
              <div class="stat"><dt>Age</dt><dd>${esc(s.age)}</dd></div>
              <div class="stat"><dt>Weight (${esc(shortName(b))})</dt><dd>${esc(s.weight)}</dd></div>
            </dl>
            <div class="life-sections">
              <div><h3>👀 How it looks</h3><p class="small">${esc(s.looks)}</p></div>
              <div><h3>🧠 Behaviour</h3><p class="small">${esc(s.behaviour)}</p></div>
              <div><h3>✅ Care checklist</h3><ul class="small">${s.care.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
              <div><h3>🍲 Food</h3><p class="small">${esc(s.food)}</p></div>
            </div>
            ${s.note ? `<div class="breed-note"><b>${b.flag} ${esc(shortName(b))} tip</b>${esc(s.note)}</div>` : ""}
            <div class="btn-row" style="margin-top:var(--sp-4)">
              <button class="btn outline sm" type="button" data-step="-1" ${i === 0 ? "disabled" : ""}>← Previous</button>
              <button class="btn primary sm" type="button" data-step="1" ${i === stages.length - 1 ? "disabled" : ""}>Next stage →</button>
            </div>
          </div>
        </div>`;
      $$("[data-step]").forEach((btn) => btn.addEventListener("click", () => show(i + +btn.dataset.step)));
    }
    $$(".step").forEach((st) => st.addEventListener("click", () => show(+st.dataset.i)));
    $("[data-open-picker]", $("#view-timeline")).addEventListener("click", () => openPicker(b.id, (nid) => { location.hash = `#timeline/${nid}`; }));
    show(Math.min(Math.max(0, startIdx), stages.length - 1));

    const years = $("#age-years"), size = $("#age-size");
    const calc = () => {
      const a = Math.max(0, parseFloat(years.value) || 0);
      const per = { Toy: 4, Small: 4, Medium: 5, Large: 6, Giant: 7 }[size.value];
      const human = a <= 1 ? 15 * a : a <= 2 ? 15 + 9 * (a - 1) : 24 + per * (a - 2);
      const g = GROWTH[size.value];
      const st = a < 0.25 ? "a young puppy" : a < 0.5 ? "a puppy" : a * 12 < g.mature ? "an adolescent" : a < g.senior ? "an adult" : "a senior";
      $("#age-result").innerHTML = `A <b>${a}</b>-year-old ${esc(size.value.toLowerCase())} dog is roughly <b>${Math.round(human)}</b> in human years. That's ${st}.`;
    };
    years.addEventListener("input", calc); size.addEventListener("change", calc); calc();
  }

  /* ---------- Health ---------- */
  function renderHealth() {
    let sev = "";
    $("#view-health").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Health</span>
        <h1>Health issues &amp; how to overcome them</h1>
        <p class="lead">Know the warning signs early. <b>Emergencies need a vet immediately.</b> For breed-specific risks, open any breed's profile.</p>
      </div>
      <div class="chips" id="health-filter" role="group" aria-label="Filter by type">
        ${["", "Emergency", "Common", "Chronic", "Behavioural"].map((x) => `<button class="chip" type="button" data-sev="${x}" aria-pressed="${!x}">${x ? (x === "Emergency" ? "🚨 " : "") + x : "All"}</button>`).join("")}
      </div>
      <div class="acc" id="health-list" style="margin-top:var(--sp-3)"></div>
      <div class="card section">
        <h2><span class="card-ic">💉</span>Typical puppy vaccination &amp; care schedule</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Age</th><th>What</th></tr></thead>
          <tbody>
            <tr><td>2, 4, 6, 8 weeks</td><td>Deworming (then every 3 months for adults)</td></tr>
            <tr><td>6–8 weeks</td><td>1st core vaccine: DHPPi + Leptospirosis</td></tr>
            <tr><td>9–12 weeks</td><td>2nd DHPPi + L booster</td></tr>
            <tr><td>12–14 weeks</td><td>Anti-rabies vaccine + 3rd booster</td></tr>
            <tr><td>Every year</td><td>Booster vaccines + health check</td></tr>
            <tr><td>Monthly</td><td>Tick &amp; flea prevention</td></tr>
          </tbody>
        </table></div>
        <p class="note">Schedules vary by country and vet. Always follow your veterinarian's plan.</p>
      </div>
      <p class="disclaimer">PawPedia is for education only and is not a substitute for professional veterinary advice.</p>`;
    const draw = () => {
      $("#health-list").innerHTML = HEALTH.filter((h) => !sev || h.severity === sev).map((h) => `
        <details class="${h.severity}">
          <summary><span class="card-ic">${h.icon}</span><span class="grow">${esc(h.name)}</span><span class="sev ${h.severity}">${esc(h.severity)}</span></summary>
          <div class="acc-body">
            <div><h4>Signs</h4><p>${esc(h.signs)}</p></div>
            <div><h4>Prevention</h4><p>${esc(h.prevent)}</p></div>
            <div><h4>What to do</h4><p>${esc(h.action)}</p></div>
          </div>
        </details>`).join("");
    };
    $("#health-filter").addEventListener("click", (e) => {
      const c = e.target.closest("[data-sev]"); if (!c) return;
      sev = c.dataset.sev; $$("#health-filter .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c))); draw();
    });
    draw();
  }

  /* ---------- Food ---------- */
  function renderFood() {
    let verdict = "";
    const label = { safe: "✅ Safe", moderate: "⚠️ Moderation", toxic: "⛔ Toxic" };
    $("#view-food").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Food guide</span>
        <h1>Can my dog eat this?</h1>
        <p class="lead">Search any food to see if it's safe, OK in moderation, or toxic.</p>
      </div>
      <label class="search" style="max-width:560px;display:block">${icon("search")}<input type="search" id="food-q" placeholder="e.g. chocolate, mango, curd, roti…" aria-label="Search foods"></label>
      <div class="chips" id="food-filter" role="group" aria-label="Filter foods" style="margin:var(--sp-3) 0">
        <button class="chip" type="button" data-v="" aria-pressed="true">All</button>
        <button class="chip" type="button" data-v="safe" aria-pressed="false">✅ Safe</button>
        <button class="chip" type="button" data-v="moderate" aria-pressed="false">⚠️ In moderation</button>
        <button class="chip" type="button" data-v="toxic" aria-pressed="false">⛔ Toxic</button>
      </div>
      <div class="food-grid" id="food-list"></div>
      <div class="card tonal section">
        <h2>🥣 Feeding golden rules</h2>
        <ul>
          <li>Treats should make up no more than <b>10%</b> of daily calories.</li>
          <li>Switch foods gradually over <b>7–10 days</b>.</li>
          <li>Fresh, clean water must <b>always</b> be available.</li>
          <li>Puppies need puppy food. Large and giant breeds need large-breed formulas.</li>
          <li>If your dog eats something toxic, call your vet <b>right away</b>. Don't wait for symptoms.</li>
        </ul>
      </div>`;
    const draw = () => {
      const q = $("#food-q").value.trim().toLowerCase();
      const list = FOODS.filter((f) => (!verdict || f.verdict === verdict) && (!q || f.name.toLowerCase().includes(q)));
      $("#food-list").innerHTML = list.length ? list.map((f) => `
        <div class="food ${f.verdict}"><div class="food-head"><b>${esc(f.name)}</b><span class="verdict">${label[f.verdict]}</span></div><p>${esc(f.note)}</p></div>`).join("")
        : `<div class="empty"><span>🤔</span>We don't have "${esc(q)}" yet. When in doubt, don't feed it and ask your vet.</div>`;
    };
    $("#food-q").addEventListener("input", draw);
    $("#food-filter").addEventListener("click", (e) => {
      const c = e.target.closest("[data-v]"); if (!c) return;
      verdict = c.dataset.v; $$("#food-filter .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c))); draw();
    });
    draw();
  }

  /* ---------- Adoption guide ---------- */
  const ADOPT_TABS = [["ready", "✅ Am I ready?"], ["journey", "🧭 Step by step"], ["costs", "💰 Costs"], ["ask", "❓ Ask & red flags"], ["checklist", "📋 Checklist"], ["first", "🏠 First 30 days"]];
  function renderAdopt(tab) {
    if (tab && ADOPT_TABS.some(([t]) => t === tab)) state.adoptTab = tab;
    $("#view-adopt").innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Adoption guide</span>
        <h1>Become a great dog parent</h1>
        <p class="lead">A dog is a 10–16 year promise. This guide walks you from "should I?" to a happy, settled dog.</p>
      </div>
      <div class="subnav" role="tablist">${ADOPT_TABS.map(([t, l]) => `<button type="button" role="tab" data-tab="${t}" aria-selected="${state.adoptTab === t}">${l}</button>`).join("")}</div>
      <div id="adopt-panel"></div>`;
    $(".subnav").addEventListener("click", (e) => {
      const b = e.target.closest("[data-tab]"); if (!b) return;
      history.replaceState(null, "", `#adopt/${b.dataset.tab}`);
      state.adoptTab = b.dataset.tab;
      $$(".subnav button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      drawAdoptPanel();
    });
    drawAdoptPanel();
  }
  function drawAdoptPanel() {
    const panel = $("#adopt-panel");
    const t = state.adoptTab;
    if (t === "ready") {
      const ans = store.get("pp-ready", {});
      panel.innerHTML = `
        <div class="grid grid-2">
          <div class="card">
            <h2>Readiness check</h2>
            <p class="muted">Answer honestly. There are no wrong answers, only a happier dog.</p>
            ${READY_QUESTIONS.map((q, i) => `
              <div class="ready-q"><p>${esc(q)}</p>
                <div class="seg" role="group" aria-label="${esc(q)}">
                  <button type="button" data-q="${i}" data-a="1" aria-pressed="${ans[i] === 1}">Yes</button>
                  <button type="button" data-q="${i}" data-a="0" aria-pressed="${ans[i] === 0}">Not yet</button>
                </div>
              </div>`).join("")}
          </div>
          <div class="card" id="ready-result"></div>
        </div>`;
      const draw = () => {
        const answered = Object.keys(ans).length, yes = Object.values(ans).filter((v) => v === 1).length;
        const pct = Math.round((yes / READY_QUESTIONS.length) * 100);
        const no = READY_QUESTIONS.filter((_, i) => ans[i] === 0);
        const verdict = answered < READY_QUESTIONS.length ? ["Keep going…", `${READY_QUESTIONS.length - answered} questions left.`]
          : pct === 100 ? ["You're ready! 🎉", "You've thought this through. Next, choose a breed that fits and follow the step-by-step guide."]
          : pct >= 75 ? ["Almost there 👍", "Sort out the items below before bringing a dog home and you'll be a great dog parent."]
          : ["Not quite yet 💛", "That's OK, and honest. Consider fostering, volunteering at a shelter, or waiting until life allows."];
        $("#ready-result").innerHTML = `
          <div class="ready-result">
            <div class="score-ring" style="--p:${pct}"><span>${pct}%</span></div>
            <div><h2>${verdict[0]}</h2><p class="muted">${verdict[1]}</p></div>
          </div>
          ${no.length ? `<h3 style="margin-top:var(--sp-4)">Work on these first</h3><ul>${no.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}
          <div class="btn-row" style="margin-top:var(--sp-4)"><a class="btn primary" href="#quiz">Find a matching breed</a><button class="btn outline" type="button" data-goto="journey">Next: step by step →</button></div>`;
      };
      panel.addEventListener("click", (e) => {
        const b = e.target.closest("[data-q]");
        if (b) {
          ans[b.dataset.q] = +b.dataset.a; store.set("pp-ready", ans);
          $$(`[data-q="${b.dataset.q}"]`, panel).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          draw();
        }
      });
      draw();
    } else if (t === "journey") {
      panel.innerHTML = `
        <div class="card">
          <ol class="journey">${JOURNEY.map((j, i) => `<li><span class="num">${i + 1}</span><div><h3>${esc(j.t)}</h3><p>${esc(j.d)}</p><span class="tag">💡 ${esc(j.tip)}</span></div></li>`).join("")}</ol>
        </div>
        <div class="rule-333 section">
          <div class="card tonal"><b>3 days</b><h3>Decompress</h3><p class="small">Overwhelmed and maybe scared. May not eat much or may hide. Keep it quiet; no visitors.</p></div>
          <div class="card tonal"><b>3 weeks</b><h3>Learn the routine</h3><p class="small">Settling in and testing boundaries. Its true personality starts to show. Start training.</p></div>
          <div class="card tonal"><b>3 months</b><h3>Feel at home</h3><p class="small">Trusts you, knows the routine, and feels secure. Your bond is built.</p></div>
        </div>`;
    } else if (t === "costs") {
      const cur = state.costCurrency, C = COSTS[cur];
      const b = BY_ID[state.costBreed] || null;
      const size = b ? b.size : (state.costSize || "Medium");
      const groom = b ? b.grooming : (state.costGroom || 3);
      const fmt = (n) => C.symbol + Math.round(n).toLocaleString(cur === "INR" ? "en-IN" : "en-US");
      const rng = ([a, b2]) => `${fmt(a)} – ${fmt(b2)}`;
      const m = C.monthly, o = C.oneTime;
      const monthly = [["🍖 Food", m.food[size]], ["💊 Vet care, deworming & tick prevention", m.preventive[size]], ["✂️ Grooming", m.grooming[groom - 1]], ["🧸 Toys & treats", m.toys], ["🛡️ Insurance (optional)", m.insurance]];
      const one = [["🏷️ Adoption fee", o.adoption], ["💉 First-year vaccines", o.vaccines], ["✂️ Sterilisation", o.sterilisation[size]], ["📟 Microchip", o.microchip], ["🛏️ Bed, crate, bowls, leash", o.supplies]];
      const sum = (rows) => rows.reduce((s, [, r]) => [s[0] + r[0], s[1] + r[1]], [0, 0]);
      const ms = sum(monthly), os = sum(one);
      panel.innerHTML = `
        <div class="card">
          <div style="display:flex;flex-wrap:wrap;gap:var(--sp-3);align-items:end">
            <div class="field" style="flex:1 1 240px"><label for="cost-breed">Breed</label>
              <select id="cost-breed"><option value="">Choose a breed (or use size)…</option>${BREEDS.map((x) => `<option value="${x.id}" ${x.id === state.costBreed ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</select></div>
            <div class="field" style="flex:0 1 160px"><label for="cost-size">Size</label>
              <select id="cost-size" ${b ? "disabled" : ""}>${SIZES.map((z) => `<option ${z === size ? "selected" : ""}>${z}</option>`).join("")}</select></div>
            <div class="seg" role="group" aria-label="Currency">${["INR", "USD"].map((c) => `<button type="button" data-cur="${c}" aria-pressed="${c === cur}">${COSTS[c].symbol} ${c}</button>`).join("")}</div>
          </div>
        </div>
        <div class="cost-grid section" style="margin-top:var(--sp-4)">
          <div class="card"><h2>Monthly</h2>${monthly.map(([l, r]) => `<div class="cost-row"><span>${l}</span><b>${rng(r)}</b></div>`).join("")}<div class="cost-total"><span>Per month</span><b>${rng(ms)}</b></div></div>
          <div class="card"><h2>One-time (first year)</h2>${one.map(([l, r]) => `<div class="cost-row"><span>${l}</span><b>${rng(r)}</b></div>`).join("")}<div class="cost-total"><span>Setup</span><b>${rng(os)}</b></div></div>
          <div class="card sunny"><h2>First year total</h2><p style="font:var(--fw-bold) var(--fs-2xl)/1.1 var(--font-display);margin:var(--sp-3) 0">${rng([os[0] + ms[0] * 12, os[1] + ms[1] * 12])}</p><p>Then about <b>${rng([ms[0] * 12, ms[1] * 12])}</b> per year.</p><p>🚑 Also keep an <b>emergency fund of ${rng(C.emergency)}</b> for accidents or illness.</p></div>
        </div>
        <p class="note">Rough planning estimates. Real costs vary a lot by city, brand, breed and your dog's health. Breeder prices aren't included.</p>`;
      $("#cost-breed").addEventListener("change", (e) => { state.costBreed = e.target.value; drawAdoptPanel(); });
      $("#cost-size").addEventListener("change", (e) => { state.costSize = e.target.value; drawAdoptPanel(); });
      $$("[data-cur]", panel).forEach((x) => x.addEventListener("click", () => { state.costCurrency = x.dataset.cur; drawAdoptPanel(); }));
    } else if (t === "ask") {
      panel.innerHTML = `
        <div class="flags">
          <div class="card"><h2><span class="card-ic">🏠</span>Ask the shelter / rescue</h2>${ul(ASK_LIST.shelter)}</div>
          <div class="card"><h2><span class="card-ic">📜</span>Ask the breeder</h2>${ul(ASK_LIST.breeder)}</div>
          <div class="card callout bad"><h2><span class="card-ic">🚩</span>Red flags: walk away</h2>${ul(ASK_LIST.redFlags)}</div>
        </div>
        <div class="card tonal section">
          <h2>💛 Adopt, don't shop?</h2>
          <p>Millions of healthy, loving dogs, including wonderful Indies, wait in shelters. Adopted dogs are often already vaccinated and sterilised. If you buy, choose a responsible breeder who health-tests the parents, lets you meet the mother, and never sells puppies younger than 8 weeks.</p>
          <a class="btn primary" href="#services">Ask us to help you find a dog</a>
        </div>`;
    } else if (t === "checklist") {
      const KEY = "pawpedia-adopt";
      const done = new Set(store.get(KEY, []));
      let total = 0;
      panel.innerHTML = `
        <div class="card progress"><div class="bar"><i id="ck-bar"></i></div><b id="ck-text"></b></div>
        <div class="checklist">${ADOPT_CHECKLIST.map((g, gi) => `
          <div class="card"><h2>${esc(g.group)}</h2>${g.items.map((item, ii) => { const id = `c${gi}-${ii}`; total++; return `<label class="check"><input type="checkbox" data-id="${id}" ${done.has(id) ? "checked" : ""}><span>${esc(item)}</span></label>`; }).join("")}</div>`).join("")}
        </div>`;
      const upd = () => {
        const pct = Math.round((done.size / total) * 100);
        $("#ck-bar").style.width = pct + "%";
        $("#ck-text").textContent = pct === 100 ? "🎉 All done!" : `${done.size}/${total} · ${pct}%`;
      };
      $$("input[data-id]", panel).forEach((cb) => cb.addEventListener("change", () => { cb.checked ? done.add(cb.dataset.id) : done.delete(cb.dataset.id); store.set(KEY, [...done]); upd(); }));
      upd();
    } else if (t === "first") {
      panel.innerHTML = `
        <div class="grid grid-2">
          <div class="card"><h2><span class="card-ic">🕒</span>A good daily routine</h2><div class="routine">${ROUTINE.map(([time, what]) => `<div><b>${esc(time)}</b><span>${esc(what)}</span></div>`).join("")}</div><p class="note" style="margin-top:var(--sp-3)">Puppies under 4 months need a toilet break every 2–3 hours and after every meal, nap and play.</p></div>
          <div class="card"><h2><span class="card-ic">🎓</span>Teach these first</h2><div class="routine">${TRAINING_BASICS.map((x) => `<div><b>${esc(x.t)}</b><span>${esc(x.d)}</span></div>`).join("")}</div></div>
        </div>
        <div class="grid grid-2 section">
          <div class="card"><h2><span class="card-ic">👶</span>Introducing kids</h2>${ul(["Let the dog approach first. Never chase or corner it.", "No hugging, lifting or disturbing it while it eats or sleeps.", "Teach kids to stroke the side of the neck gently, not the head.", "Always supervise young children with any dog."])}</div>
          <div class="card"><h2><span class="card-ic">🐱</span>Introducing other pets</h2>${ul(["Meet on neutral ground, on leash, for existing dogs.", "Use baby gates and swap bedding to share smells first.", "Feed pets separately to avoid food guarding.", "Go slowly. It can take weeks, and that's normal."])}</div>
        </div>`;
    }
    $$("[data-goto]", panel).forEach((b) => b.addEventListener("click", () => { location.hash = `#adopt/${b.dataset.goto}`; }));
  }

  /* ---------- Quiz ---------- */
  function scoreBreed(b, a) {
    let score = 0, max = 0;
    if (a.home === "apt") { score += b.apartment * 3; max += 15; }
    else if (a.home === "small") { score += b.apartment >= 2 ? 10 : 6; max += 10; }
    else { score += b.energy * 2; max += 10; }
    score += 15 - Math.abs(b.energy - a.activity) * 4; max += 15;
    if (a.climate === "hot") { score += b.heatTolerance * 3; max += 15; }
    else if (a.climate === "cold") { score += b.coldTolerance * 3; max += 15; }
    else { score += 15 - Math.abs(3 - b.heatTolerance) * 2; max += 15; }
    if (a.experience === "first") { score += b.firstTime * 3; max += 15; }
    else if (a.experience === "some") { score += 8 + b.firstTime; max += 13; }
    else { score += 10; max += 10; }
    score += 10 - Math.max(0, b.grooming - a.grooming) * 3; max += 10;
    score += 10 - Math.max(0, b.barkiness - a.noise) * 3; max += 10;
    if (a.kids === "yes") { score += b.kids * 2; max += 10; }
    if (a.region) { score += b.region === a.region ? 10 : 0; max += 10; }
    // A breed that can't cope with the climate is a welfare risk, not just a lower score.
    if ((a.climate === "hot" && b.heatTolerance <= 1) || (a.climate === "cold" && b.coldTolerance <= 1)) score *= 0.6;
    if (a.home === "apt") score *= { Giant: 0.75, Large: 0.9 }[b.size] || 1;
    return Math.max(0, Math.min(100, Math.round((score / max) * 100)));
  }
  function renderQuiz() {
    const qz = state.quiz;
    const view = $("#view-quiz");
    if (qz.step >= QUIZ.length) {
      const ranked = BREEDS.map((b) => ({ b, s: scoreBreed(b, qz.answers) })).sort((x, y) => y.s - x.s).slice(0, 6);
      view.innerHTML = `
        <div class="page-head"><span class="eyebrow">Your results</span><h1>Your best-matched breeds</h1><p class="lead">Based on your home, lifestyle, climate and preferences. Every dog is an individual, and shelter mixes can be wonderful matches too!</p></div>
        <div class="breed-grid">${ranked.map(({ b, s }, i) => `
          <div class="match">
            <span class="rank">${i + 1}</span>
            ${breedCard(b).replace('<div class="body">', `<div class="body"><span class="score">${s}% match</span>`)}
          </div>`).join("")}</div>
        <div class="btn-row section"><button class="btn outline" type="button" id="quiz-restart">↺ Retake quiz</button><a class="btn love" href="#services/get/${ranked[0].b.id}">❤️ Help me find a ${esc(shortName(ranked[0].b))}</a></div>`;
      $("#quiz-restart").addEventListener("click", () => { state.quiz = { step: 0, answers: {} }; renderQuiz(); });
      return;
    }
    const q = QUIZ[qz.step];
    view.innerHTML = `
      <div class="page-head"><span class="eyebrow">Breed match quiz</span><h1>Find your perfect dog</h1></div>
      <div class="card quiz">
        <div class="quiz-progress" aria-hidden="true">${QUIZ.map((_, i) => `<i class="${i <= qz.step ? "on" : ""}"></i>`).join("")}</div>
        <p class="muted small" style="margin:0">Question ${qz.step + 1} of ${QUIZ.length}</p>
        <h2>${esc(q.q)}</h2>
        <div class="options">${q.options.map((o, i) => `<button class="option" type="button" data-i="${i}" aria-pressed="${qz.answers[q.id] === o.value}"><span>${o.icon}</span>${esc(o.label)}</button>`).join("")}</div>
        <div class="btn-row"><button class="btn outline" type="button" id="quiz-back" ${qz.step === 0 ? "disabled" : ""}>← Back</button></div>
      </div>`;
    $$(".option", view).forEach((btn) => btn.addEventListener("click", () => {
      qz.answers[q.id] = q.options[+btn.dataset.i].value;
      btn.setAttribute("aria-pressed", "true");
      setTimeout(() => { qz.step++; renderQuiz(); view.scrollIntoView({ block: "start" }); }, 180);
    }));
    $("#quiz-back").addEventListener("click", () => { qz.step = Math.max(0, qz.step - 1); renderQuiz(); });
  }

  /* ---------- Credits ---------- */
  function renderCredits() {
    const row = (thumb, c, what) => c ? `<div>${thumb ? `<img src="${thumb}" alt="" loading="lazy">` : `<span class="card-ic">🔊</span>`}<span><b>${esc(what)}</b>: <a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a> by ${esc(c.artist)}, <a href="${esc(c.licenseUrl)}" target="_blank" rel="noopener">${esc(c.license)}</a></span></div>` : "";
    $("#view-credits").innerHTML = `
      <div class="page-head"><span class="eyebrow">Credits</span><h1>Photo &amp; sound credits</h1>
      <p class="lead">PawPedia uses freely licensed photos from Wikimedia Commons and recordings from Freesound. Thank you to every photographer and recordist! Changes made: photos were resized, and the studio versions have their background removed (cut out with an AI segmentation model) and are placed on a plain white or dark backdrop. Sounds were trimmed and volume-normalised.</p></div>
      <div class="card"><h2>🔊 Sounds</h2><div class="credits-list">${Object.entries(CREDITS.sounds).map(([k, c]) => row(null, c, Sounds.CLIPS[k] ? Sounds.CLIPS[k].label : k)).join("")}</div></div>
      <div class="card section"><h2>📷 Life-stage photos</h2><div class="credits-list">${Object.entries(CREDITS.stages).map(([k, c]) => row(`/images/stages/${k}.jpg`, c, k)).join("")}</div></div>
      <div class="card section"><h2>📷 Breed photos</h2><div class="credits-list">${BREEDS.map((b) => {
        const c = P[b.id];
        return row(img.sm(b.id), c.adult, b.name) + row(img.puppy(b.id), c.puppy, b.name + " puppy") + row(img.senior(b.id), c.senior, b.name + " senior");
      }).join("")}</div></div>`;
  }

  /* ---------- Services ---------- */
  function initServices() {
    const sel = $("#query-breed");
    REGIONS.forEach((r) => {
      const og = document.createElement("optgroup");
      og.label = r.name;
      BREEDS.filter((b) => b.region === r.id).forEach((b) => og.appendChild(new Option(b.name, b.name)));
      sel.appendChild(og);
    });
    sel.appendChild(new Option("Indie / mixed breed / other", "Other / mixed breed"));
    $$("form[data-ajax]").forEach((form) => form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form-status", form), btn = $("button[type=submit]", form);
      btn.disabled = true; status.className = "form-status"; status.textContent = "Sending…";
      try {
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.classList.add("ok"); status.textContent = "🎉 Thank you! We've received your request and will contact you soon.";
      } catch {
        status.classList.add("err"); status.textContent = "Sorry, that didn't go through. Please check your connection and try again.";
      } finally { btn.disabled = false; }
    }));
    $$("[data-interest]").forEach((btn) => btn.addEventListener("click", () => {
      $("#partner-type").value = "Customer — " + btn.dataset.interest;
      $("#svc-partner").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => $("#p-name").focus({ preventScroll: true }), 500);
    }));
  }
  function handleServices(section, breedId) {
    if (section === "get" && BY_ID[breedId]) $("#query-breed").value = BY_ID[breedId].name;
    const target = { get: "#svc-get", shop: "#svc-shop", partner: "#svc-partner" }[section];
    if (target) requestAnimationFrame(() => $(target).scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  /* ======================================================================
     Router
     ====================================================================== */
  const views = $$(".view");
  const TITLES = { home: "PawPedia — Dog Breeds, Barks, Care & Adoption Guide", breeds: "Dog Breeds", bark: "Bark Lab", timeline: "Life Stages", health: "Health", food: "Food Guide", adopt: "Adoption Guide", quiz: "Breed Quiz", services: "Get a Dog", credits: "Credits" };
  let currentView = null;
  function route(keepScroll) {
    const [name = "home", arg, arg2] = (location.hash.replace(/^#/, "") || "home").split("/");
    closeSheets();
    Sounds.stop();
    let view = views.some((v) => v.dataset.view === name) ? name : "home";
    if (name === "care") view = currentView || "home";
    if (view === "breed" && !BY_ID[arg]) { location.replace("#breeds"); return; }

    switch (view) {
      case "home": renderHome(); break;
      case "breeds": renderBreeds(arg); break;
      case "breed": renderBreedDetail(BY_ID[arg]); break;
      case "bark": renderBark(arg); break;
      case "timeline": renderTimeline(arg); break;
      case "health": renderHealth(); break;
      case "food": renderFood(); break;
      case "adopt": renderAdopt(arg); break;
      case "quiz": renderQuiz(); break;
      case "credits": renderCredits(); break;
    }
    views.forEach((v) => (v.hidden = v.dataset.view !== view));
    const navKey = view === "breed" ? "breeds" : view;
    const care = ["timeline", "health", "food", "adopt", "quiz"];
    $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === navKey || (a.dataset.nav === "care" && care.includes(navKey));
      a.classList.toggle("active", on);
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    if (view === "services") handleServices(arg, arg2);
    else if (keepScroll !== true && !(view === currentView && (view === "adopt" || view === "breeds"))) window.scrollTo({ top: 0 });
    if (view !== "breed") document.title = view === "home" ? TITLES.home : `${TITLES[view]} · PawPedia`;
    currentView = view;
  }

  $("#search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentView !== "breeds") location.hash = "#breeds";
    setTimeout(() => $("#breed-q")?.focus(), 60);
  });

  initServices();
  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  }
})();
