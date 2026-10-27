# Requirement: Website MVP

| Field | Value |
|---|---|
| Task folder | `docs/website-mvp/` |
| Source | [`PRD.md`](../../PRD.md) v1.0 (development-ready brief) |
| Companion docs | [plan.md](plan.md) · [tasks.md](tasks.md) |
| Status | Implemented and verified 2026-10-27 (see tasks.md). Publication is blocked on owner approvals (§10) |
| Created | 2026-10-27 |
| Design decision | **Hybrid:** `preview.html` structure, copy and palette. About and Office follow the `preview.png` composition. Nothing the PRD forbids |

## 1. Summary

Build the bilingual single-page informational website for I Gusti Ngurah Premana, S.T., S.H., M.Kn., Notaris & PPAT in Kerobokan, Badung, Bali. Indonesian is the default language; English is secondary.

The work has three parts:

1. Port the approved prototype into this React + TypeScript + Vite project.
2. Fix the prototype's accessibility and i18n gaps (§8).
3. Apply the hybrid About and Office layouts (§5).

The deliverable is a static `dist/` build, ready for owner review. It is not ready for publication until §10 is cleared.

## 2. Baseline and references

### 2.1 Repository state (2026-10-27)

- The repo is the untouched Vite React-TS template:
  - `src/App.tsx` (counter demo), `src/App.css`, `src/index.css`;
  - `src/assets/{hero.png,react.svg,vite.svg}`;
  - `public/{favicon.svg,icons.svg}`;
  - `index.html` with `lang="en"` and the title "notary-personal".
- **Installed:** React 19.3.1, Vite 8.3.5, TypeScript 6.0.3, ESLint 10.
- **Not installed:** Tailwind CSS, `lucide-react`, Playwright.
- The PRD's `premana-notary-react/` prototype source and its `public/images/` folder do **not** exist here. The prototype survives only as the compiled `docs/preview.html`.
- The repo is not a git repository.

### 2.2 Reference map

| Reference | Role | Notes |
|---|---|---|
| `PRD.md` | Requirements | Root file. The PRD text calls it `docs/PRD.md` |
| `docs/preview.html` | **Primary baseline for visuals and copy** | Compiled prototype: `dictionary` (id/en), components, Tailwind classes, tokens, 7 photos. Read it with the commands in `CLAUDE.md` |
| `docs/preview.png` | Composition reference for About and Office only | Image-only mockup. Contains forbidden placeholders (§7.3) |
| `docs/profile-one.png` | LinkedIn profile photo | 315×315 |
| `docs/profile-two.png` | LinkedIn banner | 1400×350. Same image as `legal-writing.jpg` |
| `docs/profile-tree.png` | LinkedIn media portraits | Standing, seated, close-up |
| `docs/profile-four.png` | Google Maps listing | Team photo, exterior, interior. Map pin near Petitenget / Jl. Merta Agung |
| LinkedIn | Professional profile | `https://www.linkedin.com/in/igustingurahpremana` |
| Google Maps | Location source of truth | `https://maps.app.goo.gl/TyGB2XTzgziTXk4T9` |
| Benchmark PDFs (`public notary ref 1.pdf`, `public notary ref 2.pdf`) | Inspiration only | Not in the repo. Never copy their content |

### 2.3 Photo inventory

All photos come from the `const images = {…}` data URIs in `docs/preview.html`. Task A3 extracts them.

| Prototype key | Target file | Size (px) | Likely source | Used in |
|---|---|---|---|---|
| `hero` | `public/images/portrait-headshot.jpg` | 630×630 | LinkedIn photo | Hero arch portrait |
| `formal` | `public/images/portrait-formal.jpg` | 928×488 | LinkedIn media (standing) | Hero floating card; gallery |
| `seated` | `public/images/portrait-seated.jpg` | 930×488 | LinkedIn media (seated) | About portrait; Pejabat Lelang card |
| `team` | `public/images/team.jpg` | 1418×576 | Google Maps (team) | Office split; gallery |
| `writing` | `public/images/legal-writing.jpg` | 1400×350 | LinkedIn banner | Kenotariatan card |
| `exterior` | `public/images/office-exterior.jpg` | 675×630 → **520×414** after cleanup crop | Google Maps (exterior) | PPAT card; Office split; gallery |
| `interior` | `public/images/office-interior.jpg` | 660×630 → **640×490** after cleanup crop | Google Maps (interior) | Gallery |

These are low-resolution crops from screenshots. Do not upscale, regenerate, or retouch them. The exterior and interior files also contained Google Maps UI and a sliver of the team photo. Task A3 removes those with a crop-only step: no resampling, no retouching, and no change to anyone's appearance (plan §4.11). Replace them only with originals the owner supplies (O-06).

## 3. Scope

### In scope (MVP)

- One responsive page, in this order:
  - Header and Hero;
  - About and the Principle band;
  - Practice Areas (with a detail dialog) and Values;
  - Office (split layout, gallery, location/map);
  - Insights (accordion and disclaimer) and Footer.
- An Indonesian/English switcher covering all visible text, accessible names, and alt text.
- Accessibility (WCAG 2.2 AA where applicable), basic SEO, image performance, a repeatable production build, and a README.

### Out of scope

- **Features:** accounts, auth, dashboard, CMS, database, payments, invoicing, scheduling or booking, online legal advice, WhatsApp automation, CRM, lead capture, contact form, chatbot, analytics or tracking.
- **Promotional content:** testimonials, ratings, client counts, case studies, partner or client logos, price packages, speed promises, guaranteed outcomes.
- **Fabricated facts:** any phone, email, opening hours, credentials, awards, history, or exact street address.
- **Restyling:** dark, gold-heavy, or stock-photo law-firm designs.
- **Separate language URLs** and `hreflang`.

## 4. Functional requirements

| ID | Requirement | Acceptance criteria | Prototype status | Tasks |
|---|---|---|---|---|
| FR-01 | Header and navigation. Logo (name + role). Anchors Beranda/Tentang/Bidang Praktik/Kantor/Informasi → `#home #about #practice #office #insights`. Sticky header, collapsible mobile menu, "Lokasi Kantor" pill → `#office` | Every link lands with the section heading visible below the sticky header, at all widths. The menu closes on link click and `Escape`. Everything is keyboard-operable | Works; gaps G-03, G-07, G-16 | B9, C1 |
| FR-02 | Language switch. `id` by default; toggles to `en` and back | No mixed-language text, labels, or alt text. `<html lang>` updates. An open dialog and an expanded accordion update in place | Partial; G-01, G-04, G-05 | B7, B8, C2 |
| FR-03 | Hero. Light split layout, arch portrait, eyebrow, headline, intro, and "Tentang Saya" + "Bidang Praktik" links | Matches the preview.html hierarchy on desktop and mobile. The photo is not stretched. Both links work | OK (copy pending O-07) | B10 |
| FR-04 | About. Portrait, factual introduction, credential list (hybrid), LinkedIn link | Only approved or neutral text. LinkedIn opens the exact URL in a new tab with `rel="noopener noreferrer"` | Layout changes (§5.2) | B10, C8 |
| FR-05 | Professional values: integrity, precision, confidentiality | Non-promotional and bilingual | OK | B10 |
| FR-06 | Practice Areas. Kenotariatan and PPAT & Pertanahan; Pejabat Lelang only once confirmed. Summary cards with a detail dialog | The dialog is accessible: focus moves in and is trapped; `Escape`, backdrop, and button all close it; focus is restored. It shows current-locale text. Nothing implies unverified authority | Gaps G-01, G-02, G-09 | B11, C3, C4 |
| FR-07 | Office gallery. Genuine photos, prev/next controls, descriptions | Prev/next wrap correctly. Crops are consistent. No layout shift. Alt text is meaningful and localized | Gap G-15 | B11, C5 |
| FR-08 | Location. "Kerobokan, Badung" text, Google Maps link, optional embed | The link is the supplied Maps URL. The embed shows directly (owner decision 2026-10-27) but is requested only when the location card nears the viewport. The link stays usable if the iframe is blocked. No invented address or hours | Gap G-08 | B11, C6 |
| FR-09 | Insights: authentic deed, Notary vs PPAT, document preparation | Semantic accordion (`aria-expanded`, `aria-controls`, panel IDs). Bilingual. Disclaimer visible | Gap G-06 | B10, C7 |
| FR-10 | Footer. Name, short description, internal links, LinkedIn, Maps, current year | All links valid. Year is the current year. Text is in the active locale | OK | B9, C8 |
| FR-11 | SEO and metadata. Per-locale title and description, social preview, favicon, robots, sitemap | Metadata is accurate with no false claims. No `hreflang` | Missing; G-12 | B4, D1, D3 |
| FR-12 | Responsive and accessible. Semantics, focus indicators, labels, modal focus management | Operable by keyboard and screen reader. WCAG 2.2 AA where applicable | Gaps G-02 to G-07, G-13 | C1–C7, D5 |

## 5. Hybrid design specification

Everything follows `docs/preview.html`: layout, spacing, type scale, class names, and copy.

The exceptions are §5.2 About and §5.3 Office. These follow the composition of `docs/preview.png` but keep the prototype's palette, radii, typography, and `photo-tint`. Nothing listed in §7.3 may appear.

### 5.1 Sections taken from preview.html as-is (after gap fixes)

| Order | Section | Anchor | Notes |
|---|---|---|---|
| 1 | Header | none | Logo (Scale icon in a circle + name + localized subtitle), 5 nav links, language toggle (`Globe` icon), "Lokasi Kantor" pill |
| 2 | Hero | `#home` | Eyebrow with a sand rule. Headline "Komitmen pada *ketelitian.* / Berlandaskan *kepercayaan.*" (O-07). Arch portrait with name overlay, floating formal-portrait card, decorative circles, `hero-blob` |
| 3 | About | `#about` | **Hybrid; see §5.2** |
| 4 | Principle band | none | "NILAI PROFESIONAL" + "Kepercayaan dibangun melalui setiap detail." on `sage-light` |
| 5 | Practice Areas | `#practice` | Image-topped cards with a forest icon badge. "Baca selengkapnya" opens the dialog. See §5.4 |
| 6 | Values | none | "PENDEKATAN PROFESIONAL" + Integritas / Ketelitian / Kerahasiaan cards |
| 7 | Office | `#office` | **Hybrid; see §5.3** |
| 8 | Insights | `#insights` | Three numbered cards as an accordion, with the disclaimer below |
| 9 | Footer | none | `forest-dark` background. Light logo, description, "Navigasi" links, "Tautan" (LinkedIn with `UserRound` icon, Google Maps with `MapPin`), © year |

### 5.2 About (hybrid)

- **Desktop (≥1024 px):** three columns, `[text] | [portrait] | [credential list]`, roughly `1fr | 0.9fr | 1fr`, vertically centred on `paper`.
  - **Text:** eyebrow "01 / TENTANG SAYA", h2 `aboutTitle`, `aboutBody`, `aboutBody2`, and the "Lihat Profil LinkedIn ↗" link.
  - **Portrait:** `portrait-seated.jpg`, 16 px radius, `photo-tint`, fixed aspect ratio.
  - **Credential list:** four rows separated by hairlines. Each row has an icon in a sand-tinted circle (icon in `sand`), an ink semibold title, and a small muted subtitle.
- **Tablet (768–1023 px):** text spans the full width, with the portrait and list side by side below it.
- **Mobile (<768 px):** stacked in order: text, portrait, list.
- This replaces the prototype's "Latar Belakang Profesional" box and its overlapping writing photo.

The default credential list contains **neutral items only**, derived from the prototype's unused `infoItems`:

| # | Icon | id title | id subtitle | en title | en subtitle |
|---|---|---|---|---|---|
| 1 | `GraduationCap` | S.T., S.H., M.Kn. | Pendidikan teknik, hukum, dan kenotariatan | S.T., S.H., M.Kn. | Engineering, law, and notarial studies |
| 2 | `FilePenLine` | Praktik kenotariatan | Akta autentik dan dokumen sesuai kewenangan notaris | Notarial practice | Authentic deeds and documents within a notary's authority |
| 3 | `Landmark` | Praktik pertanahan (PPAT) | Akta terkait hak atas tanah sesuai kewenangan PPAT | Land-deed practice (PPAT) | Deeds relating to land rights within PPAT authority |
| 4 | `MapPin` | Kantor di Badung, Bali | Kerobokan, Kabupaten Badung | Office in Badung, Bali | Kerobokan, Badung Regency |

Item 1 depends on O-01. The mockup's items (an institution, "since 2008", speaker roles) may be added **only** after the owner confirms them (O-03).

### 5.3 Office (hybrid)

1. **Split row.**
   - Layout:
     - ≥1024 px: `[team photo ~1.15fr] | [text ~1fr] | [exterior photo ~0.75fr]`.
     - Tablet: team photo at full width, then text and exterior side by side.
     - Mobile: stacked.
   - **Team photo** (`team.jpg`) is the primary office image (the PRD says to prioritize office/team).
   - **Text column:** eyebrow "03 / KANTOR KAMI", h2 `teamTitle`, `teamText`, a location line (MapPin + "Kerobokan, Kabupaten Badung, Bali, Indonesia"), and an external pill "Buka Google Maps ↗".
   - **Exterior photo:** `office-exterior.jpg`.
   - **Excluded from the mockup:** the opening-hours item, and any address detail beyond the area name.
   - Keep the row inside the 1250 px container with prototype radii. On ≥1024 px the team photo may bleed to the left edge, but only if it causes no horizontal scroll.
2. **Gallery row** (as in the prototype):
   - Eyebrow "Sekilas suasana kantor" with ‹ › controls.
   - Two images side by side (current + next) at fixed heights of 250 px, or 320 px on ≥768 px.
   - Photo order: `interior → team → exterior → formal`.
3. **Location card** (as in the prototype, on `sage-light`):
   - Text: "ALAMAT & LOKASI", "Kunjungi kantor kami", the location text, and a short privacy note.
   - The embedded 2D road map, shown directly (owner decision 2026-10-27; it replaced click-to-load), with an always-visible "Buka di Google Maps" link.

### 5.4 Practice Areas grid

- `showAuctionOfficer = false` (the default): two cards (Kenotariatan, PPAT & Pertanahan) in a 2-column grid on ≥768 px. The intro text must not mention *pejabat lelang*.
- `showAuctionOfficer = true` (only after O-02): three cards in a 3-column grid. The auction copy has no internal notes.

## 6. Non-functional requirements

| ID | Requirement | Target and verification | Tasks |
|---|---|---|---|
| NFR-01 | Production build | `npm run build` with zero TypeScript or Vite errors; `npm run lint` clean | B12 |
| NFR-02 | Visual consistency | Screenshots at 320/375/768/1024/1440 px reviewed against preview.html, and against preview.png for the About and Office composition | C10 |
| NFR-03 | Performance | Target Lighthouse mobile Performance ≥ 90. Record the actual score and any constraints | D6 |
| NFR-04 | Accessibility | Lighthouse Accessibility ≥ 95, plus a manual keyboard, dialog, and screen-reader review | D5, D6 |
| NFR-05 | Image delivery | Intrinsic width/height, lazy loading below the fold, hero prioritized, no layout shift | D2, D8 |
| NFR-06 | Security | `target="_blank"` always has `rel="noopener noreferrer"`. No secrets. No user data collection | C8 |
| NFR-07 | Privacy | No analytics or tracking. The map iframe is not requested on page load, only when its card nears the viewport. Third-party requests are documented (O-10) | C6 |
| NFR-08 | Semantics and SEO | Single H1, logical heading order, descriptive title and description, accurate alt text. Valid robots and sitemap once the domain is known | B10, D1 |
| NFR-09 | Internationalization | All visible text and accessible names localized; `<html lang>` follows the locale | C2 |
| NFR-10 | Browser support | Latest Chrome, Firefox, and Safari, plus mobile Safari and Chrome. Graceful fallbacks | D5 |

## 7. Content requirements

### 7.1 Copy baseline

- The prototype's `dictionary` (id/en) in `docs/preview.html` is the starting copy. Port it into `src/content/id.ts` and `src/content/en.ts`. Include `insightDetails`, which is currently inline in `App`.
- The headline and all other copy remain **drafts pending owner and editorial approval** (O-07).
- The mockup headline "Kepastian Hukum untuk Masa Depan Anda" is not approved. Use the prototype headline.

### 7.2 Required content changes

- **Localize:**
  - every `aria-label`, `alt`, and dialog, gallery, and map label;
  - the logo subtitle (id "Notaris · PPAT · Bali" / en "Notary · PPAT · Bali");
  - the hero badge "Notaris & PPAT · Bali".
- **Remove internal notes from visitor-facing text.** These are the auction `detail` sentences:
  - id: "Konfirmasikan ruang lingkup kewenangan aktif sebelum publikasi final."
  - en: "Confirm current appointment and scope before publishing this section as final."
- **Add a `servicesText` variant** without *pejabat lelang*, for when the auction card is hidden.
- **Clean up dead keys:** drop `focusText`. `infoItems` becomes the About credential list (§5.2).
- **Meta drafts (O-07):**
  - id title: `I Gusti Ngurah Premana — Notaris & PPAT di Bali`
  - id description: `Profil profesional I Gusti Ngurah Premana, S.T., S.H., M.Kn., Notaris & PPAT di Kerobokan, Badung, Bali: bidang praktik, kantor, dan lokasi.`
  - en title: `I Gusti Ngurah Premana — Notary & PPAT in Bali`
  - en description: `Professional profile of I Gusti Ngurah Premana, S.T., S.H., M.Kn., Notary & PPAT in Kerobokan, Badung, Bali: practice areas, office, and location.`
- **Disclaimer (keep):**
  - id: "Konten bersifat informasi umum, bukan nasihat hukum untuk keadaan tertentu."
  - en: "Content is general information, not legal advice for specific circumstances."

### 7.3 Forbidden content

None of the following may appear on the site, in any locale.

**From `preview.png`:**

- Stats: "17+ Tahun Pengalaman / Sejak 2008", "1000+ Klien Individu & Korporasi", "Berbagai Sektor".
- Testimonials: star ratings, "Testimoni Klien / Apa Kata Mereka?" quotes, "Lihat Semua Testimoni".
- Office hours ("08.00 – 17.00 WITA").
- The "Konsultasi" header CTA, the "Konsultasi Hukum" service card, and "Lihat Semua Layanan".
- Instagram and YouTube icons.
- "Kebijakan Privasi" and "Syarat & Ketentuan" links (no such pages exist).
- About-list claims: "Magister Kenotariatan – Universitas Indonesia", "Berpengalaman sejak 2008", "Pembicara & Narasumber", "Profesional dan Berdedikasi" (until O-03 confirms them).
- Promotional phrasing: "Solusi Hukum Terpercaya", "solusi hukum yang tepat dan terpercaya", "proses yang cepat".

**From the PRD in general:**

- Superlatives, urgency, and guarantees.
- Client names or logos.
- Phone, email, WhatsApp, or a street address.

## 8. Prototype gaps to fix

| ID | Gap in preview.html | Fix (see plan.md) | Refs | Tasks |
|---|---|---|---|---|
| G-01 | `selectedService` stores the translated service object, so switching language with the dialog open leaves stale text | Store a `ServiceId` and read `t.services[id]` at render | FR-02, FR-06 | C2, C3 |
| G-02 | The dialog has no initial focus, no focus trap, no `Escape`, and no focus restore. Its `aria-label` is English-only | Native `<dialog>` with `showModal()`, `aria-labelledby`, and focus restore | FR-06, FR-12, AT-04 | C3 |
| G-03 | The mobile menu has no `Escape` close and no `aria-controls`. Its label is a static English "Toggle navigation" | Localized open/close label, `aria-controls`, close on `Escape` and on resize | FR-01, AT-02 | C1 |
| G-04 | All `aria-label`s and `alt` texts are hard-coded English ("Main navigation", "Switch language", "Office gallery selected photograph", …) | Move them into the dictionaries | FR-02, NFR-09 | B7, C2 |
| G-05 | The logo subtitle "Notaris · PPAT · Bali" and hero badge "Notaris & PPAT · Bali" are not localized | Add dictionary keys | NFR-09 | B7, C2 |
| G-06 | Insights: the revealed text sits inside the `<button>`, and there is no `aria-controls` or panel ID | Heading + button + region panel | FR-09, AT-06 | C7 |
| G-07 | The sticky 86 px header hides section headings on ≥768 px, because `scroll-padding-top` is only set below 768 px | `scroll-margin-top` on every anchored section at all widths | FR-01, AT-01 | B3, C1 |
| G-08 | The map iframe auto-loads (a third-party request). *Updated 2026-10-27: the owner chose a directly shown map; the request is deferred until the card nears the viewport.* Its embed coordinates `-8.672171,115.168603` are not verified against the Maps link | Click-to-load with a fallback link; verify the coordinates (O-05) | FR-08, NFR-07 | C6 |
| G-09 | The Pejabat Lelang card is always visible, and its detail text contains an internal "confirm before publishing" note | `showAuctionOfficer` flag (default `false`) and clean copy | FR-06 | B7, C4 |
| G-10 | No `prefers-reduced-motion` handling for hover translate/scale or smooth scroll | Reduced-motion overrides | PRD §4 | B3, C9 |
| G-11 | Images are embedded as base64, with no width/height, lazy loading, or hero priority | Files in `public/images/`, intrinsic sizes, lazy loading, hero preload | NFR-05 | A3, D2 |
| G-12 | No meta description, OG tags, or favicon; the title is not per-locale; the repo's `index.html` is still the template | Metadata in `index.html` plus a per-locale runtime update | FR-11 | B4, D1 |
| G-13 | No skip link | Add a "Lewati ke konten utama" / "Skip to main content" link | FR-12 | B9 |
| G-14 | Dead copy: `infoItems`, `focusText` | `infoItems` becomes the About list; drop `focusText` | none | B7 |
| G-15 | Gallery alt texts are generic, and the current position is not announced | Localized alt text per photo; `aria-live` status | FR-07 | C5 |
| G-16 | `id="home"` is on the page wrapper instead of the hero section | Put `id="home"` on the hero `<section>` | FR-01 | C1 |
| G-17 | Playfair Display italic is not loaded, so the hero `<em>` uses a synthesized italic | Load `ital,wght@1,400` and confirm visually | PRD §4 | B4 |
| G-19 | **Owner feedback 2026-10-27:** "susunan dan kombinasi warna sudah bagus, tetapi warna text terasa tidak nyambung" (layout and colours are good, but the text colours feel disjointed); notion.com allowed as the reference. Cause: about 12 slightly different green-tinted greys plus a green-black `ink` | Notion-style system measured on notion.com (headings `rgba(0,0,0,.95)`, body `.9`, secondary `.54`): three neutral black-alpha tiers, `ink` .90, `body` .72, `muted` .58 (raised from .54 to stay ≥5:1 on sage surfaces). Footer: white · white/75 · white/60. Green (`forest`) only for accents, links, and CTAs; bronze only for the logo mark and insight numbers | FR-12, NFR-02 | C10 |
| G-18 | Text contrast below WCAG AA 4.5:1, found by Lighthouse in task D6: `muted` #73817B (3.6–4.1), eyebrow #6d8376 (3.5–4.0), several arbitrary greys (4.0–4.4), the insight numbers in `sand` (2.7), the disclaimer #87918b (2.9), and the footer © line at `white/45` (3.7). The logo link's `aria-label` also didn't contain its visible text | Smallest same-hue darkening that reaches ≥4.6:1 against the darkest background each colour sits on: `muted` → #63706A, eyebrow → #5d6f64, greys → #627068/#6b7771/#617165, numbers → #887053, disclaimer → #676f6a, © → `white/60`. The logo name is now the accessible name, with a screen-reader-only ", beranda" / ", home" | FR-12, NFR-04 | D6 |

## 9. Acceptance tests

| Test | Steps | Expected result | Tasks |
|---|---|---|---|
| AT-01 Navigation | Click each nav item, on desktop and mobile | Each lands on the correct section; no heading is hidden under the header | C1, D4 |
| AT-02 Mobile menu | At 375 px, open the menu and choose Office | Menu opens, closes, and navigates; no horizontal scroll | C1, D4 |
| AT-03 Locale | Switch ID → EN → ID, including with the dialog open and an accordion expanded | Titles, descriptions, controls, dialog, accordion, alt/aria text, disclaimer, and `<html lang>` all update | C2, D4 |
| AT-04 Practice details | Open a card; press Tab and Shift+Tab; press Escape; click the backdrop | Focus moves inside and is trapped; the dialog closes; focus returns to the trigger | C3, D4 |
| AT-05 Gallery | Click Next repeatedly, then Previous | Correct photos, wrapping both ways; no broken images or layout shift | C5, D4 |
| AT-06 Insights | Expand and collapse each item | Panel shows and hides; `aria-expanded` matches | C7, D4 |
| AT-07 External links | Inspect and follow the LinkedIn and Maps links | Exact supplied URLs, with `target="_blank"` and `rel="noopener noreferrer"` | C8, D4 |
| AT-08 Responsive | Check at 320, 375, 768, 1024, 1440 px | No clipping, stretching, tiny tap targets, or overflow | C10 |
| AT-09 Metadata | Inspect the built HTML and the network panel | Accurate title and description; no missing assets; no secrets | D1, D2, D5 |
| AT-10 Production | Run `npm run build` and `npm run preview` | Builds; no runtime exceptions in the console | B12, D6 |
| AT-11 Content approval | Owner reviews the page and photos | No unapproved claims, private details, or photo use | C11, E1–E4 |

## 10. Open items and publication blockers

These need owner input. Until each is resolved, omit the item or keep it neutral. Never invent.

| ID | Item | Current handling | Blocks |
|---|---|---|---|
| O-01 | Exact name and titles: "I Gusti Ngurah Premana, S.T., S.H., M.Kn." | Shown as in the prototype; flagged for sign-off | E1 |
| O-02 | Active appointments: the area and scope of Notaris and PPAT. Is Pejabat Lelang active, and with what scope? | Auction card hidden (`showAuctionOfficer: false`) | C4 final copy, E1 |
| O-03 | Education and career facts. The mockup's placeholders are **UNVERIFIED; do not use**: "Magister Kenotariatan – Universitas Indonesia", "Berpengalaman sejak 2008", "Pembicara & Narasumber" | Not shown; neutral credential list only | E1 |
| O-04 | Office street address, hours, phone, email | Not shown; area name only | E1 |
| O-05 | Do the map embed coordinates `-8.672171,115.168603` (from the prototype) match the Maps listing? | **Resolved 2026-10-27:** the owner supplied the Google Maps embed for the "I Gusti Ngurah Premana (Notary Public)" listing (same coordinates). It is used with `!5e0` (road map; the supplied code had `!5e1`, satellite) at the owner's request, with the label language following the locale. Still click-to-load | none |
| O-06 | Photo rights and consent (portraits, every team member, office); original high-res files. **A4 findings:** every photo is a low-res screenshot crop. The exterior (520 px wide after cleanup) and the team photo look soft on retina and large screens. The exterior and interior needed a crop to remove Google Maps UI. The headshot (630 px) is tightly framed, so the hero arch shows the face large. Originals of all seven, especially the team, exterior, and headshot, would noticeably improve quality | Prototype crops used; no upscaling | A4, D8, E2 |
| O-07 | Editorial approval of all copy (id/en): the headline "Komitmen pada ketelitian. Berlandaskan kepercayaan.", legal explainers, disclaimer, meta text | Prototype copy used as a draft | E4 |
| O-08 | Professional-ethics review of the presentation and CTAs against the notary (INI) and PPAT (IPPAT) codes of ethics | Informational tone; no sales CTA | E3 |
| O-09 | Production domain | `og:url`, `og:image`, canonical, `robots.txt`, `sitemap.xml` deferred | D1 (P1 part), D3, E5 |
| O-10 | Third-party requests: Google Fonts (on load) and Google Maps (when the location card nears the viewport). Disclose them, or self-host fonts? | Fonts served from Google; map shown directly (owner decision 2026-10-27), requested near the viewport; the visible note says it is provided by Google Maps | E3, E5 |
| O-11 | Confirm the LinkedIn URL is the profile to publish | Used as supplied | E1 |
| O-12 | Version control (task A2): should the repo be put under git? | Not initialized; awaiting the owner's answer | A2 |

## 11. Definition of Done

Development is done when all of the following hold:

- Every P0 task in [tasks.md](tasks.md) is checked.
- AT-01 to AT-10 pass. AT-11 is the owner review.
- `npm run lint` and `npm run build` succeed.
- The hybrid design matches §5 at all target widths.
- Bilingual content and interactions behave correctly.
- The verification log in tasks.md records the actual results.

Publication remains a separate human decision (tasks E1–E6).
