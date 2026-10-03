/* Offline support: precache the app shell; cache photos and sounds as they're used. */
const CACHE = "pawpedia-v4";
const MEDIA = "pawpedia-media-v1";
const SHELL = [
  "/", "/index.html", "/success.html", "/css/tokens.css", "/css/styles.css",
  "/js/breeds.js", "/js/data.js", "/js/credits.js", "/js/studio.js", "/js/sounds.js", "/js/models.js", "/js/app.js",
  "/manifest.webmanifest", "/icons/icon.svg", "/icons/icon-192.png", "/icons/icon-512.png",
  "/images/stages/newborn.jpg", "/images/stages/transitional.jpg", "/images/stages/senior.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== MEDIA).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return; // form POSTs must reach Netlify
  const url = new URL(req.url);
  const isMedia = url.origin === location.origin && /^\/(images|sounds|models)\//.test(url.pathname);

  if (isMedia) {
    // Cache-first: photos and sounds never change under the same name.
    e.respondWith(caches.open(MEDIA).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    }));
    return;
  }

  // App shell & fonts: serve from cache, refresh in the background.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((cached) => {
    const network = fetch(req).then((res) => {
      if (res.ok && (url.origin === location.origin || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com"))) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => cached || caches.match("/index.html"));
    return cached || network;
  }));
});
