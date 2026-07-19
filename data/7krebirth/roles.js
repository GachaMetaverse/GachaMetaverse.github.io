/* ============================================================
   data/7krebirth/roles.js
   ============================================================ */
window.GG_ROLES = window.GG_ROLES || {};
window.GG_ROLES["7krebirth"] = {
  updated: "2026-07-18",
  intro: "Team building in Re:BIRTH is effect coverage. This page maps every effect family to the heroes that provide it, on the same grid as the tier list - hover any portrait for that hero's tier placements, click for the full review.",
  stacking: [
    "Effects come in two kinds: **permanent** (colored label) and **duration-based** (dark label).",
    "An identical permanent effect and duration-based effect **can stack together**.",
    "Two or more of the **same kind do not stack** - the higher % simply overrides the lower.",
    "Transcended bonuses are included in a hero's coverage - it can grow as you transcend them."
  ],
  groups: [
    { id: "dmg-boost-buffs", name: "DMG Boost Buffs", color: "#F08A8A", effects: [
      { name: "ALL ATK Boost", scope: "Allies", heroes: ["diaochan", "chloe", "blackrose"] },
      { name: "PATK Boost", scope: "Allies", heroes: ["eileene", "lubu", "branzebransel", "sieg", "heavenia"] },
      { name: "PDMG Boost", scope: "Allies", heroes: ["dellons", "karlheron", "kagura", "guanyu"] },
      { name: "MATK Boost", scope: "Allies", heroes: ["yeonhee", "omok", "daisy", "xiaoqiao", "victoria"] },
      { name: "MDMG Boost", scope: "Allies", heroes: ["sungjinwoo", "kyrielle", "velika"] },
      { name: "Crit Rate Boost", scope: "Allies", heroes: ["orly", "catty", "chloe"] },
      { name: "Crit DMG Boost", scope: "Allies", heroes: ["karlheron", "orly", "kagura", "lina", "dellons", "clemyth", "guanyu"] },
      { name: "Weakness Hit Chance Boost", scope: "Allies", heroes: ["rachel", "biscuit", "catty"] },
      { name: "Weakness Hit DMG Boost", scope: "Self", heroes: ["randgrid", "lubu"] },
      { name: "Boss DMG Boost", scope: "Allies", heroes: ["biscuit"] },
      { name: "DEF Ignore Efficiency Boost", scope: "Allies", heroes: ["lubu"] },
      { name: "DEF Ignore Efficiency Boost", scope: "Self", heroes: ["bailong"] }
    ]},
    { id: "dmg-boost-debuffs", name: "DMG Boost Debuffs", color: "#D95A5A", effects: [
      { name: "DEF Reduction", scope: "Enemy", duration: true, heroes: ["randgrid", "reginleif", "ace", "vanessa", "biscuit", "elysia", "juri", "lubu", "rachel", "omok", "orly", "lina", "chancellor"] },
      { name: "Physical Vulnerability", scope: "Enemy", duration: true, heroes: ["fai", "karlheron", "ace", "rachel", "kagura", "taka", "heavenia"] },
      { name: "Magical Vulnerability", scope: "Enemy", duration: true, heroes: ["melia", "reginleif", "skuld", "vanessa", "xiaoqiao", "velika", "espada", "victoria"] }
    ]},
    { id: "hp-heal", name: "HP & Heal-related", color: "#8FD9A8", effects: [
      { name: "Heal", scope: "Allies", heroes: ["reginleif", "lubu", "wukong", "karma", "kris", "lina", "alice", "diaochan", "sieg", "bailong"] },
      { name: "Continuous Heal", scope: "Allies", duration: true, heroes: ["clemyth", "orly", "guanyu", "lina", "alice", "knox", "yui"] },
      { name: "Unable to Recover", scope: "Enemy", duration: true, heroes: ["skuld", "guanyu", "baijiao", "amelia", "chloe", "catty"] },
      { name: "Incoming Healing Reduction", scope: "Enemy", duration: true, heroes: ["aris", "karlheron", "skuld", "mercure", "kagura", "diaochan"] },
      { name: "HP Alteration", scope: "Enemy", heroes: ["skuld", "omok", "randgrid", "freyja", "platin", "rook"] }
    ]},
    { id: "effect-related", name: "Effect-related", color: "#C3A8E8", effects: [
      { name: "Effect Resist Boost", scope: "Allies", heroes: ["spike", "lina", "clemyth", "karlheron"] },
      { name: "Crowd Control Immunity", scope: "Allies", heroes: ["clemyth", "omok", "mist", "randgrid", "rudy", "diaochan"] },
      { name: "Debuff Removal", scope: "Allies", heroes: ["skuld", "rudy", "aris", "karlheron", "omok", "randgrid", "reginleif", "spike", "ace", "kagura", "elysia", "orly", "aquila", "pallanus", "guanyu", "xiaoqiao", "baijiao"] }
    ]},
    { id: "status-cc", name: "Status & CC Effects", color: "#A878D9", effects: [
      { name: "Stun", scope: "Enemy", duration: true, heroes: ["rudy", "aris", "lubu", "mercure", "jave", "aragon", "joker"] },
      { name: "Paralysis", scope: "Enemy", duration: true, heroes: ["chahaein", "reginleif", "colt", "kyrielle", "yushin"] },
      { name: "Shock", scope: "Enemy", duration: true, heroes: ["karlheron", "eileene", "nia"] },
      { name: "Freeze / Extreme Chill", scope: "Enemy", duration: true, heroes: ["gelidus", "spike", "lania", "heavenia"] },
      { name: "Silence", scope: "Enemy", duration: true, heroes: ["skuld", "dellons", "elysia", "velika", "bane"] },
      { name: "Sleep", scope: "Enemy", duration: true, heroes: ["yeonhee", "diaochan"] },
      { name: "Petrify", scope: "Enemy", duration: true, heroes: ["wukong", "vanessa", "kagura", "cleo"] },
      { name: "Blind", scope: "Enemy", duration: true, heroes: ["ryan", "ariel", "may"] },
      { name: "Burn / Dragonflame", scope: "Enemy", duration: true, heroes: ["fai", "radgrid", "rachel", "jave", "velika"] },
      { name: "Bleed", scope: "Enemy", duration: true, heroes: ["branzebransel", "freyja", "deo", "baijiao", "bidam"] },
      { name: "Poison", scope: "Enemy", duration: true, heroes: ["baijiao", "jupy", "cleo"] },
      { name: "Death", scope: "Enemy", duration: true, heroes: ["rosie", "mist", "kris", "knox", "aquila"] }
    ]},
    { id: "buff-related", name: "Buff-related", color: "#9BB8F0", effects: [
      { name: "Buff Removal", scope: "Enemy", heroes: ["fai", "dellons", "radgrid", "freyja", "vanessa", "biscuit", "orly", "kyle", "platin", "guanyu", "chancellor", "daisy"] }
    ]},
    { id: "immunity-shield", name: "Immunity & Shield-related", color: "#6FA8F0", effects: [
      { name: "PDMG Immunity", scope: "Self", heroes: ["ryan", "zhaoyun", "li", "hokin"] },
      { name: "MDMG Immunity", scope: "Self", heroes: ["hellenia"] },
      { name: "All DMG Immunity", scope: "Self", heroes: ["rook", "orkah", "clemyth", "karlheron", "miho", "aris", "randgrid", "reginleif", "pallanus", "vanessa", "elysia", "klahan"] },
      { name: "All DMG Immunity", scope: "Allies", heroes: ["baijiao", "knox", "yushin", "chancellor", "fengyan", "heavenia", "guanyu"] },
      { name: "DMG Nullification", scope: "Self", heroes: ["ace", "skuld", "jane", "noho", "yeonhee", "dellons", "kyle", "kyrielle", "rin", "ballista", "melia"] },
      { name: "DMG Nullification", scope: "Allies", heroes: ["dellons", "karlheron", "orly"] },
      { name: "Barrier", scope: "Allies", heroes: ["melia", "aris", "clemyth", "randgrid", "branzebransel", "mercure", "orly", "aquila", "deo", "xiaoqiao", "diaochan", "rook", "daisy", "amelia", "hellenia", "yoojinho", "xiao", "lingling", "evan", "asura"] },
      { name: "Incoming Barrier Reduction", scope: "Enemy", heroes: ["soi"] }
    ]},
    { id: "dmg-related", name: "DMG-related", color: "#7A96F0", effects: [
      { name: "Pierce", heroes: ["dellons", "skuld", "ace", "karlheron", "kyrielle", "vanessa", "teo", "kyle", "gelidus", "randgrid", "eileene", "aragon", "lingling", "sylvia", "rei"] },
      { name: "Ignore DEF", heroes: ["aris", "orkah", "reginleif", "nezha", "chloe", "sungjinwoo", "lubu", "freyja", "yeonhee", "silvesta", "kyle", "ryan", "dellons", "pallanus", "karlheron", "fai", "biscuit", "rahkun", "xiaoqiao", "pascal", "ruri", "taka", "guanyu"] },
      { name: "ATK-Based DMG", heroes: ["randgrid"] },
      { name: "DEF-Based DMG (Caster's)", heroes: ["gelidus", "miho", "randgrid", "karma", "platin", "rosie", "aragon", "chancellor"] },
      { name: "DEF-Based DMG (Target's)", heroes: ["yoojinho", "evan", "hellenia", "lucy", "rahkun"] },
      { name: "HP-Based DMG (Caster's)", heroes: ["aris"] },
      { name: "Max HP-Based DMG (Caster's)", heroes: ["evan", "spike", "orly", "aquila", "karma", "rook", "li", "noho"] },
      { name: "HP-Based DMG (Target's)", heroes: ["silvesta", "jin", "juri", "omok", "reginleif", "sungjinwoo", "yoojinho", "kyle", "yeonhee", "espada", "catty", "snipper"] },
      { name: "Lost HP-Based DMG (Caster's)", heroes: ["randgrid"] },
      { name: "Lost HP-Based DMG (Target's)", heroes: ["ryan", "nezha", "klahan", "kyle", "rin", "taka"] },
      { name: "SPD-Based DMG", heroes: ["sungjinwoo"] },
      { name: "DOT-Based DMG", heroes: ["fai", "xiao", "jave", "platin"] },
      { name: "CC-Based DMG", heroes: ["spike"] },
      { name: "Additional DMG in Stance", heroes: ["jave"] },
      { name: "Additional DMG upon Crit", heroes: ["orkah", "deo", "chahaein", "velika", "sera"] },
      { name: "Additional DMG upon Weakness Hit", heroes: ["lubu", "ryan", "kris", "baijiao", "ruri"] },
      { name: "Additional DMG per Debuff on Target", heroes: ["reginleif", "shane"] },
      { name: "Additional DMG per Debuff Removed", heroes: ["kyrielle"] },
      { name: "Additional DMG per Buff Consumed", heroes: ["karma"] },
      { name: "Additional DMG per Reduced Number of Targets", heroes: ["dellons", "sungjinwoo", "jave", "chahaein"] },
      { name: "Fixed DMG", heroes: ["karlheron", "randgrid", "platin", "ballista", "chancellor", "jin"] }
    ]},
    { id: "life-related", name: "Life-related", color: "#F0A0C8", effects: [
      { name: "Immortality", scope: "Self", duration: true, heroes: ["ace", "orkah", "reginleif", "noho", "kris", "jane"] },
      { name: "Immortality", scope: "Allies", duration: true, heroes: ["clemyth"] },
      { name: "Revive", scope: "Allies", heroes: ["rosie", "clemyth", "branzebransel", "karin", "yui"] },
      { name: "Blessing", scope: "Self", heroes: ["lubu", "freyja", "silvesta", "mercure"] },
      { name: "Guts", scope: "Self", heroes: ["rook"] },
      { name: "Guts", scope: "Allies", heroes: ["dellons", "chloe", "pallanus", "branzebransel", "ace", "silvesta", "soi", "colt", "kyrielle", "miho"] },
      { name: "Indomitable", scope: "Self", heroes: ["randgrid", "kagura"] }
    ]},
    { id: "cooldown", name: "Cooldown-related", color: "#D98BB8", effects: [
      { name: "Cooldown Reduction", scope: "Allies", heroes: ["nezha", "ryan", "chahaein", "velika", "lucy"] },
      { name: "Cooldown Reduction", scope: "Self", heroes: ["dellons", "wukong", "aragon", "colt", "zhaoyun"] },
      { name: "Cooldown Reset", scope: "Self", heroes: ["randgrid", "chahaein", "reginleif", "lubu", "aris", "pascal"] },
      { name: "Cooldown Reset", scope: "Allies", heroes: ["chancellor", "hellenia"] },
      { name: "Cooldown Increase", scope: "Enemy", duration: true, heroes: ["skuld", "vanessa", "nia"] }
    ]},
    { id: "awakening", name: "Awakening-related", color: "#C86F9E", effects: [
      { name: "Awakening Gauge Recharge", scope: "Self", heroes: ["dellons", "orkah", "aris"] },
      { name: "Awakening Gauge Reduction", scope: "Enemy", heroes: ["rudy"] }
    ]},
    { id: "special", name: "Special", color: "#9CA8C8", effects: [
      { name: "Passive-Triggers (skill sets upon conditions met)", heroes: ["teo"] },
      { name: "Extra DMG upon Skill / Basic Atk", heroes: ["lubu", "kyle"] },
      { name: "Chain Attack (activates upon a kill)", heroes: ["aris", "lubu", "freyja", "silvesta", "dellons", "kyrielle"] },
      { name: "Follow-Up Attack", heroes: ["juri", "ballista"] },
      { name: "Counterattack", heroes: ["rudy", "jave", "li"] },
      { name: "Link", heroes: ["catty", "vanessa"] },
      { name: "Protection", heroes: ["randgrid", "hellenia"] },
      { name: "Camouflage", scope: "Self", heroes: ["omok", "colt", "ballista", "jupy", "jane", "rei"] },
      { name: "Taunt", scope: "Self", heroes: ["melia", "ryan", "knox", "li", "hellenia", "rahkun"] },
      { name: "Focus Target", heroes: ["asura"] },
      { name: "Bleed Explosion", heroes: ["bidam"] },
      { name: "Bomb Detonation", heroes: ["colt"] },
      { name: "Skill Conversion", heroes: ["dellons", "sungjinwoo", "jupy"] },
      { name: "Magic Bond", heroes: ["melia"] },
      { name: "Crystal Cluster", heroes: ["melia"] },
      { name: "Crystal Resonance", heroes: ["melia"] },
      { name: "Dark Energia's Saturation", heroes: ["kris"] },
      { name: "Pinnacle of Martial Arts", heroes: ["bailong"] },
      { name: "Reckless Valor", heroes: ["lubu"] },
      { name: "Final Judgment", heroes: ["reginleif"] },
      { name: "Level Up", heroes: ["sungjinwoo"] },
      { name: "Conqueror of Adversity", heroes: ["sungjinwoo"] },
      { name: "7-Dish Meal Set", heroes: ["deo"] },
      { name: "Guardian Spirit", heroes: ["evan"] }
    ]}
  ]
};