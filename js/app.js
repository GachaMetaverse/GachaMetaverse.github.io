/* ============================================================
   js/app.js
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var GAMES = window.GG_GAMES || [];
  var CHARS = window.GG_CHARACTERS || [];
  var GUIDES = window.GG_GUIDES || [];
  var UPCOMING = window.GG_UPCOMING || [];
  var ROLES = window.GG_ROLES || {};
  var TEAMS = window.GG_TEAMS || {};
  var EVENTS = window.GG_EVENTS || {};
  var BUILDS = window.GG_BUILDS || [];

  /* ================= helpers ================= */
  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function fmt(v) {
    return esc(v).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function safeImg(url) {
    if (typeof url !== "string" || url === "") return "";
    if (/^assets\/[\w\-./]+$/i.test(url)) return url;
    if (/^https:\/\//i.test(url)) return url;
    return "";
  }

  function safeColor(c) {
    return (typeof c === "string" && /^#[0-9a-f]{3,8}$/i.test(c)) ? c : "";
  }

  var routeParams = new URLSearchParams(window.location.search);
  function param(name) {
    return routeParams.get(name) || "";
  }

  function findGame(id)      { return GAMES.find(function (g) { return g.id === id; }); }
  function findCharacter(id) { return CHARS.find(function (c) { return c.id === id; }); }
  function findGuide(id)     { return GUIDES.find(function (g) { return g.id === id; }); }

  // Builds may declare their own `game`, else inherit from the matching character.
  function buildGameId(b) {
    if (b.game) return b.game;
    var c = findCharacter(b.id);
    return c ? c.game : "";
  }
  function buildsForGame(gameId) {
    return BUILDS.filter(function (b) { return buildGameId(b) === gameId; });
  }
  function findBuild(charId) {
    return BUILDS.find(function (b) { return b.id === charId; });
  }

  function resolveHero(ref) {
    return findCharacter(ref) ||
      CHARS.find(function (c) { return c.name.toLowerCase() === String(ref).toLowerCase(); });
  }

  function safeHref(url) {
    return (typeof url === "string" && /^[\w-]+\.html(\?[\w=&%.-]*)?(#[\w-]*)?$/.test(url)) ? url : "";
  }

  function gameChars(gameId) {
    return CHARS.filter(function (c) { return c.game === gameId; });
  }

  function stars(rarity) {
    if (!rarity) return "";
    var n = Math.max(1, Math.min(5, parseInt(rarity, 10) || 3));
    var out = "";
    for (var i = 0; i < n; i++) out += '<span class="star filled">★</span>';
    return '<span class="stars-wrap">' + out + "</span>";
  }

  function rarityClass(r) {
    var n = parseInt(r, 10);
    if (!n) return "r0";
    return n >= 5 ? "r5" : (n === 4 ? "r4" : "r3");
  }

  function elementColor(game, elName) {
    var el = ((game && game.elements) || []).find(function (e) { return e.name === elName; });
    return safeColor(el && el.color) || "#8B93B8";
  }

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return esc(iso);
    var loc = (window.LD_I18N && window.LD_I18N.localeTag()) || undefined;
    return d.toLocaleDateString(loc, { year: "numeric", month: "short", day: "numeric" });
  }

  var TIER_COLORS = ["#DA7AF0", "#F3555A", "#F0A24E", "#EFC94C", "#7FD98F", "#55C8D0", "#7A96F0", "#9CA8C8", "#6B7492"];
  function tierColor(game, tierName) {
    if (tierName === "?") return "#6B7492";
    var order = (game.tierlist && game.tierlist.tiers) || [];
    var i = order.indexOf(tierName);
    return TIER_COLORS[i >= 0 ? Math.min(i, TIER_COLORS.length - 1) : TIER_COLORS.length - 1];
  }

  function placements(c, catId, columns) {
    var v = (c.tiers || {})[catId];
    if (!v) return [];
    var arr = Array.isArray(v) ? v : [v];
    return arr.map(function (p) {
      if (typeof p === "string") return { tier: p, col: columns[0] };
      return { tier: p.tier, col: p.col || columns[0] };
    }).filter(function (p) { return p.tier; });
  }

  function paint(root) {
    root.querySelectorAll("[data-clr]").forEach(function (el) {
      var c = safeColor(el.getAttribute("data-clr"));
      if (c) el.style.setProperty("--dyn", c);
    });
    root.querySelectorAll("[data-bg]").forEach(function (el) {
      var u = safeImg(el.getAttribute("data-bg"));
      if (u) el.style.backgroundImage = "url(" + JSON.stringify(u) + ")";
    });
    hydrateImages(root);
  }

  /* ============ asset resolution (portraits, logos, art) ============
     Static host: no directory listing, so we discover files by trying
     to load them and using the first that succeeds. Extensions tried in
     order; results cached so repeated renders don't re-request. */
  var IMG_EXTS = ["png", "jpg"]; // supported drop-in formats (see config/SETUP guide)
  var imgResolveCache = {}; // "url1|url2" -> resolved url ("" = none found)

  function resolveFirstImage(cands, cb) {
    cands = (cands || []).filter(Boolean);
    var key = cands.join("|");
    if (Object.prototype.hasOwnProperty.call(imgResolveCache, key)) return cb(imgResolveCache[key]);
    var i = 0;
    (function next() {
      if (i >= cands.length) { imgResolveCache[key] = ""; return cb(""); }
      var u = cands[i++];
      var img = new Image();
      img.onload = function () { imgResolveCache[key] = u; cb(u); };
      img.onerror = next;
      img.src = u;
    })();
  }

  // "assets/<game>/<base>.<ext>" for each extension.
  function gameAssetCands(gameId, base) {
    if (!gameId) return [];
    return IMG_EXTS.map(function (e) { return "assets/" + gameId + "/" + base + "." + e; });
  }

  // Portrait candidates: explicit `portrait` field first (URL / assets path /
  // bare filename in the portraits folder), then assets/<game>/portraits/<id>.<ext>.
  function portraitCands(c) {
    if (!c) return [];
    var list = [];
    var p = c.portrait;
    if (typeof p === "string" && p !== "") {
      if (/^https:\/\//i.test(p) || /^assets\//i.test(p)) list.push(p);
      else list.push("assets/" + c.game + "/portraits/" + p);
    }
    IMG_EXTS.forEach(function (e) { list.push("assets/" + c.game + "/portraits/" + c.id + "." + e); });
    return list;
  }

  // Game-card art candidates: assets/<id>/card.<ext>, then explicit `card`.
  function cardCands(g) {
    var list = gameAssetCands(g.id, "card");
    var e = safeImg(g.card);
    if (e) list.push(e);
    return list;
  }

  // Guide / article thumb candidates: assets/<game>/guides/<id>.<ext>, then `thumb`.
  function guideThumbCands(g) {
    var list = gameAssetCands(g.game, "guides/" + g.id);
    var e = safeImg(g.thumb);
    if (e) list.push(e);
    return list;
  }

  // Build a data-imgset attribute (candidate list, URL-encoded, "|"-joined).
  function imgset(cands) {
    cands = (cands || []).filter(Boolean);
    if (!cands.length) return "";
    return ' data-imgset="' + esc(cands.map(encodeURIComponent).join("|")) + '"';
  }

  // Actually resolve one element's image (first candidate that loads).
  function loadImgEl(el) {
    if (el.getAttribute("data-imgset-done")) return;
    el.setAttribute("data-imgset-done", "1");
    var raw = el.getAttribute("data-imgset") || "";
    var cands = raw.split("|").map(function (s) {
      try { return decodeURIComponent(s); } catch (e) { return ""; }
    }).filter(function (u) {
      return u && (/^https:\/\//i.test(u) || /^assets\/[\w\-./]+$/i.test(u));
    });
    resolveFirstImage(cands, function (url) {
      if (!url) return;
      el.style.backgroundImage = "url(" + JSON.stringify(url) + ")";
      el.classList.add("has-img");
    });
  }

  // Lazy loader: only resolve images as they approach the viewport, so an
  // image-heavy page (e.g. a 100-portrait database) doesn't fire hundreds of
  // requests up front. Falls back to eager loading without IntersectionObserver.
  var imgObserver = null;
  if ("IntersectionObserver" in window) {
    imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { imgObserver.unobserve(en.target); loadImgEl(en.target); }
      });
    }, { rootMargin: "300px 0px" });
  }

  // Resolve every [data-imgset] under root; if none load, the element's
  // existing placeholder (letter / emoji) simply stays visible.
  function hydrateImages(root) {
    root.querySelectorAll("[data-imgset]").forEach(function (el) {
      if (el.getAttribute("data-imgset-done") || el.getAttribute("data-imgset-obs")) return;
      if (imgObserver) { el.setAttribute("data-imgset-obs", "1"); imgObserver.observe(el); }
      else loadImgEl(el);
    });
  }

  /* ================= theme ================= */
  var THEMES = {
    azure:   { accent: "#2E9BF0", background: "#0E1016", panel: "#161821", text: "#EDEEF4" },
    ember:   { accent: "#F3555A", background: "#120D0E", panel: "#1D1517", text: "#F4EDED" },
    gilded:  { accent: "#F5B942", background: "#12100A", panel: "#1C1810", text: "#F4F0E6" },
    toxin:   { accent: "#5AD98A", background: "#0C1210", panel: "#141D18", text: "#EAF4EE" },
    phantom: { accent: "#A278FF", background: "#100E18", panel: "#181524", text: "#EFEDF6" }
  };

  // Light/dark mode is a dimension ON TOP of the accent theme. Dark is the
  // default; light swaps the structural surfaces to a light palette while
  // keeping the theme's accent. Structural (non-accent) vars for each mode:
  var MODE_LIGHT = { bg: "#EEF1F6", panel: "#FFFFFF", panel2: "#F4F6FA", line: "#D5DAE6", text: "#1A1D26", muted: "#5B6479" };
  var MODE_DARK  = { panel2: "#12141C", line: "#262A38", muted: "#8B93B8" }; // bg/panel/text come from the theme

  function activeMode() {
    try { return localStorage.getItem("ld-mode") === "light" ? "light" : "dark"; } catch (e) { return "dark"; }
  }

  // The user's saved theme choice (settings) overrides CFG.theme.
  // A custom CFG.colors block still wins, so hand-tuned sites are respected.
  function activeThemeName() {
    var saved = "";
    try { saved = localStorage.getItem("ld-theme") || ""; } catch (e) {}
    if (saved && THEMES[saved]) return saved;
    return THEMES[CFG.theme] ? CFG.theme : "azure";
  }

  function applyTheme() {
    var preset = THEMES[activeThemeName()] || THEMES.azure;
    var custom = CFG.colors || {};
    var root = document.documentElement;
    var mode = activeMode();
    root.setAttribute("data-mode", mode);

    var accent = safeColor(custom.accent) || preset.accent;
    var bg, panel, text, panel2, line, muted;
    if (mode === "light") {
      bg = MODE_LIGHT.bg; panel = MODE_LIGHT.panel; text = MODE_LIGHT.text;
      panel2 = MODE_LIGHT.panel2; line = MODE_LIGHT.line; muted = MODE_LIGHT.muted;
    } else {
      bg = safeColor(custom.background) || preset.background;
      panel = safeColor(custom.panel) || preset.panel;
      text = safeColor(custom.text) || preset.text;
      panel2 = MODE_DARK.panel2; line = MODE_DARK.line; muted = MODE_DARK.muted;
    }
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--panel", panel);
    root.style.setProperty("--panel-2", panel2);
    root.style.setProperty("--line", line);
    root.style.setProperty("--text", text);
    root.style.setProperty("--muted", muted);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-soft", accent + "22");
    root.style.setProperty("--accent-line", accent + "55");
    // keep the mobile browser chrome in sync with the current surface
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", bg);
  }

  function setMode(m) {
    try { localStorage.setItem("ld-mode", m === "light" ? "light" : "dark"); } catch (e) {}
    applyTheme();
    syncSettingsUI();
  }

  function mountBackground() {
    var u = safeImg(CFG.scrollingBackground);
    if (!u) return;
    var layer = document.createElement("div");
    layer.className = "bg-scroll";
    layer.style.backgroundImage = "url(" + JSON.stringify(u) + ")";
    document.body.prepend(layer);
  }

  var bgLayers = null, bgActive = 0, bgCurrent = "";

  function ensureBgLayers() {
    if (bgLayers) return;
    var wrap = document.createElement("div");
    wrap.className = "site-bg";
    wrap.setAttribute("aria-hidden", "true");
    var a = document.createElement("div"); a.className = "site-bg-layer";
    var b = document.createElement("div"); b.className = "site-bg-layer";
    wrap.appendChild(a); wrap.appendChild(b);
    document.body.prepend(wrap);
    bgLayers = [a, b];
  }

  function setSiteBg(url) {
    url = safeImg(url);
    if (!url || url === bgCurrent) return;
    ensureBgLayers();
    bgCurrent = url;
    var cur = bgLayers[bgActive], next = bgLayers[1 - bgActive];
    var img = new Image();
    img.onload = function () {
      if (bgCurrent !== url) return; 
      next.style.backgroundImage = "url(" + JSON.stringify(url) + ")";
      next.classList.add("show");
      cur.classList.remove("show");
      bgActive = 1 - bgActive;
    };
    img.src = url;
  }

  var bgRotateTimer = null, bgRotateIdx = 0, bgHovering = false;
  var bgMode = "rotate";        // "rotate" (default pages) | "fixed" (a game page)
  var bgSeq = 0;                // invalidates stale async background resolves
  var hoverSeq = 0;             // invalidates stale home-card hover resolves
  var wallpaperListCache = null, rotList = [];

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Probe assets/wallpapers/wp1, wp2, ... (jpg/png/...) contiguously,
  // stopping at the first index with no file. Static host has no folder
  // listing, so this "drop wpN files in and they rotate" is how we discover them.
  function probeWallpapers(cb) {
    var found = [], MAX = 40;
    (function tryIndex(i) {
      if (i > MAX) return cb(found);
      var e = 0;
      (function tryExt() {
        if (e >= IMG_EXTS.length) return cb(found); // gap → assume end of set
        var url = "assets/wallpapers/wp" + i + "." + IMG_EXTS[e];
        var img = new Image();
        img.onload = function () { found.push(url); tryIndex(i + 1); };
        img.onerror = function () { e++; tryExt(); };
        img.src = url;
      })();
    })(1);
  }

  // Resolve the default rotation list. Explicit CFG.backgroundRotation wins;
  // otherwise the assets/wallpapers/ folder; otherwise game backgrounds.
  function resolveWallpaperList(cb) {
    var cfg = (CFG.backgroundRotation || []).map(safeImg).filter(Boolean);
    if (cfg.length) return cb(cfg);
    if (wallpaperListCache) return cb(wallpaperListCache);
    probeWallpapers(function (list) {
      if (!list.length) list = GAMES.map(function (g) { return safeImg(g.background); }).filter(Boolean);
      wallpaperListCache = list;
      cb(list);
    });
  }

  // A game's dedicated wallpaper: assets/<id>/wp.<ext>, falling back to its
  // `background` URL from data/games.js.
  function resolveGameBg(game, cb) {
    var cands = gameAssetCands(game.id, "wp");
    var bg = safeImg(game.background);
    if (bg) cands.push(bg);
    resolveFirstImage(cands, cb);
  }

  function currentRotUrl() { return rotList.length ? rotList[bgRotateIdx % rotList.length] : ""; }

  function startBgRotation() {
    stopBgRotation();
    resolveWallpaperList(function (list) {
      if (bgMode !== "rotate") return;
      rotList = list || [];
      if (!rotList.length) return;
      bgRotateIdx = bgRotateIdx % rotList.length;
      if (!bgHovering) setSiteBg(rotList[bgRotateIdx]);
      if (rotList.length < 2) return;   // only one wallpaper — nothing to rotate
      var secs = Math.max(4, parseInt(CFG.backgroundRotateSeconds, 10) || 14);
      // NOTE: rotation is intentionally NOT gated on prefers-reduced-motion —
      // the swap itself is the feature; the crossfade transition is what CSS
      // disables for reduced-motion users (so they get instant swaps).
      bgRotateTimer = window.setInterval(function () {
        if (bgMode !== "rotate" || document.hidden) return;
        bgRotateIdx = (bgRotateIdx + 1) % rotList.length;
        // Keep advancing even under a hover preview; only paint when not hovering.
        if (!bgHovering) setSiteBg(rotList[bgRotateIdx]);
      }, secs * 1000);
    });
  }

  function stopBgRotation() {
    if (bgRotateTimer) { window.clearInterval(bgRotateTimer); bgRotateTimer = null; }
  }

  // Apply the correct background for a route: a game page pins that game's
  // dedicated wallpaper (no rotation); every other page rotates.
  function applyRouteBackground(game) {
    bgSeq++;
    bgHovering = false;
    if (game) {
      bgMode = "fixed";
      stopBgRotation();
      var tok = bgSeq;
      resolveGameBg(game, function (u) {
        if (bgMode === "fixed" && bgSeq === tok && u) setSiteBg(u);
      });
    } else {
      bgMode = "rotate";
      startBgRotation();
    }
  }

  // On a non-game page, hovering a game card PREVIEWS that game's wallpaper.
  // It does not stop the rotation timer (which keeps advancing underneath);
  // leaving the card immediately restores the current rotating wallpaper.
  function bindHomeBgHover(root) {
    root.querySelectorAll(".gcard[data-game]").forEach(function (card) {
      var g = findGame(card.getAttribute("data-game"));
      if (!g) return;
      var tok;
      function enter() {
        if (bgMode !== "rotate") return;
        bgHovering = true;
        tok = ++hoverSeq;
        resolveGameBg(g, function (u) {
          if (u && bgHovering && bgMode === "rotate" && hoverSeq === tok) setSiteBg(u);
        });
      }
      function leave() {
        if (!bgHovering) return;
        bgHovering = false;
        hoverSeq++;                                   // cancel any pending hover resolve
        if (bgMode === "rotate") setSiteBg(currentRotUrl());   // revert to rotation immediately
      }
      card.addEventListener("mouseenter", enter);
      card.addEventListener("focus", enter);
      card.addEventListener("mouseleave", leave);
      card.addEventListener("blur", leave);
    });
  }

  /* ================= SPA router ================= */

  var PAGE_FILES = {
    "": "home", "index.html": "home", "guides.html": "guides",
    "game.html": "game", "tierlist.html": "tierlist", "roles.html": "roles",
    "characters.html": "characters", "character.html": "character",
    "guide.html": "guide", "upcoming.html": "upcoming", "teambuilder.html": "teams",
    "events.html": "events", "builds.html": "builds"
  };

  function ensureSidebarEl() {
    var el = document.getElementById("sidebar");
    if (!el) {
      el = document.createElement("aside");
      el.id = "sidebar";
      el.setAttribute("aria-label", "Game navigation");
      document.body.insertBefore(el, document.getElementById("main"));
    }
    return el;
  }

  function renderRoute(urlStr, opts) {
    opts = opts || {};
    var url = new URL(urlStr, window.location.href);
    var file = url.pathname.split("/").pop();
    var page = PAGE_FILES.hasOwnProperty(file) ? PAGE_FILES[file] : "home";
    routeParams = url.searchParams;

    var main = document.getElementById("main");
    document.body.setAttribute("data-page", page);
    document.body.classList.remove("sidebar-open");
    hideTip();

    var game = null, chr = null, guide = null;
    if (page === "game" || page === "tierlist" || page === "roles" || page === "teams" || page === "events" || page === "builds") game = findGame(param("id"));
    if (page === "characters") game = findGame(param("game"));
    if (page === "character") { chr = findCharacter(param("id")); game = chr && findGame(chr.game); }
    if (page === "guide") {
      guide = findGuide(param("id"));
      if (guide && safeHref(guide.href)) return renderRoute(guide.href, { replace: true });
      game = guide && findGame(guide.game);
    }

    var sidebarEl = ensureSidebarEl();
    var hasSidebar = !!game;
    sidebarEl.hidden = !hasSidebar;
    document.body.classList.toggle("with-sidebar", hasSidebar);

    renderTopbar(game, hasSidebar, file || "index.html");

    if (hasSidebar) {
      var activeKey = { game: "home", tierlist: "tierlist", roles: "roles", teams: "teams", events: "events", characters: "characters", character: "characters", builds: "builds", guide: "guides" }[page];
      renderSidebar(game, activeKey, page);
    }

    applyRouteBackground(game);

    if (opts.replace) {
      try { history.replaceState({ url: url.href }, "", file + url.search + url.hash); } catch (e) {}
    }

    if (!main) return;
    main.classList.remove("fade-in"); void main.offsetWidth; main.classList.add("fade-in");

    if (page === "home")            { renderHome(main); paint(main); }
    else if (page === "guides")     { renderGuidesIndex(main); }
    else if (page === "upcoming")   { renderUpcoming(main); }
    else if (page === "game")       { if (game) { renderGameHub(main, game); paint(main); } else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "tierlist")   { if (game) renderTierList(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "roles")      { if (game) renderRolesPage(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "teams")      { if (game) renderTeamBuilder(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "events")     { if (game) renderEventsPage(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "characters") { if (game) renderCharactersDB(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "builds")     { if (game) renderBuildsPage(main, game); else notFound(main, "Game", "index.html", "Back to home"); }
    else if (page === "character")  { if (chr) renderCharacterPage(main, chr); else notFound(main, "Character", "index.html", "Back to home"); }
    else if (page === "guide")      { if (guide) renderGuidePage(main, guide); else notFound(main, "Guide", "guides.html", "All guides"); }

    initReveal(main);

    // Offer / apply on-demand content translation for this page.
    if (window.LD_CT) window.LD_CT.onRoute(main);

    if (url.hash) {
      var target;
      try { target = document.querySelector(url.hash); } catch (e) { target = null; }
      if (target) target.scrollIntoView();
    } else if (!opts.keepScroll) {
      window.scrollTo(0, 0);
    }
  }

  function navigateTo(href) {
    var url;
    try { url = new URL(href, window.location.href); } catch (e) { window.location.href = href; return; }
    if (url.origin !== window.location.origin) { window.location.href = href; return; }

    try { history.pushState({ url: url.href }, "", href); }
    catch (e) { window.location.href = href; return; }

    var render = function () { renderRoute(url.href); };
    if (document.startViewTransition && !reducedMotion()) document.startViewTransition(render);
    else render();
  }

  function initRouter() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#" || /^(https?:)?\/\//i.test(href) || /^[a-z]+:/i.test(href)) return;
      e.preventDefault();
      navigateTo(href);
    });
    window.addEventListener("popstate", function () {
      renderRoute(window.location.href, { keepScroll: true });
    });
  }

  function initScrollExtras() {
    var nav = document.getElementById("site-nav");
    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.textContent = "↑";
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(toTop);

    function onScroll() {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
      toTop.classList.toggle("show", window.scrollY > 600);
      // The settings overlay opens only from the "More settings" button; a
      // deliberate scroll (in either direction) dismisses it.
      if (overlayIsOpen() && Math.abs(window.scrollY - settingsOpenScrollY) > 30) closeSettingsOverlay();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal(main) {
    if (!main || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    main.querySelectorAll(".section, .role-group").forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ================= chrome ================= */
  function svgDiscord() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.9 3l-.2.4c1.6.4 2.9 1 4.2 1.9a16 16 0 0 0-13.8 0C7.4 4.4 8.7 3.8 10.3 3.4L10.1 3a19.8 19.8 0 0 0-4.4 1.4C2.9 8.6 2.1 12.7 2.5 16.7a19.9 19.9 0 0 0 6 3l.5-.7c-.8-.3-1.6-.7-2.3-1.2l.2-.2a14.2 14.2 0 0 0 10.2 0l.2.2c-.7.5-1.5.9-2.3 1.2l.5.7a19.9 19.9 0 0 0 6-3c.5-4.6-.8-8.7-3.2-12.3ZM9.7 14.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm4.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>';
  }

  function renderTopbar(activeGame, hasSidebar, currentFile) {
    var el = document.getElementById("site-nav");
    if (!el) return;

    var links = (CFG.nav || []).map(function (i) {
      var active = currentFile && String(i.url).split("?")[0] === currentFile;
      return '<a href="' + esc(i.url) + '"' + (active ? ' class="active"' : "") + ">" + esc(i.label) + "</a>";
    });
    GAMES.forEach(function (g) {
      links.push('<a href="game.html?id=' + encodeURIComponent(g.id) + '"' +
        (activeGame && activeGame.id === g.id ? ' class="active"' : "") + ">" +
        esc(g.shortName || g.name) + "</a>");
    });

    var discord = "";
    if (CFG.social && /^https:\/\//i.test(CFG.social.discord || "")) {
      discord = '<a class="btn-discord" href="' + esc(CFG.social.discord) +
        '" target="_blank" rel="noopener noreferrer" aria-label="Discord">' + svgDiscord() + "</a>";
    }

    var collapsed = document.body.classList.contains("sidebar-collapsed");
    el.innerHTML =
      '<div class="nav-inner">' +
        (hasSidebar ? '<button class="side-toggle" id="side-toggle" aria-label="Open menu" aria-expanded="false">☰</button>' : "") +
        (hasSidebar ? '<button class="side-collapse" id="side-collapse" aria-label="Collapse sidebar" title="Collapse sidebar" aria-expanded="' + (collapsed ? "false" : "true") + '">' + (collapsed ? "▶" : "◀") + "</button>" : "") +
        '<a class="brand" href="index.html"><span class="brand-mark">' + esc((CFG.siteName || "G")[0]) + '</span><span class="brand-name">' + esc(CFG.siteName || "Guides") + "</span></a>" +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>' +
        '<div class="nav-links" id="nav-links">' + links.join("") + "</div>" +
        discord +
      "</div>";

    var t = document.getElementById("nav-toggle"), l = document.getElementById("nav-links");
    if (t) t.addEventListener("click", function () {
      var open = l.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
    });

    if (hasSidebar) {
      var st = document.getElementById("side-toggle");
      st.addEventListener("click", function () {
        var open = document.body.classList.toggle("sidebar-open");
        st.setAttribute("aria-expanded", open ? "true" : "false");
      });
      var sc = document.getElementById("side-collapse");
      sc.addEventListener("click", function () {
        var isCollapsed = document.body.classList.toggle("sidebar-collapsed");
        sc.textContent = isCollapsed ? "▶" : "◀";
        sc.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
        sc.setAttribute("title", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
        try { localStorage.setItem("pp-sidebar-collapsed", isCollapsed ? "1" : ""); } catch (e) {}
      });
    }

    // On a game page, swap the site brand for that game's logo when a
    // logo file (assets/<id>/logo.*) exists; otherwise keep the wordmark.
    if (activeGame) {
      var brand = el.querySelector(".brand");
      if (brand) {
        resolveFirstImage(gameAssetCands(activeGame.id, "logo"), function (url) {
          if (!url || !document.body.contains(brand)) return;
          var img = document.createElement("img");
          img.className = "brand-logo";
          img.alt = activeGame.name;
          img.src = url;
          brand.innerHTML = "";
          brand.appendChild(img);
          brand.classList.add("has-logo");
        });
      }
    }
  }

  function equivalentHref(page, g) {
    var gid = encodeURIComponent(g.id);
    if (page === "tierlist") return "tierlist.html?id=" + gid;
    if (page === "builds" && buildsForGame(g.id).length) return "builds.html?id=" + gid;
    if (page === "characters" || page === "character") return "characters.html?game=" + gid;
    if (page === "roles" && ROLES[g.id]) return "roles.html?id=" + gid;
    if (page === "teams" && TEAMS[g.id]) return "teambuilder.html?id=" + gid;
    if (page === "events" && EVENTS[g.id]) return "events.html?id=" + gid;
    return "game.html?id=" + gid;
  }

  function renderSidebar(game, active, page) {
    var el = document.getElementById("sidebar");
    if (!el || !game) return;

    function item(href, label, key, icon) {
      return '<a class="side-item' + (active === key ? " active" : "") + '" href="' + href + '">' +
        '<span class="side-icon" aria-hidden="true">' + icon + "</span>" + esc(label) + "</a>";
    }
    var gid = encodeURIComponent(game.id);

    var switchItems = GAMES.map(function (g) {
      var current = g.id === game.id;
      return '<a class="side-menu-item' + (current ? " current" : "") + '" href="' +
        esc(equivalentHref(page, g)) + '">' + esc(g.shortName || g.name) +
        (current ? '<span class="side-menu-tick" aria-hidden="true">✓</span>' : "") + "</a>";
    }).join("");
    switchItems += '<a class="side-menu-item side-menu-home" href="index.html"><span class="side-icon" aria-hidden="true">🏠</span>All games</a>';

    el.innerHTML =
      '<div class="side-game">' +
        '<button class="side-game-btn" id="side-game-btn" aria-haspopup="true" aria-expanded="false">' +
          '<span class="side-game-name">' + esc(game.name) + "</span>" +
          '<span class="side-switch" aria-hidden="true">⇅</span>' +
        "</button>" +
        '<div class="side-menu" id="side-menu">' + switchItems + "</div>" +
      "</div>" +
      item("game.html?id=" + gid, "Home", "home", "🏠") +
      '<p class="side-label">Database</p>' +
      item("characters.html?game=" + gid, "Characters", "characters", "🗃️") +
      (buildsForGame(game.id).length ? item("builds.html?id=" + gid, "Builds", "builds", "🛠️") : "") +
      '<p class="side-label">Tier Lists</p>' +
      item("tierlist.html?id=" + gid, "Tier List", "tierlist", "📊") +
      (ROLES[game.id] ? item("roles.html?id=" + gid, "Roles & Effects", "roles", "⚔️") : "") +
      (TEAMS[game.id] || EVENTS[game.id] ? '<p class="side-label">Tools</p>' : "") +
      (TEAMS[game.id] ? item("teambuilder.html?id=" + gid, "Team Builder", "teams", "🛡️") : "") +
      (EVENTS[game.id] ? item("events.html?id=" + gid, "Events & Bosses", "events", "🐉") : "") +
      '<p class="side-label">Guides</p>' +
      item("game.html?id=" + gid + "#guides", "Guides", "guides", "📖");

    var btn = document.getElementById("side-game-btn");
    var menu = document.getElementById("side-menu");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        document.addEventListener("click", function () {
          menu.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }, { once: true });
      }
    });
  }

  /* ===== settings controls (shared by footer basics + overlay) ===== */
  function modeControlHTML() {
    var m = activeMode();
    return '<div class="pref"><span class="pref-label">Appearance</span>' +
      '<div class="mode-seg" role="group" aria-label="Appearance">' +
        '<button class="mode-btn' + (m === "light" ? " active" : "") + '" data-mode-val="light">Light</button>' +
        '<button class="mode-btn' + (m === "dark" ? " active" : "") + '" data-mode-val="dark">Dark</button>' +
      "</div></div>";
  }
  function themeControlHTML() {
    var btns = Object.keys(THEMES).map(function (name) {
      return '<button class="theme-dot' + (name === activeThemeName() ? " active" : "") + '" data-theme="' + esc(name) +
        '" data-clr="' + esc(THEMES[name].accent) + '" title="' + esc(name) + '" aria-label="' + esc(name) + ' theme"></button>';
    }).join("");
    return '<div class="pref"><span class="pref-label">Theme</span><div class="theme-dots">' + btns + "</div></div>";
  }
  function langControlHTML() {
    var I = window.LD_I18N;
    if (!I) return "";
    var opts = Object.keys(I.supported).map(function (code) {
      return '<option value="' + esc(code) + '"' + (code === I.lang ? " selected" : "") + ">" + esc(I.native[code] || code) + "</option>";
    }).join("");
    return '<div class="pref"><span class="pref-label">Language</span>' +
      '<select class="lang-select" data-lang-select aria-label="Language">' + opts + "</select></div>";
  }

  function bindSettings(root) {
    root.addEventListener("click", function (e) {
      var mb = e.target.closest("[data-mode-val]");
      if (mb) { setMode(mb.getAttribute("data-mode-val")); return; }
      var tb = e.target.closest("[data-theme]");
      if (tb) {
        try { localStorage.setItem("ld-theme", tb.getAttribute("data-theme")); } catch (x) {}
        applyTheme(); syncSettingsUI(); return;
      }
    });
    root.addEventListener("change", function (e) {
      var ls = e.target.closest("[data-lang-select]");
      if (ls) selectLanguage(ls.value);
    });
    paint(root); // applies data-clr on the theme dots
  }

  // Explicitly choosing a language means "show me the whole page in it" — so we
  // also switch content auto-translation ON (for any non-English target) and
  // clear the one-session dismissal, then reload to apply UI + content together.
  function selectLanguage(code) {
    if (window.LD_I18N) window.LD_I18N.setLang(code);
    try {
      if (code && code !== "en") {
        localStorage.setItem("ld-ct-auto", "on");
        sessionStorage.removeItem("ld-ct-dismiss");
      }
    } catch (e) {}
    location.reload();
  }

  // Reflect current prefs across every settings control on the page (footer + overlay).
  function syncSettingsUI() {
    var m = activeMode(), th = activeThemeName();
    document.querySelectorAll("[data-mode-val]").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-mode-val") === m); });
    document.querySelectorAll("[data-theme]").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-theme") === th); });
  }

  /* ===== full settings overlay (opened from the "More settings" button) ===== */
  var settingsOverlay = null, settingsOpenScrollY = 0;
  function ensureOverlay() {
    if (settingsOverlay) return settingsOverlay;
    settingsOverlay = document.createElement("div");
    settingsOverlay.className = "settings-overlay";
    settingsOverlay.innerHTML =
      '<div class="settings-panel" role="dialog" aria-modal="true" aria-label="Settings">' +
        '<div class="settings-grabber" aria-hidden="true"></div>' +
        '<div class="settings-head"><h2>Settings</h2></div>' +
        '<div class="settings-body"></div>' +
        '<p class="settings-hint">Scroll up to close</p>' +
      "</div>";
    document.body.appendChild(settingsOverlay);
    // No close button — the user dismisses by scrolling up (see initScrollExtras).
    // Tapping the dark backdrop (outside the panel) still closes it.
    settingsOverlay.addEventListener("click", function (e) {
      if (e.target === settingsOverlay) closeSettingsOverlay();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && settingsOverlay.classList.contains("open")) closeSettingsOverlay();
    });
    return settingsOverlay;
  }
  function openSettingsOverlay() {
    var ov = ensureOverlay();
    if (ov.classList.contains("open")) return;
    var body = ov.querySelector(".settings-body");
    body.innerHTML = modeControlHTML() + themeControlHTML() + langControlHTML();
    if (window.LD_CT) window.LD_CT.renderSettings(body); // content-translate toggle (only when lang != en)
    bindSettings(body);
    syncSettingsUI();
    if (window.LD_I18N) window.LD_I18N.translate(ov);
    settingsOpenScrollY = window.scrollY;
    // Add the .open class on the next frame so the panel reliably slides up
    // from its off-screen start (transform transition), even on first open.
    // NOTE: body scroll is intentionally NOT locked — a deliberate scroll
    // dismisses the overlay (see initScrollExtras).
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ov.classList.add("open"); });
    });
  }
  function overlayIsOpen() { return !!(settingsOverlay && settingsOverlay.classList.contains("open")); }
  function closeSettingsOverlay() {
    if (settingsOverlay) settingsOverlay.classList.remove("open");
  }

  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var socials = [];
    var s = CFG.social || {};
    ["discord", "twitter", "youtube", "kofi"].forEach(function (k) {
      if (typeof s[k] === "string" && /^https:\/\//i.test(s[k])) {
        socials.push('<a href="' + esc(s[k]) + '" rel="noopener noreferrer" target="_blank">' + esc(k) + "</a>");
      }
    });

    // Footer text + socials on the left; a couple of quick settings (theme +
    // language) inline on the right; everything else lives in the overlay.
    el.innerHTML = '<div class="footer-inner">' +
      '<div class="footer-info">' +
        "<p>" + esc(CFG.footerText || "") + "</p>" +
        (socials.length ? '<p class="footer-social">' + socials.join(" • ") + "</p>" : "") +
      "</div>" +
      '<div class="footer-prefs">' +
        themeControlHTML() +
        langControlHTML() +
        '<button class="more-settings-btn" data-open-settings>More settings <span aria-hidden="true">▾</span></button>' +
      "</div>" +
    "</div>";
    bindSettings(el.querySelector(".footer-prefs"));
    var moreBtn = el.querySelector("[data-open-settings]");
    if (moreBtn) moreBtn.addEventListener("click", openSettingsOverlay);
  }

  function setTitle(t) {
    document.title = t ? t + " - " + (CFG.siteName || "Guides") : (CFG.siteName || "Guides");
  }

  function crumbs(parts) {
    return '<nav class="crumbs" aria-label="Breadcrumb">' + parts.map(function (p, i) {
      var last = i === parts.length - 1;
      return p.href && !last
        ? '<a href="' + esc(p.href) + '">' + esc(p.label) + "</a>"
        : '<span class="crumb-here">' + esc(p.label) + "</span>";
    }).join('<span class="crumb-sep">/</span>') + "</nav>";
  }

  function sectionHead(title) {
    return '<h2 class="sec-head"><span class="sec-square" aria-hidden="true"></span>' + esc(title) + "</h2>";
  }

  /* ================= shared pieces ================= */
  function gameCardWide(g) {
    return (
      '<a class="gcard" data-game="' + esc(g.id) + '" href="game.html?id=' + encodeURIComponent(g.id) + '">' +
        '<div class="gcard-media"' + imgset(cardCands(g)) + ">" +
          '<span class="gcard-ph">' + esc((g.shortName || g.name)[0]) + "</span>" +
        "</div>" +
        '<div class="gcard-shade"></div>' +
        '<span class="gcard-name">' + esc(g.name) + "</span>" +
      "</a>"
    );
  }

  function guideCard(g) {
    var href = safeHref(g.href) || "guide.html?id=" + encodeURIComponent(g.id);
    return (
      '<a class="guide-card" href="' + esc(href) + '">' +
        '<div class="guide-thumb"' + imgset(guideThumbCands(g)) + ">" +
          '<span aria-hidden="true">📖</span></div>' +
        '<span class="guide-card-title">' + esc(g.title) + "</span>" +
        '<span class="guide-arrow" aria-hidden="true">➔</span>' +
      "</a>"
    );
  }

  function avatarCard(c, game) {
    return (
      '<a class="tl-avatar ' + rarityClass(c.rarity) + '" href="character.html?id=' + encodeURIComponent(c.id) +
        '" data-char="' + esc(c.id) + '" data-clr="' + esc(elementColor(game, c.element)) + '">' +
        (c.isNew ? '<span class="tl-new">NEW</span>' : "") +
        '<div class="tl-avatar-img"' + imgset(portraitCands(c)) + ">" +
          '<span class="tl-avatar-ph">' + esc((c.name || "?")[0]) + "</span></div>" +
        '<span class="tl-avatar-name">' + esc(c.name) + "</span>" +
      "</a>"
    );
  }

  function makeFilterBar(game, uid, opts) {
    opts = opts || {};
    var state = { search: "", rarity: new Set(), element: new Set(), role: new Set() };
    var rarities = Array.from(new Set(gameChars(game.id).map(function (c) { return c.rarity; })))
      .filter(Boolean).sort().reverse();

    function group(f, buttons) {
      return '<div class="fgroup" data-f="' + f + '">' +
        '<button class="fbtn fbtn-all active" data-v="" aria-label="All" title="All">★</button>' +
        buttons.join("") + "</div>";
    }
    var rarityBtns = rarities.map(function (r) {
      return '<button class="fbtn" data-v="' + esc(String(r)) + '">' + esc(String(r)) + "★</button>";
    });
    var elementBtns = (game.elements || []).map(function (e) {
      return '<button class="fbtn fbtn-el" data-v="' + esc(e.name) + '" data-clr="' + esc(safeColor(e.color) || "#8B93B8") +
        '" title="' + esc(e.name) + '"><span class="el-dot" aria-hidden="true"></span><span class="fbtn-txt">' + esc(e.name) + "</span></button>";
    });
    var roleBtns = (game.roles || []).map(function (r) {
      return '<button class="fbtn" data-v="' + esc(r) + '">' + esc(r) + "</button>";
    });

    var html =
      '<div class="filter-bar" id="fb-' + uid + '">' +
        '<input type="search" id="fs-' + uid + '" class="search-input filter-search" placeholder="' +
          esc(opts.placeholder || "Search characters...") + '" maxlength="60" autocomplete="off">' +
        group("rarity", rarityBtns) +
        group("element", elementBtns) +
        group("role", roleBtns) +
        '<button class="fbtn fbtn-reset" data-reset>↺ Reset</button>' +
        '<span class="filter-count" data-count aria-live="polite"></span>' +
      "</div>";

    function matches(c) {
      if (state.search && (c.name + " " + (c.title || "")).toLowerCase().indexOf(state.search) === -1) return false;
      if (state.rarity.size && !state.rarity.has(String(c.rarity))) return false;
      if (state.element.size && !state.element.has(c.element)) return false;
      if (state.role.size && !state.role.has(c.role)) return false;
      return true;
    }

    function bind(root, onChange) {
      var bar = root.querySelector("#fb-" + uid);
      if (!bar) return;
      function syncAll() {
        bar.querySelectorAll(".fgroup").forEach(function (g) {
          var set = state[g.getAttribute("data-f")];
          var allBtn = g.querySelector(".fbtn-all");
          if (allBtn) allBtn.classList.toggle("active", set.size === 0);
        });
      }
      bar.querySelectorAll(".fgroup .fbtn").forEach(function (b) {
        b.addEventListener("click", function () {
          var g = b.closest(".fgroup");
          var set = state[g.getAttribute("data-f")];
          var v = b.getAttribute("data-v");
          if (v === "") {
            set.clear();
            g.querySelectorAll(".fbtn").forEach(function (x) { x.classList.remove("active"); });
          } else {
            if (set.has(v)) set.delete(v); else set.add(v);
            b.classList.toggle("active");
          }
          syncAll(); onChange();
        });
      });
      var input = bar.querySelector("#fs-" + uid);
      input.addEventListener("input", function () {
        state.search = input.value.trim().toLowerCase(); onChange();
      });
      bar.querySelector("[data-reset]").addEventListener("click", function () {
        state.search = ""; state.rarity.clear(); state.element.clear(); state.role.clear();
        input.value = "";
        bar.querySelectorAll(".fgroup .fbtn").forEach(function (x) { x.classList.remove("active"); });
        syncAll(); onChange();
      });
      paint(bar);
    }

    function setCount(root, n) {
      var el = root.querySelector("#fb-" + uid + " [data-count]");
      if (el) el.textContent = "Showing " + n + " character" + (n === 1 ? "" : "s");
    }
    return { html: html, bind: bind, matches: matches, setCount: setCount, state: state };
  }

  /* ================= pages ================= */

  function renderHome(main) {
    setTitle("");
    var names = GAMES.map(function (g) { return g.name; });
    var nameList = names.length > 1
      ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1]
      : (names[0] || "your favorite games");
    var blurb = String(CFG.heroBlurb || "").split("{games}").map(esc).join(esc(nameList));

    var popular = GAMES.filter(function (g) { return g.popular; });
    var fresh = GAMES.filter(function (g) { return g.isNew; });
    var upcoming = UPCOMING.slice()
      .sort(function (a, b) {
        if (!!a.date !== !!b.date) return a.date ? -1 : 1;
        return String(a.date).localeCompare(String(b.date)) || a.name.localeCompare(b.name);
      })
      .slice(0, 5)
      .map(function (u) {
        return '<a class="up-row up-link" href="upcoming.html"><div><span class="up-name">' + esc(u.name) + "</span>" +
          '<span class="up-note">' + esc(u.note || "") + "</span></div>" +
          '<span class="up-date">' + (u.date ? formatDate(u.date) : "TBA") + "</span></a>";
      }).join("");
    if (upcoming) upcoming += '<a class="up-row up-link up-more" href="upcoming.html"><span class="up-name">All upcoming games</span><span class="up-date">➔</span></a>';

    var latest = GUIDES.slice()
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); })
      .slice(0, 4)
      .map(function (g) {
        var game = findGame(g.game);
        return '<a class="up-row up-link" href="guide.html?id=' + encodeURIComponent(g.id) + '"><div>' +
          '<span class="up-name">' + esc(g.title) + "</span>" +
          '<span class="up-note">' + esc(game ? game.shortName : "") + " • " + esc(g.summary) + "</span></div>" +
          '<span class="up-date">' + formatDate(g.date) + "</span></a>";
      }).join("");

    var hero = safeImg(CFG.homeHeroImage);
    main.innerHTML =
      '<section class="home-hero"' + (hero ? ' data-bg="' + esc(hero) + '"' : "") + ">" +
        '<div class="home-hero-inner">' +
          "<h1>" + esc(CFG.tagline || "Guides for your favorite gacha games") + "</h1>" +
          '<p class="home-hero-blurb">' + blurb + "</p>" +
        "</div>" +
      "</section>" +
      '<div class="home-body">' +
        (popular.length ? '<section class="section"><h2 class="home-sec"><span class="home-ico" aria-hidden="true">🔥</span>Popular games</h2>' +
          '<div class="gcard-grid">' + popular.map(gameCardWide).join("") + "</div></section>" : "") +
        (fresh.length ? '<section class="section"><h2 class="home-sec"><span class="home-ico" aria-hidden="true">✨</span>New games</h2>' +
          '<div class="gcard-grid">' + fresh.map(gameCardWide).join("") + "</div></section>" : "") +
        '<section class="section home-cols">' +
          '<div><h2 class="home-sec"><span class="home-ico" aria-hidden="true">🎮</span>All supported games</h2>' +
            '<div class="gcard-grid gcard-grid-small">' + GAMES.map(gameCardWide).join("") + "</div></div>" +
          '<div><h2 class="home-sec"><span class="home-ico" aria-hidden="true">📅</span>Upcoming releases</h2>' +
            '<div class="up-list">' + (upcoming || '<p class="muted">Nothing announced yet.</p>') + "</div>" +
            '<h2 class="home-sec home-sec-gap"><span class="home-ico" aria-hidden="true">📖</span>Latest guides</h2>' +
            '<div class="up-list">' + latest + "</div></div>" +
        "</section>" +
      "</div>";
    bindHomeBgHover(main);
  }

  function renderGameHub(main, game) {
    setTitle(game.name + " wiki and tier list");
    var hero = safeImg(game.hero);
    var byCat = {}, catOrder = [];
    GUIDES.filter(function (g) { return g.game === game.id; }).forEach(function (g) {
      var cat = g.category || "Guides";
      if (!byCat[cat]) { byCat[cat] = []; catOrder.push(cat); }
      byCat[cat].push(g);
    });

    var guideSections = catOrder.map(function (cat) {
      return '<h3 class="cat-head">' + esc(cat) + "</h3>" +
        '<div class="guide-grid">' + byCat[cat].map(guideCard).join("") + "</div>";
    }).join("");

    var gid = encodeURIComponent(game.id);
    main.innerHTML =
      '<section class="hub-hero"' + (hero ? ' data-bg="' + esc(hero) + '"' : "") + ">" +
        '<div class="hub-hero-inner">' +
          "<h1>" + esc(CFG.siteName || "") + " - " + esc(game.name) + " wiki and tier list</h1>" +
          "<p>" + esc(CFG.siteName || "This site") + " is a wiki for " + esc(game.name) +
            ". Check our guides, tier lists and reviews for characters available in the game.</p>" +
          '<p class="hub-meta">' + (game.patch ? esc(game.patch) + " server • Updated " : "Updated ") + formatDate(game.updated) + "</p>" +
        "</div>" +
      "</section>" +
      '<div class="page-pad">' +
        '<section class="section">' + sectionHead("Database & Tools") +
          '<div class="tool-grid">' +
            '<a class="tool-card" href="tierlist.html?id=' + gid + '"><span class="tool-ico" aria-hidden="true">📊</span>' +
              "<div><strong>Tier List</strong><span>Every character ranked across " +
              esc(String(((game.tierlist && game.tierlist.categories) || []).length)) + " game modes</span></div>" +
              '<span class="guide-arrow" aria-hidden="true">➔</span></a>' +
            '<a class="tool-card" href="characters.html?game=' + gid + '"><span class="tool-ico" aria-hidden="true">🗃️</span>' +
              "<div><strong>Characters</strong><span>Reviews, ratings and recommended builds</span></div>" +
              '<span class="guide-arrow" aria-hidden="true">➔</span></a>' +
            (buildsForGame(game.id).length ?
              '<a class="tool-card" href="builds.html?id=' + gid + '"><span class="tool-ico" aria-hidden="true">🛠️</span>' +
                "<div><strong>Builds</strong><span>Transcendence, gear, skill enhancement &amp; key usage</span></div>" +
                '<span class="guide-arrow" aria-hidden="true">➔</span></a>' : "") +
            (ROLES[game.id] ?
              '<a class="tool-card" href="roles.html?id=' + gid + '"><span class="tool-ico" aria-hidden="true">⚔️</span>' +
                "<div><strong>Roles &amp; Effects</strong><span>Every effect mapped to the heroes that provide it</span></div>" +
                '<span class="guide-arrow" aria-hidden="true">➔</span></a>' : "") +
            (TEAMS[game.id] ?
              '<a class="tool-card" href="teambuilder.html?id=' + gid + '"><span class="tool-ico" aria-hidden="true">🛡️</span>' +
                "<div><strong>Team Builder</strong><span>Plan synergy and team compositions</span></div>" +
                '<span class="guide-arrow" aria-hidden="true">➔</span></a>' : "") +
            (EVENTS[game.id] ?
              '<a class="tool-card" href="events.html?id=' + gid + '"><span class="tool-ico" aria-hidden="true">🐉</span>' +
                "<div><strong>Events &amp; Bosses</strong><span>Optimal compositions and mechanics</span></div>" +
                '<span class="guide-arrow" aria-hidden="true">➔</span></a>' : "") +
          "</div></section>" +
        '<section class="section" id="guides">' + sectionHead("Guides") +
          (guideSections || '<p class="muted">No guides yet.</p>') +
        "</section>" +
      "</div>";
  }

  function renderTierList(main, game) {
    setTitle(game.name + " tier list");
    var TL = game.tierlist || { tiers: [], categories: [] };
    var state = { cat: (TL.categories[0] || {}).id };
    var filter = makeFilterBar(game, "tl");

    function accordion(id, title, bodyHTML) {
      return '<div class="acc" data-acc="' + id + '">' +
        '<button class="acc-head" aria-expanded="false">' + esc(title) + '<span class="acc-chev" aria-hidden="true">▼</span></button>' +
        '<div class="acc-body-outer"><div class="acc-body">' + bodyHTML + "</div></div></div>";
    }

    var accHTML =
      accordion("about", "About the tier list", "<p>" + fmt(TL.about || "") + "</p>") +
      accordion("criteria", "Criteria", "<ul>" + (TL.criteria || []).map(function (c) {
        return "<li>" + fmt(c) + "</li>";
      }).join("") + "</ul>") +
      accordion("changelog", "Changelog", (TL.changelog || []).map(function (c) {
        return '<p class="chg"><span class="chg-date">' + formatDate(c.date) + "</span> " + fmt(c.text) + "</p>";
      }).join("") || "<p>No entries yet.</p>");

    var catBanners = TL.categories.map(function (c) {
      return '<button class="cat-banner" data-cat="' + esc(c.id) + '"><span>' + esc(c.name) + "</span></button>";
    }).join("");

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Tier List" }]) +
        "<h1>" + esc(game.name) + " tier list</h1>" +
        '<p class="hero-sub">' + (game.patch ? esc(game.patch) + " server • Updated " : "Updated ") + formatDate(game.updated) + "</p>" +
        '<div class="acc-stack">' + accHTML + "</div>" +
        '<div class="cat-row">' + catBanners + "</div>" +
        '<p class="cat-blurb" id="cat-blurb"></p>' +
        filter.html +
        '<div id="tl-grid" class="tl-grid-wrap"></div>' +
      "</div>";
    paint(main);

    main.querySelectorAll(".acc-head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    function drawGrid() {
      var wrap = document.getElementById("tl-grid");
      var cat = TL.categories.find(function (c) { return c.id === state.cat; }) || TL.categories[0];
      document.getElementById("cat-blurb").textContent = cat ? cat.blurb || "" : "";

      main.querySelectorAll(".cat-banner").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-cat") === state.cat);
      });

      var columns = (cat && cat.columns && cat.columns.length ? cat.columns : game.roles) || ["All"];
      var chars = gameChars(game.id).filter(filter.matches);

      var headRow = '<div class="tl-row tl-head-row"><div class="tl-tier-label tl-tier-blank"></div>' +
        columns.map(function (r, i) {
          return '<div class="tl-col-head tl-col-' + (i % 6) + '">' + esc(r) + "</div>";
        }).join("") + "</div>";

      var tierNames = (TL.tiers || []).concat(["?"]);
      var rows = tierNames.map(function (tn) {
        var empty = true;
        var cells = columns.map(function (column) {
          var inCell = chars.filter(function (c) {
            return cat && placements(c, cat.id, columns).some(function (p) {
              return p.col === column && p.tier === tn;
            });
          });
          if (inCell.length) empty = false;
          return '<div class="tl-cell">' + inCell.map(function (c) { return avatarCard(c, game); }).join("") + "</div>";
        });
        if (empty) return "";
        return '<div class="tl-row"><div class="tl-tier-label" data-clr="' + esc(tierColor(game, tn)) + '">' +
          esc(tn) + "</div>" + cells.join("") + "</div>";
      }).join("");

      wrap.innerHTML = headRow + (rows || '<p class="muted tl-empty">No characters match those filters.</p>');
      wrap.style.setProperty("--cols", String(columns.length || 1));
      wrap.classList.remove("fade-in"); void wrap.offsetWidth; wrap.classList.add("fade-in");
      filter.setCount(main, chars.length);
      paint(wrap);
      bindTooltips(wrap, game);
    }

    main.querySelectorAll(".cat-banner").forEach(function (b) {
      b.addEventListener("click", function () { state.cat = b.getAttribute("data-cat"); drawGrid(); });
    });
    filter.bind(main, drawGrid);
    drawGrid();
  }

  var tipEl = null;

  function bindTooltips(root, game) {
    if (!tipEl) {
      tipEl = document.createElement("div");
      tipEl.className = "char-tip";
      tipEl.setAttribute("role", "tooltip");
      document.body.appendChild(tipEl);
    }
    root.querySelectorAll(".tl-avatar").forEach(function (a) {
      a.addEventListener("mouseenter", function () { showTip(a, game); });
      a.addEventListener("mouseleave", hideTip);
      a.addEventListener("focus", function () { showTip(a, game); });
      a.addEventListener("blur", hideTip);
    });
  }

  function showTip(anchor, game) {
    var c = findCharacter(anchor.getAttribute("data-char"));
    if (!c) return;

    var cats = (game.tierlist && game.tierlist.categories) || [];
    var rows = cats.map(function (cat) {
      var cols = (cat.columns && cat.columns.length ? cat.columns : game.roles) || ["All"];
      return placements(c, cat.id, cols).map(function (p) {
        var label = esc(cat.name) + (p.col !== cols[0] || cols.length > 1 ? ' <span class="tip-col">' + esc(p.col) + "</span>" : "");
        return '<div class="tip-tier-row"><span>' + label + "</span>" +
          '<span class="tip-tier-badge" data-clr="' + esc(tierColor(game, p.tier)) + '">' + esc(p.tier) + "</span></div>";
      }).join("");
    }).join("");

    tipEl.innerHTML =
      '<div class="tip-name">' + esc(c.name) + "</div>" +
      '<div class="tip-chips">' +
        (c.rarity ? '<span class="tip-chip">★ ' + esc(String(c.rarity)) + "</span>" : "") +
        (c.element ? '<span class="tip-chip" data-clr="' + esc(elementColor(game, c.element)) + '">' + esc(c.element) + "</span>" : "") +
        '<span class="tip-chip">' + esc(c.role) + "</span>" +
      "</div>" + rows +
      '<div class="tip-hint">Click for full review ➔</div>';

    paint(tipEl);
    tipEl.classList.add("show");

    var r = anchor.getBoundingClientRect(), tw = 240;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), window.innerWidth - tw - 8);
    var y = r.bottom + 8;
    if (y + tipEl.offsetHeight > window.innerHeight - 8) y = r.top - tipEl.offsetHeight - 8;
    tipEl.style.left = x + "px";
    tipEl.style.top = Math.max(8, y) + "px";
  }

  function hideTip() { if (tipEl) tipEl.classList.remove("show"); }

  function renderRolesPage(main, game) {
    var data = ROLES[game.id];
    setTitle(game.name + " roles & effects");
    if (!data) return notFound(main, "Roles page", "game.html?id=" + encodeURIComponent(game.id), "Back to " + game.name);

    var keyChips = data.groups.map(function (grp) {
      return '<a class="role-key" href="#rg-' + esc(grp.id) + '" data-clr="' + esc(safeColor(grp.color) || "#8B93B8") + '">' +
        '<span class="el-dot" aria-hidden="true"></span>' + esc(grp.name) + "</a>";
    }).join("");

    var stackRules = (data.stacking || []).map(function (s) { return "<li>" + fmt(s) + "</li>"; }).join("");

    var groupsHTML = data.groups.map(function (grp) {
      var color = safeColor(grp.color) || "#8B93B8";
      var rows = grp.effects.map(function (ef) {
        var avatars = (ef.heroes || []).map(function (ref) {
          var c = resolveHero(ref);
          if (c) return avatarCard(c, game);
          return '<span class="tl-avatar role-ghost" data-name="' + esc(String(ref).toLowerCase()) + '">' +
            '<span class="tl-avatar-img"><span class="tl-avatar-ph">' + esc(String(ref)[0] || "?") + "</span></span>" +
            '<span class="tl-avatar-name">' + esc(String(ref)) + "</span></span>";
        }).join("");

        return '<div class="role-row' + (ef.duration ? " role-duration" : "") + '" data-clr="' + esc(color) + '">' +
          '<div class="role-label">' +
            '<span class="role-name">' + esc(ef.name) + "</span>" +
            '<span class="role-tags">' +
              (ef.scope ? '<span class="role-scope">' + esc(ef.scope) + "</span>" : "") +
              (ef.duration ? '<span class="role-dur" title="Duration-based effect">⏳ Duration</span>' : "") +
            "</span>" +
          "</div>" +
          '<div class="role-cell">' + avatars + "</div>" +
        "</div>";
      }).join("");

      return '<section class="role-group" id="rg-' + esc(grp.id) + '" data-clr="' + esc(color) + '">' +
        '<h2 class="role-group-head"><span class="role-square" aria-hidden="true"></span>' + esc(grp.name) +
          '<span class="role-count">' + esc(String(grp.effects.length)) + " effects</span></h2>" +
        '<div class="role-grid">' + rows + "</div>" +
      "</section>";
    }).join("");

    main.innerHTML =
      '<div class="page-pad page-wide">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Roles & Effects" }]) +
        "<h1>" + esc(game.name) + " roles &amp; effects</h1>" +
        '<p class="hero-sub">Updated ' + formatDate(data.updated || game.updated) + "</p>" +
        "<p>" + fmt(data.intro || "") + "</p>" +
        '<div class="role-key-panel">' +
          '<div class="role-key-legend">' +
            '<span class="role-legend-item"><span class="role-legend-swatch role-legend-perm" aria-hidden="true"></span>Colored label = <strong>permanent effect</strong></span>' +
            '<span class="role-legend-item"><span class="role-legend-swatch role-legend-dur" aria-hidden="true"></span>Dark label = <strong>duration-based</strong></span>' +
          "</div>" +
          "<ul>" + stackRules + "</ul>" +
          '<div class="role-key-row">' + keyChips + "</div>" +
        "</div>" +
        '<div class="tl-toolbar">' +
          '<input type="search" id="role-search" class="search-input" placeholder="Search heroes or effects..." maxlength="60" autocomplete="off">' +
        "</div>" +
        '<div id="role-groups" class="fade-in">' + groupsHTML + "</div>" +
        '<p class="muted role-footnote">Condensed from the community reference sheet\'s Roles tab - hover a portrait for tier placements, click for the full review.</p>' +
      "</div>";

    paint(main);
    bindTooltips(main, game);

    var input = document.getElementById("role-search");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      main.querySelectorAll(".role-group").forEach(function (grp) {
        var groupVisible = false;
        grp.querySelectorAll(".role-row").forEach(function (row) {
          var effectName = (row.querySelector(".role-name") || {}).textContent || "";
          var effectHit = !q || effectName.toLowerCase().indexOf(q) !== -1;
          var anyHero = false;
          row.querySelectorAll(".tl-avatar").forEach(function (a) {
            var name = (a.querySelector(".tl-avatar-name") || {}).textContent || "";
            var hit = !q || effectHit || name.toLowerCase().indexOf(q) !== -1;
            a.classList.toggle("role-hidden", !hit);
            if (hit) anyHero = true;
          });
          var show = !q || effectHit || anyHero;
          row.classList.toggle("role-hidden", !show);
          if (show) groupVisible = true;
        });
        grp.classList.toggle("role-hidden", !groupVisible);
      });
    });
  }

  function renderCharactersDB(main, game) {
    setTitle(game.name + " characters");
    var filter = makeFilterBar(game, "db");

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Characters" }]) +
        "<h1>" + esc(game.name) + " characters</h1>" +
        '<p class="hero-sub">Every playable character with reviews, ratings and builds.</p>' +
        filter.html +
        '<div id="db-grid" class="db-grid"></div>' +
      "</div>";

    function draw() {
      var grid = document.getElementById("db-grid");
      var list = gameChars(game.id).filter(filter.matches)
        .sort(function (a, b) { return (b.rarity - a.rarity) || a.name.localeCompare(b.name); });

      grid.innerHTML = list.map(function (c) {
        return '<a class="db-card ' + rarityClass(c.rarity) + '" href="character.html?id=' + encodeURIComponent(c.id) + '">' +
          (c.isNew ? '<span class="tl-new">NEW</span>' : "") +
          '<div class="db-portrait"' + imgset(portraitCands(c)) + ">" +
            '<span class="tl-avatar-ph">' + esc((c.name || "?")[0]) + "</span></div>" +
          '<div class="db-card-body">' + stars(c.rarity) +
            '<span class="db-name">' + esc(c.name) + "</span>" +
            '<span class="db-role">' +
              (c.element ? '<span class="el-dot" data-clr="' + esc(elementColor(game, c.element)) + '" aria-hidden="true"></span>' + esc(c.element) + " • " : "") +
              esc(c.role) + "</span>" +
          "</div></a>";
      }).join("") || '<p class="muted">No characters match those filters.</p>';

      grid.classList.remove("fade-in"); void grid.offsetWidth; grid.classList.add("fade-in");
      filter.setCount(main, list.length);
      paint(grid);
    }
    filter.bind(main, draw);
    paint(main);
    draw();
  }

  /* ================= builds ================= */
  var TIER_ORDER = ["New", "Legendary++", "Legendary+", "Legendary", "Collab"];

  function transNodeHTML(node) {
    var label = typeof node === "string" ? node : (node && node.t) || "";
    var up = node && node.up;
    return '<span class="build-node' + (up ? " build-node-up" : "") + '">' +
      (up ? '<span class="build-node-up-tag" aria-hidden="true">UP!</span>' : "") +
      '<span class="build-node-label">' + esc(label) + "</span></span>";
  }

  function gearCardHTML(gb) {
    var slots = (gb.slots || []).map(function (s) {
      return '<div class="gear-slot">' +
        '<span class="gear-slot-name">' + esc(s.slot || "") + "</span>" +
        '<span class="gear-slot-main">' + esc(s.main || "-") + "</span></div>";
    }).join("");
    var subs = (gb.substats || []).map(function (s, i) {
      return '<li><span class="gear-sub-rank">' + (i + 1) + "</span>" + esc(s) + "</li>";
    }).join("");
    return '<div class="gear-card">' +
      '<div class="gear-card-name">' + esc(gb.name || "Build") + "</div>" +
      (slots ? '<div class="gear-slots">' + slots + "</div>" : "") +
      (subs ? '<div class="gear-subs"><span class="gear-subs-label">Substat priority</span><ol>' + subs + "</ol></div>" : "") +
      (gb.set ? '<div class="gear-set">' + fmt(gb.set) + "</div>" : "") +
      (gb.notes ? '<p class="gear-notes"><strong>Notes:</strong> ' + fmt(gb.notes) + "</p>" : "") +
      "</div>";
  }

  function usageColHTML(label, items) {
    if (!items || !items.length) return "";
    return '<div class="usage-col"><span class="usage-label">' + esc(label) + "</span>" +
      '<div class="usage-chips">' + items.map(function (i) {
        return '<span class="usage-chip">' + esc(i) + "</span>";
      }).join("") + "</div></div>";
  }

  // Full build block for a hero — used on the Builds page and character pages.
  function buildBlockHTML(b, opts) {
    opts = opts || {};
    var chr = findCharacter(b.id);
    var nameHref = chr ? "character.html?id=" + encodeURIComponent(chr.id) : "";

    var header = opts.embedded ? "" :
      '<header class="build-head">' +
        '<div class="build-portrait db-portrait"' + (chr ? imgset(portraitCands(chr)) : "") + ">" +
          '<span class="tl-avatar-ph">' + esc((b.name || "?")[0]) + "</span></div>" +
        "<div>" +
          (nameHref ? '<a class="build-name" href="' + nameHref + '">' + esc(b.name) + "</a>"
                    : '<span class="build-name">' + esc(b.name) + "</span>") +
          '<div class="build-chips">' +
            (b.tier ? '<span class="build-tier">' + esc(b.tier) + "</span>" : "") +
            '<span class="build-type build-type-' + (b.type === "magic" ? "magic" : "attack") + '">' +
              (b.type === "magic" ? "Magic" : "Attack") + "</span>" +
            (b.properties || []).map(function (p) { return '<span class="build-prop">' + esc(p) + "</span>"; }).join("") +
          "</div>" +
        "</div>" +
      "</header>";

    var trans = (b.transcendence && b.transcendence.length)
      ? '<section class="build-sec"><h4 class="build-sec-head">Transcendence</h4><div class="build-trans">' +
          b.transcendence.map(transNodeHTML).join("") + "</div></section>" : "";

    var skills = (b.skillEnhancement && b.skillEnhancement.length)
      ? '<section class="build-sec"><h4 class="build-sec-head">Skill Enhancement</h4><ul class="build-skills">' +
          b.skillEnhancement.map(function (s) {
            return '<li class="' + (s.on ? "on" : "off") + '"><span class="build-skill-mark" aria-hidden="true">' +
              (s.on ? "✓" : "–") + "</span>" + esc(s.name) + "</li>";
          }).join("") + "</ul></section>" : "";

    var pots = (b.potentials && b.potentials.length)
      ? '<section class="build-sec"><h4 class="build-sec-head">Potentials</h4><div class="build-pots">' +
          b.potentials.map(function (p) {
            var on = p && p !== "-";
            return '<span class="build-pot' + (on ? " on" : "") + '">' + esc(p || "-") + "</span>";
          }).join("") + "</div></section>" : "";

    var gears = (b.gearBuilds && b.gearBuilds.length)
      ? '<section class="build-sec build-gears"><h4 class="build-sec-head">Gear Builds</h4>' +
          '<div class="gear-grid">' + b.gearBuilds.map(gearCardHTML).join("") + "</div></section>" : "";

    var ded = b.dedicatedEquipment
      ? '<section class="build-sec"><h4 class="build-sec-head">Dedicated Equipment</h4>' +
          '<div class="build-dedeq"><span class="dedeq-name">' + esc(b.dedicatedEquipment.name || "") + "</span>" +
          '<ul>' + (b.dedicatedEquipment.stats || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
          "</ul></div></section>" : "";

    var usage = (b.keyUsage && (b.keyUsage.PVE || b.keyUsage.PVP))
      ? '<section class="build-sec"><h4 class="build-sec-head">Key Usage</h4><div class="build-usage">' +
          usageColHTML("PVE", b.keyUsage.PVE) + usageColHTML("PVP", b.keyUsage.PVP) + "</div></section>" : "";

    var blurb = b.blurb
      ? '<section class="build-sec"><h4 class="build-sec-head">Overview</h4><p class="build-blurb">' + fmt(b.blurb) + "</p></section>" : "";

    return '<article class="build-block" id="build-' + esc(b.id || "") + '">' +
      header +
      '<div class="build-grid build-grid-top">' + trans + skills + pots + "</div>" +
      gears +
      '<div class="build-grid build-grid-bottom">' + ded + usage + blurb + "</div>" +
    "</article>";
  }

  function renderBuildsPage(main, game) {
    setTitle(game.name + " builds");
    var all = buildsForGame(game.id);
    var state = { type: BUILDS.some(function (b) { return b.type === "attack" && buildGameId(b) === game.id; }) ? "attack" : "magic" };

    var tabs = [
	  { id: "attack", name: "Attack Heroes" },
      { id: "magic", name: "Magic Heroes" },
      { id: "defense", name: "Defense Heroes" },
      { id: "support", name: "Support Heroes" },
      { id: "universal", name: "Universal Heroes" }
    ];
    var tabsHTML = tabs.map(function (t) {
      return '<button class="cat-banner" data-btab="' + t.id + '"><span>' + esc(t.name) + "</span></button>";
    }).join("");

    main.innerHTML =
      '<div class="page-pad page-wide">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Builds" }]) +
        "<h1>" + esc(game.name) + " recommended builds</h1>" +
        '<p class="hero-sub">Transcendence, skill enhancement, gear and key usage for each hero. Tap a hero name to open its full page.</p>' +
        '<div class="cat-row">' + tabsHTML + "</div>" +
        '<div id="builds-wrap" class="fade-in"></div>' +
      "</div>";

    function draw() {
      var wrap = document.getElementById("builds-wrap");
      main.querySelectorAll(".cat-banner").forEach(function (bn) {
        bn.classList.toggle("active", bn.getAttribute("data-btab") === state.type);
      });
      var list = all.filter(function (b) { return (b.type || "attack") === state.type; });
      var html = "";
      TIER_ORDER.forEach(function (tier) {
        var group = list.filter(function (b) { return (b.tier || "") === tier; });
        if (!group.length) return;
        html += '<h2 class="build-tier-head">' + esc(tier) + "</h2>" +
          group.map(function (b) { return buildBlockHTML(b); }).join("");
      });
      // any builds with an unrecognized/blank tier fall to the end
      var rest = list.filter(function (b) { return TIER_ORDER.indexOf(b.tier || "") === -1; });
      if (rest.length) html += rest.map(function (b) { return buildBlockHTML(b); }).join("");

      wrap.innerHTML = html || '<p class="muted">No builds here yet — add them in data/' + esc(game.id) + '/builds.js.</p>';
      wrap.classList.remove("fade-in"); void wrap.offsetWidth; wrap.classList.add("fade-in");
      paint(wrap);
    }

    main.querySelectorAll(".cat-banner").forEach(function (bn) {
      bn.addEventListener("click", function () { state.type = bn.getAttribute("data-btab"); draw(); });
    });
    paint(main);
    draw();
  }

  function ratingBar(label, value) {
    var v = Math.max(0, Math.min(10, parseFloat(value) || 0));
    return '<div class="rating"><span class="rating-label">' + esc(label) + "</span>" +
      '<span class="rating-track"><span class="rating-fill" data-w="' + (v * 10) + '"></span></span>' +
      '<span class="rating-num">' + (v ? esc(v.toFixed(1)) : "-") + "</span></div>";
  }

  function renderCharacterPage(main, c) {
    var game = findGame(c.game);
    setTitle(c.name);
    var r = c.ratings || {};

    var labels = (game && game.ratingLabels) || [
      { key: "overall", label: "Overall" }, { key: "story", label: "Story" },
      { key: "endgame", label: "Endgame" }, { key: "f2p", label: "F2P value" }
    ];
    var ratingsHTML = labels.map(function (l) { return ratingBar(l.label, r[l.key]); }).join("");

    var buildRows = Array.isArray(c.build) ? c.build : [];
    var buildHTML = buildRows.map(function (row) {
      return "<dt>" + esc(row.label) + "</dt><dd>" + fmt(row.value) + "</dd>";
    }).join("");

    var tierBadges = "";
    if (game && game.tierlist) {
      tierBadges = (game.tierlist.categories || []).map(function (cat) {
        var cols = (cat.columns && cat.columns.length ? cat.columns : game.roles) || ["All"];
        return placements(c, cat.id, cols).map(function (p) {
          return '<div class="tier-badge-block"><span class="tip-tier-badge" data-clr="' + esc(tierColor(game, p.tier)) + '">' +
            esc(p.tier) + '</span><span class="tier-badge-cat">' + esc(cat.name) +
            (cols.length > 1 ? " - " + esc(p.col) : "") + "</span></div>";
        }).join("");
      }).join("");
    }

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([
          { label: game ? game.name : "Games", href: game ? "game.html?id=" + encodeURIComponent(game.id) : "index.html" },
          { label: "Characters", href: game ? "characters.html?game=" + encodeURIComponent(game.id) : "index.html" },
          { label: c.name }
        ]) +
        '<section class="char-head ' + rarityClass(c.rarity) + '">' +
          '<div class="char-head-portrait db-portrait"' + imgset(portraitCands(c)) + ">" +
            '<span class="tl-avatar-ph">' + esc((c.name || "?")[0]) + "</span></div>" +
          '<div class="char-head-info">' +
            "<h1>" + esc(c.name) + "</h1>" +
            '<p class="char-title">' + esc(c.title || "") + "</p>" +
            '<p class="char-tags">' + stars(c.rarity) +
              (c.element ? ' <span class="tip-chip" data-clr="' + esc(game ? elementColor(game, c.element) : "") + '">' + esc(c.element) + "</span>" : "") +
              ' <span class="tip-chip">' + esc(c.role) + "</span></p>" +
            (tierBadges ? '<div class="tier-badge-row">' + tierBadges + "</div>" : "") +
          "</div>" +
        "</section>" +
        '<section class="section char-columns">' +
          "<div>" + sectionHead("Review") + "<p>" + fmt(c.summary || "") + "</p>" +
            sectionHead("Ratings") + ratingsHTML +
          "</div>" +
          "<div>" + sectionHead("Recommended build") +
            '<dl class="build-list">' + (buildHTML || "<dt>Build</dt><dd>TBD</dd>") + "</dl>" +
            '<div class="pros-cons">' +
              '<div class="pros"><h3>Pros</h3><ul>' + (c.pros || []).map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + "</ul></div>" +
              '<div class="cons"><h3>Cons</h3><ul>' + (c.cons || []).map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + "</ul></div>" +
            "</div>" +
          "</div>" +
        "</section>" +
        (findBuild(c.id) ? '<section class="section">' + sectionHead("Recommended Builds") +
          buildBlockHTML(findBuild(c.id), { embedded: true }) + "</section>" : "") +
      "</div>";

    paint(main);
    main.querySelectorAll(".rating-fill").forEach(function (el) {
      var w = parseFloat(el.getAttribute("data-w")) || 0;
      requestAnimationFrame(function () { el.style.width = Math.max(0, Math.min(100, w)) + "%"; });
    });
  }

  function renderGuidePage(main, g) {
    var href = safeHref(g.href);
    if (href) { window.location.replace(href); return; }

    var game = findGame(g.game);
    setTitle(g.title);

    var body = (g.blocks || []).map(function (block) {
      if (block.h2)   return sectionHead(block.h2);
      if (block.p)    return "<p>" + fmt(block.p) + "</p>";
      if (block.note) return '<aside class="note"><span class="note-head"><span aria-hidden="true">💡</span> Note</span><p>' + fmt(block.note) + "</p></aside>";
      if (block.tip)  return '<aside class="tip"><strong>Tip</strong> ' + fmt(block.tip) + "</aside>";
      if (Array.isArray(block.list)) {
        return "<ul>" + block.list.map(function (li) { return "<li>" + fmt(li) + "</li>"; }).join("") + "</ul>";
      }
      return "";
    }).join("");

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([
          { label: game ? game.name : "Guides", href: game ? "game.html?id=" + encodeURIComponent(game.id) : "guides.html" },
          { label: "Guides", href: game ? "game.html?id=" + encodeURIComponent(game.id) + "#guides" : "guides.html" },
          { label: g.title }
        ]) +
        '<article class="article">' +
          '<header class="article-head">' +
            '<div class="guide-thumb article-thumb"' + imgset(guideThumbCands(g)) + ">" +
              '<span aria-hidden="true">📖</span></div>' +
            "<div><h1>" + esc(g.title) + "</h1>" +
              '<p class="article-sub">' + esc(g.summary || "") + "</p>" +
              '<p class="article-meta">Last updated: <strong>' + formatDate(g.date) + "</strong> • " + esc(g.author || "Staff") + "</p></div>" +
          "</header>" +
          '<div class="article-body">' + body + "</div>" +
        "</article>" +
      "</div>";
    paint(main);
  }

  function renderGuidesIndex(main) {
    setTitle("Guides");
    var sections = GAMES.map(function (game) {
      var list = GUIDES.filter(function (g) { return g.game === game.id; });
      if (!list.length) return "";
      return sectionHead(game.name) + '<div class="guide-grid">' + list.map(guideCard).join("") + "</div>";
    }).join("");

    main.innerHTML = '<div class="page-pad"><h1>All guides</h1>' +
      '<p class="hero-sub">Every guide across every game we cover.</p>' +
      '<div class="section">' + (sections || '<p class="muted">No guides yet.</p>') + "</div></div>";
    paint(main);
  }

  function upcomingCard(u) {
    var color = safeColor(u.color) || "#7A96F0";
    var chips = (u.genres || []).map(function (g) {
      return '<span class="upg-chip">' + esc(g) + "</span>";
    }).join("") + (u.region ? '<span class="upg-chip upg-chip-region">' + esc(u.region) + "</span>" : "");
    var platforms = (u.platforms || []).map(function (p) {
      return '<span class="upg-plat">' + esc(p) + "</span>";
    }).join("");
    var website = (typeof u.website === "string" && /^https:\/\//i.test(u.website))
      ? '<div class="upg-meta-row"><span class="upg-meta-label">Website</span><a href="' + esc(u.website) + '" target="_blank" rel="noopener noreferrer">' + esc(u.website.replace(/^https:\/\//i, "").replace(/\/$/, "")) + "</a></div>"
      : "";
    var haystack = (u.name + " " + (u.genres || []).join(" ") + " " + (u.publisher || "")).toLowerCase();

    return (
      '<article class="upg-card" data-search="' + esc(haystack) + '">' +
        '<div class="upg-band" data-clr="' + esc(color) + '">' +
          '<h3 class="upg-name">' + esc(u.name) + "</h3>" +
          '<div class="upg-chips">' + chips + "</div>" +
        "</div>" +
        '<div class="upg-body">' +
          '<p class="upg-blurb">' + esc(u.blurb || "") + "</p>" +
          '<div class="upg-meta-row"><span class="upg-meta-label">Release date</span><strong class="' + (u.date ? "upg-date" : "upg-tba") + '">' + (u.date ? formatDate(u.date) : "Unknown") + "</strong></div>" +
          (platforms ? '<div class="upg-meta-row"><span class="upg-meta-label">Platforms</span><span class="upg-plats">' + platforms + "</span></div>" : "") +
          (u.publisher ? '<div class="upg-meta-row"><span class="upg-meta-label">Publisher</span><span>' + esc(u.publisher) + "</span></div>" : "") +
          website +
        "</div>" +
      "</article>"
    );
  }

  function renderUpcoming(main) {
    setTitle("Upcoming games");
    var dated = UPCOMING.filter(function (u) { return u.date; })
      .sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var tba = UPCOMING.filter(function (u) { return !u.date; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });

    main.innerHTML =
      '<div class="page-pad page-wide">' +
        '<div class="upg-head">' +
          "<h1>Upcoming Games Tracker</h1>" +
          '<p class="hero-sub">Track upcoming gacha and RPG releases - so you know what to look forward to.</p>' +
          '<input type="search" id="upg-search" class="search-input upg-search" placeholder="Search for a game..." maxlength="60" autocomplete="off">' +
        "</div>" +
        (dated.length ? '<section class="section">' + sectionHead("Release date announced") +
          '<div class="upg-grid">' + dated.map(upcomingCard).join("") + "</div></section>" : "") +
        (tba.length ? '<section class="section">' + sectionHead("Games without a release date") +
          '<div class="upg-grid">' + tba.map(upcomingCard).join("") + "</div></section>" : "") +
        (!UPCOMING.length ? '<p class="muted">Nothing announced yet - add entries in data/games.js.</p>' : "") +
      "</div>";
    paint(main);

    var input = document.getElementById("upg-search");
    if (input) input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      main.querySelectorAll(".upg-card").forEach(function (card) {
        card.classList.toggle("role-hidden", !!q && (card.getAttribute("data-search") || "").indexOf(q) === -1);
      });
      main.querySelectorAll(".section").forEach(function (sec) {
        var any = sec.querySelector(".upg-card:not(.role-hidden)");
        sec.classList.toggle("role-hidden", !any);
      });
    });
  }

  function renderTeamBuilder(main, game) {
    var data = TEAMS[game.id];
    setTitle(game.name + " team builder");
    if (!data) return notFound(main, "Team builder", "game.html?id=" + encodeURIComponent(game.id), "Back to " + game.name);

    var slots = data.slots || 5;
    var team = new Array(slots).fill(null);
    var activeSlot = -1;
    var filter = makeFilterBar(game, "tb");

    param("t").split(",").filter(Boolean).slice(0, slots).forEach(function (id, i) {
      var c = findCharacter(id);
      if (c && c.game === game.id && team.indexOf(id) === -1) team[i] = id;
    });

    var presetsHTML = (data.presets || []).map(function (p, i) {
      var minis = p.heroes.map(function (id) {
        var c = findCharacter(id);
        if (!c) return "";
        return '<span class="preset-mini ' + rarityClass(c.rarity) + '" title="' + esc(c.name) + '"' +
          imgset(portraitCands(c)) + "><span class=\"preset-mini-ph\">" + esc(c.name[0]) + "</span></span>";
      }).join("");

      return '<button class="preset-card" data-preset="' + i + '">' +
        '<span class="preset-name">' + esc(p.name) + "</span>" +
        '<span class="preset-minis">' + minis + "</span>" +
        '<span class="preset-desc">' + esc(p.desc || "") + "</span>" +
        '<span class="preset-load">Load team ➔</span>' +
      "</button>";
    }).join("");

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Team Builder" }]) +
        "<h1>" + esc(game.name) + " team builder</h1>" +
        '<p class="hero-sub">' + esc(data.intro || "") + "</p>" +
        '<section class="section">' + sectionHead("Your Team") +
          '<div class="tb-actions">' +
            '<button class="tb-btn tb-btn-accent" id="tb-copy">Copy URL</button>' +
            '<button class="tb-btn" id="tb-clear">Reset Team</button>' +
            '<span class="tb-copied" id="tb-copied" aria-live="polite"></span>' +
          "</div>" +
          '<div class="tb-slots" id="tb-slots"></div>' +
          '<div class="tb-analysis" id="tb-analysis"></div>' +
        "</section>" +
        '<section class="section">' + sectionHead("Suggested Presets") +
          '<div class="preset-grid">' + presetsHTML + "</div>" +
        "</section>" +
        '<div class="modal-overlay" id="tb-modal" hidden>' +
          '<div class="modal" role="dialog" aria-modal="true" aria-label="Select character">' +
            '<div class="modal-head"><h2>Select Character</h2>' +
              '<button class="modal-close" id="tb-modal-close" aria-label="Close">✕</button></div>' +
            filter.html +
            '<div class="modal-grid" id="tb-modal-grid"></div>' +
          "</div>" +
        "</div>" +
      "</div>";
    paint(main);

    var modal = document.getElementById("tb-modal");

    function member(i) { return team[i] ? findCharacter(team[i]) : null; }
    function members() { return team.filter(Boolean).map(findCharacter).filter(Boolean); }

    function syncUrl() {
      var ids = team.filter(Boolean);
      var qs = "?id=" + encodeURIComponent(game.id) + (ids.length ? "&t=" + ids.join(",") : "");
      routeParams = new URLSearchParams(qs);
      try { history.replaceState({ url: "teambuilder.html" + qs }, "", "teambuilder.html" + qs); } catch (e) {}
    }

    function evaluateTeam() {
      var ms = members();
      var ids = ms.map(function (c) { return c.id; });
      var out = [];

      (data.rules || []).forEach(function (r) {
        if (r.if) {
          if (ids.indexOf(r.if) === -1) return;
          if (r.need) {
            var pool = r.need.excludeSelf ? ms.filter(function (c) { return c.id !== r.if; }) : ms;
            var n = pool.filter(function (c) { return c.element === r.need.element; }).length;
            if (n < r.need.min) out.push({ level: r.level, msg: String(r.msg).split("{n}").join(String(n)) });
          } else {
            out.push({ level: r.level, msg: r.msg });
          }
        } else if (r.missingRole) {
          if (ms.length >= 3 && !ms.some(function (c) { return c.role === r.missingRole; })) {
            out.push({ level: r.level, msg: r.msg });
          }
        } else if (r.combo) {
          var hits = r.combo.filter(function (id) { return ids.indexOf(id) !== -1; }).length;
          if (hits >= (r.min || r.combo.length)) out.push({ level: r.level, msg: r.msg });
        }
      });

      var order = { warn: 0, good: 1, tip: 2, info: 3 };
      out.sort(function (a, b) { return (order[a.level] || 9) - (order[b.level] || 9); });
      return out;
    }

    function drawSlots() {
      var wrap = document.getElementById("tb-slots");
      wrap.innerHTML = team.map(function (id, i) {
        var c = member(i);
        if (!c) {
          return '<button class="tb-slot tb-slot-empty" data-slot="' + i + '">' +
            '<span class="tb-plus" aria-hidden="true">+</span>Select Character</button>';
        }
        return '<div class="tb-slot tb-slot-filled ' + rarityClass(c.rarity) + '" data-slot="' + i + '" data-clr="' + esc(elementColor(game, c.element)) + '" role="button" tabindex="0">' +
          '<button class="tb-remove" data-remove="' + i + '" aria-label="Remove ' + esc(c.name) + '">✕</button>' +
          '<span class="tb-portrait"' + imgset(portraitCands(c)) + "><span class=\"tl-avatar-ph\">" + esc(c.name[0]) + "</span></span>" +
          '<span class="tb-slot-name">' + esc(c.name) + "</span>" +
          '<span class="tb-slot-sub"><span class="el-dot" aria-hidden="true"></span>' + esc(c.element || "") + " • " + esc(c.role) + "</span>" +
        "</div>";
      }).join("");
      paint(wrap);

      wrap.querySelectorAll("[data-slot]").forEach(function (el) {
        el.addEventListener("click", function (e) {
          if (e.target.closest("[data-remove]")) return;
          openModal(parseInt(el.getAttribute("data-slot"), 10));
        });
      });
      wrap.querySelectorAll("[data-remove]").forEach(function (b) {
        b.addEventListener("click", function () {
          team[parseInt(b.getAttribute("data-remove"), 10)] = null;
          syncUrl(); drawSlots(); drawAnalysis();
        });
      });
    }

    function drawAnalysis() {
      var wrap = document.getElementById("tb-analysis");
      var ms = members();
      if (!ms.length) {
        wrap.innerHTML = '<p class="muted tb-empty-hint">Pick heroes - or load a preset below - to see live synergy analysis.</p>';
        return;
      }

      var elCounts = {}, roleCounts = {};
      ms.forEach(function (c) {
        if (c.element) elCounts[c.element] = (elCounts[c.element] || 0) + 1;
        roleCounts[c.role] = (roleCounts[c.role] || 0) + 1;
      });

      var comp = Object.keys(elCounts).map(function (el) {
        return '<span class="tip-chip" data-clr="' + esc(elementColor(game, el)) + '">' + esc(el) + " × " + elCounts[el] + "</span>";
      }).join(" ") + " " + Object.keys(roleCounts).map(function (r) {
        return '<span class="tip-chip">' + esc(r) + " × " + roleCounts[r] + "</span>";
      }).join(" ");

      var icons = { warn: "⚠️", good: "✨", tip: "💡", info: "ℹ️" };
      var msgs = evaluateTeam().map(function (m) {
        return '<div class="tb-msg tb-msg-' + esc(m.level) + '"><span class="tb-msg-ico" aria-hidden="true">' +
          (icons[m.level] || "•") + "</span><span>" + fmt(m.msg) + "</span></div>";
      }).join("");

      wrap.innerHTML =
        '<div class="tb-comp">' + comp + "</div>" +
        (msgs || '<div class="tb-msg tb-msg-good"><span class="tb-msg-ico" aria-hidden="true">✨</span><span>No conflicts detected - looks coherent.</span></div>');
      paint(wrap);
    }

    function drawModalGrid() {
      var grid = document.getElementById("tb-modal-grid");
      var taken = team.filter(Boolean);
      var list = gameChars(game.id).filter(filter.matches)
        .filter(function (c) { return taken.indexOf(c.id) === -1; })
        .sort(function (a, b) { return (b.rarity - a.rarity) || a.name.localeCompare(b.name); });

      grid.innerHTML = list.map(function (c) {
        return '<button class="modal-card ' + rarityClass(c.rarity) + '" data-pick="' + esc(c.id) + '" data-clr="' + esc(elementColor(game, c.element)) + '">' +
          '<span class="tb-portrait"' + imgset(portraitCands(c)) + "><span class=\"tl-avatar-ph\">" + esc(c.name[0]) + "</span></span>" +
          '<span class="modal-card-name">' + esc(c.name) + "</span>" +
          '<span class="tb-slot-sub"><span class="el-dot" aria-hidden="true"></span>' + esc(c.element || "") + "</span>" +
        "</button>";
      }).join("") || '<p class="muted">No characters match those filters.</p>';
      paint(grid);
    }

    function openModal(i) {
      activeSlot = i;
      drawModalGrid();
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add("open"); });
      var s = modal.querySelector(".search-input");
      if (s) s.focus();
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
      window.setTimeout(function () { modal.hidden = true; }, 180);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
      var pick = e.target.closest("[data-pick]");
      if (pick && activeSlot >= 0) {
        team[activeSlot] = pick.getAttribute("data-pick");
        syncUrl(); closeModal(); drawSlots(); drawAnalysis();
      }
    });

    document.getElementById("tb-modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", function esc_(e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
      if (!document.body.contains(modal)) document.removeEventListener("keydown", esc_);
    });

    filter.bind(modal, drawModalGrid);

    document.getElementById("tb-clear").addEventListener("click", function () {
      team = new Array(slots).fill(null);
      syncUrl(); drawSlots(); drawAnalysis();
    });

    document.getElementById("tb-copy").addEventListener("click", function () {
      var note = document.getElementById("tb-copied");
      var url = window.location.href;
      function done() { note.textContent = "Copied!"; window.setTimeout(function () { note.textContent = ""; }, 2000); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { note.textContent = url; });
      } else { note.textContent = url; }
    });

    main.querySelectorAll("[data-preset]").forEach(function (card) {
      card.addEventListener("click", function () {
        var p = (data.presets || [])[parseInt(card.getAttribute("data-preset"), 10)];
        if (!p) return;
        team = new Array(slots).fill(null);
        p.heroes.slice(0, slots).forEach(function (id, i) {
          if (findCharacter(id)) team[i] = id;
        });
        syncUrl(); drawSlots(); drawAnalysis();
        document.getElementById("tb-slots").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    drawSlots();
    drawAnalysis();
  }

  function renderEventsPage(main, game) {
    var data = EVENTS[game.id];
    setTitle(game.name + " events & bosses");
    if (!data || !data.tabs || !data.tabs.length) return notFound(main, "Events", "game.html?id=" + encodeURIComponent(game.id), "Back to " + game.name);

    var state = { tab: data.tabs[0].id };

    var tabsHTML = data.tabs.map(function(t) {
      return '<button class="cat-banner" data-tab="' + esc(t.id) + '"><span>' + esc(t.name) + '</span></button>';
    }).join("");

    main.innerHTML =
      '<div class="page-pad">' +
        crumbs([{ label: game.name, href: "game.html?id=" + encodeURIComponent(game.id) }, { label: "Events & Bosses" }]) +
        "<h1>" + esc(game.name) + " events &amp; boss guides</h1>" +
        '<p class="hero-sub">' + esc(data.intro || "") + "</p>" +
        '<div class="cat-row">' + tabsHTML + "</div>" +
        '<div id="event-wrap" class="fade-in"></div>' +
      "</div>";

    function drawTab() {
      var wrap = document.getElementById("event-wrap");
      var tabData = data.tabs.find(function(t) { return t.id === state.tab; }) || data.tabs[0];

      main.querySelectorAll(".cat-banner").forEach(function(b) {
        b.classList.toggle("active", b.getAttribute("data-tab") === state.tab);
      });

      var reqsHTML = (tabData.requirements || []).map(function(r) {
        return '<span class="event-req-chip"><span class="el-dot" aria-hidden="true"></span>' + esc(r) + '</span>';
      }).join("");

      var teamsHTML = (tabData.teams || []).map(function(tm) {
        var heroesHTML = tm.heroes.map(function(ref) {
          if (!ref) return '<div class="event-empty-slot"></div>';
          var c = resolveHero(ref);
          if (c) return avatarCard(c, game);
          return '<span class="tl-avatar role-ghost"><span class="tl-avatar-img"><span class="tl-avatar-ph">?</span></span><span class="tl-avatar-name">' + esc(ref) + '</span></span>';
        }).join("");

        return '<div class="event-team-card">' +
          '<div class="event-team-head">' +
            '<h3>' + esc(tm.name) + '</h3>' +
            (tm.desc ? '<span class="event-team-desc">' + esc(tm.desc) + '</span>' : '') +
          '</div>' +
          '<div class="event-team-roster">' + heroesHTML + '</div>' +
        '</div>';
      }).join("");

      wrap.innerHTML =
        '<div class="event-content">' +
          (tabData.blurb ? '<p class="event-blurb">' + fmt(tabData.blurb) + '</p>' : '') +
          (reqsHTML ? '<div class="event-reqs">' + reqsHTML + '</div>' : '') +
          '<div class="event-teams-grid">' + teamsHTML + '</div>' +
          (tabData.notes ? '<aside class="note event-note"><p>' + fmt(tabData.notes) + '</p></aside>' : '') +
        '</div>';

      wrap.classList.remove("fade-in");
      void wrap.offsetWidth;
      wrap.classList.add("fade-in");
      paint(wrap);
      bindTooltips(wrap, game);
    }

    main.querySelectorAll(".cat-banner").forEach(function(b) {
      b.addEventListener("click", function() {
        state.tab = b.getAttribute("data-tab");
        drawTab();
      });
    });

    paint(main);
    drawTab();
  }

  function notFound(main, what, backHref, backLabel) {
    setTitle(what + " not found");
    main.innerHTML = '<div class="page-pad"><h1>' + esc(what) + " not found</h1>" +
      '<p class="muted">That ' + esc(what.toLowerCase()) + " isn't in the site data. " +
      '<a href="' + esc(backHref) + '">' + esc(backLabel) + "</a>.</p></div>";
  }

  /* ================= boot & dynamic loader ================= */
  function bootApp() {
    CHARS = window.GG_CHARACTERS || [];
    GUIDES = window.GG_GUIDES || [];
    ROLES = window.GG_ROLES || {};
    TEAMS = window.GG_TEAMS || {};
    EVENTS = window.GG_EVENTS || {};
    BUILDS = window.GG_BUILDS || [];

    applyTheme();
    // Interface language: set <html lang>, start the live translator, so all
    // rendered chrome/pages get translated as they mount.
    if (window.LD_I18N) {
      try { document.documentElement.lang = window.LD_I18N.localeTag(); } catch (e) {}
      window.LD_I18N.start();
    }
    mountBackground();
    renderFooter();
    try { if (localStorage.getItem("pp-sidebar-collapsed") === "1") document.body.classList.add("sidebar-collapsed"); } catch (e) {}
    initRouter();
    initScrollExtras();
    renderRoute(window.location.href, { keepScroll: true });
    // Safety net: translate anything already present that the observer may
    // have missed during initial synchronous render.
    if (window.LD_I18N) window.LD_I18N.translate(document.body);
    initServiceWorker();
  }

  /* ================= PWA: offline cache + update prompt ================= */
  var swPrompt = null;
  function showUpdatePrompt(worker) {
    if (swPrompt || !worker) return;
    swPrompt = document.createElement("div");
    swPrompt.className = "sw-pop";
    swPrompt.setAttribute("role", "dialog");
    swPrompt.innerHTML =
      '<span class="sw-pop-text">A new version is available</span>' +
      '<div class="sw-pop-actions">' +
        '<button class="ct-btn ct-btn-accent" data-sw="update">Update</button>' +
        '<button class="ct-x" data-sw="close" aria-label="close">✕</button>' +
      "</div>";
    document.body.appendChild(swPrompt);
    if (window.LD_I18N) window.LD_I18N.translate(swPrompt);
    requestAnimationFrame(function () { swPrompt.classList.add("show"); });
    swPrompt.querySelector('[data-sw="update"]').addEventListener("click", function () {
      swPrompt.classList.add("busy");
      worker.postMessage({ type: "SKIP_WAITING" });
    });
    swPrompt.querySelector('[data-sw="close"]').addEventListener("click", function () {
      swPrompt.classList.remove("show");
    });
  }

  function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    // file:// and other non-secure contexts can't host a service worker.
    if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;

    navigator.serviceWorker.register("sw.js").then(function (reg) {
      // A worker may already be waiting (updated in another tab).
      if (reg.waiting && navigator.serviceWorker.controller) showUpdatePrompt(reg.waiting);
      reg.addEventListener("updatefound", function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener("statechange", function () {
          // Installed + an existing controller ⇒ this is an UPDATE, not first install.
          if (nw.state === "installed" && navigator.serviceWorker.controller) showUpdatePrompt(nw);
        });
      });
      try { reg.update(); } catch (e) {}
      // Re-check for a new version periodically during long sessions.
      window.setInterval(function () { try { reg.update(); } catch (e) {} }, 60 * 60 * 1000);
    }).catch(function () {});

    var reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var scriptsToLoad = [];

    GAMES.forEach(function (g) {
      var path = "data/" + g.id + "/";
      scriptsToLoad.push(path + "characters.js");
      scriptsToLoad.push(path + "guides.js");
      scriptsToLoad.push(path + "roles.js");
      scriptsToLoad.push(path + "teams.js");
      scriptsToLoad.push(path + "events.js");
      scriptsToLoad.push(path + "builds.js");
    });

    if (scriptsToLoad.length === 0) return bootApp();

    var loaded = 0;
    scriptsToLoad.forEach(function (src) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = s.onerror = function () {
        loaded++;
        if (loaded === scriptsToLoad.length) bootApp();
      };
      document.body.appendChild(s);
    });
  });
})();