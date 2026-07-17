# Gacha Guides Site (Prydwen-style)

A fully static, config-driven gacha guides website: tier lists, character
builds, and long-form guides for any number of games.

- **No build step, no database, no server code** — edit three data files and upload.
- **Hardened by default** — strict CSP, escaped rendering, security headers for
  Cloudflare Pages/Netlify (`_headers`), Apache (`.htaccess`), and nginx
  (`nginx-security.conf`).
- **New here? Read `SETUP-GUIDE.md`** — it walks you from zip file to live
  domain with zero prior experience.

Quick start: double-click `index.html` to preview locally, then edit
`js/config.js` and the files in `data/`.
