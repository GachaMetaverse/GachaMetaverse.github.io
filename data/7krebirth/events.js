/* ============================================================
   data/7krebirth/events.js
   ============================================================ */
window.GG_EVENTS = window.GG_EVENTS || {};
window.GG_EVENTS["7krebirth"] = {
  updated: "2026-07-18",
  intro: "Optimal team compositions and mechanics for endgame bossing modes. Select an event below to view the required immunities and recommended formations.",
  tabs: [
    {
      id: "iron-devourer",
      name: "Iron Devourer",
      blurb: "Possesses PDMG Resistance and inflicts PDMG. The center head has the lowest HP of the three, making **Weakness Hit Chance** an extremely important mechanic to gear for.",
      requirements: ["Paralyze Immunity", "Poison Immunity"],
      teams: [
        { name: "Speed Clear", desc: "Highest damage output composition.", heroes: ["xiaoqiao", "kyrielle", "pascal", "biscuit", "melia"] },
        { name: "T15 2-Man Farm", desc: "Requires 100% Weakness to avoid hitting side heads.", heroes: ["xiaoqiao", null, "pascal", null, null] },
        { name: "T10/T15 Full Auto", desc: "Safe farming team utilizing Lucy to reduce PDMG taken.", heroes: ["xiaoqiao", "lucy", "pascal", "biscuit", "lina"] },
        { name: "T15 3-Man Farm", desc: "Requires 100% Weakness. Wukong's basic ATK must land center.", heroes: ["xiaoqiao", null, "wukong", null, "lucy"] }
      ]
    },
    {
      id: "calistra",
      name: "Sudden Raid: Calistra",
      blurb: "A Magic-type boss that inflicts MDMG and has MDMG Resistance. Sudden Raid requirements are heavy, making this a farming mode rather than a competitive one.",
      requirements: ["Burn Immunity", "Blind Immunity"],
      teams: [
        { name: "Top Scoring / Primary Farm", desc: "Speed Order: Rachel -> Biscuit -> Ryan -> Zhao Yun -> Shane", heroes: ["ryan", "zhaoyun", "shane", "rachel", "biscuit"] },
        { name: "Alternative 1", desc: "Replaces Ryan with Yui if survival is an issue.", heroes: ["yui", "zhaoyun", "shane", "rachel", "biscuit"] },
        { name: "Alternative 2", desc: "Replaces Rachel with Xiao for cooldown management.", heroes: ["ryan", "zhaoyun", "shane", "xiao", "biscuit"] }
      ],
      notes: "Zhao Yun should die to his passive, but a 5-star Immortal Ring is good enough to sustain his mechanics."
    },
    {
      id: "leonid",
      name: "Sudden Raid: Leonid",
      blurb: "Inflicts PDMG but has MDMG Resistance. Leonid possesses a massive 8K DEF pool and grants himself a barrier. **You must use Assassin sets on your main DPS** for Ignore DEF scaling.",
      requirements: ["Shock Immunity", "Death Immunity"],
      teams: [
        { name: "Top Scoring / Primary Farm", desc: "Speed Order: Lu Bu -> Bai Long -> Biscuit -> Guan Yu -> Xiao", heroes: ["guanyu", "xiao", "bailong", "biscuit", "lubu"] },
        { name: "Alternative", desc: "Rachel replaces Lu Bu if Lu Bu is not highly transcended (T6).", heroes: ["guanyu", "xiao", "bailong", "biscuit", "rachel"] }
      ],
      notes: "If Guan Yu has survival issues, use either a Guts ring or the Gatekeeper set."
    },
    {
      id: "cr-rudy",
      name: "CR: Guardian's",
      blurb: "Castle Rush against Rudy. Buff removal is important against Rudy's Link and Barrier buff. Damaging the barrier will not earn you points.",
      requirements: ["Stun Immunity (Evan)"],
      teams: [
        { name: "Top Scoring", heroes: ["evan", "biscuit", "nezha", "miho", "orly"] },
        { name: "Option 1", heroes: ["evan", "biscuit", "nezha", "miho", "lina"] },
        { name: "Option 2", heroes: ["evan", "biscuit", "ruri", "miho", "orly"] }
      ],
      notes: "Orly's S1 must be Skill Enhanced to have DEF Reduction. If not available, Lina is a viable replacement."
    },
    {
      id: "cr-eileene",
      name: "CR: Fodina",
      blurb: "Castle Rush against Eileene. Focuses on mitigating shock and out-damaging her high physical output.",
      requirements: ["Shock Immunity (Chloe)"],
      teams: [
        { name: "Top Scoring", heroes: ["chloe", "lina", "nezha", "miho", "biscuit"] },
        { name: "Option", heroes: ["chloe", "lina", "ruri", "miho", "biscuit"] },
        { name: "Newbie Setup", heroes: ["chloe", "lina", "sera", "miho", "biscuit"] }
      ]
    },
    {
      id: "cr-rachel",
      name: "CR: Immortal",
      blurb: "Castle Rush against Rachel. Debuff removal is critically important for Rachel's heavy debuffs (All Attack Reduction and Defense Reduction).",
      requirements: ["Burn Immunity (Ryan or Ariel)"],
      teams: [
        { name: "Top Scoring", heroes: ["ryan", "lina", "nezha", "miho", "biscuit"] },
        { name: "Option", heroes: ["ryan", "orly", "ruri", "miho", "biscuit"] },
        { name: "Newbie Setup", heroes: ["ariel", "lina", "sera", "lucy", "biscuit"] }
      ]
    },
    {
      id: "cr-dellons",
      name: "CR: Death",
      blurb: "Castle Rush against Dellons. Time taunts to tank Dellons' single-target skill. Dellons gains All DMG Nullification for 4 hits upon each unit's death.",
      requirements: ["Silence Immunity (Deo or Jin)"],
      teams: [
        { name: "Top Scoring", heroes: ["deo", "rachel", "ryan", "taka", "biscuit"] },
        { name: "Option", heroes: ["jin", "rachel", "ryan", "taka", "biscuit"] },
        { name: "Newbie Setup", heroes: ["jin", "rachel", "ryan", "lina", "biscuit"] }
      ],
      notes: "Make sure Jin's ATK is not higher than Taka's or Ryan's."
    },
    {
      id: "cr-jave",
      name: "CR: Ancient Dragon's",
      blurb: "Castle Rush against Jave. Blind helps to survive Jave's counterattacks. Bring 100% Crit Rate and 300% Crit DMG gear.",
      requirements: ["Stun Immunity (Sieg or Evan)"],
      teams: [
        { name: "Top Scoring", heroes: ["sieg", "rachel", "ryan", "taka", "biscuit"] },
        { name: "Option", heroes: ["sieg", "rachel", "ryan", "taka", "biscuit"] },
        { name: "Newbie Setup", heroes: ["evan", "rachel", "ryan", "lina", "biscuit"] }
      ],
      notes: "Make sure Sieg's ATK is not higher than Taka's or Ryan's."
    },
    {
      id: "cr-spike",
      name: "CR: Blizzard",
      blurb: "Castle Rush against Spike. Buff removal is important to negate minions' buffs. Use Kyle's buff removal instead of Biscuit's to reduce number of skills used.",
      requirements: ["Freeze Immunity (Feng Yan)"],
      teams: [
        { name: "Top Scoring", heroes: ["fengyan", "rachel", "ryan", "taka", "biscuit"] },
        { name: "Option", heroes: ["fengyan", "rachel", "kyle", "ryan", "biscuit"] },
        { name: "Newbie Setup", heroes: ["fengyan", "rachel", "ryan", "lina", "biscuit"] }
      ]
    },
    {
      id: "cr-kris",
      name: "CR: Hell",
      blurb: "Castle Rush against Kris. When Rook & Chancellor take DMG, Kris' skill cooldown is reduced by 13s, so it is advisable to apply Focus Target or have HIGH Weakness Hit.",
      requirements: ["Death Immunity (Xiao)"],
      teams: [
        { name: "Top Scoring", heroes: ["xiao", null, "fai", "shane", "biscuit"] },
        { name: "Option 1", heroes: ["xiao", null, "bailong", "shane", "biscuit"] },
        { name: "Option 2", heroes: ["xiao", "miho", "pascal", "xiaoqiao", "biscuit"] }
      ],
      notes: "Aim for high Weakness Hit especially for support heroes, even if it means sacrificing Crit DMG, to avoid hitting minions."
    }
  ]
};