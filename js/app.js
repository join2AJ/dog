(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    }
  };

  const FACTS = [
    "A dog's nose print is unique, much like a human fingerprint.",
    "Dogs can smell 10,000 to 100,000 times better than humans.",
    "Dogs sweat mainly through their paw pads and cool down by panting.",
    "Puppies are born deaf and blind. Their eyes open at around 2 weeks.",
    "Dogs dream like we do. Twitching paws during sleep are often dream-running.",
    "A wagging tail to the dog's right tends to signal positive feelings; to the left, more anxious ones.",
    "Basenjis are known as the 'barkless dog'. They yodel instead!",
    "Dogs understand an average of about 165 words, and smart breeds even more.",
    "Indian Pariah dogs are one of the oldest dog types in the world.",
    "Dogs have three eyelids, including one that keeps the eye moist and protected.",
    "Chocolate, grapes, onion and xylitol are among the most common dog poisonings at home."
  ];

  /* ---------- Router ---------- */
  const views = $$(".view");
  function route() {
    const hash = location.hash.replace(/^#/, "") || "home";
    const [name, arg, arg2] = hash.split("/");
    closeSheet();

    let viewName = name;
    if (name === "breed") {
      const breed = BREEDS.find((b) => b.id === arg);
      if (!breed) { location.hash = "#breeds"; return; }
      renderBreedDetail(breed);
    }
    if (!views.some((v) => v.dataset.view === viewName)) viewName = "home";

    views.forEach((v) => (v.hidden = v.dataset.view !== viewName));
    const navKey = viewName === "breed" ? "breeds" : viewName;
    const careViews = ["timeline", "health", "food", "adopt", "quiz"];
    $$("[data-nav]").forEach((a) => {
      const active = a.dataset.nav === navKey || (a.dataset.nav === "care" && careViews.includes(navKey));
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });

    if (viewName === "services") handleServicesRoute(arg, arg2);
    else window.scrollTo({ top: 0 });

    const view = views.find((v) => v.dataset.view === viewName);
    const h1 = view && view.querySelector("h1");
    document.title = (viewName === "home" || !h1 ? "PawPedia" : h1.textContent.replace(/[^\p{L}\p{N}\s&:()'-]/gu, "").trim() + " · PawPedia");
  }

  /* ---------- Home ---------- */
  function initHome() {
    $$("[data-dog]").forEach((el) => Dog.mount(el, { color: el.dataset.color }));
    const heroDog = $("#hero-dog");
    heroDog.addEventListener("click", () => {
      const secs = Bark.play("double", "medium");
      Dog.bark($(".dog-holder", heroDog), secs);
      $(".bubble", heroDog).textContent = ["Woof! 🐾", "Play with me!", "Treat? 🦴", "Walkies?!"][Math.floor(Math.random() * 4)];
    });
    let i = Math.floor(Math.random() * FACTS.length);
    const show = () => ($("#fact-text").textContent = FACTS[i % FACTS.length]);
    show();
    $("#fact-next").addEventListener("click", () => { i++; show(); });
  }

  /* ---------- Breeds ---------- */
  function meter(label, value) {
    return `<div class="meter"><span>${esc(label)}</span><div class="dots" aria-label="${value} out of 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= value ? "on" : ""}"></i>`).join("")}</div></div>`;
  }

  function renderBreedGrid() {
    const q = $("#breed-search").value.trim().toLowerCase();
    const size = $("#breed-size").value;
    const list = BREEDS.filter((b) =>
      (!q || (b.name + " " + b.temperament.join(" ") + " " + b.origin).toLowerCase().includes(q)) &&
      (!size || b.size.includes(size))
    );
    $("#breed-grid").innerHTML = list.length ? list.map((b) => `
      <a class="breed-card card" href="#breed/${b.id}">
        <div class="breed-thumb" style="--c:${b.color}"><span>${b.emoji}</span></div>
        <div>
          <h3>${esc(b.name)}</h3>
          <p class="muted">${esc(b.size)} · ${esc(b.lifespan)}</p>
          <div class="tags">${b.temperament.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </a>`).join("") : `<p class="empty">No breeds match. Try another search.</p>`;
  }

  function renderBreedDetail(b) {
    const list = (items) => `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    $("#breed-detail").innerHTML = `
      <a class="back" href="#breeds">← All breeds</a>
      <div class="breed-hero card">
        <div class="dog-holder big" id="detail-dog"></div>
        <div>
          <h1>${esc(b.name)}</h1>
          <div class="tags">${b.temperament.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <dl class="facts">
            <div><dt>Size</dt><dd>${esc(b.size)}</dd></div>
            <div><dt>Weight</dt><dd>${esc(b.weight)}</dd></div>
            <div><dt>Lifespan</dt><dd>${esc(b.lifespan)}</dd></div>
            <div><dt>Origin</dt><dd>${esc(b.origin)}</dd></div>
            <div><dt>Ideal temperature</dt><dd>🌡️ ${esc(b.idealTemp)}</dd></div>
          </dl>
          <div class="hero-actions">
            <button class="btn primary" type="button" id="detail-bark">🔊 Hear it ${b.bark === "howl" ? "howl" : "bark"}</button>
            <a class="btn ghost" href="#services/get/${b.id}">❤️ I want this dog</a>
          </div>
        </div>
      </div>
      <div class="card meters">
        ${meter("Energy", b.energy)}
        ${meter("Grooming needs", b.grooming)}
        ${meter("Apartment friendly", b.apartment)}
        ${meter("Good with kids", b.kids)}
        ${meter("First-time owner friendly", b.firstTime)}
        ${meter("Heat tolerance", b.heatTolerance)}
        ${meter("Cold tolerance", b.coldTolerance)}
      </div>
      <div class="detail-grid">
        <div class="card"><h2>🎾 Loves to play</h2>${list(b.play)}</div>
        <div class="card"><h2>🧠 Behaviour</h2><p>${esc(b.behaviour)}</p></div>
        <div class="card good"><h2>⭐ Best quality</h2><p>${esc(b.bestQuality)}</p></div>
        <div class="card bad"><h2>🙅 Doesn't like</h2>${list(b.dislikes)}</div>
        <div class="card"><h2>🍗 Good foods &amp; treats</h2>${list(b.foods)}<a href="#food" class="more">See full food guide →</a></div>
        <div class="card"><h2>🌡️ Climate &amp; temperature</h2><p><strong>Comfort zone: ${esc(b.idealTemp)}</strong></p><p>${esc(b.climate)}</p></div>
      </div>
      <div class="card">
        <h2>🩺 Common health issues &amp; how to overcome them</h2>
        <div class="issues">${b.issues.map((x) => `<div class="issue"><b>${esc(x.issue)}</b><p>${esc(x.fix)}</p></div>`).join("")}</div>
        <a href="#health" class="more">General dog health guide →</a>
      </div>`;
    const holder = $("#detail-dog");
    Dog.mount(holder, { color: b.color });
    $("#detail-bark").addEventListener("click", () => Dog.bark(holder, Bark.play(b.bark === "howl" ? "howl" : "double", b.bark)));
  }

  function initBreeds() {
    $("#breed-search").addEventListener("input", renderBreedGrid);
    $("#breed-size").addEventListener("change", renderBreedGrid);
    renderBreedGrid();
    const sel = $("#query-breed");
    BREEDS.forEach((b) => sel.insertAdjacentHTML("beforeend", `<option value="${esc(b.name)}">${esc(b.name)}</option>`));
    sel.insertAdjacentHTML("beforeend", `<option value="Other / mixed breed">Other / mixed breed</option>`);
  }

  /* ---------- Bark lab ---------- */
  function initBark() {
    let voice = "medium";
    const dog = $("#bark-dog");
    $$("#bark-voice button").forEach((btn) => btn.addEventListener("click", () => {
      voice = btn.dataset.voice;
      $$("#bark-voice button").forEach((b) => b.setAttribute("aria-checked", String(b === btn)));
      dog.style.setProperty("--dog-scale", { small: 0.7, medium: 0.85, deep: 1 }[voice]);
    }));
    dog.style.setProperty("--dog-scale", 0.85);
    $$("[data-bark]").forEach((btn) => btn.addEventListener("click", () => Dog.bark(dog, Bark.play(btn.dataset.bark, voice))));

    $("#bark-grid").innerHTML = BARKS.map((b) => `
      <button class="bark-card card" type="button" data-sound="${b.sound}">
        <span class="play-icon" aria-hidden="true">▶</span>
        <b>${esc(b.label)}</b>
        <small>${esc(b.meaning)}</small>
        <em>${esc(b.says)}</em>
      </button>`).join("");
    $$("#bark-grid [data-sound]").forEach((btn) => btn.addEventListener("click", () => {
      const secs = Bark.play(btn.dataset.sound, voice);
      Dog.bark(dog, secs);
      btn.classList.add("playing");
      setTimeout(() => btn.classList.remove("playing"), secs * 1000);
    }));
  }

  /* ---------- Timeline ---------- */
  function initTimeline() {
    const range = $("#timeline-range");
    const dog = $("#timeline-dog");
    $("#stage-dots").innerHTML = TIMELINE.map((s, i) => `<li><button type="button" data-i="${i}">${esc(s.stage)}<small>${esc(s.age)}</small></button></li>`).join("");

    function show(i) {
      const s = TIMELINE[i];
      range.value = i;
      Dog.mount(dog, { color: "#d9a441", eyesClosed: !!s.eyesClosed, grey: !!s.grey });
      dog.style.setProperty("--dog-scale", s.scale);
      $$("#stage-dots button").forEach((b, j) => b.classList.toggle("active", j === i));
      $("#stage-info").innerHTML = `
        <h2>${esc(s.stage)} <span class="muted">· ${esc(s.age)}</span></h2>
        <div class="detail-grid">
          <div><h3>👀 How it looks</h3><p>${esc(s.looks)}</p></div>
          <div><h3>🧠 Behaviour</h3><p>${esc(s.behaviour)}</p></div>
          <div><h3>✅ Care checklist</h3><ul>${s.care.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
          <div><h3>🍲 Food</h3><p>${esc(s.food)}</p></div>
        </div>`;
    }
    range.addEventListener("input", () => show(+range.value));
    $$("#stage-dots button").forEach((b) => b.addEventListener("click", () => show(+b.dataset.i)));
    show(0);

    const years = $("#age-years"), size = $("#age-size");
    function calc() {
      const a = Math.max(0, parseFloat(years.value) || 0);
      const perYear = { small: 4, medium: 5, large: 6, giant: 7 }[size.value];
      const human = a <= 1 ? 15 * a : a <= 2 ? 15 + 9 * (a - 1) : 24 + perYear * (a - 2);
      const stage = a < 0.5 ? "puppy" : a < 1.5 ? "adolescent" : a < (size.value === "small" ? 8 : 6.5) ? "adult" : "senior";
      $("#age-result").innerHTML = `A <b>${a}</b>-year-old dog is roughly <b>${Math.round(human)}</b> in human years (${stage}).`;
    }
    years.addEventListener("input", calc);
    size.addEventListener("change", calc);
    calc();
  }

  /* ---------- Health ---------- */
  function initHealth() {
    let sev = "";
    function render() {
      $("#health-list").innerHTML = HEALTH.filter((h) => !sev || h.severity === sev).map((h) => `
        <details class="health card ${h.severity === "Emergency" ? "emergency" : ""}">
          <summary><span class="h-icon">${h.icon}</span><b>${esc(h.name)}</b><span class="sev">${esc(h.severity)}</span></summary>
          <dl>
            <dt>Signs</dt><dd>${esc(h.signs)}</dd>
            <dt>Prevention</dt><dd>${esc(h.prevent)}</dd>
            <dt>What to do</dt><dd>${esc(h.action)}</dd>
          </dl>
        </details>`).join("");
    }
    $$("#health-filter .chip").forEach((c) => c.addEventListener("click", () => {
      sev = c.dataset.sev;
      $$("#health-filter .chip").forEach((x) => x.classList.toggle("active", x === c));
      render();
    }));
    render();
  }

  /* ---------- Food ---------- */
  function initFood() {
    let verdict = "";
    const label = { safe: "✅ Safe", moderate: "⚠️ In moderation", toxic: "⛔ Toxic — never" };
    function render() {
      const q = $("#food-search").value.trim().toLowerCase();
      const list = FOODS.filter((f) => (!verdict || f.verdict === verdict) && (!q || f.name.toLowerCase().includes(q)));
      $("#food-list").innerHTML = list.length ? list.map((f) => `
        <div class="food card ${f.verdict}">
          <div class="food-head"><b>${esc(f.name)}</b><span class="verdict">${label[f.verdict]}</span></div>
          <p>${esc(f.note)}</p>
        </div>`).join("") : `<p class="empty">We don't have "${esc(q)}" yet. When in doubt, don't feed it and ask your vet.</p>`;
    }
    $("#food-search").addEventListener("input", render);
    $$("#food-filter .chip").forEach((c) => c.addEventListener("click", () => {
      verdict = c.dataset.verdict;
      $$("#food-filter .chip").forEach((x) => x.classList.toggle("active", x === c));
      render();
    }));
    render();
  }

  /* ---------- Adopt checklist ---------- */
  function initAdopt() {
    const KEY = "pawpedia-adopt";
    const done = new Set(store.get(KEY, []));
    let total = 0;
    $("#adopt-list").innerHTML = ADOPT_CHECKLIST.map((g, gi) => `
      <div class="card checklist">
        <h2>${esc(g.group)}</h2>
        ${g.items.map((item, ii) => {
          const id = `c${gi}-${ii}`; total++;
          return `<label class="check"><input type="checkbox" data-id="${id}" ${done.has(id) ? "checked" : ""}><span>${esc(item)}</span></label>`;
        }).join("")}
      </div>`).join("");
    function update() {
      const pct = Math.round((done.size / total) * 100);
      $("#adopt-progress-bar").style.width = pct + "%";
      $("#adopt-progress-text").textContent = pct === 100
        ? "🎉 You're ready to be an amazing dog parent!"
        : `${done.size} of ${total} done (${pct}%)`;
    }
    $$("#adopt-list input").forEach((cb) => cb.addEventListener("change", () => {
      cb.checked ? done.add(cb.dataset.id) : done.delete(cb.dataset.id);
      store.set(KEY, [...done]);
      update();
    }));
    update();
  }

  /* ---------- Quiz ---------- */
  function scoreBreed(b, a) {
    let score = 0, max = 0;
    if (a.home === "apt") { score += b.apartment * 3; max += 15; }
    else if (a.home === "small") { score += (b.apartment >= 2 ? 10 : 6); max += 10; }
    else { score += b.energy * 2; max += 10; }

    score += 15 - Math.abs(b.energy - a.activity) * 4; max += 15;

    if (a.climate === "hot") { score += b.heatTolerance * 3; max += 15; }
    else if (a.climate === "cold") { score += b.coldTolerance * 3; max += 15; }
    else { score += 15 - Math.abs(3 - b.heatTolerance) * 2; max += 15; }

    if (a.experience === "first") { score += b.firstTime * 3; max += 15; }
    else if (a.experience === "some") { score += 8 + b.firstTime; max += 13; }
    else { score += 10; max += 10; }

    score += 10 - Math.max(0, b.grooming - a.grooming) * 3; max += 10;

    if (a.kids === "yes") { score += b.kids * 2; max += 10; }

    // A breed that can't cope with the climate is a welfare risk, not just a lower score.
    if ((a.climate === "hot" && b.heatTolerance <= 1) || (a.climate === "cold" && b.coldTolerance <= 1)) score *= 0.6;

    return Math.max(0, Math.round((score / max) * 100));
  }

  function initQuiz() {
    const form = $("#quiz-form");
    form.innerHTML = QUIZ.map((q) => `
      <fieldset>
        <legend>${esc(q.q)}</legend>
        <div class="options">${q.options.map((o, i) => `
          <label class="option"><input type="radio" name="${q.id}" value="${esc(o.value)}" ${i === 0 ? "required" : ""}><span>${esc(o.label)}</span></label>`).join("")}
        </div>
      </fieldset>`).join("") + `<button class="btn primary block" type="submit">Show my matches</button>`;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const a = {
        home: fd.get("home"), activity: +fd.get("activity"), climate: fd.get("climate"),
        experience: fd.get("experience"), grooming: +fd.get("grooming"), kids: fd.get("kids")
      };
      const ranked = BREEDS.map((b) => ({ b, s: scoreBreed(b, a) })).sort((x, y) => y.s - x.s).slice(0, 3);
      $("#quiz-result").innerHTML = `
        <h2 class="section-title">Your top matches</h2>
        <div class="match-grid">${ranked.map(({ b, s }, i) => `
          <div class="card match">
            <span class="rank">#${i + 1}</span>
            <div class="breed-thumb" style="--c:${b.color}"><span>${b.emoji}</span></div>
            <h3>${esc(b.name)}</h3>
            <p class="score">${s}% match</p>
            <p class="muted">${esc(b.bestQuality)}</p>
            <div class="hero-actions">
              <a class="btn small ghost" href="#breed/${b.id}">Learn more</a>
              <a class="btn small primary" href="#services/get/${b.id}">Get this dog</a>
            </div>
          </div>`).join("")}
        </div>
        <p class="note">Every dog is an individual. Mixed breeds and Indies from shelters can be wonderful matches too!</p>`;
      $("#quiz-result").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Services & forms ---------- */
  function handleServicesRoute(section, breedId) {
    if (section === "get" && breedId) {
      const b = BREEDS.find((x) => x.id === breedId);
      if (b) $("#query-breed").value = b.name;
    }
    const target = { get: "#svc-get", shop: "#svc-shop", partner: "#svc-partner" }[section];
    if (target) requestAnimationFrame(() => $(target).scrollIntoView({ behavior: "smooth", block: "start" }));
    else window.scrollTo({ top: 0 });
  }

  function initForms() {
    $$("form[data-ajax]").forEach((form) => form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form-status", form);
      const btn = $("button[type=submit]", form);
      btn.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending…";
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.classList.add("ok");
        status.textContent = "🎉 Thank you! We've received your request and will contact you soon.";
      } catch {
        status.classList.add("err");
        status.textContent = "Sorry, that didn't go through. Please check your connection and try again.";
      } finally {
        btn.disabled = false;
      }
    }));

    $$("[data-interest]").forEach((btn) => btn.addEventListener("click", () => {
      $("#partner-type").value = "Customer — " + btn.dataset.interest;
      $("#svc-partner").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => $("#svc-partner input[name=name]").focus({ preventScroll: true }), 500);
    }));
  }

  /* ---------- Care sheet (mobile) ---------- */
  const sheet = $("#care-sheet");
  function closeSheet() { sheet.hidden = true; }
  function initSheet() {
    $("#care-tab").addEventListener("click", (e) => { e.preventDefault(); sheet.hidden = !sheet.hidden; });
    sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });
  }

  /* ---------- Boot ---------- */
  initHome();
  initBreeds();
  initBark();
  initTimeline();
  initHealth();
  initFood();
  initAdopt();
  initQuiz();
  initForms();
  initSheet();
  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  }
})();
