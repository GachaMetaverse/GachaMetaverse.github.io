/* ============================================================
   APP.JS — site renderer.
   You should not need to edit this file to customize the site;
   use js/config.js and the files in data/ instead.

   SECURITY MODEL (read before modifying):
   1. Every piece of data is passed through esc() before it
      touches the page. Never concatenate raw data into HTML.
   2. URL parameters (?game=..., ?id=...) are never rendered.
      They are only compared against ids that exist in the data
      files. Unknown ids show a "not found" message.
   3. Guide content is block-based (no HTML allowed in data),
      so guide text cannot inject scripts.
   4. Image URLs are restricted to local paths ("assets/...")
      or https:// URLs. Anything else is dropped.
   ============================================================ */

(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var GAMES = window.GG_GAMES || [];
  var CHARS = window.GG_CHARACTERS || [];
  var GUIDES = window.GG_GUIDES || [];

  /* ---------- helpers ---------- */

  // Escape text for safe insertion into HTML.
  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Only allow local asset paths or https URLs for images.
  function safeImg(url) {
    if (typeof url !== "string" || url === "") return "";
    if (/^assets\/[\w\-./]+$/i.test(url)) return url;
    if (/^https:\/\//i.test(url)) return url;
    return "";
  }

  // Read a URL query parameter (returned value is ONLY used
  // for lookups, never rendered directly).
  function param(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  function findGame(id)      { return GAMES.find(function (g) { return g.id === id; }); }
  function findCharacter(id) { return CHARS.find(function (c) { return c.id === id; }); }
  function findGuide(id)     { return GUIDES.find(function (g) { return g.id === id; }); }

  function stars(rarity) {
    var n = Math.max(1, Math.min(5, parseInt(rarity, 10) || 3));
    return "★".repeat(n);
  }

  function rarityClass(rarity) {
    var n = parseInt(rarity, 10);
    if (n >= 5) return "r5";
    if (n === 4) return "r4";
    return "r3";
  }

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return esc(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  /* ---------- shared chrome (nav + footer) ---------- */

  function applyThemeOverrides() {
    var c = CFG.colors || {};
    var root = document.documentElement;
    var map = { accent: "--accent", background: "--bg", panel: "--panel", text: "--text" };
    Object.keys(map).forEach(function (key) {
      var val = c[key];
      // Only accept hex colors — prevents CSS injection via config typos.
      if (typeof val === "string" && /^#[0-9a-f]{3,8}$/i.test(val)) {
        root.style.setProperty(map[key], val);
      }
    });
  }

  function renderNav() {
    var el = document.getElementById("site-nav");
    if (!el) return;
    var links = (CFG.nav || []).map(function (item) {
      return '<a href="' + esc(item.url) + '">' + esc(item.label) + "</a>";
    });
    GAMES.forEach(function (g) {
      links.push('<a href="game.html?id=' + encodeURIComponent(g.id) + '">' + esc(g.shortName || g.name) + "</a>");
    });
    el.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html"><span class="brand-mark">' + esc((CFG.siteName || "G")[0]) + "</span>" + esc(CFG.siteName || "Guides") + "</a>" +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>' +
        '<div class="nav-links" id="nav-links">' + links.join("") + "</div>" +
      "</div>";

    var toggle = document.getElementById("nav-toggle");
    var linksEl = document.getElementById("nav-links");
    toggle.addEventListener("click", function () {
      var open = linksEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var socials = [];
    var s = CFG.social || {};
    ["discord", "twitter", "youtube"].forEach(function (k) {
      if (typeof s[k] === "string" && /^https:\/\//i.test(s[k])) {
        socials.push('<a href="' + esc(s[k]) + '" rel="noopener noreferrer" target="_blank">' + esc(k) + "</a>");
      }
    });
    el.innerHTML =
      '<div class="footer-inner">' +
        "<p>" + esc(CFG.footerText || "") + "</p>" +
        (socials.length ? '<p class="footer-social">' + socials.join(" · ") + "</p>" : "") +
      "</div>";
  }

  function setTitle(pageTitle) {
    document.title = pageTitle ? pageTitle + " — " + (CFG.siteName || "Guides") : (CFG.siteName || "Guides");
  }

  /* ---------- reusable pieces ---------- */

  function characterCard(c) {
    var img = safeImg(c.portrait);
    var portrait = img
      ? '<img class="card-portrait" src="' + esc(img) + '" alt="" loading="lazy">'
      : '<div class="card-portrait card-portrait-empty" aria-hidden="true">' + esc((c.name || "?")[0]) + "</div>";
    return (
      '<a class="char-card ' + rarityClass(c.rarity) + '" href="character.html?id=' + encodeURIComponent(c.id) + '">' +
        '<div class="card-strip"></div>' +
        portrait +
        '<div class="card-body">' +
          '<span class="card-stars">' + stars(c.rarity) + "</span>" +
          '<span class="card-name">' + esc(c.name) + "</span>" +
          '<span class="card-role">' + esc(c.element) + " · " + esc(c.role) + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  function guideRow(g) {
    var game = findGame(g.game);
    return (
      '<a class="guide-row" href="guide.html?id=' + encodeURIComponent(g.id) + '">' +
        '<div class="guide-row-main">' +
          '<span class="guide-game-tag">' + esc(game ? game.shortName || game.name : "General") + "</span>" +
          '<span class="guide-title">' + esc(g.title) + "</span>" +
          '<span class="guide-summary">' + esc(g.summary) + "</span>" +
        "</div>" +
        '<span class="guide-date">' + formatDate(g.date) + "</span>" +
      "</a>"
    );
  }

  /* ---------- pages ---------- */

  function renderHome(main) {
    setTitle("");
    var home = CFG.home || {};
    var banners = GAMES.map(function (g) {
      var img = safeImg(g.banner);
      return (
        '<a class="game-banner" href="game.html?id=' + encodeURIComponent(g.id) + '">' +
          (img ? '<img class="game-banner-img" src="' + esc(img) + '" alt="" loading="lazy">' : "") +
          '<div class="game-banner-text">' +
            '<span class="game-banner-patch">Patch ' + esc(g.patch) + "</span>" +
            "<h3>" + esc(g.name) + "</h3>" +
            "<p>" + esc(g.description) + "</p>" +
            '<span class="game-banner-cta">View tier list →</span>' +
          "</div>" +
        "</a>"
      );
    }).join("");

    var recent = GUIDES.slice()
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); })
      .slice(0, home.featuredGuides || 3)
      .map(guideRow).join("");

    main.innerHTML =
      '<section class="hero">' +
        '<p class="hero-eyebrow">' + esc(CFG.tagline || "") + "</p>" +
        "<h1>" + esc(home.heroTitle || "Guides") + "</h1>" +
        '<p class="hero-sub">' + esc(home.heroSubtitle || "") + "</p>" +
      "</section>" +
      '<section class="section"><h2 class="section-title">Games</h2>' +
        '<div class="banner-grid">' + banners + "</div></section>" +
      '<section class="section"><h2 class="section-title">Latest guides</h2>' +
        '<div class="guide-list">' + (recent || "<p class='muted'>No guides yet — add one in data/guides.js.</p>") + "</div></section>";
  }

  function renderGamePage(main) {
    var game = findGame(param("id"));
    if (!game) {
      setTitle("Game not found");
      main.innerHTML = '<section class="section"><h1>Game not found</h1><p class="muted">That game isn\u2019t in the site data. <a href="index.html">Back to home</a>.</p></section>';
      return;
    }
    setTitle(game.name);

    var tierRows = (game.tiers || []).map(function (t) {
      var cards = (t.characters || [])
        .map(findCharacter)
        .filter(Boolean)
        .map(characterCard)
        .join("");
      return (
        '<div class="tier-row tier-' + esc(String(t.rank).toLowerCase()) + '">' +
          '<div class="tier-label"><span class="tier-rank">' + esc(t.rank) + "</span>" +
            '<span class="tier-blurb">' + esc(t.blurb || "") + "</span></div>" +
          '<div class="tier-cards">' + (cards || '<p class="muted">No characters ranked yet.</p>') + "</div>" +
        "</div>"
      );
    }).join("");

    var gameGuides = GUIDES.filter(function (g) { return g.game === game.id; }).map(guideRow).join("");

    main.innerHTML =
      '<section class="page-head">' +
        '<p class="hero-eyebrow">Patch ' + esc(game.patch) + " · Updated " + formatDate(game.updated) + "</p>" +
        "<h1>" + esc(game.name) + "</h1>" +
        '<p class="hero-sub">' + esc(game.description) + "</p>" +
      "</section>" +
      '<section class="section"><h2 class="section-title">Tier list</h2>' + tierRows + "</section>" +
      (gameGuides
        ? '<section class="section"><h2 class="section-title">Guides for ' + esc(game.shortName || game.name) + "</h2>" +
          '<div class="guide-list">' + gameGuides + "</div></section>"
        : "");
  }

  function ratingBar(label, value) {
    var v = Math.max(0, Math.min(10, parseFloat(value) || 0));
    return (
      '<div class="rating">' +
        '<span class="rating-label">' + esc(label) + "</span>" +
        '<span class="rating-track"><span class="rating-fill" data-w="' + (v * 10) + '"></span></span>' +
        '<span class="rating-num">' + esc(v.toFixed(1)) + "</span>" +
      "</div>"
    );
  }

  function renderCharacterPage(main) {
    var c = findCharacter(param("id"));
    if (!c) {
      setTitle("Character not found");
      main.innerHTML = '<section class="section"><h1>Character not found</h1><p class="muted">That character isn\u2019t in the site data. <a href="index.html">Back to home</a>.</p></section>';
      return;
    }
    setTitle(c.name);
    var game = findGame(c.game);
    var img = safeImg(c.portrait);
    var r = c.ratings || {};
    var b = c.build || {};

    main.innerHTML =
      '<section class="char-head ' + rarityClass(c.rarity) + '">' +
        (img
          ? '<img class="char-head-portrait" src="' + esc(img) + '" alt="' + esc(c.name) + '">'
          : '<div class="char-head-portrait card-portrait-empty">' + esc((c.name || "?")[0]) + "</div>") +
        '<div class="char-head-info">' +
          '<p class="hero-eyebrow">' + (game ? '<a href="game.html?id=' + encodeURIComponent(game.id) + '">' + esc(game.name) + "</a>" : "") + "</p>" +
          "<h1>" + esc(c.name) + '</h1>' +
          '<p class="char-title">' + esc(c.title || "") + "</p>" +
          '<p class="char-tags"><span class="card-stars">' + stars(c.rarity) + "</span> " + esc(c.element) + " · " + esc(c.role) + "</p>" +
        "</div>" +
      "</section>" +
      '<section class="section char-columns">' +
        '<div class="char-col">' +
          '<h2 class="section-title">Overview</h2><p>' + esc(c.summary || "") + "</p>" +
          '<h2 class="section-title">Ratings</h2>' +
          ratingBar("Overall", r.overall) + ratingBar("Story", r.story) +
          ratingBar("Endgame", r.endgame) + ratingBar("F2P value", r.f2p) +
        "</div>" +
        '<div class="char-col">' +
          '<h2 class="section-title">Recommended build</h2>' +
          '<dl class="build-list">' +
            "<dt>Weapon</dt><dd>" + esc(b.weapon || "—") + "</dd>" +
            "<dt>Gear</dt><dd>" + esc(b.gear || "—") + "</dd>" +
            "<dt>Substats</dt><dd>" + esc(b.substats || "—") + "</dd>" +
            "<dt>Teams</dt><dd>" + esc(b.teams || "—") + "</dd>" +
          "</dl>" +
          '<div class="pros-cons">' +
            '<div class="pros"><h3>Pros</h3><ul>' + (c.pros || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div>" +
            '<div class="cons"><h3>Cons</h3><ul>' + (c.cons || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div>" +
          "</div>" +
        "</div>" +
      "</section>";

    // Animate rating bars (width set via JS, not inline HTML styles).
    Array.prototype.forEach.call(main.querySelectorAll(".rating-fill"), function (el) {
      var w = parseFloat(el.getAttribute("data-w")) || 0;
      requestAnimationFrame(function () { el.style.width = Math.max(0, Math.min(100, w)) + "%"; });
    });
  }

  function renderGuidesPage(main) {
    setTitle("Guides");
    var q = "";
    var sorted = GUIDES.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

    function listHTML(filter) {
      var rows = sorted.filter(function (g) {
        if (!filter) return true;
        var hay = (g.title + " " + g.summary).toLowerCase();
        return hay.indexOf(filter.toLowerCase()) !== -1;
      }).map(guideRow).join("");
      return rows || '<p class="muted">No guides match that search.</p>';
    }

    main.innerHTML =
      '<section class="page-head"><h1>Guides</h1>' +
        '<input type="search" id="guide-search" class="search-input" placeholder="Search guides…" maxlength="80" autocomplete="off">' +
      "</section>" +
      '<section class="section"><div class="guide-list" id="guide-results">' + listHTML(q) + "</div></section>";

    var input = document.getElementById("guide-search");
    var results = document.getElementById("guide-results");
    input.addEventListener("input", function () {
      // Search text is only compared, never rendered — safe by design.
      results.innerHTML = listHTML(input.value);
    });
  }

  function renderGuidePage(main) {
    var g = findGuide(param("id"));
    if (!g) {
      setTitle("Guide not found");
      main.innerHTML = '<section class="section"><h1>Guide not found</h1><p class="muted">That guide isn\u2019t in the site data. <a href="guides.html">All guides</a>.</p></section>';
      return;
    }
    setTitle(g.title);
    var game = findGame(g.game);

    var body = (g.blocks || []).map(function (block) {
      if (block.h2)  return "<h2>" + esc(block.h2) + "</h2>";
      if (block.p)   return "<p>" + esc(block.p) + "</p>";
      if (block.tip) return '<aside class="tip"><strong>Tip</strong> ' + esc(block.tip) + "</aside>";
      if (Array.isArray(block.list)) {
        return "<ul>" + block.list.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
      }
      return "";
    }).join("");

    main.innerHTML =
      '<article class="article">' +
        '<p class="hero-eyebrow">' +
          (game ? '<a href="game.html?id=' + encodeURIComponent(game.id) + '">' + esc(game.shortName || game.name) + "</a> · " : "") +
          formatDate(g.date) + " · " + esc(g.author || "Staff") +
        "</p>" +
        "<h1>" + esc(g.title) + "</h1>" +
        '<p class="hero-sub">' + esc(g.summary || "") + "</p>" +
        '<div class="article-body">' + body + "</div>" +
      "</article>";
  }

  /* ---------- boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyThemeOverrides();
    renderNav();
    renderFooter();

    var main = document.getElementById("main");
    if (!main) return;
    var page = document.body.getAttribute("data-page");

    if (page === "home")       renderHome(main);
    if (page === "game")       renderGamePage(main);
    if (page === "character")  renderCharacterPage(main);
    if (page === "guides")     renderGuidesPage(main);
    if (page === "guide")      renderGuidePage(main);
  });
})();
