/* ============================================================
   data/7krebirth/builds.js — RECOMMENDED BUILDS
   ============================================================ */
window.GG_BUILDS = window.GG_BUILDS || [];

/* ---- shared bits ---- */
var _T = function (special) {
  return ["ATK +12%", "ATK +6%", "HP +18%", { t: special, up: true }, "ATK +12%", "ATK +6%"];
};
var _T_DEF = function(special) {
  return ["DEF +12%", "DEF +6%", "HP +18%", { t: special, up: true }, "DEF +12%", "DEF +6%"];
};
var _SK = function (b, s1, s2, p, a) {
  return [
    { name: "Basic ATK", on: !!b }, { name: "Skill 1 / 8th Skill", on: !!s1 },
    { name: "Skill 2 / Top Skill", on: !!s2 }, { name: "Passive", on: !!p },
    { name: "Awakened Skill", on: !!a }
  ];
};

var SET_WEAKNESS = "Weakness Hit Chance +35% / Weakness Hit DMG +35%";
var SET_ASSASSIN = "Crit Rate +30% / Ignore DEF +15%";
var SET_BOSS = "DMG Dealt +30% / Boss DMG +40%";
var SET_RAGE = "All ATK +45% / Effect Hit Rate +20%";
var SET_GUARDIAN = "Block Rate +30% / Block DMG Reduction +10%";
var SET_EFFECT = "Effect Hit Rate +35% / Effect Probability +10%";
var SET_PALADIN = "HP +40% / Incoming Healing Boost +20%";
var SET_WILLPOWER = "Effect Resist Rate +35% / Starts Battle with 1-turn CC Immunity";

window.GG_BUILDS.push(

  /* ===================== ATTACK ===================== */
  {
    id: "orkah", name: "Orkah", type: "attack", tier: "New",
    properties: ["Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Effect Resistance"),
    skillEnhancement: _SK(1, 1, 1, 1, 1),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Orkah", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure"], PVP: ["Arena (5v5)", "Real Time Arena", "Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "PVP V1",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }, { slot: "Weapon", main: "Weakness Hit / Crit Rate" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Effect Resistance", "Effect Hit", "All ATK (%)"],
        set: SET_ASSASSIN,
        notes: "A possible build when the meta becomes less Block-oriented, allowing him to capitalize on more Ignore DEF and Crits to land bigger damage with his Awakened skill."
      },
      {
        name: "PVP V2",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Effect Resistance", "Effect Hit", "All ATK (%)"],
        set: SET_WEAKNESS,
        notes: "Standard PVP go-to build to ensure more consistent damage as enemies with high Block Rate may still exist."
      }
    ],
    blurb: "A debuffer that serves to cripple enemy defenses while supporting ally damage dealers to go for the kill. He also has lots of Buff Duration Reduction, and coupled with high Effect Hit, will likely be consistent in inflicting them."
  },
  {
    id: "fai", name: "Fai", type: "attack", tier: "Legendary++",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Fai", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Advent Expedition (God of Destruction)", "Advent Expedition (Shadow Kyle & Karma)", "Power Up Dungeon (Earth Particle)", "Adventure"], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "PVE Sub DPS / Burn Boost",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Playing a key role as a Sub DPS, her ATK% has to be highest / second highest on the team. Crit Rate & Crit DMG are the main stats to focus on, with Weakness Hit aimed to be around 46%."
      },
      {
        name: "Guild War Sniper",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_WEAKNESS,
        notes: "Execution comes in handy against certain enemies (for Guild War) since it is easier to ensure she wouldn't be aiming into an Immortal/Indomitable enemy."
      },
      {
        name: "Defensive Utility",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "Block Rate / DMG Taken Reduction" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_GUARDIAN,
        notes: "If she is required just for her Passive and to get DEF Reduction off, survivability is priority so investing in high Block Rate is probably best considering how frail she is."
      }
    ],
    blurb: "Currently the only hero that passively applies Physical Vulnerability. Also boasts a powerful ST skill and has active DEF Reduction, making her suitable to be both a support and DPS."
  },
  {
    id: "branzebransel", name: "Branze & Bransel", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 0, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Branze & Bransel", stats: ["All ATK (%) → Crush"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower", "Tower of Trials", "Power Up Dungeon (Light Particle)"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Allows them to do considerable DMG, especially necessary to have high DMG multipliers."
      },
      {
        name: "ATK-Based",
        slots: [{ slot: "Weapon", main: "All ATK (%)" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "All ATK (%)", "All ATK", "Crit Rate", "Weakness Hit", "Crit DMG"],
        set: "All ATK +45% / Effect Hit Rate +20%",
        notes: "Barrier provided upon enemy's death scales off their ATK. So having more ATK prolongs your ATTACK team much better and it is a low-investment option."
      }
    ],
    blurb: "Unassuming hero duo that not only provides more offensive capabilities to Attack teams but also defensiveness via Barriers. Low investment."
  },
  {
    id: "colt", name: "Colt", type: "attack", tier: "Legendary+",
    properties: ["None"], updated: "2024-06-25",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Colt", stats: ["All ATK (%) → Effect Hit"] },
    keyUsage: { PVE: [], PVP: ["Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "ATK-Based",
        slots: [{ slot: "Weapon", main: "All ATK (%)" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "All ATK (%)", "Crit Rate", "Weakness Hit", "All ATK", "Effect Hit"],
        set: "All ATK +45% / Effect Hit Rate +20%",
        notes: "Bomb DMG scales off ATK. Has passive Effect Hit Rate (34%) & at T4 (24%) so it is possible to focus on ATK% instead. Aim for 77 Speed to achieve maximum ATK Boost from passive."
      },
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Preferred in Guild War where you know Crits are going to be blocked. This build will maintain her DMG output. Aim for 77 Speed to achieve maximum ATK Boost from passive."
      }
    ],
    blurb: "Has unique effect of landing Bombs (reduce Buff Duration and also Paralyze if detonated). Also increases allies' Effect Hit Rate but will only make sense if Attack heroes also rely on debuffs."
  },
  {
    id: "dellons", name: "Dellons", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 1),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Dellons", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: ["Advent Expedition (Shadow Kyle)", "Infinite Tower", "Adventure"], PVP: ["Arena (5v5)", "Real Time Arena", "Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "PVP Slayer",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Effect Resistance", "Crit DMG", "All ATK (%)"],
        set: SET_WEAKNESS,
        notes: "He needs very high Crit Rate & Weakness Hit to be able to do well in Arena so focus on those two stats over Crit DMG. Effect Resistance will also be good to prevent him from being CC-ed at the start."
      },
      {
        name: "PVE Support",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "This build aims to let his S1 (ST Skill) hit hard on bosses."
      }
    ],
    blurb: "Overall still a great PDMG Buffer and now with a very convenient AOE Pierce Buff Removal & Execution, allowing him to remove enemies with ease."
  },
  {
    id: "kagura", name: "Kagura", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Kagura", stats: ["All ATK (%) → Effect Hit"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Arena (5v5)", "Total War", "Real Time Arena", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "ATK-Based",
        slots: [{ slot: "Weapon", main: "All ATK (%)" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "All ATK (%)", "Effect Hit", "All ATK", "Effect Resistance"],
        set: "All ATK +45% / Effect Hit Rate +20%",
        notes: "Heal scales off ATK% so having high ATK% has the potential to full-heal the entire team to turn the tide of the battle. Accessory may not be 5* even."
      },
      {
        name: "CC-Based (High Speed)",
        slots: [{ slot: "Weapon", main: "All ATK (%)" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "All ATK (%)", "Effect Hit", "All ATK", "Effect Resistance"],
        set: "Effect Hit Rate +35% / Effect Probability +10%",
        notes: "This aims to allow Petrification to happen at a higher rate, immobilizing the enemies when it is most necessary. Also, petrification DMG scales off ATK%."
      }
    ],
    blurb: "Strong Physical support hero with Crit DMG boost and providing a one-time heal when she triggers Indomitable. Also has decent debuff capabilities via Petrify and reducing heals. Sometimes, the earlier she falls, the better."
  },
  {
    id: "karlheron", name: "Karl Heron", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 0, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Karl Heron", stats: ["Effect Hit → Effect Resist"] },
    keyUsage: { PVE: ["Adventure", "Advent Expedition (Shadow Karma)", "Infinite Tower"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "All ATK (%)", "Effect Resistance", "Crit DMG"],
        set: SET_WEAKNESS,
        notes: "As with all other ATTACK heroes, the goal is to push the two main damage multipliers to a high amount. Even though he may not be a main damage dealer, the output can still be decent. Assassin Set can be used as the opposite."
      },
      {
        name: "Shock 'Em Well",
        slots: [{ slot: "Weapon", main: "Weakness Hit / Effect Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Weakness Hit", "Effect Hit", "Effect Resistance", "All ATK (%)", "Crit Rate"],
        set: "Effect Hit Rate +35% / Effect Probability +10%",
        notes: "Due to his low Shock chance, you can also raise it with this build to land Shock more easily for better enemy disruption, particularly against the main damage dealer on their team."
      }
    ],
    blurb: "Has a unique marking that serves to cripple the main damage dealer of the enemy team while also boosting the ATTACK team's damage capabilities via Crit DMG & PDMG Boost."
  },
  {
    id: "klahan", name: "Klahan", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Klahan", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Farming", "Adventure"], PVP: [] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_ASSASSIN,
        notes: "Focuses primarily on Crit Rate (make 100%) & Crit DMG to allow consistent DMG. If he misses Crits, the entire DMG output suffers and farming may fail. Weakness Hit is a bonus stat to boost DMG."
      }
    ],
    blurb: "A farmer dedicated to farming but would not highly recommend building because that's his sole purpose and you might be better off chasing a multi-role farmer."
  },
  {
    id: "kyle", name: "Kyle", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Kyle", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower", "Tower of Trials", "Power Up Dungeon (Light Particle)"], PVP: ["Guild War (3v3)", "Total War", "Arena (5v5)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit DMG", "Weakness Hit", "Crit Rate", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Has passive Crit Rate Boost (27%) and at T4 (18%) so aim for 55% Crit Rate from gears and the rest should be focused on Crit DMG & Weakness Hit."
      },
      {
        name: "CR Spike",
        slots: [{ slot: "Weapon", main: "Crit DMG / Crit Rate" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Crit Rate", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "A potential build if used against Bosses, particularly Castle Rush Spike, for players who have not built out other PVE damage dealers."
      }
    ],
    blurb: "Strong 4-TARGET AOE damage dealer that also has a targeted basic attack on the enemy with Highest ATK. Also has splash damage every 2 attacks but will not be considered the fastest farmer."
  },
  {
    id: "lubu", name: "Lu Bu", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Lu Bu", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: ["Adventure", "Advent Expedition (God of Destruction)", "Advent Expedition (Shadow Kyle & Karma)", "Infinite Tower"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Real Time Arena", "Total War"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Weakness Hit", "Speed", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "This build is suitable for both PVP and PVE, focusing on both key DMG multipliers i.e. Crit Rate & Weakness Hit. As he does more DMG when Weakness Hits happen, it is important to get it high."
      },
      {
        name: "PVE Support",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%) / DMG Taken Reduction" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "As a support, make sure his ATK stat is not higher than the main DPS and sub DPS."
      }
    ],
    blurb: "Only the Greatest Hero in the game. Not only is he an insane AOE damage dealer, he also supports ATTACK damage dealers by boosting their PATK considerably and granting DEF-Ignore Efficiency Boost (T6). And he heals...?"
  },
  {
    id: "randgrid", name: "Randgrid", type: "attack", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Randgrid", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower", "Advent Expedition (Shadow Kyle)"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Real Time Arena", "Total War"] },
    gearBuilds: [
      {
        name: "CC-Based (High Speed)",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Has passive Weakness Hit Rate Boost (39%) & at T4 (20%), allowing focus to placed on Crit Rate & Crit DMG, allowing her to become an impactful damage dealer."
      },
      {
        name: "Advent Expedition Kyle DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_BOSS,
        notes: "Boasting an ST that hits 4 times is no small damage. Make sure to have higher than 3576 ATK so that additional Piercing DMG can be applied."
      }
    ],
    blurb: "A hero that severely cripples an enemy's defenses by possessing both DEF Reduction & Block Rate Reduction. Being able to give allies CC Immunity is highly valued, especially for ATTACK teams."
  },
  {
    id: "ryan", name: "Ryan", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-26",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Ryan", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Castle Rush (Bellons, Jave, Spike)", "Advent Expedition (Shadow Karma)", "Raid (Destroyer Gaze)", "Sudden Raid (Calistra)"], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "Advent / CR / Sudden Raid DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Main damage dealer oriented build. Weapon main stat can have a few options depending on how well the offensive substats are rolled. If Crit Rate is lacking, make sure to prioritize it first."
      },
      {
        name: "T15 Iron Devourer 3-Man Farm / Immunity Support",
        slots: [{ slot: "Weapon", main: "HP (%) / DEF (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Reduction" }],
        substats: ["Block Rate", "HP (%)", "DEF (%)", "HP", "DEF", "Speed"],
        set: SET_GUARDIAN,
        notes: "In some cases, he is there to only provide Burn Immunity and a defensive build will suffice just to keep him alive for that purpose, for example in Castle Rush Rachel too."
      },
      {
        name: "Guild War Attack",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit DMG", "Weakness Hit", "Crit Rate", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Ensure that his Weakness Hit is high as he deals more DMG when landing Weakness Hits. Crit may be blocked in Guild War so it depends on what kind of enemy you choose to fight."
      }
    ],
    blurb: "High utility hero with Burn Immunity, 3-TARGET Attack DMG Boost, Taunt and also functions as a strong 3-TARGET damage dealer. (Not listed above: also good in Fire Power Up Dungeon.)"
  },
  {
    id: "teo", name: "Teo", type: "attack", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit DMG +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Teo", stats: ["Effect Hit → Effect Resist"] },
    keyUsage: { PVE: ["Adventure", "Farming", "Infinite Tower"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Real Time Arena", "Total War"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Weakness Hit", "Crit DMG", "Effect Resistance", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "At T6, has 100% Crit Rate on skills so focus will be on maximizing Crit DMG & Weakness Hit. (Prior to T6, make sure to have Crit Rate as priority.) Effect Resist has growing importance to resist Duration Reduction."
      }
    ],
    blurb: "Powerful double AOE hero with a passive Buff Duration Reduction AOE when 4 enemies have fallen, making things very convenient in any usage as it triggers in every phase of battle."
  },
  {
    id: "amelia", name: "Amelia", type: "attack", tier: "Legendary",
    properties: ["Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Amelia", stats: ["Effect Hit → Resilience"] },
    keyUsage: { PVE: ["Power Up Dungeon (Water Particle)"], PVP: ["Guild War (3v3)", "Total War"] },
    gearBuilds: [
      {
        name: "CC-Based (High Speed) V1",
        slots: [{ slot: "Weapon", main: "All ATK (%) / Effect Hit" }, { slot: "Armor", main: "All ATK (%) / DMG Taken Reduction" }],
        substats: ["Speed", "All ATK (%)", "Effect Hit", "All ATK", "Weakness Hit", "Block Rate"],
        set: SET_RAGE,
        notes: "Has passive Effect Hit Rate boost (up to 49%) so focus on ATK% as her barriers scale off ATK%, allowing herself and the team to survive longer."
      },
      {
        name: "CC-Based (High Speed) V2",
        slots: [{ slot: "Weapon", main: "All ATK (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Reduction / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "All ATK (%)", "All ATK", "Weakness Hit"],
        set: SET_EFFECT,
        notes: "Idea is to land the Concussion as soon as possible and also making sure the Unable to Recover is inflicted on the necessary enemies to overcome them easily."
      },
      {
        name: "Defensive Utility",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Reduction" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "All ATK (%)", "All ATK", "Weakness Hit"],
        set: SET_GUARDIAN,
        notes: "Has not much tankiness so to keep her alive, it may be necessary to give her some defensive capabilities to do well at least in the start of the battle."
      }
    ],
    blurb: "Has the unique CC Concussion which potentially can lock enemies down if they are constantly hit with multi-hit attacks. Also able to counter healing and boost allies' survivability with Barriers."
  },
  {
    id: "bailong", name: "Bai Long", type: "attack", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Bai Long", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Advent Expedition (God of Destruction)", "Advent Expedition (Shadow Kyle)", "Sudden Raid (Leonid)", "Raid (Destroyer Gaze)", "Tower of Trials"], PVP: [] },
    gearBuilds: [
      {
        name: "Advent Expedition / ToT DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Has passive Crit Rate boost (33%) & at T4 (18%) so will need 49% Crit Rate from gears with the rest focusing on Crit DMG. Often tend to be used with Biscuit so Weakness Hit should range from 20% (w/ Rachel) to 46% (w/o Rachel)."
      },
      {
        name: "Sudden Raid Leonid DPS",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Weakness Hit", "Crit Rate", "All ATK (%)", "All ATK", "Speed"],
        set: SET_ASSASSIN,
        notes: "Against Leonid who has very high DEF, DEF Ignoring from this build comes in very essential to be able to defeat the boss as soon as possible. As 100% Crit Rate is easier to achieve, focus on Crit DMG and 46% Weakness Hit."
      },
      {
        name: "T15 Destroyer Gaze 2/3-Man Farm",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Weakness Hit", "Crit Rate", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "An extremely endgame build that required a Legendary combination Ring to get him to survive as long as possible to be able to nuke the boss down without additional support. Crit DMG is prioritized over Weakness Hit."
      }
    ],
    blurb: "Main Physical damage dealer against bosses that deal Physical DMG. Has great DEF Ignoring capabilities and also able to heal allies to sustain the team against hard-hitting bosses."
  },
  {
    id: "ballista", name: "Ballista", type: "attack", tier: "Legendary",
    properties: ["End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 0, 1, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Ballista", stats: ["Crush → DMG Amplification"] },
    keyUsage: { PVE: [], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Speed", "Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK"],
        set: SET_WEAKNESS,
        notes: "Focus on Crit Rate & Weakness Hit for consistent DMG output even on Follow-Up attacks."
      }
    ],
    blurb: "3-TARGET damage dealer that deals additional Fixed DMG alongside having decent Follow-Up Attack chances. Viable against Tankier teams but also held back by her below average bulk."
  },
  {
    id: "bidam", name: "Bidam", type: "attack", tier: "Legendary",
    properties: ["Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Bidam", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Advent Expedition (Shadow Karma)", "Power Up Dungeon (Dark Particle)"], PVP: [] },
    gearBuilds: [
      {
        name: "Advent",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Effect Hit"],
        set: SET_BOSS,
        notes: "Although reliant on Bleed, Crit Rate & Crit DMG are still important multipliers for dealing pure DMG to bosses. Although ATK% allows for more (but not significantly more) Bleed DMG, overall the results lead to slower runs if Crits do not happen."
      },
      {
        name: "Powerup Dungeon",
        slots: [{ slot: "Weapon", main: "All ATK (%)" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["All ATK (%)", "All ATK", "Effect Hit", "Speed", "Crit Rate", "Weakness Hit"],
        set: SET_BOSS,
        notes: "This build increases Bleed DMG dealt to the Bosses."
      }
    ],
    blurb: "Bleed-focused damage dealer who does decently well as a 3-TARGET damage dealer. Only issue would be that inflicting Bleed is very RNG-based, sometimes even potentially not landing any stack."
  },
  {
    id: "deo", name: "Deo", type: "attack", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Deo", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Castle Rush (Death Castle - Dellons)", "Tower of Trials", "Adventure", "Infinite Tower"], PVP: [] },
    gearBuilds: [
      {
        name: "CR",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "While not the main damage dealer, this build helps to allow DMG against bosses to still be above average. Focus on Crit Rate & Crit DMG. Make sure his ATK is not higher than the actual DPSs."
      },
      {
        name: "Support",
        slots: [{ slot: "Weapon", main: "HP (%) / DEF (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Reduction" }],
        substats: ["Block Rate", "HP (%)", "DEF (%)", "Effect Resistance", "HP", "DEF"],
        set: SET_GUARDIAN,
        notes: "If bulk is lacking, this build can be used instead. Afterall, it is more important for him to survive for his immunity and Crit DMG Boost."
      }
    ],
    blurb: "A special hero to commemorate 2026's April Fools. Modelled after the previous CEO of Netmarble Nexus, he is a decent support for some PVE content but great support for our hearts."
  },
  {
    id: "shane", name: "Shane", type: "attack", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Shane", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Raid (Destroyer Gaze)", "Sudden Raid (Calistra)", "Tower of Trials"], PVP: [] },
    gearBuilds: [
      {
        name: "Raid",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK"],
        set: SET_BOSS,
        notes: "Standard damage dealer build. Has passive Crit Rate boost (41%) & at T4 (18%), so aim for 41% Crit Rate from gears and 20-46% Weakness Hit. If substat rolls for Crit Rate, can opt for double Crit DMG weapons."
      }
    ],
    blurb: "Main Physical damage dealer against bosses that deal Magic DMG. Short cooldown allowing cycling of skills quickly."
  },
  {
    id: "taka", name: "Taka", type: "attack", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2024-06-26",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Taka", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Castle Rush (Bellons, Jave, Spike)", "Advent Expedition (Shadow Karma)"], PVP: [] },
    gearBuilds: [
      {
        name: "CR / Advent DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Standard damage dealer build. Without innate self-boosts, he will need 82% Crit Rate from here and 46% Weakness Hit. If substat rolls for Crit Rate, can opt for double Crit DMG weapon main stats."
      }
    ],
    blurb: "A 3-TARGET damage dealer that also inflicts his version of Physical Vulnerability on the enemy, stackable over time. Being able to deal more DMG once the enemies' HP is 30% or lower makes him ideal for competitive PVE."
  },
  {
    id: "chahaein", name: "Cha Hae-in", type: "attack", tier: "Collab",
    properties: ["Early"], updated: "2024-06-25",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Cha Hae-in", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Infinite Tower"], PVP: [] },
    gearBuilds: [
      {
        name: "Crit-Weakness Based",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_WEAKNESS,
        notes: "Main priority would be to boost all 3 offensive multipliers to turn her into somewhat of a damage dealer to allow her to get her Chain Attacks off and continuously lower allies' Skill Cooldown (T6)."
      }
    ],
    blurb: "Previously had usage in the old design of Tower of Trials but currently, only decent in Infinite Tower as a support. Being able to cooldown allies' cooldown when using a skill is good but also too slow and inconsistent."
  },

  /* ===================== MAGIC ===================== */
  {
    id: "daisy", name: "Daisy", type: "magic", tier: "Legendary",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Butterfly Fan", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Raid (Ox King)", "Tower of Trials", "Sudden Raid", "Advent Expedition"], PVP: [] },
    gearBuilds: [
      {
        name: "Ox King Support",
        slots: [{ slot: "Weapon", main: "Crit DMG / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "Speed", "All ATK"],
        set: SET_ASSASSIN,
        notes: "It is very important to land Crits on the Ox King minions to kill them as fast as possible. Priority on Crit Rate & Crit DMG."
      },
      {
        name: "Raid Boss DMG Dealer",
        slots: [{ slot: "Weapon", main: "Crit DMG / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Crit Rate", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Transition towards Avenger Set, focusing on Crit Rate and Crit DMG (especially after Case is T6), to allow her to become an ST damage dealer."
      }
    ],
    blurb: "While Daisy provides Petrify Immunity, AOE Buff Removal and MATK Boost as a support, her role grows to also become an ST damage dealer towards endgame."
  },
  {
    id: "espada", name: "Espada", type: "magic", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Duelist Pistols", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Raid (Ox King)", "Sudden Raid", "Tower of Trials", "Advent Expedition"], PVP: [] },
    gearBuilds: [
      {
        name: "Raid Boss DMG Dealer (Early Game)",
        slots: [{ slot: "Weapon", main: "Crit DMG / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_ASSASSIN,
        notes: "Has passive Crit Rate Boost (40%) before T4 to make up the rest of the 60% with the Assassin Set & Crit Rate rolls."
      },
      {
        name: "Raid Boss DMG Dealer",
        slots: [{ slot: "Weapon", main: "Crit DMG / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Crit Rate", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Has passive Crit Rate Boost (40%) & at T4 (18%), allowing for priority in building for Crit DMG and Weakness Hit Chance. Will still need 42% Crit Rate from gears."
      }
    ],
    blurb: "Very niche ST damage dealer but does more DMG only when enemies have fallen in battle. Beyond being a DPS, she can also inflict Magic Vulnerability on single enemies."
  },
  {
    id: "miho", name: "Miho", type: "magic", tier: "Legendary",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Crimson Flute", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Castle Rush", "Advent Expedition", "Power Up Dungeon"], PVP: [] },
    gearBuilds: [
      {
        name: "PVE Boss Damage Dealer",
        slots: [{ slot: "Weapon", main: "Crit Rate / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "Speed", "All ATK"],
        set: SET_BOSS,
        notes: "Crit accessory can help dynamic if Miho fires her skills standard. Primarily a Sub DPS so aim for high Crit Rate & Weakness Hit taking into account allies and accessories."
      },
      {
        name: "PVE Boss Damage Dealer (Early Phase)",
        slots: [{ slot: "Weapon", main: "Crit Rate / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_ASSASSIN,
        notes: "Without much self-resets in Crit Rate & Weakness Hit, newer players may find difficulty in building these core stats. So using the Assassin Set for the early stages is decent."
      }
    ],
    blurb: "One of the more unique heroes that can be both a support with Weakness Hit DMG Boost, and also capable of being a Sub DPS with cleanse (T2)."
  },
  {
    id: "pascal", name: "Pascal", type: "magic", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Crit DMG +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Abperor Robes", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Raid (Iron Devourer)", "Tower of Trials", "Castle Rush", "Advent Expedition"], PVP: [] },
    gearBuilds: [
      {
        name: "Raid Boss DMG Dealer (Before T6)",
        slots: [{ slot: "Weapon", main: "Crit Rate / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Prior to T6, Crit Rate is highly important to maximize DMG against bosses. As he is usually paired with Biscuit, aim to have 13% Weakness Hit Rate."
      },
      {
        name: "Raid Boss DMG Dealer (T6)",
        slots: [{ slot: "Weapon", main: "Crit DMG / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit DMG", "Crit Rate", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Has 100% Crit Rate attached to S2. Shift your focus on Crit DMG pooling and Weakness Hit Rate (usually ~45%). Possible to also have some Crit Rate to supplement his basic attacks."
      },
      {
        name: "T15 Iron Devourer 2-Man Farm",
        slots: [{ slot: "Weapon", main: "Weakness Hit / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Weakness Hit", "Crit DMG", "Crit Rate", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "ST Cuts Ring is a minimal requirement. You will need 100% Weakness Hit Rate from gears (88%) & accessory substats (12%). ATK at 4.5K, Crit DMG at 270%."
      }
    ],
    blurb: "One of the most powerful ST damage dealers in the game and used in many situations against bosses. Definitely recommend to T6 as soon as possible."
  },
  {
    id: "ruri", name: "Ruri", type: "magic", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Bounty Crossbow", stats: ["DMG Amplification → All ATK (%)"] },
    keyUsage: { PVE: ["Advent Expedition", "Tower of Trials", "Castle Rush"] },
    gearBuilds: [
      {
        name: "PVE Boss Damage Dealer (Before T4)",
        slots: [{ slot: "Weapon", main: "Crit Rate / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Before T4, Weakness Hit could be lacking so it may be necessary to have Weakness Hit main stats on the weapons."
      },
      {
        name: "PVE Boss Damage Dealer (After T4)",
        slots: [{ slot: "Weapon", main: "Crit Rate / -" }, { slot: "Armor", main: "All ATK (%)" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Has passive Weakness Hit Chance Boost (39%) & at T4 (20%) and often used with Biscuit, allowing for higher priority in building for Crit Rate and Crit DMG."
      }
    ],
    blurb: "One of the best and most-accessible 3-TARGET damage dealers from the beginner banner but has been outclassed by Nezha. Still required for Shadow Yeonhee."
  },

  /* ===================== SUPPORT ===================== */
  {
    id: "clemyth", name: "Clemyth", type: "support", tier: "New",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Clemyth", stats: ["Resilience → HP (%)", "Resilience → HP (%)", "Resilience → HP (%)", "Resilience → HP (%)"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Arena (5v5)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "HP BOOSTED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "Effect Resistance", "DEF (%)", "HP", "DEF"],
        set: SET_PALADIN,
        notes: "Her heals are based off HP% so get it as high as possible. Since she has Max HP-Based Block Rate Boost, you will need at least 10,000 HP."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "Effect Resistance", "DEF (%)", "HP", "DEF"],
        set: SET_GUARDIAN,
        notes: "This build focuses on boosting her Block Rate and defensiveness if you lack HP gear."
      }
    ],
    blurb: "While she is able to revive allies, she also has a unique passive that increases overall Effect Probability of Tank & Universal allies, regardless of type of debuff. But this may limit her to CC-oriented teams only."
  },
  {
    id: "rosie", name: "Rosie", type: "support", tier: "Legendary++",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Rosie", stats: ["Resilience → Effect Hit", "Resilience → Effect Hit", "Resilience → Effect Hit", "Resilience → Effect Hit"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "HP (%)", "DEF (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "Recommended for Death teams so that Death has a better chance to be inflicted. Alternatively, for Death teams Gatekeeper set with Speed rolls also work (main stats see right)."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "HP (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)", "Speed"],
        set: SET_GUARDIAN,
        notes: "Has Max HP-Based DEF Boost so will need at least 9000 HP to get up to 900 additional DEF."
      }
    ],
    blurb: "While she is able to revive allies, she also has a unique passive that increases overall Effect Probability of Tank & Universal allies, regardless of type of debuff. But this may limit her to debuff-oriented teams only."
  },
  {
    id: "biscuit", name: "Biscuit", type: "support", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Biscuit", stats: ["DMG Amplif → DEF (%)", "DMG Amplif → DEF (%)", "DMG Amplif → DEF (%)", "DMG Amplif → DEF (%)"] },
    keyUsage: { PVE: ["Castle Rush", "Tower of Trials", "Advent Expedition", "Power Up Dungeon", "Sudden Raid", "Raid"], PVP: [] },
    gearBuilds: [
      {
        name: "ADVENT/CR-4567/RAIDS/TOWER",
        slots: [{ slot: "Weapon", main: "Weakness Hit / DEF (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_GUARDIAN,
        notes: "Usually enough for survivability. Choice of Armor main stat will depend on how much Block Rate on substats. Speed is a situational but can be the MOST important stat for efficient PVE runs."
      },
      {
        name: "DAMAGE SUPPORT (CR-123)",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%) / DMG Taken Red" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "Block Rate", "All ATK (%)", "All ATK"],
        set: SET_BOSS,
        notes: "At times, Biscuit has to take the role of the mini damage dealer, particularly in Castle Rush (Mon-Wed) to clear short of early phases. High Crit Rate with decent Crit DMG (200%) is sufficient."
      }
    ],
    blurb: "Can literally be said to be the MOST IMPORTANT Support Hero in the game used in almost every PVE content, especially those against Bosses. Aim to T6 as soon as possible."
  },
  {
    id: "orly", name: "Orly", type: "support", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "-", "Lv 30"],
    dedicatedEquipment: { name: "Orly", stats: ["DMG Amplif → HP (%)", "DMG Amplif → HP (%)", "DMG Amplif → HP (%)", "DMG Amplif → HP (%)"] },
    keyUsage: { PVE: ["Castle Rush", "Raid", "Advent Expedition", "Sudden Raid"], PVP: ["Total War"] },
    gearBuilds: [
      {
        name: "HEALER SUPPORT",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "HP (%) / -" }],
        substats: ["HP (%)", "Block Rate", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_PALADIN,
        notes: "Attacks, heals and barrier provision are all HP% scaling so this build fully maximizes her HP so that she gives MAGIC allies better survivability."
      },
      {
        name: "DEFENSIVE UTILITY",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Block Rate", "HP (%)", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_GUARDIAN,
        notes: "This build focuses on ensuring she survives well so as to allow her utility to be maintained on the field."
      }
    ],
    blurb: "A powerful MAGIC-ally support who not only provides consistent Crit Rate and Crit DMG boosts, but can also cleanse and inflict a big DEF Reduction on enemies (Skill enhancement is key!)."
  },
  {
    id: "platin", name: "Platin", type: "support", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Platin", stats: ["Resilience → Rejuvenate", "Resilience → Rejuvenate", "Resilience → Rejuvenate", "Resilience → Rejuvenate"] },
    keyUsage: { PVE: [], PVP: ["Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "DEF (%) / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "HP (%)", "Effect Resistance", "DEF", "HP"],
        set: SET_GUARDIAN,
        notes: "Attacks also scale off DEF so DEF% is the preferred main stat. He is usually used in the frontline/mid to get his Block Rate as high as possible while using DMG Taken Reduction armors."
      },
      {
        name: "GREATER RECOVERY",
        slots: [{ slot: "Weapon", main: "DEF (%) / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "HP (%)", "Effect Resistance", "DEF", "HP"],
        set: SET_PALADIN,
        notes: "Paladin set so that the Incoming Healing Boost increases his recovery to a large extent. However, this will require very better substat rolls for Block Rate."
      }
    ],
    blurb: "Provides convenient 3-TARGET HP Alteration, however newer creeping in Arena has caused his survivability to be poor and his other skill has absolutely no viable purpose."
  },
  {
    id: "alice", name: "Alice", type: "support", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Alice", stats: ["HP (%) → Rejuvenate", "HP (%) → Rejuvenate", "HP (%) → Rejuvenate", "HP (%) → Rejuvenate"] },
    keyUsage: { PVE: ["Adventure", "Tower of Trials", "Infinite Tower"], PVP: ["Arena (5v5)", "Total War", "Guild War (3v3)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "HEALER SUPPORT",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "HP (%) / -" }],
        substats: ["HP (%)", "Block Rate", "HP", "Effect Resistance", "DEF (%)", "DEF"],
        set: SET_PALADIN,
        notes: "Heals scale off HP% so this build maximizes healing capabilities as much as possible. It would be essential to also have 100% Block Rate."
      },
      {
        name: "DEFENSIVE UTILITY",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Block Rate", "HP (%)", "HP", "Effect Resistance", "DEF (%)", "DEF"],
        set: SET_GUARDIAN,
        notes: "This build reduces pressure on having insane Block Rate substat rolls but not entirely forsaking the necessary HP% increase."
      },
      {
        name: "RESISTANCE FOCUSED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_WILLPOWER,
        notes: "This build aims to raise her Effect Resistance so that she is able to get her Continuous Healing off for the team. A very niche build, sometimes used in Guild War."
      }
    ],
    blurb: "A vital hero in Tank teams for PVP due to her DEF Boost and Healing capabilities that sustain Tank team heroes very well."
  },
  {
    id: "diaochan", name: "Diaochan", type: "support", tier: "Legendary",
    properties: ["End"], updated: "2026-07-19",
    transcendence: ["ATK +12%", "ATK +6%", "HP +18%", { t: "DMG Reduction +10%", up: true }, "ATK +12%", "ATK +6%"],
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Diaochan", stats: ["Effect Hit → Resilience", "Effect Hit → Resilience", "Effect Hit → Resilience", "Effect Hit → Resilience"] },
    keyUsage: { PVE: [], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)"],
        set: SET_EFFECT,
        notes: "Has Max HP-Based Effect Hit Rate Boost so will need at least 9000 HP to get up to 45% additional Effect Hit Rate. High speed is essential. This is better used with MAGIC/ATTACK allies."
      },
      {
        name: "BLOCK-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)"],
        set: SET_GUARDIAN,
        notes: "Has Max HP-Based Effect Hit Rate Boost so will need at least 9000 HP to get up to 45% additional Effect Hit Rate. This is useful to be paired with a tankier team."
      },
      {
        name: "HP-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "HP (%) / Effect Hit" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)"],
        set: SET_PALADIN,
        notes: "This build should allow hitting 9000HP for her passive bonus to be achieved much easier but also, do not forsake her bulk."
      }
    ],
    blurb: "Solely designed for Guild War and to be used alongside MAGIC/ATTACK allies, giving them insane support like CC Immunity and Skill Cooldown reset. But in general, the Sleep itself can disrupt ANY enemy skill queue."
  },
  {
    id: "lina", name: "Lina", type: "support", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Lina", stats: ["HP (%) → Effect Hit", "HP (%) → Effect Hit", "HP (%) → Effect Hit", "HP (%) → Effect Hit"] },
    keyUsage: { PVE: ["Castle Rush", "Advent Expedition", "Tower of Trials", "Raid"], PVP: ["Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "HEALER SUPPORT",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "HP (%) / -" }],
        substats: ["HP (%)", "Block Rate", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_PALADIN,
        notes: "Heals based off her HP% so this build maximizes her healing capabilities. As she is mostly used in PVE, Block Rate% is less important but in PVP Block Rate should be 100% with Pano/May. Opt for Gatekeeper set in PVP."
      },
      {
        name: "RESISTANCE FOCUSED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_WILLPOWER,
        notes: "Having passive Effect Resistance Boost (30%), this build further raises her Effect Resistance so that she is able to resist well and heal the team. A very niche build, sometimes for Guild War."
      },
      {
        name: "2ND HIGHEST ATTACK",
        slots: [{ slot: "Weapon", main: "All ATK (%) / -" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Block Rate", "HP (%)", "HP", "DEF (%)", "DEF", "Effect Resistance"],
        set: SET_RAGE,
        notes: "A very niche build for Castle Rush Rachel with Nezha so that Nezha will cooldown Lina instead of a flex. Lina's buffs to be used with greater efficiency, as more Nezha's skills are used within this duration."
      }
    ],
    blurb: "Also an essential Support hero used in multiple PVE modes thanks to her capability of boosting DMG output of allies considerably with DMG Dealt Boost, Crit DMG Boost and DEF Reduction on the enemies."
  },

  /* ===================== DEFENSE ===================== */
  {
    id: "aquila", name: "Aquila", type: "defense", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Aquila", stats: ["Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War"] },
    gearBuilds: [
      {
        name: "CC BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "HP (%)", "DEF (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "Barrier & heals scale off Max HP so this build goes for a mixture of Effect Hit & HP%. If Effect Hit is decently High (considering Pots & allies), HP% should be the go to weapon main stat."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "HP (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)", "Speed"],
        set: SET_GUARDIAN,
        notes: "Build focuses on tankiness and survivability to maintain her utility on the field."
      }
    ],
    blurb: "Has the unique ability to shorten Death duration, increasing efficiency of the Death team. While usable at T0, the Link at T6 makes it compelling to fully kit her out."
  },
  {
    id: "radgrid", name: "Radgrid", type: "defense", tier: "Legendary+",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T_DEF("Block Rate +10%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Radgrid", stats: ["Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)"] },
    keyUsage: { PVE: ["Infinite Tower", "Power Up Dungeon", "Adventure"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "HP FOCUSED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "DEF", "Effect Resistance", "HP (%)", "HP"],
        set: SET_PALADIN,
        notes: "This build aims to not only let her heal more, but also increase Max HP due to her innate bulk so characters to outlast the enemy and win by HP."
      },
      {
        name: "BLOCK FOCUSED",
        slots: [{ slot: "Weapon", main: "DEF (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "DEF", "Effect Resistance", "HP (%)", "HP"],
        set: SET_GUARDIAN,
        notes: "For those without good Paladin pieces, the standard Gatekeeper build is something to fall back on to give her 100% Block Rate more easily with DMG Taken Reduction."
      }
    ],
    blurb: "A bulky support for Universal allies in the back row, prolonging their survivability by not only reducing the enemies' offensive stats but also providing barriers (T6) when hit every 3 times."
  },
  {
    id: "rudy", name: "Rudy", type: "defense", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("Block Rate +10%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Rudy", stats: ["Resilience / Resilience", "Resilience / Resilience", "Resilience / Resilience", "Resilience / Resilience"] },
    keyUsage: { PVE: ["Tower of Trials", "Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War"] },
    gearBuilds: [
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "DEF (%) / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Resistance", "DEF (%)", "HP (%)", "DEF", "HP"],
        set: SET_GUARDIAN,
        notes: "Standard build to boost tankiness via Block Rate and also DMG Taken Reduction."
      },
      {
        name: "RESISTANCE-FOCUSED (RECOMMENDED FOR T6)",
        slots: [{ slot: "Weapon", main: "DEF (%) / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Resistance", "DEF (%)", "HP (%)", "DEF", "HP"],
        set: SET_WILLPOWER,
        notes: "S2 provides CC Immunity at T6 so having Turn 1 CC Immunity almost guarantees that he will be able to cast them w/o hindrance from the enemy."
      }
    ],
    blurb: "Helps in the early game but loses traction upon progression in PVE. Still used in endgame PVP content due to his CC Immunity grant. S1 also has a 3-turn Buff Duration Reduction, which is rare."
  },
  {
    id: "aragon", name: "Aragon", type: "defense", tier: "Legendary",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T("Block Rate +10%"),
    skillEnhancement: _SK(0, 0, 0, 0, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Aragon", stats: ["Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit"] },
    keyUsage: { PVE: [], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "DEF (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "Effect Hit", "DEF", "Effect Resistance", "Crit Rate"],
        set: SET_GUARDIAN,
        notes: "Main DMG multipliers are DEF scaling. Main role is also to stun enemies effectively so having some Effect Hit substats would be good."
      }
    ],
    blurb: "Useful in Guild War but is very niche overall. Most of the time, he is also seen as 'fodder'. For Guild War purposes, T2 is generally the minimal so that the team can sustain as best as possible."
  },
  {
    id: "knox", name: "Knox", type: "defense", tier: "Legendary",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Block Rate +10%"),
    skillEnhancement: _SK(0, 0, 0, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Knox", stats: ["Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "HP (%)", "DEF (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "This build aims to increase the chance of landing Death while also having decent bulk for him to serve his Tank purposes. If Effect Hit is sufficient, HP% can be considered as his healing scales off HP%."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "Effect Hit / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)", "Speed"],
        set: SET_GUARDIAN,
        notes: "Build focuses on tankiness and survivability to maintain his utility on the field."
      }
    ],
    blurb: "Decent Death support as a tank who not only can tank and heal allies, but can also reduce enemies Effect Resistance, allowing for a more efficient Death team."
  },
  {
    id: "rook", name: "Rook", type: "defense", tier: "Legendary",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T("Block Rate +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Rook", stats: ["Resilience / HP (%)", "Resilience / HP (%)", "Resilience / HP (%)", "Resilience / HP (%)"] },
    keyUsage: { PVE: [], PVP: ["Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "HP-FOCUSED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "HP", "Effect Resistance", "DEF (%)", "DEF"],
        set: SET_PALADIN,
        notes: "Barrier and attacks scale with HP so it's best to maximize Max HP, while also ensuring tankiness with DMG Taken Reduction with good Block Rate rolls."
      },
      {
        name: "HP-FOCUSED",
        slots: [{ slot: "Weapon", main: "HP (%) / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "HP", "Effect Resistance", "DEF (%)", "DEF"],
        set: SET_GUARDIAN,
        notes: "With a passive Block Rate (20%), aim for 77% more Block Rate, along with DMG Taken Reduction to boost his tankiness as best as possible."
      }
    ],
    blurb: "Has been seen to be a monster in Total War & Guild War thanks to his insane HP alteration (T6). However, it requires good gear stats and does not see much use beyond these modes."
  },

  /* ===================== UNIVERSAL ===================== */
  {
    id: "aris", name: "Aris", type: "universal", tier: "New",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: ["ATK +12%", "ATK +6%", "HP +18%", { t: "DMG Reduction +10%", up: true }, "ATK +12%", "ATK +6%"],
    skillEnhancement: _SK(0, 1, 1, 1, 1),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Aris", stats: ["Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)"] },
    keyUsage: { PVE: ["Infinite Tower"], PVP: ["Arena (5v5)", "Total War", "Guild War (3v3)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "TANK TEAM DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / -" }],
        substats: ["Block Rate", "Weakness Hit", "Effect Resistance", "DEF (%)", "Effect Hit", "HP (%)"],
        set: SET_WEAKNESS,
        notes: "Aris' passive damage can also scale off her Crit and Weakness multipliers so to make her a powerful passive damage dealer, this set can be used."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / -" }],
        substats: ["Block Rate", "Weakness Hit", "Effect Resistance", "DEF (%)", "Effect Hit", "HP (%)"],
        set: SET_GUARDIAN,
        notes: "Aris relies on Block a lot for her to be super useful in her Awakened Passive status so this build helps to bring more luck in Block much easier."
      }
    ],
    blurb: "Primarily a Block Rate booster but also able to do a lot of Passive damage while Pushing/allowing her to cripple the enemy slowly. Will require team effort to ensure she is tanky enough."
  },
  {
    id: "gelidus", name: "Gelidus", type: "universal", tier: "Legendary++",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Gelidus", stats: ["Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience"] },
    keyUsage: { PVE: ["Power Up Dungeon", "Adventure", "Infinite Tower"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Real Time Arena", "Total War"] },
    gearBuilds: [
      {
        name: "CC BASED",
        slots: [{ slot: "Weapon", main: "DEF (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "Effect Hit", "Effect Resistance", "HP (%)", "DEF"],
        set: SET_EFFECT,
        notes: "Has DEF-Based Block Rate Boost so will need at least 1350/1650 DEF to get up to 27%/33% Block Rate."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "DEF (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "DEF (%)", "Effect Resistance", "HP (%)", "DEF"],
        set: SET_GUARDIAN,
        notes: "This build should allow hitting the required DEF for his passive bonus to be achieved much easier but with adding bulk."
      },
      {
        name: "BLOCK FOCUSED",
        slots: [{ slot: "Weapon", main: "DEF (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "DEF (%)", "Effect Resistance", "HP (%)", "DEF"],
        set: SET_GUARDIAN,
        notes: "Rather than indirectly boosting Block Rate via DEF, this build focuses on the 2 most important stats - Block Rate & DMG Taken Reduction on itself."
      }
    ],
    blurb: "Has the unique ability to reduce Effect Probability, making the team less susceptible to CC rifts, while also disrupting the enemies' flow with continuous freezing."
  },
  {
    id: "ace", name: "Ace", type: "universal", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Ace", stats: ["Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure", "Advent Expedition", "Raid"], PVP: ["Arena (5v5)", "Total War", "Guild War (3v3)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "DEFENSIVE UTILITY",
        slots: [{ slot: "Weapon", main: "HP (%) / DEF (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "DEF (%)", "Effect Resistance", "Effect Hit", "Speed"],
        set: SET_GUARDIAN,
        notes: "Very important to keep him alive for his passive to be retained. So making him bulky is the most important priority with as much Block Rate rolls as possible to complement DMG Taken Reduction."
      }
    ],
    blurb: "Roles across modes changes across progress as DEF Reduction is viable in most early game content like Raid but in late game, Incoming Healing Reduction gains attention in Arena, Guild War."
  },
  {
    id: "eileene", name: "Eileene", type: "universal", tier: "Legendary+",
    properties: ["Early"], updated: "2026-07-19",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "Lv 30"],
    dedicatedEquipment: { name: "Eileene", stats: ["Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience"] },
    keyUsage: { PVE: ["Advent Expedition", "Infinite Tower", "Adventure"], PVP: ["Total War"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "All ATK (%)", "DEF (%)", "HP (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "Goal is to land Shock with higher probability since her innate Effect Probability is considerably low. May opt for ATK% main stats as Shock scales off caster's ATK."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "Effect Hit / -" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Resistance", "HP (%)", "DEF (%)", "HP", "DEF"],
        set: SET_GUARDIAN,
        notes: "If using her, then having her around is the biggest asset your team can have to upkeep their DMG output. Thus keeping her alive as long as possible is the most important priority."
      }
    ],
    blurb: "A PATK Buffer but has been outclassed by heroes like Lu Bu, B&B and even Sieg in PVE. However, in cases where more than 1 ATK Buffer is needed, she can still step in."
  },
  {
    id: "elysia", name: "Elysia", type: "universal", tier: "Legendary+",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Elysia", stats: ["Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit", "Resilience / Effect Hit"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "IMMUNITY",
        slots: [{ slot: "Weapon", main: "DEF (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "HP (%)", "Effect Hit", "Effect Resistance", "DEF"],
        set: SET_WILLPOWER,
        notes: "Being able to cleanse debuffs with any skill would mean starting the battle with guaranteed CC Immunity equates to a guaranteed cleanse for your heroes."
      },
      {
        name: "DEFENSIVE UTILITY",
        slots: [{ slot: "Weapon", main: "DEF (%) / Effect Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "HP (%)", "Effect Hit", "Effect Resistance", "DEF"],
        set: SET_GUARDIAN,
        notes: "This build aims to make her more bulky so that her core effects can last on the field longer."
      }
    ],
    blurb: "Having the ability to cleanse debuffs with any skill and also having DEF Reduction makes her a great support unit in most content and also as an alternative to other DEF Reduction heroes."
  },
  {
    id: "jave", name: "Jave", type: "universal", tier: "Legendary+",
    properties: ["Early", "Midgame"], updated: "2026-07-19",
    transcendence: _T("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "Lv 30"],
    dedicatedEquipment: { name: "Jave", stats: ["DMG Amplif / Effect Hit", "DMG Amplif / Effect Hit", "DMG Amplif / Effect Hit", "DMG Amplif / Effect Hit"] },
    keyUsage: { PVE: ["Power Up Dungeon", "Adventure", "Infinite Tower", "Farming"], PVP: ["Guild War (3v3)", "Total War"] },
    gearBuilds: [
      {
        name: "DUNGEON SLAYER",
        slots: [{ slot: "Weapon", main: "Effect Hit / -" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_BOSS,
        notes: "This build increases Burn DMG dealt to the Bosses."
      },
      {
        name: "FARMING",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_WEAKNESS,
        notes: "Focus on Crit Rate & Crit DMG with a good number of ATK% rolls to allow him to do more damage from both his AOEs and his Burn."
      },
      {
        name: "CC FOCUSED (T6)",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)", "Speed"],
        set: SET_EFFECT,
        notes: "This build focuses on ensuring his Burn lands and is particularly used in Endgame PVP since Dragonflame can be potent in whittling the enemies' HP down."
      }
    ],
    blurb: "Special hero who is able to immobilize with a Stun and also reduce their HP over time via Burn. Also has the rare ability to counter. Unfortunately, has been outclassed as a Farmer and sub-Tank."
  },
  {
    id: "karma", name: "Karma", type: "universal", tier: "Legendary+",
    properties: ["Early"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Karma", stats: ["Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)"] },
    keyUsage: { PVE: ["Power Up Dungeon", "Infinite Tower"], PVP: ["Total War"] },
    gearBuilds: [
      {
        name: "BULKY DAMAGE",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Crit Rate", "Crit DMG", "DEF (%)", "HP (%)", "Effect Resistance"],
        set: SET_GUARDIAN,
        notes: "His heal is based off DMG dealt so it is important to mean his DMG and traditionally this was done by raising Crit Rate & Crit DMG. Has passive Block Rate of 33%."
      }
    ],
    blurb: "Used to be a Tank Team damage dealer but has been outclassed by others who deal more damage (i.e. Pallanus) and are more efficient in healing (i.e. Wukong). Nonetheless, still has an optional place in endgame Total War teams."
  },
  {
    id: "kris", name: "Kris", type: "universal", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 1),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Kris", stats: ["Effect Hit / All ATK (%)", "Effect Hit / All ATK (%)", "Effect Hit / All ATK (%)", "Effect Hit / All ATK (%)"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Total War", "Guild War (3v3)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "HP (%)", "DEF (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "Being a Death hero, the goal is to have the highest possible chance to land Death. Defensive armor main stats are used to prolong his existence on the field, given that he does have innate immortality."
      },
      {
        name: "HEALER ROLE",
        slots: [{ slot: "Weapon", main: "All ATK (%) / -" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["All ATK (%)", "All ATK", "Effect Hit", "Effect Resistance", "DEF (%)", "HP (%)"],
        set: SET_EFFECT,
        notes: "Healing scales off ATK% so having a max ATK% build for PVE can continuously sustain your team."
      }
    ],
    blurb: "One of the key heroes of the Death team. Beyond the Death team, he also heals the team whenever enemies die, making him great in PVE as well in content that have many enemies."
  },
  {
    id: "mist", name: "Mist", type: "universal", tier: "Legendary+",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Mist", stats: ["All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit"] },
    keyUsage: { PVE: ["Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War", "Real Time Arena", "Arena (5v5)"] },
    gearBuilds: [
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "All ATK (%)", "Effect Resistance"],
        set: SET_EFFECT,
        notes: "Armor seems increase chance of Fear and Death. ATK% may also be needed to allow Mist to have higher ATK to be able to inflict Death instantly after Fear. Has passive 34% Effect Hit Rate."
      },
      {
        name: "CC-BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "Effect Resistance", "All ATK (%)"],
        set: SET_GUARDIAN,
        notes: "Despite being a universal hero, she is not very tanky and so this build seeks to sustain her better so as to give her more time to land her debuffs for field control."
      },
      {
        name: "HIGH ATTACK SUPPRESSION",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "Effect Hit", "Effect Resistance", "All ATK (%)"],
        set: SET_RAGE,
        notes: "Having High ATK% allows Mist to have higher likelihood of inflicting Unremovable Death after Fear with just her Skill 2. However, this causes her to be more fragile and Death is still not guaranteed."
      }
    ],
    blurb: "The unique effect Fear reduces Effect Resistance of enemies to 0% and allows her to inflict Unremovable Death on enemies. Works insanely well in Guild War given the mode's targeted attacks. Less effective in Arena."
  },
  {
    id: "pallanus", name: "Pallanus", type: "universal", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Pallanus", stats: ["Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure"], PVP: ["Arena (5v5)", "Total War", "Guild War (3v3)", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "TANK TEAM DPS",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / -" }],
        substats: ["Crit Rate", "Crit DMG", "Block Rate", "All ATK (%)", "All ATK", "HP (%)"],
        set: SET_WEAKNESS,
        notes: "As she gets 100% Weakness Hit at T6, focus substats and gears on Crit Rate & Crit DMG. This maximizes her DMG output as she also gains PATK%. Before T6, include Weakness Hit rolls too."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / -" }],
        substats: ["Crit Rate", "Crit DMG", "Block Rate", "All ATK (%)", "HP (%)", "DEF (%)"],
        set: SET_GUARDIAN,
        notes: "This build sacrifices some DMG output for better durability with high Block Rate & DMG Taken Reduction."
      }
    ],
    blurb: "Has a powerful All Debuff Cleanse effect when HP falls below 30% and going Indomitable HP Swapping, potentially changing the tide of the battle. Unfortunately, will require 1 Defense & 1 Support hero to function very well."
  },
  {
    id: "rachel", name: "Rachel", type: "universal", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Rachel", stats: ["DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)"] },
    keyUsage: { PVE: ["Castle Rush", "Advent Expedition", "Power Up Dungeon", "Raid", "Tower of Trials", "Sudden Raid"], PVP: [] },
    gearBuilds: [
      {
        name: "PVE SUPPORT",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%) / DMG Taken Red" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Due to usage in multiple score-related Boss battles, this build helps to achieve that. If she is too frail, Guts Accessory and DMG Taken Reduction armors can be considered. Make sure ATK is not higher than main DPS and Crit Rate & Crit DMG are the main focus."
      },
      {
        name: "PVE SUPPORT",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_GUARDIAN,
        notes: "This build is an option if you find survivability an issue, especially in the early game where she isn't actually a SubDPS either. May need Speed to allow DPS to go last."
      }
    ],
    blurb: "Top-tier support hero that is used in every crucial content. Is local Weakness Hit Chance for main damage dealers. Also has a skill roster that aims to increase DMG output in many ways."
  },
  {
    id: "spike", name: "Spike", type: "universal", tier: "Legendary+",
    properties: ["Midgame", "End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Spike", stats: ["Effect Hit / HP (%)", "Effect Hit / HP (%)", "Effect Hit / DEF (%)", "Effect Hit / DEF (%)"] },
    keyUsage: { PVE: ["Power Up Dungeon", "Adventure", "Infinite Tower"], PVP: ["Guild War (3v3)", "Total War", "Real Time Arena"] },
    gearBuilds: [
      {
        name: "HP FOCUSED",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_PALADIN,
        notes: "Has Max HP-Based ATK Boost so this build aims to make it easier to get 9000-11000 HP to get 1080/1320 additional ATK. Furthermore, skills also have HP scaling."
      },
      {
        name: "CC FOCUSED",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "Effect Hit", "Effect Resistance", "HP (%)", "DEF (%)", "Speed"],
        set: SET_EFFECT,
        notes: "Directly increasing Effect Hit Rate and Effect Probability instead at the expense of some HP and Incoming Healing Boost (Note: Spike can also provide healing)."
      },
      {
        name: "DUNGEON SLAYER",
        slots: [{ slot: "Weapon", main: "Effect Hit / All ATK (%)" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Effect Hit", "All ATK (%)", "All ATK", "Speed", "HP (%)", "HP"],
        set: SET_BOSS,
        notes: "This build increases Freeze DMG dealt to the Bosses."
      }
    ],
    blurb: "Unique passive that has both Effect Hit Rate and Effect Resistance boost for all allies. However usage is pretty niche considering his Freeze doesn't behave like in Arena."
  },
  {
    id: "wukong", name: "Sun Wukong", type: "universal", tier: "Legendary+",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Sun Wukong", stats: ["Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif"] },
    keyUsage: { PVE: ["Infinite Tower", "Tower of Trials", "Adventure", "Power Up Dungeon"], PVP: ["Arena (5v5)", "Guild War (3v3)", "Real Time Arena", "Total War"] },
    gearBuilds: [
      {
        name: "WEAKNESS-BASED",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "DMG Taken Red / -" }],
        substats: ["Crit DMG", "Weakness Hit", "Block Rate", "All ATK (%)", "All ATK", "Speed"],
        set: SET_WEAKNESS,
        notes: "At T6, gets 100% Crit Rate allowing focus to be placed on Weakness Hit & Crit DMG. Sometimes, Crit DMG may be less of a focus and tankiness is prioritized instead. Can use this for non-Boss PVE too."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Crit DMG", "Weakness Hit", "All ATK (%)", "Effect Resistance", "HP (%)", "Speed"],
        set: SET_GUARDIAN,
        notes: "Has ATK-Based DEF Boost so a bulky build could also be possible, focusing on Block Rate & DMG Taken Reduction instead."
      },
      {
        name: "PVE DPS (T6)",
        slots: [{ slot: "Weapon", main: "Crit DMG / Weakness Hit" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "Primarily for those who are still reliant on him as a 3-TARGET damage dealer (even though he has been outclassed)."
      }
    ],
    blurb: "Has a large arsenal of effects on his sleeve (e.g. Petrify, Block Rate Reduction, DEF Ignore) to deal with a variety of enemies. Not only that, every skill also allows him to heal the team by a large amount."
  },
  {
    id: "trude", name: "Trude", type: "universal", tier: "Legendary+",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Trude", stats: ["Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif", "Resilience / DMG Amplif"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure"], PVP: ["Guild War (3v3)", "Total War", "Arena (5v5)"] },
    gearBuilds: [
      {
        name: "WEAKNESS-BASED DAMAGE DEALER",
        slots: [{ slot: "Weapon", main: "Weakness Hit / Crit DMG" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Crit DMG", "Weakness Hit", "Block Rate", "All ATK (%)", "All ATK", "Effect Resistance"],
        set: SET_WEAKNESS,
        notes: "At T6, focus purely on near 100% Weakness Hit & high Crit DMG. Aim also for 40% Block Rate from gears (passive Block Rate 60%)."
      },
      {
        name: "CRIT-BASED DAMAGE DEALER (BEFORE T6)",
        slots: [{ slot: "Weapon", main: "Crit Rate / Weakness Hit" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Crit Rate", "Weakness Hit", "Block Rate", "Effect Resistance", "All ATK (%)", "All ATK"],
        set: SET_ASSASSIN,
        notes: "Before getting 100% Crit Rate at T6, Crit Rate is still an important stat to have on her for DMG so using this build allows you to achieve a high Crit Rate with relative ease."
      },
      {
        name: "SURVIVE & SLAY",
        slots: [{ slot: "Weapon", main: "All ATK (%) / Weakness Hit" }, { slot: "Armor", main: "All ATK (%) / Block Rate" }],
        substats: ["Crit DMG", "Weakness Hit", "Block Rate", "Effect Resistance", "All ATK (%)", "All ATK"],
        set: SET_RAGE,
        notes: "Not a common build but this aims to increase her Barrier amount and self-heal as well to sustain herself for much longer since her Pain Endurance acts as a DMG Cap already."
      }
    ],
    blurb: "Unique passive (Pain Endurance) allows her to split the DMG taken across turns, so she can't be 1-tapped. Also has high durability but that has seemingly been powercrept by way stronger damage dealers."
  },
  {
    id: "baijiao", name: "Bai Jiao", type: "universal", tier: "Legendary",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(1, 1, 1, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Bai Jiao", stats: ["All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit", "All ATK (%) / Effect Hit"] },
    keyUsage: { PVE: ["Power Up Dungeon", "Power Up Dungeon", "Power Up Dungeon", "Tower of Trials"], PVP: [] },
    gearBuilds: [
      {
        name: "POWER UP DUNGEON DOT",
        slots: [{ slot: "Weapon", main: "All ATK (%) / -" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["All ATK (%)", "All ATK", "Effect Hit", "Block Rate", "Speed", "Effect Resistance"],
        set: SET_BOSS,
        notes: "Boss DMG also spills over to DMG from DOT effects (which scale off ATK%) so this allows maximum potential DOT damage allowing runs to be super fast."
      }
    ],
    blurb: "The King of Power Up Dungeons himself being able to take on 3 of them even without much investment. Not only has cleanse but also healing capabilities, making him a great support in these areas."
  },
  {
    id: "chancellor", name: "Chancellor", type: "universal", tier: "Legendary",
    properties: ["End"], updated: "2026-07-19",
    transcendence: _T_DEF("DMG Reduction +10%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "Lv 30", "Lv 30"],
    dedicatedEquipment: { name: "Chancellor", stats: ["Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)", "Resilience / DEF (%)"] },
    keyUsage: { PVE: ["Advent Expedition"], PVP: ["Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "ADVENT TEO",
        slots: [{ slot: "Weapon", main: "DEF (%) / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "DEF (%)", "HP (%)", "DEF", "HP", "Effect Resistance"],
        set: SET_GUARDIAN,
        notes: "Aim to keep him alive with highest possible Block Rate and DMG Taken Reduction (more so for Guild War)."
      }
    ],
    blurb: "Extremely low usage but shines against single bosses for being the hero with highest amount of DEF Reduction on a skill."
  },
  {
    id: "guanyu", name: "Guan Yu", type: "universal", tier: "Legendary",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Weakness Hit Chance +20%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Guan Yu", stats: ["DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)"] },
    keyUsage: { PVE: ["Sudden Raid", "Power Up Dungeon", "Advent Expedition", "Adventure", "Tower of Trials", "Castle Rush"], PVP: [] },
    gearBuilds: [
      {
        name: "SUB DPS",
        slots: [{ slot: "Weapon", main: "Crit DMG / Crit Rate" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Speed", "Crit Rate", "Weakness Hit", "Crit DMG", "All ATK (%)", "All ATK"],
        set: SET_BOSS,
        notes: "Prior to T6, the focus should be on maximizing Crit Rate and Crit DMG. After T6, focus on Crit DMG solely. Weakness Hit is secondary but good to have."
      },
      {
        name: "DEFENSIVE",
        slots: [{ slot: "Weapon", main: "HP (%) / DEF (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Block Rate", "HP (%)", "DEF (%)", "HP", "DEF", "Speed"],
        set: SET_GUARDIAN,
        notes: "He may not be as tanky as he looks so in early progression this build aims to increase his survivability to allow him to boost the Physical team well."
      }
    ],
    blurb: "PATK Buffer who also provides Shock Immunity, making him a must-build. Used in both early-game content and late-game content, sometimes for Shock Immunity, sometimes for Crit DMG boost."
  },
  {
    id: "nia", name: "Nia", type: "universal", tier: "Legendary",
    properties: ["Early", "End"], updated: "2026-07-19",
    transcendence: _T("Effect Hit Rate +24%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["-", "-", "-"],
    dedicatedEquipment: { name: "Nia", stats: ["Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience", "Effect Hit / Resilience"] },
    keyUsage: { PVE: ["Infinite Tower", "Adventure"], PVP: ["Real Time Arena", "Total War", "Guild War (3v3)"] },
    gearBuilds: [
      {
        name: "CC BASED (HIGH SPEED)",
        slots: [{ slot: "Weapon", main: "Effect Hit / HP (%)" }, { slot: "Armor", main: "DMG Taken Red / Block Rate" }],
        substats: ["Speed", "Block Rate", "HP (%)", "DEF (%)", "HP", "DEF"],
        set: SET_EFFECT,
        notes: "Speed is top priority for her on this build to not only allow your team to have speed advantage but also to land the Skill Cooldown Increase more effectively (since it is also probability-based)."
      }
    ],
    blurb: "Only hero with 5 Target Skill Cooldown Increase, which effectively locks the enemy team for at least 2 rounds of skills, making her very potent at high speed."
  },
  {
    id: "sieg", name: "Sieg", type: "universal", tier: "Legendary",
    properties: ["Early", "Midgame", "End"], updated: "2026-07-19",
    transcendence: _T("Crit Rate +18%"),
    skillEnhancement: _SK(0, 1, 1, 1, 0),
    potentials: ["Lv 30", "-", "-"],
    dedicatedEquipment: { name: "Sieg", stats: ["DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)", "DMG Amplif / All ATK (%)"] },
    keyUsage: { PVE: ["Raid", "Castle Rush", "Power Up Dungeon", "Advent Expedition"], PVP: [] },
    gearBuilds: [
      {
        name: "RAID/CR/ADVENT",
        slots: [{ slot: "Weapon", main: "Crit Rate / Crit DMG" }, { slot: "Armor", main: "All ATK (%) / -" }],
        substats: ["Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK", "Speed"],
        set: SET_BOSS,
        notes: "This is the ideal damage dealer build to maximize DMG output. There may be times where Guts/Immortal Rings are needed as his heal may not be sufficient and his bulk isn't enough."
      },
      {
        name: "HEAL FOCUSED",
        slots: [{ slot: "Weapon", main: "All ATK (%) / Crit Rate" }, { slot: "Armor", main: "All ATK (%) / Block Rate" }],
        substats: ["All ATK (%)", "Crit Rate", "Crit DMG", "All ATK", "Weakness Hit", "Speed"],
        set: SET_RAGE,
        notes: "This build aims to push his healing capabilities to its maximum possible. Of course, since it is already the Vanguard set, you can opt for Crit Rate for DMG or Block Rate for better survivability too."
      },
      {
        name: "DEFENSIVE UTILITY",
        slots: [{ slot: "Weapon", main: "All ATK (%) / Crit Rate" }, { slot: "Armor", main: "Block Rate / DMG Taken Red" }],
        substats: ["Block Rate", "Crit Rate", "Crit DMG", "Weakness Hit", "All ATK (%)", "All ATK"],
        set: SET_GUARDIAN,
        notes: "An early build for progressing players who do struggle to keep him alive since he has important reasons to be alive. Block Rate needs to be near or 100%."
      }
    ],
    blurb: "PATK Buffer who also provides Stun Immunity, making him a must-build. He may also need to double up as a secondary damage dealer at times especially at T6."
  }
);