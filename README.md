# Gacha Guides Site (Prydwen-style)

A fully static, config-driven gacha guides website: Prydwen-style home page,
per-game wiki hubs with sidebar navigation, filterable multi-category tier
lists with hover tooltips, character database, and article-style guides.

- **No build step, no database, no server code** — edit three data files and upload.
- **Theme presets + scrolling parallax background** — one word in config.js changes the whole look.
- **Hardened by default** — strict CSP (no inline scripts OR styles), escaped
  rendering everywhere, header configs for Cloudflare Pages/Netlify (`_headers`),
  Apache (`.htaccess`), and nginx (`nginx-security.conf`).
- **New here? Read `SETUP-GUIDE.md`** — zip file to live domain, zero experience needed.

Quick start: double-click `index.html` to preview locally, then edit
`js/config.js` and the files in `data/`.
