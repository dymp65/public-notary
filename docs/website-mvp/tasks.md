# Tasks: Website MVP

Spec: [requirement.md](requirement.md) · How: [plan.md](plan.md) · Product: [PRD.md](../../PRD.md)

**Legend:** `[ ]` todo · `[~]` in progress · `[x]` done and verified · `[!]` blocked (say by what).
**Priority:** P0 = required for the MVP · P1 = before launch · P2 = later.

Rules:

- Work top to bottom unless a task says otherwise.
- Tick a task only after its "Done when" check passes.
- Log every check in the [verification log](#verification-log) with its real output.

## Phase A: Audit and prepare (P0)

- [x] **A1 · Baseline check** (P0)
  - Do: run `npm install`, `npm run build`, and `npm run lint` on the untouched template.
  - Done when: the results (pass/fail plus notable output) are in the verification log.
- [!] **A2 · Version control** (P0, owner decision; blocked: awaiting the owner's answer. Not initialized, per CLAUDE.md "Never … `git init` unless asked")
  - Do: ask the owner whether to `git init` and commit the untouched baseline, so every later change can be reviewed.
  - Done when: the decision is recorded, and the repo is either initialized or the option is explicitly declined.
- [x] **A3 · Extract photos** (P0 · G-11 · requirement §2.3)
  - Files: `scripts/extract-preview-images.mjs`, `public/images/*.jpg`
  - Do: write the script (plan §4.11) and run it.
  - Done when: `ls public/images` shows the 7 mapped filenames, and `sips -g pixelWidth -g pixelHeight public/images/*.jpg` matches the inventory sizes.
- [x] **A4 · Compare with screenshots** (P1 · O-06)
  - Do: compare each extracted photo with `docs/profile-*.png`. Note where the owner's screenshots or original files would give better quality.
  - Done when: findings are added to O-06 in requirement §10. No upscaling and no re-cropping of faces.

## Phase B: Foundation and structure (P0)

- [x] **B1 · Dependencies** (P0 · plan §2.1)
  - Files: `package.json`, `package-lock.json`, `vite.config.ts`
  - Do: `npm install tailwindcss@^4.3 @tailwindcss/vite@^4.3 lucide-react@^1.61`, then add `tailwindcss()` to the Vite plugins.
  - Done when: `npm run build` passes with the plugin active.
- [x] **B2 · Remove template leftovers** (P0 · plan §2.2)
  - Files: `src/App.css`, `src/index.css`, `src/assets/`, `public/icons.svg`, `public/favicon.svg`
  - Do: delete the template files and replace the favicon with the Scale mark.
  - Done when: nothing references the deleted files and the build passes.
- [x] **B3 · Global styles** (P0 · G-07, G-10 · plan §2.3)
  - Files: `src/style.css`
  - Do: add the Tailwind import, `@source not "../docs"`, `@theme` tokens, base reset, helper classes, `scroll-margin-top`, dialog scroll lock, and reduced-motion rules.
  - Done when: `bg-cream`, `text-forest`, `font-display`, `section-eyebrow`, and the rest work, and the build passes.
- [x] **B4 · `index.html`** (P0 · FR-11, G-12, G-17 · plan §2.4)
  - Do: set `lang="id"` and add:
    - the id title and description drafts;
    - theme-color and the favicon;
    - Google Fonts with preconnect, including Playfair italic 400;
    - the hero preload;
    - the OG text tags.
  - Done when: the built `dist/index.html` contains all of these and no template title.
- [x] **B5 · Types** (P0 · plan §4.1)
  - Files: `src/types/site.ts`
  - Do: define `Locale`, `ServiceId`, `ImageKey`, `Dictionary`, and `SiteConfig`.
  - Done when: `tsc -b` passes.
- [x] **B6 · Site config** (P0 · O-01, O-02, O-05, O-11 · plan §4.2)
  - Files: `src/config/site.ts`
  - Do: add the name, titles, links, map embed URL, images with sizes, service list and service images, gallery order, and `showAuctionOfficer: false`.
  - Done when: no URL, fact, or image path is hard-coded anywhere else in `src/`.
- [x] **B7 · Dictionaries** (P0 · FR-02, G-04, G-05, G-09, G-14 · requirement §7)
  - Files: `src/content/id.ts`, `src/content/en.ts`
  - Do:
    - Port the prototype `dictionary` and `insightDetails`.
    - Add the `a11y` labels, image alt texts, logo subtitle, About credential list (requirement §5.2), map and gallery strings, meta title and description, and both `servicesText` variants.
    - Remove the internal auction note and `focusText`.
  - Done when: both files are typed `Dictionary` and the build passes (this enforces parity).
- [x] **B8 · Locale context** (P0 · FR-02 · plan §4.3)
  - Files: `src/i18n/context.ts`, `src/i18n/LocaleProvider.tsx`, `src/i18n/useLocale.ts`
  - Done when: toggling the locale updates `<html lang>`, the title, and the meta description, and a first visit (empty storage) is `id`.
- [x] **B9 · Shell components** (P0 · FR-01, FR-10, G-13 · plan §4.4)
  - Files: `src/components/{Logo,SectionHeader,SkipLink,Header,Footer}.tsx`
  - Done when: the header and footer render in both locales and lint passes.
- [x] **B10 · Sections** (P0 · FR-03, FR-04, FR-05, FR-09, NFR-08 · requirement §5, plan §4.6, §4.7, §4.10)
  - Files: `src/sections/*.tsx`
  - [x] Hero
  - [x] About (hybrid, requirement §5.2)
  - [x] Principle
  - [x] PracticeAreas
  - [x] Values
  - [x] Office (hybrid, requirement §5.3)
  - [x] Insights
  - Done when: every section renders with the prototype class strings, there is a single `<h1>`, and headings run in logical order.
- [x] **B11 · Interactive components** (P0 · FR-06, FR-07, FR-08 · plan §4.5, §4.8, §4.9)
  - Files: `src/components/{ServiceDialog,OfficeGallery,MapEmbed}.tsx`
  - Done when: each works with a mouse in both locales. Keyboard and accessibility hardening happens in phase C.
- [x] **B12 · Compose the app** (P0 · NFR-01, AT-10)
  - Files: `src/App.tsx`, `src/main.tsx`
  - Done when: `npm run lint` and `npm run build` pass, and `npm run preview` shows the full page with no console errors.

## Phase C: Behaviour, accessibility, design fidelity (P0)

- [x] **C1 · Header, menu, anchors** (P0 · FR-01, FR-12, AT-01, AT-02, G-03, G-07, G-16)
  - Done when:
    - Every nav link lands with its heading visible, at both 375 and 1440 px.
    - The menu has `aria-expanded` and `aria-controls`.
    - The menu closes on link click, on `Escape` (focus returns to the toggle), and on resize to ≥1024 px.
    - No hidden overlay intercepts clicks.
- [x] **C2 · Locale completeness** (P0 · FR-02, NFR-09, AT-03, G-01, G-04, G-05)
  - Done when:
    - In EN mode no Indonesian remains in text, `aria-label`, `alt`, or `title`, and vice versa (proper nouns excepted).
    - Switching with the dialog open or an accordion expanded updates them in place.
    - `<html lang>` follows the locale.
- [x] **C3 · Practice dialog** (P0 · FR-06, FR-12, AT-04, G-01, G-02)
  - Done when:
    - Focus moves into the dialog, and Tab and Shift+Tab never reach page content behind it.
    - `Escape`, the backdrop, and the close button all close it, and focus returns to the "Baca selengkapnya" trigger.
    - The page behind does not scroll, and long content scrolls inside the dialog at 320 px.
- [x] **C4 · Pejabat Lelang gating** (P0 · FR-06, G-09, O-02)
  - Done when:
    - With `showAuctionOfficer: false`, no auction card or mention appears anywhere.
    - With `true`, the third card and its copy appear without internal notes, and the grid switches to 3 columns.
- [x] **C5 · Office gallery** (P0 · FR-07, AT-05, G-15)
  - Done when:
    - Next ×5 and Previous ×5 wrap correctly.
    - Every photo has meaningful, localized alt text.
    - The position is announced, and nothing shifts layout.
- [x] **C6 · Map** (P0 · FR-08, NFR-07, G-08, O-05)
  - Done when:
    - The network panel shows no request to Google Maps on initial load; the map is requested when the location card nears the viewport (owner decision 2026-10-27, replacing click-to-load).
    - The iframe has a localized `title`.
    - The Maps link still works when the iframe is blocked.
- [x] **C7 · Insights accordion** (P0 · FR-09, AT-06, G-06)
  - Done when:
    - Each item toggles by mouse and keyboard, and `aria-expanded` matches.
    - Each panel `id` matches its `aria-controls`.
    - The disclaimer is visible in both locales.
- [x] **C8 · External links** (P0 · FR-04, FR-10, NFR-06, AT-07)
  - Done when: every LinkedIn and Maps link uses `site.links`, `target="_blank"`, and `rel="noopener noreferrer"`.
- [x] **C9 · Motion and no-hover use** (P0 · G-10)
  - Done when:
    - With reduced motion on, there are no hover translations or scales and no smooth scrolling.
    - Every feature works by touch and keyboard, without hover.
- [x] **C10 · Visual fidelity pass** (P0 · NFR-02, AT-08)
  - Done when:
    - Screenshots at 320/375/768/1024/1440 px have been compared with `docs/preview.html`, and About and Office with the `docs/preview.png` composition.
    - There is no clipping, overlap, stretched photo, tiny tap target, or horizontal scroll.
    - Remaining differences are logged.
- [x] **C11 · Forbidden-content sweep** (P0 · AT-11 prep · requirement §7.3)
  - Done when: the grep in plan §6 has no unreviewed hits, and a manual read in both locales finds nothing from requirement §7.3.

## Phase D: SEO, performance, quality (P0/P1)

- [x] **D1 · Metadata** (P0 part done; OG image/url and canonical are P1, `[!]` O-09 · FR-11, NFR-08, AT-09)
  - Done when: the title and description are correct per locale at runtime, the OG text tags are present, and nothing makes a false claim.
- [x] **D2 · Image delivery** (P0 · NFR-05, AT-09, G-11)
  - Done when:
    - Every `<img>` has a width and height.
    - Only the hero is eager, with `fetchPriority="high"` and a preload.
    - The network panel shows no 404s, and Lighthouse CLS ≈ 0.
- [!] **D3 · robots.txt and sitemap.xml** (P1 · `[!]` O-09 · FR-11; blocked: domain unknown)
  - Done when: both files exist in `public/` with the confirmed domain and validate.
- [x] **D4 · Playwright smoke tests** (P1 · AT-01, AT-02, AT-03, AT-04, AT-05, AT-06, AT-07 · plan §6)
  - Done when: `npm run test:e2e` passes on the desktop and mobile projects, and the output is logged.
- [~] **D5 · Manual QA** (P0 · FR-12, NFR-04, NFR-10, AT-09; automated keyboard, focus, and console checks done in Chromium. VoiceOver and Firefox/Safari/mobile-device passes still need a human)
  - Done when, with results logged:
    - A keyboard-only walkthrough is complete.
    - VoiceOver has been spot-checked on the menu, dialog, accordion, and gallery.
    - The console shows zero errors.
    - The site has been checked in the latest Chrome, Firefox, Safari, and one mobile browser.
- [x] **D6 · Lighthouse** (P0, measure · NFR-03, NFR-04, AT-10)
  - Done when: mobile scores for Performance, Accessibility, Best Practices, and SEO are recorded, and any miss against ≥90 / ≥95 is explained with next steps.
- [x] **D7 · README** (P0)
  - Done when the README covers:
    - purpose and prerequisites;
    - install, dev, build, preview, lint, and test commands;
    - project structure;
    - how to edit copy, config, and images;
    - deploying `dist/`, with a sample Nginx block;
    - the publication gate.
- [!] **D8 · Modern image formats** (P1 · `[!]` O-06 · NFR-05; blocked: no originals yet)
  - Done when: approved originals are exported to WebP/AVIF with `srcset`/`sizes`, keeping a JPG fallback.
- [x] **D9 · Handoff report** (P0 · PRD §10)
  - Done when: the report covers the six PRD §10 items and links to this log.

## Phase E: Publication gate (human approvals, all blocking)

- [ ] **E1 · Facts confirmed:** `[!]` O-01, O-02, O-03, O-04, O-05, O-11
- [ ] **E2 · Photo rights and consent:** `[!]` O-06
- [ ] **E3 · Professional-ethics review:** `[!]` O-08, O-10
- [ ] **E4 · Copy and legal-text approval:** `[!]` O-07
- [ ] **E5 · Domain, HTTPS, deployment config:** `[!]` O-09 (then finish D1's P1 part and D3)
- [ ] **E6 · Publish decision:** only once E1–E5 are recorded. Deployment requires explicit owner authorization.

## Verification log

Add new entries at the bottom. Record each command or check exactly, with its actual result.

| Date | Task | Command / check | Actual result | Notes |
|---|---|---|---|---|
| 2026-10-27 | docs prep | `npm view @tailwindcss/vite version peerDependencies` | `4.3.3`; `vite: '^5.2.0 \|\| ^6 \|\| ^7 \|\| ^8'` | Tailwind 4 supports the installed Vite 8 |
| 2026-10-27 | docs prep | `npm view lucide-react version peerDependencies` | `1.61.0`; `react: '^16.5.1 \|\| ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0'` | |
| 2026-10-27 | docs prep | Icon names in `lucide-react@1.61.0` `dist/lucide-react.d.ts` (via unpkg) | `Linkedin` and `Globe2` absent; every other prototype icon present, plus `GraduationCap`, `UserRound`, `Globe` | Replacements in plan §4.12 |
| 2026-10-27 | docs prep | Decoded JPEG sizes from `docs/preview.html` | hero 630×630, formal 928×488, seated 930×488, team 1418×576, writing 1400×350, exterior 675×630, interior 660×630 | Matches requirement §2.3 |
| 2026-10-27 | docs prep | `CLAUDE.md` "Reference files" read commands, re-run exactly as written | App module 179 lines (contains `const dictionary` and `function App()`); dictionary 135 lines; 11 token lines; 5 helper classes | An earlier "358" count was a double-count from a test redirect; corrected |
| 2026-10-27 | A1 | `npm install`; `npm run build`; `npm run lint` on the untouched template | install OK (npm warned only about the `fsevents` install script); build ✓ (`index-*.js` 222.44 kB); lint exit 0 | Baseline passes |
| 2026-10-27 | A2 | Owner decision | Not asked yet, so **not** initialized; no git history | `[!]` until the owner answers |
| 2026-10-27 | A3 | `node scripts/extract-preview-images.mjs`; `sips -g pixelWidth -g pixelHeight public/images/*.jpg` | 7 files written. headshot 630×630, formal 928×488, seated 930×488, team 1418×576, writing 1400×350 match §2.3. exterior **520×414** and interior **640×490** after the crop-only cleanup (see A4) | Script crops with macOS `sips` at `formatOptions best`; no resampling |
| 2026-10-27 | A4 | Visual inspection of every extracted photo | `office-exterior.jpg` contained Google Maps UI ("+ Tambahkan foto & v…") and a sliver of the team photo; `office-interior.jpg` contained a strip of the team photo with the Maps teal selection border. Both cropped to the clean region; no faces altered. All photos are low-res screenshot crops; on retina screens the exterior (520 px) and the team photo look soft | Findings recorded under O-06 |
| 2026-10-27 | B1 | `npm install tailwindcss@^4.3 @tailwindcss/vite@^4.3 lucide-react@^1.61`; `npm ls` | tailwindcss 4.3.3, @tailwindcss/vite 4.3.3, lucide-react 1.61.0; every icon in plan §4.12 exports (`Linkedin`, `Globe2` absent as expected) | |
| 2026-10-27 | B2–B12 | `npm run lint`; `npm run build` | lint exit 0, no warnings; `tsc -b` clean; build ✓ — `index.html` 1.75 kB, CSS 31.25 kB (7.25 kB gz), JS 265 kB (82.4 kB gz) | First full build |
| 2026-10-27 | B4/D1 | `dist/index.html` inspection | `lang="id"`, id title and description, theme-color, favicon, fonts with Playfair `ital,wght@…;1,400`, hero preload, OG text tags; no template title | |
| 2026-10-27 | B12/AT-10 | Playwright screenshots at 320/375/768/1024/1440 against `npm run preview` | Horizontal overflow 0 px at every width; **no console errors, page errors, or failed requests** | |
| 2026-10-27 | D4 | `npm run test:e2e` (desktop 1440×900 + mobile 375×812) | First run: 19 passed, 2 failed (AT-01: the test asserted before smooth scrolling settled, a test bug), 1 skipped. After the fix: **21 passed, 1 skipped** (AT-02 is mobile-only) | Covers AT-01…AT-07, C4 (default), C6, C9, one h1, heading order, image attributes |
| 2026-10-27 | C1 | AT-01/AT-02 tests | Every nav link lands with its heading ≥86 px from the top and fully in view at 375 and 1440; menu has `aria-expanded`/`aria-controls`; closes on link, `Escape` (focus back on the toggle), and resize to 1100 px; `hidden` attribute while closed, no overlay | |
| 2026-10-27 | C2 | AT-03 test | `html[lang]`, title, meta description, h1, open accordion panel, dialog title, and close label switch in place; a scan of text plus `alt`/`aria-label`/`title` finds no Indonesian words in EN or English words in ID (elements with a `lang` attribute excluded); choice persists after reload | The modal makes the page inert, so the switcher can't be reached while the dialog is open; the dialog reads `t.services[id]` at render, verified by opening it in EN |
| 2026-10-27 | C3 | AT-04 test | Focus starts in the dialog; 6×Tab and 6×Shift+Tab never leave it; `Escape`, backdrop click, and "Tutup" each close it and focus returns to the trigger; `html` overflow is `hidden` only while it is open | |
| 2026-10-27 | C4 | Default: C4 test. Flag `true`: temporary build to a scratch dir, Playwright check, then reverted (`grep -c 'showAuctionOfficer: false'` → 1) | Default: 2 cards, no "lelang"/"auction" text anywhere. Flag on: 3 cards, `md:grid-cols-3`, intro mentions *pejabat lelang*, dialog id/en detail has no internal note | |
| 2026-10-27 | C5 | AT-05 test | Next ×5 and Previous ×5 wrap through interior → team → exterior → formal; status "Foto n dari 4"; all 4 photos decode with `naturalWidth > 0`; alt texts localized | Fixed heights, so no layout shift |
| 2026-10-27 | C6 | C6 test (request listener) | 0 requests to `google.*/maps` before the click; then the iframe appears with title "Peta lokasi kantor di Google Maps" and a Maps request fires; the "Buka di Google Maps" link is always present with the exact URL | Coordinates still unverified (O-05) |
| 2026-10-27 | C7 | AT-06 test | Click, Enter, and Space toggle each item; `aria-expanded` matches the panel's `hidden`; `aria-controls` = panel id; one open at a time; disclaimer visible | |
| 2026-10-27 | C8 | AT-07 test | Every `target="_blank"` link has `rel="noopener noreferrer"`; LinkedIn ×2 and Maps ×3, all exact URLs; no other external links | Each also has a localized screen-reader "(opens in a new tab)" |
| 2026-10-27 | C9 | C9 test with `reducedMotion: 'reduce'` | `scroll-behavior: auto`; practice card `transform: none` after hover | All interactions are click, tap, or keyboard; nothing is hover-only |
| 2026-10-27 | C10 | Screenshots at 320/375/768/1024/1440 compared with `docs/preview.html` (rendered in Playwright) and About/Office with `docs/preview.png` | Hero identical to the prototype except the true italic (G-17). About and Office follow the hybrid compositions at all widths. Fixed during the pass: map placeholder pin/button stacking; exterior focal point (signboard was cropped out) | Remaining differences listed under "C10 notes" below |
| 2026-10-27 | C11 | `grep -rniE '17\+\|1000\+\|testimoni\|rating\|★\|08\.00\|konsultasi\|terbaik\|best\|number one\|garansi\|guarantee' src index.html` | **No hits** (exit 1) | Extended sweep for Instagram/WhatsApp/hours/address/"sejak 2008"/etc.: only CSS at-rules, the font URL, and "Persyaratan" in the PPAT explainer (benign) |
| 2026-10-27 | D6 | `npx lighthouse@13.5.0 http://localhost:4173/ --form-factor=mobile` (Chrome for Testing 156, headless) | Run 1 (cold): Perf 85, A11y 96, BP 100, SEO 92, with 31 color-contrast nodes and 2 label-in-name nodes flagged. After G-18 fixes, 3 runs: **Perf 97 / 97 / 98, A11y 100, BP 100, SEO 92**; FCP 1.7 s, LCP 2.3–2.4 s, TBT 0 ms, CLS 0.002–0.004 | SEO 92: only `robots.txt` is missing (D3, O-09). Moving the font CSS to the end of the body gave no measurable gain (98 / 98 / 98), so it was not adopted |
| 2026-10-27 | D2 | Structure test + Lighthouse | Every `<img>` has width/height; only the hero is eager, with `fetchpriority="high"` and a preload; no failed requests; CLS ≤ 0.004 | |
| 2026-10-27 | final | `npm run lint`; `npm run test:e2e` (runs `npm run build`) | lint exit 0; 21 passed, 1 skipped | After all fixes |
| 2026-10-27 | C6 / O-05 | Owner-supplied embed swapped in as a road map (`!5e0`) with locale-aware labels; `npm run lint`; `npm run test:e2e`; Playwright screenshot after "Tampilkan peta" / "Show map" | lint exit 0; 21 passed, 1 skipped; iframe src has `!5e0` and `!1sid`/`!1sen`; the screenshot shows the 2D road map with the listing pin and Indonesian/English Google controls | Request from the owner |
| 2026-10-27 | C10 / G-19 | notion.com typography measured with Playwright (computed styles); text greys replaced by three tiers; `npm run lint`; `npm run test:e2e`; Lighthouse mobile; screenshots of hero/about/insights/footer | notion.com: h1 96px/600, h2 54px/700 at `rgba(0,0,0,.95)`, body `.9`, secondary `.54`/`#615d59`. Result: 0 arbitrary text greys left (only the bronze accents); lint exit 0; 21 passed, 1 skipped; **Perf 97, A11y 100, BP 100, SEO 92**, color-contrast pass | Owner feedback on text colour |
| 2026-10-27 | C6 | Owner request: show the 2D map directly in the location card. First attempt (`loading="lazy"` only): C6 failed on desktop because Chrome requested the map at page load. Switched to an IntersectionObserver (`rootMargin` 600px). `npm run lint`; `npm run test:e2e`; screenshots at 1440 and 375 | lint exit 0; 21 passed, 1 skipped (C6 now asserts: no Maps request after load at the top, `src` has `!5e0` + `!1sid` once scrolled near, request fires); screenshots show the road map with the listing pin inside the card | `map.show` key removed; note text updated |
| 2026-10-27 | C10 / G-20 | Type audit (`grep` of text sizes, leading, tracking, weights): 23 sizes, 11 line heights, 10 trackings → replaced by 12 scale tokens. Checks: `npm run lint`; `npm run build`; overflow scan at 320/375/768/1024/1280/1440; screenshots; Lighthouse mobile; `npm run test:e2e` | lint exit 0; build ✓; page overflow 0 and header overflow 0 at every width (only screen-reader-only text reported, as expected); **Perf 97, A11y 100, BP 100, SEO 92, CLS 0.003**; 21 passed, 1 skipped | Owner feedback on typography |
| 2026-10-27 | C10 | Owner request: remove the unclear exterior photo from the Office split row (now team photo + text, 2 columns at ≥1024 px). `npm run lint`; `npm run build`; overflow check and screenshots at 375/768/1024/1440; `npm run test:e2e` | lint exit 0; build ✓; overflow 0 at all widths; 21 passed, 1 skipped | Exterior still used in the gallery and on the PPAT card |
| 2026-10-27 | C10 / G-21 | Owner redesign: apple.com / notion.com captured with Playwright for reference; Office + location combined; full visual pass. `npm run lint`; `npm run test:e2e` (AT-05 rewritten for photo tiles, header 72 px, Maps link count 3→2); screenshots at 1440 and 375 (id and en hero); map place-card check (frame text scanned for address or rating) at 320/375/768/1024/1440; Lighthouse mobile | lint exit 0; 21 passed, 1 skipped; overflow 0 at 375 and 1440; map tile 280–379 px wide, **no address or rating visible at any width** (at ~775 px wide, an earlier layout showed both, hence the narrow tile); **Perf 91, A11y 100, BP 100, SEO 92, CLS 0**, LCP 2.8 s (single run; earlier runs scored 97) | Owner request |
| 2026-10-27 | C10 / G-22 | Owner request: hero text column as before, portrait in the current style. `npm run lint`; `npm run build`; screenshots and overflow at 320/375/768/1024/1440 (computed h1 font checked); `npm run test:e2e` | lint exit 0; build ✓; overflow 0 at all widths; h1 renders in Playfair Display at every width. First test run: AT-01 failed on mobile (with the portrait first, the h1's last line sat at 832 px, below an 812 px viewport); fixed by making the mobile portrait square (`aspect-square md:aspect-[4/5]`, the uncropped headshot). Rerun: 21 passed, 1 skipped | |
| 2026-10-27 | C10 / G-22 | Owner follow-up: restore the floating formal-portrait card in the hero. `heroBadge` key restored. Overlap check (card vs caption bounding boxes, name line count, overflow) at 1440/1024/768/640/375 in id and en; `npm run lint`; `npm run test:e2e` | No overlap and the name on one line at every width and locale; card visible at 640, 1024, 1440 and hidden at 375 and 768; overflow 0; lint exit 0; 21 passed, 1 skipped | |
| 2026-10-27 | C6 / C10 / G-23 | Owner request: map wider, taller, at the bottom. Embed test page in Playwright, four URLs at 1170×480 and 704×420, screenshots inspected; office bento rearranged; screenshots at 1440/768/375; `npm run lint`; `npm run test:e2e` | Listing-based embeds (`pb=…`, `q=<name>`) show the address and the "4,9 ★ (73)" card; coordinate-only embeds don't. Coordinate embed adopted; screenshots at 1440 and 768 show the full-width road map with pin, no card; overflow 0; lint exit 0; 21 passed, 1 skipped | **Correction:** the G-21 entry's frame-text check could not see the card text (it found only the map footer at every width), so that "no address/rating" result rested on the 1440 px screenshot alone |
| 2026-10-27 | C10 / G-24 | Owner request: hide the Office interior/formal photo row but keep it. Added `flags.showOfficePhotos: false`. `npm run lint`; `npm run test:e2e` (AT-05 now expects 1 office image); flag-on build to a scratch dir and back (`grep -c 'showOfficePhotos: false'` → 1); screenshots at 1440 | lint exit 0; 21 passed, 1 skipped; flag off: 1 office image, team + location tile directly above the map; flag on: 3 images, row restored; overflow 0 in both | |

### C10 notes (remaining differences, for owner review)

- **Hero italic (G-17).** The prototype set `font-synthesis: none` without loading the italic face, so *ketelitian.* and *kepercayaan.* rendered upright. They are now true Playfair italic, as the plan intended. Easy to revert if the owner prefers upright.
- **Contrast (G-18).** The muted greys, the eyebrow colour, the insight numbers, the disclaimer, and the footer © line are slightly darker than the prototype, to meet WCAG AA 4.5:1.
- **About/Office hybrid.** The team photo keeps the prototype's 2.05 ratio at every width so nobody in the photo is cropped out. As a result the photos sit shorter than the text column at ≥1024 px, unlike the mockup, where they were the same height.
- **Mobile logo** wraps to two lines at 320 px, as in the prototype.

## Handoff report (PRD §10), 2026-10-27

1. **Files and components.** `index.html`, `vite.config.ts`, `package.json`, `tsconfig.node.json`, `.gitignore`, `playwright.config.ts`, `README.md`, `public/favicon.svg`, `public/images/*` (7), `scripts/extract-preview-images.mjs`, `src/{main,App}.tsx`, `src/style.css`, `src/types/site.ts`, `src/config/site.ts`, `src/content/{id,en}.ts`, `src/i18n/{context,useLocale}.ts`, `src/i18n/LocaleProvider.tsx`, `src/components/{Logo,SectionHeader,SkipLink,ExternalLink,Header,Footer,ServiceDialog,OfficeGallery,MapEmbed}.tsx`, `src/sections/{Hero,About,Principle,PracticeAreas,Values,Office,Insights}.tsx`, `tests/e2e/smoke.spec.ts`. Removed: `src/App.css`, `src/index.css`, `src/assets/`, `public/icons.svg`.
2. **Requirements.** FR-01…FR-12 implemented (FR-11 minus domain-dependent parts). All P0 tasks done except D5's human-only parts (VoiceOver, Firefox/Safari/real mobile). Deferred: D3 (O-09), D8 (O-06), A2 (owner answer), phase E.
3. **Commands and results.** See the log above; every entry records the real output.
4. **Visual check.** Screenshots at 320/375/768/1024/1440 px (Chromium); differences under C10 notes.
5. **Open blockers.** O-01…O-11 in requirement §10, in particular photo rights and consent (O-06), unverified map coordinates (O-05), copy approval (O-07), the ethics review (O-08), and the domain (O-09).
6. **Run and deploy.** `npm install && npm run dev`; production: `npm run build`, then serve `dist/` (README → "Deploying `dist/`"). Deployment waits for explicit owner authorization.
