/* ============================================================
   data/7krebirth/teams.js
   ============================================================ */
window.GG_TEAMS = window.GG_TEAMS || {};
window.GG_TEAMS["7krebirth"] = {
  updated: "2026-07-18",
  intro: "Build your 5-hero team (plus an optional pet). Select characters to see synergy tags and composition warnings, or load a preset based on the current meta.",
  slots: 6,
  rules: [
    { if: "lubu", need: { element: "Attack", min: 3 }, level: "warn", msg: "Lu Bu requires at least 3 Attack-type heroes to activate his Reckless Valor blessing." },
    { if: "kyle", need: { element: "Attack", min: 3 }, level: "warn", msg: "Kyle requires at least 3 Attack-type heroes for his passive." },
    { if: "freyja", need: { element: "Magic", min: 3 }, level: "warn", msg: "Freyja needs 3+ Magic-type heroes to maximize her HP Alteration." },
    { if: "reginleif", need: { element: "Magic", min: 3 }, level: "info", msg: "Reginleif synergizes best with 3+ Magic-type heroes." },
    { missingRole: "Support", level: "tip", msg: "No Support hero detected. Consider adding Biscuit, Vanessa, or Lina for team sustain." },
    { missingRole: "Pet", level: "tip", msg: "Don't forget to slot a Pet (slot 6) to maximize your team's passive stats." },
    { combo: ["rudy", "lina", "aris"], level: "good", msg: "Stall Defense Synergy: Excellent durability for Arena." },
    { combo: ["pascal", "shane", "espada", "biscuit"], level: "good", msg: "Raid Core Synergy: Optimal for Gear Raids and single-target bossing." },
    { combo: ["mist", "aquila", "rosie"], level: "good", msg: "Death Core Synergy: Great for one-phase Nightmare Adventure pushing." },
    { combo: ["xiaoqiao", "pascal", "biscuit"], level: "good", msg: "Iron Devourer Core: High single-target output and paralyze immunity." },
    { combo: ["ryan", "zhaoyun"], level: "good", msg: "Calistra Synergy: Burn and Blind immunities detected." },
    { combo: ["guanyu", "xiao"], level: "good", msg: "Leonid Synergy: Shock and Death immunities detected." }
  ],
  presets: [
    {
      name: "ATK Team",
      desc: "Physical damage core for Infinite Tower & Adventure.",
      heroes: ["randgrid", "lubu", "branzebransel", "teo", "karlheron", "petjeo"]
    },
    {
      name: "MAGIC Team",
      desc: "Magic damage core for fast farming & Adventure.",
      heroes: ["mercure", "freyja", "omok", "reginleif", "kyrielle", "petwindy"]
    },
    {
      name: "UNI Team",
      desc: "Durable universal team anchored by Sun Wukong.",
      heroes: ["radgrid", "wukong", "lina", "pallanus", "elysia", "petruu"]
    },
    {
      name: "DEATH Team",
      desc: "Specialized Death team for Nightmare Adventure.",
      heroes: ["pallanus", "mist", "aquila", "kris", "rosie", "petmerparrow"]
    },
    {
      name: "Advent: God of Destruction (P1)",
      desc: "Phase 1 scoring composition.",
      heroes: ["reginleif", "xiaoqiao", "pascal", "miho", "melia", "petjeo"]
    },
    {
      name: "Advent: God of Destruction (P2)",
      desc: "Phase 2 scoring composition.",
      heroes: ["fai", "xiao", "lubu", "bailong", "biscuit", "peteirin"]
    },
    {
      name: "Raid: Destroyer Gaze",
      desc: "Stun & Burn immune raid speed team.",
      heroes: ["sieg", "ryan", "shane", "biscuit", "rachel", "petjeo"]
    },
    {
      name: "Raid: Ox King",
      desc: "Petrify & Bleed immune magic burst team.",
      heroes: ["daisy", "karon", "espada", "biscuit", "melia", "petwindy"]
    },
    {
      name: "Raid: Iron Devourer",
      desc: "Speed Clear team requiring Paralyze immunity.",
      heroes: ["xiaoqiao", "kyrielle", "pascal", "biscuit", "melia", "petjeo"]
    },
    {
      name: "Sudden Raid: Calistra",
      desc: "Requires Burn & Blind Immunity. MDMG Resistance.",
      heroes: ["ryan", "zhaoyun", "shane", "rachel", "biscuit", "petjeo"]
    },
    {
      name: "Sudden Raid: Leonid",
      desc: "Requires Shock & Death Immunity. High DEF.",
      heroes: ["guanyu", "xiao", "bailong", "biscuit", "lubu", "petjeo"]
    },
    {
      name: "CR: Guardian's (Rudy)",
      desc: "Stun Immunity core for high scores.",
      heroes: ["evan", "biscuit", "nezha", "miho", "orly", "petjeo"]
    },
    {
      name: "CR: Fodina (Eileene)",
      desc: "Shock Immunity core for high scores.",
      heroes: ["chloe", "lina", "nezha", "miho", "biscuit", "petjeo"]
    },
    {
      name: "CR: Immortal (Rachel)",
      desc: "Burn Immunity core for high scores.",
      heroes: ["ryan", "lina", "nezha", "miho", "biscuit", "petjeo"]
    },
    {
      name: "CR: Death (Dellons)",
      desc: "Silence Immunity core for high scores.",
      heroes: ["deo", "rachel", "ryan", "taka", "biscuit", "petjeo"]
    },
    {
      name: "CR: Ancient Dragon's (Jave)",
      desc: "Stun Immunity core for high scores.",
      heroes: ["sieg", "rachel", "ryan", "taka", "biscuit", "petjeo"]
    },
    {
      name: "CR: Blizzard (Spike)",
      desc: "Freeze Immunity core for high scores.",
      heroes: ["fengyan", "rachel", "ryan", "taka", "biscuit", "petjeo"]
    },
    {
      name: "CR: Hell (Kris)",
      desc: "Death Immunity core for high scores.",
      heroes: ["xiao", "shane", "fai", "biscuit", "petjeo"]
    }
  ]
};