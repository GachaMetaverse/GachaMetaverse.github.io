/* ============================================================
   CHARACTERS DATA — one entry per character.
   "id" must be unique, lowercase, no spaces.
   "game" must match a game id from data/games.js.
   "rarity" is a number: 5, 4, or 3 (controls card colors + stars).
   "portrait" is optional: a file in assets/ or a full https:// URL.
   ============================================================ */

window.GG_CHARACTERS = [
  {
    id: "aurelia",
    game: "starforge",
    name: "Aurelia",
    title: "Dawnblade Sovereign",
    rarity: 5,
    element: "Solar",
    role: "Main DPS",
    portrait: "",
    ratings: { overall: 9.5, story: 9.0, endgame: 9.8, f2p: 8.0 },
    summary: "Aurelia is the current DPS benchmark. Her burst rotation front-loads damage into a 6-second window, which lines up perfectly with the 2.4 boss break bars.",
    build: {
      weapon: "Signature: Daybreak Edict. F2P alternative: Radiant Oath (battle pass).",
      gear: "4pc Solar Crown set. Main stats: ATK% / Crit DMG / Solar DMG.",
      substats: "Crit Rate > Crit DMG > ATK% > Speed",
      teams: "Aurelia / Kestrel / Mirabel / any healer. Kestrel's mark doubles her burst hits."
    },
    pros: ["Highest single-target burst in the game", "Simple rotation, hard to misplay", "Great at low investment"],
    cons: ["Signature weapon is a big part of her damage", "Weak vs. multi-wave content"]
  },
  {
    id: "kestrel",
    game: "starforge",
    name: "Kestrel",
    title: "Voidwing Adjutant",
    rarity: 5,
    element: "Umbral",
    role: "Sub DPS / Amplifier",
    portrait: "",
    ratings: { overall: 9.3, story: 8.5, endgame: 9.6, f2p: 9.0 },
    summary: "Kestrel marks enemies so allied hits echo for 45% of their damage. She turns any hypercarry team into a meta team and works off-banner weapons fine.",
    build: {
      weapon: "Any 4★ energy-recharge blade. Signature is a luxury.",
      gear: "2pc Umbral / 2pc Energy. Main stats: ATK% / Crit Rate / Energy Regen.",
      substats: "Energy Regen > Crit Rate > ATK%",
      teams: "Slots into any burst-DPS team. Best partner: Aurelia."
    },
    pros: ["Best-in-class amplifier", "Weapon-flexible", "Future-proof kit"],
    cons: ["Does little on her own", "Needs energy investment to loop her burst"]
  },
  {
    id: "voss",
    game: "starforge",
    name: "Voss",
    title: "Ironline Warden",
    rarity: 4,
    element: "Terran",
    role: "Tank / Shielder",
    portrait: "",
    ratings: { overall: 8.4, story: 8.8, endgame: 8.0, f2p: 9.5 },
    summary: "Free from the story campaign and still the most reliable shielder. Voss trivializes most content for newer accounts.",
    build: {
      weapon: "Bulwark Standard (craftable).",
      gear: "4pc Aegis set. Main stats: HP% / DEF% / HP%.",
      substats: "HP% > DEF% > Energy Regen",
      teams: "Universal fourth slot for any team lacking sustain."
    },
    pros: ["Free to obtain", "Shields scale well into endgame", "Cheap to build"],
    cons: ["Zero damage contribution", "Taunt can misfire in multi-boss fights"]
  },
  {
    id: "mirabel",
    game: "starforge",
    name: "Mirabel",
    title: "Chorister of the Deep",
    rarity: 4,
    element: "Tidal",
    role: "Healer / Buffer",
    portrait: "",
    ratings: { overall: 8.6, story: 9.0, endgame: 8.5, f2p: 9.0 },
    summary: "Heals on a rhythm mechanic: keep her tempo stacks up and she also grants 20% ATK. The best healer for burst-window teams.",
    build: {
      weapon: "Any healing-bonus instrument.",
      gear: "4pc Mender set. Main stats: HP% / Healing Bonus / HP%.",
      substats: "HP% > Energy Regen > Speed",
      teams: "Pairs naturally with Aurelia burst comps."
    },
    pros: ["Heal + ATK buff in one slot", "4★ availability", "Fun active playstyle"],
    cons: ["Tempo stacks drop if she's off-field too long"]
  },
  {
    id: "tamsin",
    game: "starforge",
    name: "Tamsin",
    title: "Gutterline Chemist",
    rarity: 4,
    element: "Toxin",
    role: "DoT DPS",
    portrait: "",
    ratings: { overall: 7.5, story: 8.2, endgame: 7.0, f2p: 8.5 },
    summary: "Damage-over-time specialist. Strong in long fights, but 2.4's burst-check bosses don't give her time to ramp.",
    build: {
      weapon: "Corrosive Vial line.",
      gear: "4pc Miasma. Main stats: ATK% / Effect Hit / Toxin DMG.",
      substats: "Effect Hit > ATK% > Speed",
      teams: "DoT stall teams with Voss frontline."
    },
    pros: ["Excellent in endurance fights", "Low crit dependence = cheap substats"],
    cons: ["Ramp time doesn't fit current meta", "Falls off vs. cleanse-heavy bosses"]
  },
  {
    id: "oren",
    game: "starforge",
    name: "Oren",
    title: "Lantern Cartographer",
    rarity: 3,
    element: "Solar",
    role: "Support",
    portrait: "",
    ratings: { overall: 6.0, story: 7.0, endgame: 5.0, f2p: 7.5 },
    summary: "A starter support with a small party heal. Outclassed quickly, but fine glue for brand-new accounts.",
    build: {
      weapon: "Anything with HP%.",
      gear: "2pc Mender / 2pc Aegis.",
      substats: "HP% > Energy Regen",
      teams: "Early-game filler only."
    },
    pros: ["Available from the tutorial", "Costs nothing to function"],
    cons: ["No endgame role", "Kit has no synergy hooks"]
  },
  {
    id: "nyx",
    game: "abyssal",
    name: "Nyx",
    title: "Requiem Blade",
    rarity: 5,
    element: "Shadow",
    role: "Main DPS",
    portrait: "",
    ratings: { overall: 9.4, story: 9.0, endgame: 9.7, f2p: 8.2 },
    summary: "Dodge-counter monster. Perfect-dodge windows refund her entire gauge, so skilled players loop her ultimate nearly back-to-back.",
    build: {
      weapon: "Duskfall Fang or any crit-rate katana.",
      gear: "4pc Nightreign. Crit Rate to 70%, then stack Crit DMG.",
      substats: "Crit Rate > Crit DMG > ATK%",
      teams: "Nyx / Harrow / flex. Harrow's slow field makes her dodge timing trivial."
    },
    pros: ["Highest skill ceiling and payoff", "Ultimate uptime is unmatched"],
    cons: ["Punishing for new players", "Needs crit-rate gear to come online"]
  },
  {
    id: "harrow",
    game: "abyssal",
    name: "Harrow",
    title: "Bellkeeper of the Fen",
    rarity: 4,
    element: "Mire",
    role: "Controller",
    portrait: "",
    ratings: { overall: 8.7, story: 8.5, endgame: 8.8, f2p: 9.3 },
    summary: "Drops a slow-field that lengthens every dodge window for the on-field character. The best QoL unit in the game and a frequent event freebie.",
    build: {
      weapon: "Any energy-regen focus.",
      gear: "4pc Mirewalk. Main stat: Energy Regen.",
      substats: "Energy Regen > HP%",
      teams: "Universal second slot; best with Nyx."
    },
    pros: ["Given away free during events", "Makes hard content dramatically easier"],
    cons: ["No personal damage", "Field placement takes practice"]
  }
];
