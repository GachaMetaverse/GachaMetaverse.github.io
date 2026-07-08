/* ============================================================
   8% SCANS — SITE CONFIG
   Fill this in once. See TUTORIAL.md for where each value
   comes from. The site runs fine with Firebase/Disqus left
   empty — accounts, ratings and comments simply stay hidden
   until you configure them.
   ============================================================ */

const SITE = {
  name: "8% Scans",
  tagline: "running on fumes, translating anyway",

  // ---- external links (already filled in for you) ----
  kofi:     "https://ko-fi.com/8percentscans",
  mangadex: "https://mangadex.org/group/a7c7a3fd-00dd-4832-b850-b53eeecd409f",
  reddit:   "https://www.reddit.com/user/EightPercentBattery/",

  // ---- Disqus ----
  // Your Disqus shortname (from disqus.com admin). "" disables comments.
  disqusShortname: "",

  // ---- Firebase (accounts, ratings, thumbs) ----
  // Paste the config object from your Firebase project here.
  // NOTE: these values are PUBLIC identifiers, not secrets.
  // Real security comes from the Firestore rules (see firestore.rules).
  // Leave apiKey as "" to run the site without accounts.
  firebase: {
    apiKey: "AIzaSyAfCzHJaKQ92Al_0XO5OHEtq554Oxs_oi8",
    authDomain: "percentscans.firebaseapp.com"",
    projectId: "percentscans",
    storageBucket: "percentscans.firebasestorage.app",
    messagingSenderId: "942389236236",
    appId: "1:942389236236:web:585560b5fcfb129caa9429",
  },

  // How long (minutes) fetched cubari data is cached in the browser.
  cacheMinutes: 30,
};
