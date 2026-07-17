/* ============================================================
   GAMES DATA — one entry per game your site covers.
   To add a game: copy a block between { }, paste it, edit it.
   "id" must be unique, lowercase, no spaces (used in URLs).
   Tier list entries reference character ids from data/characters.js.
   ============================================================ */

window.GG_GAMES = [
  {
    id: "starforge",
    name: "Starforge Chronicle",
    shortName: "Starforge",
    description: "Turn-based sci-fantasy RPG. Patch 2.4 meta covered below.",
    patch: "2.4",
    updated: "2026-07-06",
    // Optional banner image (place file in assets/ or use a full https:// URL)
    banner: "",
    tiers: [
      { rank: "S",  blurb: "Meta-defining. Strong on any team.",        characters: ["aurelia", "kestrel"] },
      { rank: "A",  blurb: "Excellent with the right support.",         characters: ["voss", "mirabel"] },
      { rank: "B",  blurb: "Solid, outclassed at high investment.",     characters: ["tamsin"] },
      { rank: "C",  blurb: "Niche picks only.",                         characters: ["oren"] }
    ]
  },
  {
    id: "abyssal",
    name: "Abyssal Requiem",
    shortName: "Abyssal",
    description: "Real-time action gacha. Version 1.7 tier list.",
    patch: "1.7",
    updated: "2026-07-02",
    banner: "",
    tiers: [
      { rank: "S", blurb: "Carries endgame content.",                   characters: ["nyx"] },
      { rank: "A", blurb: "Great value, easy to build.",                characters: ["harrow"] }
    ]
  }
];
