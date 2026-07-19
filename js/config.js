/* ============================================================
   SITE CONFIG — edit this file to customize your site.
   No coding knowledge needed. Save and refresh to see changes.
   ============================================================ */

window.SITE_CONFIG = {

  // --- Branding ---------------------------------------------
  siteName: "LanceDEX",
  tagline: "Your guide hub for Seven Knights Re:BIRTH and more!",
  // The sentence under the big headline on the home page.
  // {games} is replaced automatically with your game names.
  heroBlurb: "LanceDEX provides tier lists, reroll targets, team building and mode guides for {games}. Everything you need in one place!",
  footerText: "LanceDEX is a fan-made guides site. Game assets belong to their respective owners.",

  // --- Theme ------------------------------------------------
  // Pick a preset: "azure" (blue), "ember" (red), "gilded" (gold),
  // "toxin" (green), "phantom" (purple) — or set custom colors below.
  theme: "gilded",

  // Custom colors override the preset. Hex codes only.
  // colors: { accent: "#2E9BF0", background: "#101016", panel: "#17171E", text: "#EDEEF4" },
  colors: {},

  // Optional scrolling parallax background (like a keyart strip).
  // A wide, seamlessly-tileable image works best. Local file in
  // assets/ or a full https:// URL. Leave "" for none.
  scrollingBackground: "",

  // Optional hero image for the home page (dark overlay is applied).
  homeHeroImage: "",

  // --- Backgrounds ------------------------------------------
  // Keyart rotation on the home page (and other non-game pages).
  // Leave empty to auto-rotate through the wallpapers you drop in
  // assets/wallpapers/ — name them wp1, wp2, wp3, ... (.jpg or .png),
  // numbered from 1 with no gaps. If that folder is empty, the site
  // falls back to each game's `background`. You can still list custom
  // https:// URLs (or assets/ paths) here to override the folder.
  backgroundRotation: [],
  backgroundRotateSeconds: 14,

  // --- Content translation (optional) -----------------------
  // The interface is translated offline into 11 languages. Body
  // content (character reviews, guides, notes) is translated on
  // demand via these Lingva (Google Translate) instances, tried in
  // order until one responds. Visitors are asked first, and can turn
  // it on/off in the footer settings. IMPORTANT: if you change these,
  // update connect-src in _headers AND .htaccess to list the same
  // domains, or the browser will block the request.
  lingvaInstances: ["https://lingva.ml", "https://lingva.garudalinux.org", "https://lingva.lunar.icu"],

  // --- Navigation -------------------------------------------
  nav: [
    { label: "Home", url: "index.html" },
    { label: "Upcoming games", url: "upcoming.html" },
    { label: "Guides", url: "guides.html" }
    // Game links are added automatically from data/games.js
  ],

  // --- Social (leave "" to hide) -----------------------------
  social: {
    discord: "https://discord.gg/hZVfPPJS4Z",     // e.g. "https://discord.gg/yourserver" — shows a Discord button in the top bar
    twitter: "https://x.com/Bladecifer",
    youtube: "https://www.youtube.com/@mcburn_",
    kofi: "https://ko-fi.com/8percentscans"
  }
};
