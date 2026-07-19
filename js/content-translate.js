/* ============================================================
   js/content-translate.js — LanceDEX on-demand CONTENT translation.
   Translates authored body text (character reviews, guides, tier-list
   notes, etc.) at read-time via a Lingva (Google Translate) endpoint.
   The interface itself is translated separately & offline by i18n.js.

   Behaviour:
   - Source content is English. If the visitor's interface language is
     not English and a page has translatable content, a popup (written
     in the target language) offers to translate "this time" or "always".
   - "Always" saves the preference (localStorage "ld-ct-auto"); the user
     can toggle it on/off any time in the footer settings panel.
   - Results are cached in localStorage so the same text is never
     re-fetched. Failures degrade gracefully (original text stays).

   NOTE: this is the ONE feature that calls out to a third party. The
   Lingva instances below must also be listed in the site's CSP
   connect-src (see _headers / .htaccess / nginx-security.conf).
   ============================================================ */
(function () {
  "use strict";

  var SOURCE = "en";
  // Instances are tried in order; first success wins. Keep in sync with CSP.
  var INSTANCES = ["https://lingva.ml", "https://lingva.garudalinux.org", "https://lingva.lunar.icu"];
  if (window.SITE_CONFIG && Array.isArray(window.SITE_CONFIG.lingvaInstances) && window.SITE_CONFIG.lingvaInstances.length) {
    INSTANCES = window.SITE_CONFIG.lingvaInstances.slice();
  }
  // Interface lang code -> Lingva target code (all 1:1 for our set).
  var LMAP = { en: "en", es: "es", pt: "pt", fr: "fr", de: "de", ko: "ko", ja: "ja", zh: "zh", vi: "vi", th: "th", id: "id" };
  var MAX_CONCURRENT = 4;
  var MAX_CHARS = 1400; // per-request soft cap; longer strings are chunked

  // Containers whose text is authored CONTENT (never the chrome/interface).
  var CONTENT_SELECTORS = [
    ".article-sub", ".article-body p", ".article-body li", ".article-body h2",
    ".note p", ".tip", ".char-title", ".char-columns p", ".build-list dd",
    ".pros li", ".cons li", ".hub-hero-inner p", ".cat-blurb", ".acc-body p",
    ".acc-body li", ".chg", "#role-groups .role-name", ".role-scope",
    ".role-key", ".role-key-panel li", ".role-footnote", ".event-blurb",
    ".event-team-desc", ".event-team-head h3", ".event-req-chip", ".event-note p",
    ".upg-blurb"
  ];

  // Popup / settings text, pre-translated so it is readable in the target
  // language WITHOUT needing the online service. {lang} = language's name.
  var POPUP = {
    en: { offer: "Read this page in {lang}?", now: "Translate now", always: "Always translate", not: "Not now", auto: "Auto-translate content", settings: "Translation", original: "Show original", translated: "Show translation", translating: "Translating…", failed: "Translation unavailable right now.", powered: "Google Translate via Lingva" },
    es: { offer: "¿Leer esta página en {lang}?", now: "Traducir ahora", always: "Traducir siempre", not: "Ahora no", auto: "Traducir contenido automáticamente", settings: "Traducción", original: "Ver original", translated: "Ver traducción", translating: "Traduciendo…", failed: "Traducción no disponible en este momento.", powered: "Google Translate vía Lingva" },
    pt: { offer: "Ler esta página em {lang}?", now: "Traduzir agora", always: "Traduzir sempre", not: "Agora não", auto: "Traduzir conteúdo automaticamente", settings: "Tradução", original: "Ver original", translated: "Ver tradução", translating: "Traduzindo…", failed: "Tradução indisponível no momento.", powered: "Google Translate via Lingva" },
    fr: { offer: "Lire cette page en {lang} ?", now: "Traduire maintenant", always: "Toujours traduire", not: "Pas maintenant", auto: "Traduire le contenu automatiquement", settings: "Traduction", original: "Voir l'original", translated: "Voir la traduction", translating: "Traduction…", failed: "Traduction indisponible pour le moment.", powered: "Google Translate via Lingva" },
    de: { offer: "Diese Seite auf {lang} lesen?", now: "Jetzt übersetzen", always: "Immer übersetzen", not: "Jetzt nicht", auto: "Inhalte automatisch übersetzen", settings: "Übersetzung", original: "Original anzeigen", translated: "Übersetzung anzeigen", translating: "Übersetze…", failed: "Übersetzung derzeit nicht verfügbar.", powered: "Google Translate über Lingva" },
    ko: { offer: "이 페이지를 {lang}(으)로 읽으시겠어요?", now: "지금 번역", always: "항상 번역", not: "나중에", auto: "콘텐츠 자동 번역", settings: "번역", original: "원문 보기", translated: "번역 보기", translating: "번역 중…", failed: "지금은 번역을 사용할 수 없습니다.", powered: "Lingva 경유 Google 번역" },
    ja: { offer: "このページを{lang}で読みますか？", now: "今すぐ翻訳", always: "常に翻訳", not: "後で", auto: "コンテンツを自動翻訳", settings: "翻訳", original: "原文を表示", translated: "翻訳を表示", translating: "翻訳中…", failed: "現在、翻訳を利用できません。", powered: "Lingva 経由の Google 翻訳" },
    zh: { offer: "用{lang}阅读本页？", now: "立即翻译", always: "始终翻译", not: "暂不", auto: "自动翻译内容", settings: "翻译", original: "查看原文", translated: "查看译文", translating: "翻译中…", failed: "翻译暂时不可用。", powered: "通过 Lingva 使用谷歌翻译" },
    vi: { offer: "Đọc trang này bằng {lang}?", now: "Dịch ngay", always: "Luôn dịch", not: "Để sau", auto: "Tự động dịch nội dung", settings: "Dịch", original: "Xem bản gốc", translated: "Xem bản dịch", translating: "Đang dịch…", failed: "Hiện chưa thể dịch.", powered: "Google Dịch qua Lingva" },
    th: { offer: "อ่านหน้านี้เป็น{lang}ไหม?", now: "แปลตอนนี้", always: "แปลเสมอ", not: "ไว้ก่อน", auto: "แปลเนื้อหาอัตโนมัติ", settings: "การแปล", original: "ดูต้นฉบับ", translated: "ดูคำแปล", translating: "กำลังแปล…", failed: "ขณะนี้ยังแปลไม่ได้", powered: "Google แปลผ่าน Lingva" },
    id: { offer: "Baca halaman ini dalam {lang}?", now: "Terjemahkan sekarang", always: "Selalu terjemahkan", not: "Nanti saja", auto: "Terjemahkan konten otomatis", settings: "Terjemahan", original: "Lihat asli", translated: "Lihat terjemahan", translating: "Menerjemahkan…", failed: "Terjemahan belum tersedia.", powered: "Google Terjemahan via Lingva" }
  };

  function I18() { return window.LD_I18N; }
  function lang() { return I18() ? I18().lang : "en"; }
  function targetCode() { return LMAP[lang()] || ""; }
  function strings() { return POPUP[lang()] || POPUP.en; }
  function nativeName() { return (I18() && I18().native[lang()]) || lang(); }

  /* ---- preferences & cache ---- */
  function ls(get, k, v) {
    try { return get ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function autoPref() { return ls(true, "ld-ct-auto") || ""; }          // "on" | "off" | ""
  function setAuto(v) { ls(false, "ld-ct-auto", v); }
  function dismissed() { try { return sessionStorage.getItem("ld-ct-dismiss") === "1"; } catch (e) { return false; } }
  function dismiss() { try { sessionStorage.setItem("ld-ct-dismiss", "1"); } catch (e) {} }

  /* ---- translation fetch (Lingva) with cache, fallback, chunking ---- */
  function cacheKey(text, target) { return "ctc:" + target + ":" + text; }

  function fetchOne(text, target, instIdx) {
    if (instIdx >= INSTANCES.length) return Promise.resolve(null);
    var url = INSTANCES[instIdx] + "/api/v1/" + SOURCE + "/" + target + "/" + encodeURIComponent(text);
    return fetch(url, { mode: "cors" })
      .then(function (r) { if (!r.ok) throw new Error("http"); return r.json(); })
      .then(function (j) { return (j && typeof j.translation === "string") ? j.translation : null; })
      .catch(function () { return fetchOne(text, target, instIdx + 1); });
  }

  function splitChunks(text) {
    if (text.length <= MAX_CHARS) return [text];
    var parts = text.split(/(?<=[.!?。！？])\s+/), chunks = [], cur = "";
    parts.forEach(function (p) {
      if ((cur + " " + p).length > MAX_CHARS && cur) { chunks.push(cur); cur = p; }
      else { cur = cur ? cur + " " + p : p; }
    });
    if (cur) chunks.push(cur);
    return chunks;
  }

  function translateText(text, target) {
    var key = cacheKey(text, target);
    var cached = ls(true, key);
    if (cached != null) return Promise.resolve(cached);
    var chunks = splitChunks(text);
    return Promise.all(chunks.map(function (c) { return fetchOne(c, target, 0); }))
      .then(function (outs) {
        if (outs.some(function (o) { return o == null; })) return null; // partial fail → skip
        var joined = outs.join(" ");
        ls(false, key, joined);
        return joined;
      });
  }

  /* ---- collect & apply ---- */
  var handled = [];       // {node, orig} we translated on the current page
  var curRoot = null;

  function collect(root) {
    var seen = new Map(); // trimmed text -> [nodes]
    CONTENT_SELECTORS.forEach(function (sel) {
      var els;
      try { els = root.querySelectorAll(sel); } catch (e) { return; }
      els.forEach(function (el) {
        if (el.closest && el.closest("[data-notr]")) return;
        var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n;
        while ((n = w.nextNode())) {
          if (n.__ctDone) continue;
          var raw = n.nodeValue, s = raw.trim();
          if (s.length < 2 || !/[A-Za-z]/.test(s)) continue;
          if (!seen.has(s)) seen.set(s, []);
          seen.get(s).push(n);
        }
      });
    });
    return seen;
  }

  function apply(nodes, text, translated) {
    nodes.forEach(function (n) {
      if (n.__ctDone) return;
      n.__ctDone = true;
      n.__ctOrig = n.nodeValue;
      n.nodeValue = n.__ctOrig.replace(text, translated);
      handled.push(n);
    });
  }

  function runQueue(entries, onDone) {
    var target = targetCode();
    if (!target || target === SOURCE || !entries.length) { onDone(true); return; }
    var i = 0, active = 0, done = 0, total = entries.length, anyOk = false;
    (function pump() {
      while (active < MAX_CONCURRENT && i < entries.length) {
        (function (entry) {
          active++;
          translateText(entry[0], target).then(function (tr) {
            if (tr) { apply(entry[1], entry[0], tr); anyOk = true; }
            active--; done++;
            if (done === total) onDone(anyOk); else pump();
          });
        })(entries[i++]);
      }
    })();
  }

  /* ---- UI: banner popup + progress + settings toggle ---- */
  var pop = null, badge = null;

  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "ct-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-live", "polite");
    document.body.appendChild(pop);
    return pop;
  }
  function hidePop() { if (pop) pop.classList.remove("show"); }

  function offer() {
    var S = strings();
    ensurePop().innerHTML =
      '<span class="ct-pop-text"></span>' +
      '<div class="ct-pop-actions">' +
        '<button class="ct-btn ct-btn-accent" data-act="now"></button>' +
        '<button class="ct-btn" data-act="always"></button>' +
        '<button class="ct-x" data-act="close" aria-label="close">✕</button>' +
      "</div>";
    pop.querySelector(".ct-pop-text").textContent = S.offer.replace("{lang}", nativeName());
    pop.querySelector('[data-act="now"]').textContent = S.now;
    pop.querySelector('[data-act="always"]').textContent = S.always;
    pop.querySelector('[data-act="close"]').title = S.not;
    pop.classList.add("show");
    pop.querySelectorAll("[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var act = b.getAttribute("data-act");
        if (act === "now") { dismiss(); hidePop(); translateNow(); }
        else if (act === "always") { setAuto("on"); syncToggle(); hidePop(); translateNow(); }
        else { dismiss(); hidePop(); }
      });
    });
  }

  function showBadge(text) {
    if (!badge) { badge = document.createElement("div"); badge.className = "ct-badge"; document.body.appendChild(badge); }
    badge.textContent = text;
    badge.classList.add("show");
  }
  function hideBadge() { if (badge) badge.classList.remove("show"); }

  function translateNow() {
    if (!curRoot) return;
    var seen = collect(curRoot);
    var entries = Array.from(seen.entries());
    if (!entries.length) return;
    var S = strings();
    showBadge(S.translating);
    runQueue(entries, function (ok) {
      if (ok) { showBadge(S.powered); window.setTimeout(hideBadge, 2200); }
      else { showBadge(S.failed); window.setTimeout(hideBadge, 3200); }
      syncToggle();
    });
  }

  function showOriginal() {
    handled.forEach(function (n) { if (n.__ctOrig !== undefined) n.nodeValue = n.__ctOrig; });
  }

  /* ---- settings toggle in the footer prefs panel ---- */
  var toggleWrap = null;
  function renderSettings(container) {
    if (!container) return;
    // Only meaningful when the interface (and thus desired reading) isn't English.
    var existing = container.querySelector(".ct-pref");
    if (existing) existing.parentNode.removeChild(existing);
    if (lang() === "en" || !targetCode()) return;
    var S = strings();
    var wrap = document.createElement("div");
    wrap.className = "pref ct-pref";
    wrap.innerHTML =
      '<span class="pref-label">' + S.settings + "</span>" +
      '<label class="ct-switch"><input type="checkbox" class="ct-auto-input">' +
      '<span class="ct-switch-track"><span class="ct-switch-thumb"></span></span>' +
      '<span class="ct-switch-txt"></span></label>';
    wrap.querySelector(".ct-switch-txt").textContent = S.auto;
    var input = wrap.querySelector(".ct-auto-input");
    input.checked = autoPref() === "on";
    input.addEventListener("change", function () {
      if (input.checked) { setAuto("on"); translateNow(); }
      else { setAuto("off"); showOriginal(); hidePop(); }
    });
    container.appendChild(wrap);
    toggleWrap = wrap;
  }
  function syncToggle() {
    if (toggleWrap) { var i = toggleWrap.querySelector(".ct-auto-input"); if (i) i.checked = autoPref() === "on"; }
  }

  /* ---- route hook (called by app.js after each render) ---- */
  function onRoute(main) {
    hidePop(); hideBadge();
    handled = [];
    curRoot = main;
    if (lang() === "en" || !targetCode()) return;
    if (autoPref() === "off") return;
    var seen = collect(main);
    if (!seen.size) return;
    if (autoPref() === "on") { translateNow(); return; }
    if (dismissed()) return;
    offer();
  }

  window.LD_CT = {
    onRoute: onRoute,
    renderSettings: renderSettings,
    translateNow: translateNow,
    showOriginal: showOriginal
  };
})();
