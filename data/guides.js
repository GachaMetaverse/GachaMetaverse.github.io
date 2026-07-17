/* ============================================================
   GUIDES DATA — long-form articles.
   Content is written as "blocks" instead of HTML on purpose:
   it means guide text can NEVER inject code into your site,
   even if you later accept guide submissions from other people.

   Block types:
     { h2: "A section heading" }
     { p: "A paragraph of text." }
     { list: ["item one", "item two"] }
     { tip: "A highlighted callout box." }
   ============================================================ */

window.GG_GUIDES = [
  {
    id: "starforge-reroll",
    game: "starforge",
    title: "Starforge Chronicle: Reroll Guide (Patch 2.4)",
    author: "Staff",
    date: "2026-07-06",
    summary: "Who to aim for on a fresh account, and the fastest reroll route.",
    blocks: [
      { p: "A fresh account clears the prologue in about 18 minutes and earns 20 pulls. Here's how to spend them and who justifies keeping the account." },
      { h2: "Reroll targets" },
      { list: [
        "Aurelia — best possible start, benchmark DPS for all of 2.x",
        "Kestrel — nearly as good; she upgrades every future DPS you pull",
        "Any double 5★ start — keep it regardless of who"
      ]},
      { h2: "Fastest route" },
      { p: "Skip all optional dialogue, clear stages 1-1 through 1-6, claim mailbox rewards, then pull on the rate-up banner only. The standard banner is a trap for rerollers — its pool is diluted with off-meta units." },
      { tip: "Use the in-game 'guest account' option while rerolling and only bind an email once you keep a result." },
      { h2: "When to stop" },
      { p: "Rerolling past 90 minutes has bad expected value versus just playing — pity carries over on the rate-up banner, so an average account hits its first 5★ within a week of dailies." }
    ]
  },
  {
    id: "starforge-24-banners",
    game: "starforge",
    title: "Should You Pull? Patch 2.4 Banner Review",
    author: "Staff",
    date: "2026-07-04",
    summary: "Verdicts on both 2.4 banners, for meta players and collectors alike.",
    blocks: [
      { h2: "Banner 1: Aurelia (rerun)" },
      { p: "Pull if you lack a premier DPS. Skip if you already run a built hypercarry — her gains over an invested roster are marginal." },
      { h2: "Banner 2: Kestrel (debut)" },
      { p: "The strongest general recommendation this patch. Amplifiers age better than DPS units, and Kestrel works at zero extra investment." },
      { tip: "F2P budget note: 2.5 leaks suggest a defensive meta shift. If you can only afford one banner, Kestrel is the safer long-term hold." }
    ]
  },
  {
    id: "abyssal-dodge-primer",
    game: "abyssal",
    title: "Abyssal Requiem: Perfect Dodge Primer",
    author: "Staff",
    date: "2026-07-01",
    summary: "The timing system explained, and how Harrow makes it easy.",
    blocks: [
      { p: "Every enemy attack in Abyssal Requiem has a flash frame. Dodging within 0.2s of the flash triggers a perfect dodge: time slows, and counter-skills refund gauge." },
      { h2: "Training it" },
      { list: [
        "Practice on the Chapter 2 training dummy — its pattern is the strictest in early game",
        "Turn on 'audio cue' in accessibility settings; the chime is easier than the flash for most players",
        "Field Harrow: her slow-field widens the window from 0.2s to roughly 0.35s"
      ]},
      { tip: "Nyx players: her counter refunds full gauge only on perfect dodges, not regular ones. This mechanic is her entire ceiling — learn it before investing." }
    ]
  }
];
