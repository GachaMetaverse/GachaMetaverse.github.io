/* ============================================================
   SITE CONFIG — edit this file to customize your site.
   Everything here is safe to change. No coding knowledge needed.
   After editing, save and refresh your browser.
   ============================================================ */

window.SITE_CONFIG = {

  // --- Branding ---------------------------------------------
  siteName: "PullPlanner",          // Shown in the nav and page titles
  tagline: "Tier lists, builds & guides for every banner",
  footerText: "PullPlanner is a fan-made guides site. Game assets belong to their respective owners.",

  // --- Colors (hex codes) -----------------------------------
  // These override the defaults in css/style.css.
  // Delete a line to keep the default. Use https://htmlcolorcodes.com to pick colors.
  colors: {
    accent: "#F5B942",      // Main accent — buttons, links, 5★ highlights
    background: "#0A0D1C",  // Page background
    panel: "#131830",       // Card / panel background
    text: "#E9ECF8"         // Main text color
  },

  // --- Navigation -------------------------------------------
  // Links shown in the top bar. "url" can be any page or external link.
  nav: [
    { label: "Home",   url: "index.html" },
    { label: "Guides", url: "guides.html" }
    // Game links are added automatically from data/games.js
  ],

  // --- Home page --------------------------------------------
  home: {
    heroTitle: "Know before you pull.",
    heroSubtitle: "Community-tested tier lists and build guides, updated every patch.",
    featuredGuides: 3   // How many recent guides to show on the home page
  },

  // --- Social links (leave "" to hide) ----------------------
  social: {
    discord: "",     // e.g. "https://discord.gg/yourserver"
    twitter: "",
    youtube: ""
  }
};
