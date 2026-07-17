# Setup Guide — from zip file to live website

This guide assumes **zero prior experience**. Follow it top to bottom and you'll have your gacha guides site running on your own domain with hardened security. Estimated time: 45–90 minutes, most of which is waiting for DNS.

---

## 1. What you have

```
gacha-guides/
├── index.html            Home page
├── game.html             Tier list page (one page serves every game)
├── character.html        Character detail page
├── guides.html           Guide index with search
├── guide.html            Single guide article page
├── css/style.css         All visual styling
├── js/config.js          ← YOUR settings: site name, colors, nav, socials
├── js/app.js             The engine (you shouldn't need to touch this)
├── data/games.js         ← YOUR games and tier lists
├── data/characters.js    ← YOUR characters and builds
├── data/guides.js        ← YOUR guide articles
├── assets/               Put images here (portraits, banners)
├── _headers              Security config for Netlify / Cloudflare Pages
├── .htaccess             Security config for Apache shared hosting
└── nginx-security.conf   Security config for VPS self-hosting
```

Key idea: **you never edit HTML.** All content lives in the three `data/` files and `js/config.js`. Open them in any text editor (Notepad works; [VS Code](https://code.visualstudio.com) is free and much nicer).

There is no database and no server code. That is a deliberate security decision, explained in section 6.

---

## 2. Preview it on your computer (2 minutes)

Just double-click `index.html`. It opens in your browser and works fully offline — the sample site has two fictional games, eight characters, and three guides so you can see how everything connects.

Edit `js/config.js`, change `siteName` to your site's name, save, refresh the browser. That's the whole workflow.

---

## 3. Make it yours

### Site name, colors, links → `js/config.js`
Every option has a comment explaining it. Colors are hex codes like `#F5B942` — pick them at htmlcolorcodes.com. Invalid values are ignored safely (the site falls back to defaults).

### Add a game → `data/games.js`
Copy an existing game block (everything between one `{` and its matching `},`), paste it after, and edit. Rules:
- `id` is lowercase, no spaces, unique. It appears in URLs like `game.html?id=yourgame`.
- Tier rows list character `id`s — those must exist in `data/characters.js`.

### Add a character → `data/characters.js`
Same copy-paste-edit process. `game` must match a game `id`. `rarity` (5, 4, or 3) automatically sets the card colors and star count.

### Add a guide → `data/guides.js`
Guides are written as **blocks** (`h2`, `p`, `list`, `tip`) instead of raw HTML. This isn't just for convenience — it means guide text can never break or attack your site, even if you someday accept guest submissions.

### Images
Drop images into `assets/` and reference them like `"assets/aurelia.webp"`, or paste a full `https://` image URL. Anything else (like `javascript:` links) is automatically rejected by the engine.
- Use `.webp` where you can — half the file size of PNG.
- Portraits look best square, around 256×256.

**⚠️ Copyright note:** official character art belongs to the game publishers. Most tolerate fan sites, but you're hosting this publicly on your own domain — read the game's fan content policy (most gacha publishers publish one) and comply with takedown requests promptly.

### Common mistake
If a page suddenly goes blank after editing, you probably deleted a comma or quote in a data file. Press **F12** in the browser → **Console** tab — it will name the file and line number. Fix, save, refresh.

---

## 4. Buy a domain (10 minutes, ~$10/year)

1. Go to a registrar. Recommended: **Cloudflare Registrar** (at-cost pricing, free privacy) or **Porkbun**. Avoid registrars that upsell aggressively.
2. Search for the name you want. `.gg` fits the theme but costs more (~$70/yr); `.com`, `.net`, or `.site` are fine.
3. Buy it. Make sure **WHOIS privacy** is on (free at both recommended registrars) — otherwise your name and address are public.
4. Turn on **two-factor authentication** for your registrar account. Domain theft is a real attack; this is your single most important account.

---

## 5. Put it online

### Option A — Cloudflare Pages (recommended, free)

Best mix of free, fast, and secure. No server for anyone to hack, free HTTPS, and DDoS protection built in.

1. Create a free account at **pages.cloudflare.com**.
2. Choose **"Upload assets"** (direct upload — no GitHub needed), name your project, and drag the entire `gacha-guides` folder in.
3. Your site is now live at `yourproject.pages.dev`. Check it works.
4. Connect your domain: in the project → **Custom domains** → **Add** → type your domain. If you bought the domain at Cloudflare, it configures itself in one click. Otherwise it shows you a CNAME record to add at your registrar (their dashboard will have a "DNS records" page — add the record exactly as shown).
5. Wait 5 minutes to a few hours for DNS. Done — HTTPS is automatic.
6. The `_headers` file in your folder is applied automatically — your security headers are live. Verify at **securityheaders.com** (enter your domain; you should score an A).

**Updating the site later:** edit files locally, then re-upload the folder in the Pages dashboard. Takes under a minute.

### Option B — Traditional shared hosting (if you already pay for hosting)

Works with any cPanel-style host (Hostinger, Namecheap, etc).

1. In cPanel, open **File Manager** → `public_html`.
2. Upload everything, **including `.htaccess`** (enable "show hidden files" if you don't see it — files starting with a dot are hidden by default).
3. Point your domain at the host using the nameservers they give you.
4. In cPanel, enable **AutoSSL / Let's Encrypt** so HTTPS works. The included `.htaccess` then forces all visitors onto HTTPS and applies the security headers.
5. Verify at securityheaders.com. If headers are missing, your host may have `mod_headers` disabled — ask their support to enable it (it's a one-line change for them).

### Option C — Your own VPS (advanced, skip if unsure)

Only choose this if you want to learn server administration. A VPS is *your* responsibility to patch — an unmaintained one is the biggest security hole you can have. If you go this route: Ubuntu LTS + nginx + certbot for HTTPS, include the provided `nginx-security.conf`, enable `ufw` (allow only 22/80/443), disable SSH password login in favor of keys, and enable unattended-upgrades. Guides for each step are on DigitalOcean's community tutorials.

---

## 6. Security — what's protected and why

The single biggest decision was making the site **fully static**: no database, no login system, no PHP, no server code. Most website hacks (SQL injection, credential theft, remote code execution, vulnerable plugins) target server code — this site has none to attack. What remains is browser-side risk, and that's what the rest of this hardening covers.

| Protection | Where | What it stops |
|---|---|---|
| Everything escaped before rendering | `js/app.js` `esc()` | Cross-site scripting (XSS) — content can't become code |
| URL parameters used only as lookups | `js/app.js` | Attackers crafting malicious links to your site (reflected XSS) |
| Block-based guide content, no HTML | `data/guides.js` | Stored XSS via guide text |
| Image URLs whitelisted (`assets/` or `https://` only) | `js/app.js` | `javascript:` URL injection |
| Content-Security-Policy | header configs | Any injected script from running, even if a bug slipped through |
| No inline scripts anywhere | HTML files | Lets the CSP be strict (`script-src 'self'`) |
| HSTS + forced HTTPS | header configs | Traffic interception, fake-WiFi attacks |
| `frame-ancestors 'none'` + X-Frame-Options | header configs | Clickjacking (your site embedded in a trick page) |
| `nosniff`, Referrer-Policy, Permissions-Policy | header configs | MIME confusion, data leakage, feature abuse |
| Dotfiles/config files blocked from serving | `.htaccess` / nginx | Leaking your own config |

### Rules that keep it secure as you grow

1. **Don't add third-party `<script>` tags** (widgets, trackers, "free" chat boxes). Each one is a party you're trusting with your visitors, and each requires loosening the CSP. If you must add one, add *only* that domain to `script-src` in the header config — never add `'unsafe-inline'`.
2. **If you edit `js/app.js`**, keep the rule: all data goes through `esc()` before touching `innerHTML`. Never paste in code that uses `eval()` or builds HTML from raw input.
3. **Comments/accounts need a backend.** If you later want them, don't hand-roll it — use a hosted service (e.g. giscus, or Firebase like your other project) and extend the CSP to exactly those domains. The moment you add auth, also read up on that provider's security rules; that's where the risk moves.
4. **Protect the accounts, not just the site.** With a static site, the realistic way you get "hacked" is someone stealing your registrar or hosting login. 2FA on both, unique passwords, done.
5. **Tighten images later if you want:** the CSP allows images from any `https:` source so hotlinking art works out of the box. Once all your images live in `assets/`, change `img-src 'self' data: https:` to `img-src 'self' data:` in your header config for maximum strictness.

### Launch checklist

- [ ] securityheaders.com gives you an **A** on your live domain
- [ ] `https://` padlock shows; `http://` redirects to `https://`
- [ ] Try `yourdomain.com/game.html?id=<script>alert(1)</script>` — you should see the friendly "Game not found" page, no popup
- [ ] Registrar and hosting accounts both have 2FA
- [ ] WHOIS privacy is on

---

## 7. Ongoing maintenance

Static sites are nearly maintenance-free, but:

- **Keep a backup** — the whole site is one folder; copy it somewhere after every content update. (Better: keep the folder in a private GitHub repo — you get history for free, and both Netlify and Cloudflare Pages can auto-deploy from it when you're ready to level up.)
- **Update content regularly** — for a guides site, stale tier lists are worse than no tier lists. The `updated` field on each game shows visitors the date.
- Re-check securityheaders.com every few months; best practices evolve.

---

## 8. FAQ

**Do I need Node, npm, or a build step?** No. The site is plain HTML/CSS/JS by design. Edit, upload, done.

**Can I use this for multiple unrelated games?** Yes — that's the point of `data/games.js`. Prydwen covers a dozen games with the same structure.

**How do I add a whole new page type?** Copy an existing HTML shell, give its `<body>` a new `data-page` value, and add a matching render function in `js/app.js`. This is the one task that needs actual JavaScript.

**Why do my pages 404 when I share links like `character.html?id=aurelia`?** They shouldn't — query strings work everywhere. If the *page itself* 404s, check the file uploaded with the exact same lowercase name.

**Can I get analytics without breaking the security setup?** Yes — Cloudflare Pages includes privacy-friendly analytics with zero scripts (enable in the dashboard). That's the recommended option because it requires no CSP changes at all.
