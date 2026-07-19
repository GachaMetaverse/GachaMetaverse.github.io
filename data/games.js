/* ============================================================
   data/games.js
   ============================================================ */
window.GG_GAMES = [
  {
    id: "7krebirth",
    name: "Seven Knights Re:BIRTH",
    shortName: "7K Re:BIRTH",
    description: "Turn-based hero collector RPG by Netmarble - a full remake of the original Seven Knights. Tier lists, reroll targets, team building and mode guides.",
    patch: "Global",
    updated: "2026-07-18",
    card: "",
    hero: "",
    background: "https://cdn.imgchest.com/files/cc6343cbf19b.jpg",
    popular: true,
    isNew: false,
    elements: [
      { name: "Attack",    color: "#F35A5A" },
      { name: "Magic",     color: "#55A8F0" },
      { name: "Defense",   color: "#F0C04E" },
      { name: "Support",   color: "#7FD98F" },
      { name: "Universal", color: "#A278FF" }
    ],
    roles: ["DPS", "Tank", "Support", "Unique", "Pet"],
    ratingLabels: [
      { key: "overall", label: "Overall" },
      { key: "pve",     label: "PvE" },
      { key: "pvp",     label: "PvP" },
      { key: "raids",   label: "Raids" }
    ],
    tierlist: {
      tiers: ["SSS", "SS", "S", "A", "B", "C", "D"],
      categories: [
        { id: "pve",  name: "PvE", columns: ["Single-Target", "3-Target", "4/5-Target", "Buffers & Debuffers", "Tanks / Healers / Unique"],
          blurb: "Adventure & Nightmare, dungeons, towers and general PvE - split by damage-target profile, with support and unique roles ranked separately." },
        { id: "pvp",  name: "PvP", columns: ["All Heroes"],
          blurb: "Staff picks for Arena, Real-Time Arena and Guild War cores. See the Guild War guide for full team compositions." },
        { id: "raids", name: "Raids", columns: ["All Heroes"],
          blurb: "Gear Raids, Sudden Raids and Castle Rush - sustained boss damage, amplification and the essential immunity heroes." },
        { id: "pets", name: "Pets", columns: ["PvE", "PvP", "Farming"],
          blurb: "Pet rankings by mode. A maxed PvP pet is part of the endgame Arena checklist." }
      ],
      about: "PvE placements mirror the excellent community reference sheet's rankings (heroes can appear in more than one column - Lu Bu, for example, is both a 4/5-target damage dealer and a buffer). PvP and Raids are our staff picks on the same scale. Placements assume reasonable investment; transcendence walls are noted in reviews.",
      criteria: [
        "SSS - Meta-defining. Build your account around these.",
        "SS - Excellent, one step from defining the meta.",
        "S - Strong, reliable picks with clear jobs.",
        "A - Good with the right team or investment.",
        "B - Situational; works in specific comps.",
        "C - Niche or outclassed; usable for favorites.",
        "D - Not recommended beyond collection and fodder."
      ],
      changelog: [
        { date: "2026-07-17", text: "Adopted the community sheet's full PvE grid and SSS-D scale; added Pets tier list and ~100 roster entries." },
        { date: "2026-07-13", text: "Sheet updates reflected: **Bai Long** rises to SSS (Single-Target), **Heavenia** to SS (Buffers), **Lu Bu** adjusted to S in the Buffers column, **Aris** added at B (Unique), **Randgrid** to B (Unique)." }
      ]
    }
  }
];

window.GG_UPCOMING = [
  {
    id: "honor-of-kings-world",
    name: "Honor of Kings: World",
    note: "MMORPG",
    date: "2026-10-15",
    genres: ["MMORPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "TiMi Studio Group",
    website: "https://www.honorofkingsworld.com",
    color: "#7A96F0",
    blurb: "Based on Honor of Kings, this open-world MMORPG blends Eastern fantasy aesthetics with a universe of wonders and diverse civilizations."
  },
  {
    id: "chasing-kaleidorider",
    name: "Chasing KaleidoRIDER",
    note: "Turn-Based / Romance RPG",
    date: "2026-09-03",
    genres: ["Turn-Based", "Romance RPG"],
    region: "Global",
    platforms: ["Android", "iOS"],
    publisher: "Rizzgies Studio",
    website: "https://www.kaleidorider.com",
    color: "#55C8D0",
    blurb: "A heart-pounding thrilling ride with the RIDER Girls - a turn-based romance RPG with a stylish racing wrapper."
  },
  {
    id: "wangyue-moon-gaze",
    name: "Wangyue (Moon Gaze)",
    note: "Open World RPG",
    date: "2026-11-20",
    genres: ["Open World RPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "Moon Gaze Studio",
    website: "",
    color: "#A278FF",
    blurb: "An atmospheric open-world RPG steeped in moonlit Eastern fantasy, with free exploration and a painterly art direction."
  },
  {
    id: "unending-dawn",
    name: "Unending Dawn",
    note: "Open World RPG",
    date: "",
    genres: ["Open World RPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "Parcae's Fate Studio",
    website: "",
    color: "#6B7492",
    blurb: "From the deep dark beyond reality, intangible beings emerge and strange colors crawl across the sky, filling the land with malice and taboos."
  },
  {
    id: "ananta",
    name: "Ananta (Project Mugen)",
    note: "Urban Open-World RPG",
    date: "",
    genres: ["Urban Open-World RPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "NetEase",
    website: "https://www.anantagame.com",
    color: "#F3555A",
    blurb: "A free-to-play urban open-world RPG - dive into a high-freedom metropolis as an elite A.E.D agent and unravel the city's anomalies."
  },
  {
    id: "azur-promilia",
    name: "Azur Promilia",
    note: "Open World RPG",
    date: "",
    genres: ["Open World RPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "Manjuu Games",
    website: "https://azurpromilia.com",
    color: "#55C8F0",
    blurb: "A fantasy world RPG with creature companionship at its core - step into a fantasy world utterly different from the one you know."
  },
  {
    id: "honkai-nexus-anima",
    name: "Honkai: Nexus Anima",
    note: "Creature-Collector RPG",
    date: "",
    genres: ["Creature Collector"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "HoYoverse",
    website: "https://nexusanima.hoyoverse.com",
    color: "#DA7AF0",
    blurb: "An upcoming HoYoverse title featuring characters known from Honkai: Star Rail and Honkai Impact 3rd - but this time, you collect and battle anima."
  },
  {
    id: "silver-palace",
    name: "Silver Palace",
    note: "ARPG",
    date: "",
    genres: ["ARPG"],
    region: "Global",
    platforms: ["Android", "iOS", "PC"],
    publisher: "Silver Studio",
    website: "https://silverpalace.aliceingames.com",
    color: "#F5B942",
    blurb: "A brand-new ARPG set in a prosperous metropolis with a Victorian aesthetic - investigation, high society and something rotten underneath."
  }
];