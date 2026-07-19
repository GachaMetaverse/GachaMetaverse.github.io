/* ============================================================
   sw.js — LanceDEX service worker (offline cache + update prompt).

   Strategy:
   - HTML / CSS / JS / data  → network-first (always fresh when online,
     cached copy is the offline fallback). This avoids "stale app" traps.
   - images / assets / fonts → cache-first (they rarely change).
   - cross-origin (Lingva, CDNs) → passed straight through, never cached.

   HOW UPDATES WORK: the browser byte-compares this file on each visit.
   When it changes, the new worker installs and WAITS (it does not take
   over automatically). app.js notices the waiting worker and shows a
   "new version available — Update" prompt. Clicking it posts SKIP_WAITING
   here, the new worker activates, and the page reloads once.

   >>> Bump SW_VERSION whenever you deploy and want users prompted. <<<
   ============================================================ */
var SW_VERSION = "v2";
var SHELL_CACHE = "lancedex-shell-" + SW_VERSION;
var RUNTIME_CACHE = "lancedex-runtime-" + SW_VERSION;

// Minimal app shell precached for instant loads / offline.
var SHELL = [
  "./", "index.html", "game.html", "characters.html", "character.html",
  "builds.html", "guides.html", "guide.html", "tierlist.html", "roles.html",
  "teambuilder.html", "upcoming.html", "events.html",
  "css/style.css", "js/config.js", "js/i18n.js", "js/content-translate.js",
  "js/app.js", "data/games.js", "manifest.webmanifest", "icon.svg"
];

self.addEventListener("install", function (e) {
  // Precache the shell, but do NOT skipWaiting — wait for the user's click.
  e.waitUntil(
    caches.open(SHELL_CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(new Request(u, { cache: "reload" })).catch(function () {});
      }));
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) {
      if (k !== SHELL_CACHE && k !== RUNTIME_CACHE) return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

function isImage(path) { return /\.(png|jpe?g|webp|svg|gif|ico)$/i.test(path); }

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  var sameOrigin = url.origin === self.location.origin;

  if (!sameOrigin) {
    // Only Google Fonts are cached; Lingva & other third parties pass through.
    if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
      e.respondWith(cacheFirst(req));
    }
    return;
  }

  if (isImage(url.pathname)) { e.respondWith(cacheFirst(req)); return; }
  e.respondWith(networkFirst(req));
});

async function cacheFirst(req) {
  var cache = await caches.open(RUNTIME_CACHE);
  var hit = await cache.match(req);
  var fetching = fetch(req).then(function (res) {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  }).catch(function () { return hit; });
  return hit || fetching;
}

async function networkFirst(req) {
  var cache = await caches.open(RUNTIME_CACHE);
  try {
    var res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    var hit = (await cache.match(req)) || (await caches.match(req));
    if (hit) return hit;
    if (req.mode === "navigate") {
      var shell = await caches.match("index.html");
      if (shell) return shell;
    }
    throw err;
  }
}
