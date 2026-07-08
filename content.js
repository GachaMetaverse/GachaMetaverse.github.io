/* ============================================================
   8% SCANS — CATALOG
   This is the only file you touch to add or edit manga.

   HOW TO ADD A SERIES
   Copy the template below into the CATALOG array and fill it in.
   The chapter list, chapter titles, update dates and (optionally)
   the cover are pulled automatically from your cubari link —
   you never list chapters by hand. When the cubari source
   updates, new chapters appear here automatically.

   sources: 1–3+ cubari.moe series links. The first one is the
   default; every extra link becomes a "Source 2 / Source 3"
   button in the reader automatically, so readers can switch if
   one host goes down.

   TEMPLATE:
   {
     slug: "my-manga",                  // unique, lowercase, url-safe, never change it later
     title: "My Manga Title",
     author: "Author Name",             // optional
     artist: "Artist Name",             // optional
     status: "Ongoing",                 // Ongoing | Completed | Hiatus | Dropped
     tags: ["Action", "Comedy"],        // optional
     description: "One or two sentences about the series.",
     cover: "",                         // optional — leave "" to auto-use the cubari cover
     featured: true,                    // featured series appear in the home hero
     sources: [
       { label: "Main",   url: "https://cubari.moe/read/gist/XXXXXXXX/" },
       { label: "Backup", url: "https://cubari.moe/read/imgur/XXXXXXX/" },
     ],
   },
   ============================================================ */

const CATALOG = [

  // DEMO ENTRY — replace with your own series.
  // (cubari.moe/read/gist/OPM is cubari's long-running public demo
  //  series; if it has gone offline the site will simply show this
  //  entry as "source unavailable".)
  {
    slug: "demo-series",
    title: "Demo Series",
    author: "Replace Me",
    status: "Ongoing",
    tags: ["Demo"],
    description: "This is a demo entry so you can see the site working. Open content.js and replace it with your own series.",
    cover: "",
    featured: true,
    sources: [
      { label: "Main", url: "https://cubari.moe/read/gist/OPM/" },
    ],
  },

];
