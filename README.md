# I Gusti Ngurah Premana — Notaris & PPAT

Bilingual (Indonesian first, English second), single-page informational website for I Gusti Ngurah Premana, S.T., S.H., M.Kn., Notaris & PPAT in Kerobokan, Badung, Bali.

It is a static React + TypeScript + Vite build. There is no backend, forms, cookies, or analytics. Requirements live in [`PRD.md`](PRD.md) and [`docs/website-mvp/`](docs/website-mvp/).

> **Not yet approved for publication.** The copy, facts, and photos are pending owner review. See [Publication gate](#publication-gate).

## Prerequisites

- Node 24 and npm 11
- For the end-to-end tests, Chromium for Playwright (`npx playwright install chromium`, once)

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server with hot reload (http://localhost:5173)
npm run build        # type-check (tsc -b) and build to dist/
npm run preview      # serve dist/ locally (http://localhost:4173)
npm run lint         # ESLint
npm run test:e2e     # Playwright smoke tests (builds and serves dist/ itself)
```

## Project structure

```text
index.html               lang="id", Indonesian metadata, fonts, hero preload
public/
  favicon.svg            Scale mark
  images/                7 photos (extracted from docs/preview.html)
scripts/
  extract-preview-images.mjs   one-off: prototype data URIs → public/images/
src/
  main.tsx  App.tsx  style.css  (Tailwind 4 tokens and helper classes)
  config/site.ts         name, titles, URLs, map embed, image sizes, feature flags
  content/id.ts  en.ts   every visible string, aria-label, and alt text
  i18n/                  locale context, LocaleProvider, useLocale()
  types/site.ts          shared types (Dictionary, SiteConfig, …)
  components/            Header, Footer, Logo, SkipLink, SectionHeader, ExternalLink,
                         ServiceDialog, MapEmbed
  sections/              Hero, About, Values, PracticeAreas, Office, Insights
tests/e2e/smoke.spec.ts  acceptance tests AT-01…AT-07 and accessibility checks
docs/                    task docs and reference material (inputs; do not edit)
```

## Editing content

- **Copy.** Edit `src/content/id.ts` and `src/content/en.ts`. Both files are typed `Dictionary`, so a key missing from either language fails the build. Keep both languages in step.
- **Facts and links.** Edit `src/config/site.ts`: name, titles, LinkedIn and Google Maps URLs, the map embed URL, and image metadata. Nothing else in `src/` hard-codes these.
- **Pejabat Lelang.** This is hidden by default. Set `flags.showAuctionOfficer: true` in `src/config/site.ts` only after the owner confirms the appointment and its scope. The Practice Areas grid then switches to three cards.
- **Office photo row.** The interior and formal-portrait tiles in the Office section are hidden. Set `flags.showOfficePhotos: true` in `src/config/site.ts` to show them again.
- **Photos.** Replace the file in `public/images/` under the same name, then update its `width`/`height` in `src/config/site.ts`. Use owner-supplied originals only, and never upscale or retouch. `position` sets the focal point where a photo is cropped.
- **Content rules.** Do not add testimonials, ratings, client counts, phone numbers, email addresses, opening hours, a street address, awards, or sales calls-to-action. See `CLAUDE.md` → "Content guardrails".

## Deploying `dist/`

`npm run build` produces a fully static `dist/`: `index.html`, hashed `assets/`, `images/`, and `favicon.svg`. Any static host, CDN, or Nginx can serve it, over HTTPS only. It is a single page with hash anchors, so no SPA rewrites are needed.

Sample Nginx server block (check the headers before enabling them):

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;              # replace once the domain is confirmed
    root /var/www/premana/dist;

    # ssl_certificate / ssl_certificate_key …

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location /images/ {
        add_header Cache-Control "public, max-age=604800";
    }

    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.google.com https://maps.google.com" always;
}
```

Third-party requests: Google Fonts on page load, and Google Maps once a visitor scrolls near the Office location card.

## Publication gate

Do not deploy until the owner has signed off on each of these (tracked in `docs/website-mvp/requirement.md` §10 and `tasks.md` phase E):

1. Facts: name and titles, active appointments, LinkedIn URL, map coordinates.
2. Photo rights and consent for every person shown, plus original high-resolution files.
3. A professional-ethics review of the presentation (INI / IPPAT codes).
4. Editorial approval of all copy in both languages, including the legal explainers and disclaimer.
5. The production domain. Then add `og:url`, `og:image`, canonical, `robots.txt`, and `sitemap.xml`.

Deployment needs explicit authorization from the owner.
