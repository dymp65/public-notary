# Plan: Website MVP

How to deliver [requirement.md](requirement.md). Work through [tasks.md](tasks.md) in order.

## 1. Approach

- **Port, don't redesign.** Rebuild the prototype from `docs/preview.html` as typed React components styled with Tailwind 4. Keep its class strings, spacing, and copy.
- **Fix gaps while porting.** Apply the requirement §8 fixes (G-01…G-17) as each piece is built, not in a later pass.
- **Hybrid only where agreed.** About and Office follow requirement §5.2 and §5.3. Every other section stays as in the prototype.
- **No new features.** Anything outside the requirement goes into a new `docs/<task_name>/` folder.
- **Small dependency footprint:** `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, plus the dev dependency `@playwright/test` (P1).

## 2. Tooling and setup

### 2.1 Dependencies

```bash
npm install tailwindcss@^4.3 @tailwindcss/vite@^4.3 lucide-react@^1.61   # task B1
npm install -D @playwright/test@^1.64                                    # task D4 (P1)
npx playwright install chromium                                          # task D4, once
```

`vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 2.2 Template cleanup

- Delete `src/App.css`, `src/index.css`, `src/assets/` (`hero.png`, `react.svg`, `vite.svg`), and `public/icons.svg`.
- Replace `public/favicon.svg` with a simple Scale mark that matches the logo icon: forest stroke on a transparent background.

### 2.3 `src/style.css`

```css
@import "tailwindcss";
@source not "../docs";   /* keep the 756 KB prototype out of class scanning */

@theme {
  --color-cream: #F8F7F3;
  --color-paper: #FFFEFC;
  --color-sage: #E8EEEA;
  --color-sage-light: #F0F3EE;
  --color-forest: #45665E;
  --color-forest-dark: #263F38;
  --color-ink: #293832;
  --color-muted: #73817B;
  --color-sand: #B79770;
  --font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
}
```

Then add the following:

- **Base layer** (`@layer base`). Copy the prototype's small reset after preflight. In particular, `svg { display: inline-block }` differs from preflight's `display: block`. Also set the `body` background to `cream` and the text to `ink`.
- **Helper classes**, copied verbatim (see the `grep -A3` command in `CLAUDE.md`): `.soft-shadow`, `.focus-ring:focus-visible`, `.hero-blob`, `.section-eyebrow`, `.photo-tint`.
- **Anchor offset (G-07).** Set `section[id] { scroll-margin-top: 86px }` at all widths; 86 px is the header height. This replaces the prototype's mobile-only `scroll-padding-top`.
- **Dialog scroll lock:** `html:has(dialog[open]) { overflow: hidden }`.
- **Text colours (G-19).** `--color-ink: rgb(0 0 0 / .9)`, `--color-body: rgb(0 0 0 / .72)`, `--color-muted: rgb(0 0 0 / .58)`. `.section-eyebrow` uses `muted`. Don't add arbitrary `text-[#…]` greys; pick a tier. Fonts stay Playfair Display + DM Sans.
- **Page wrapper uses `overflow-x-clip`, not the prototype's `overflow-x-hidden`.** `hidden` turns the wrapper into a scroll container, which would stop the sticky header from sticking. `clip` clips the same way without that side effect.
- **Reduced motion (G-10):**
  - Apply `html { scroll-behavior: smooth }` only inside `@media (prefers-reduced-motion: no-preference)`.
  - In JSX, prefix the prototype's hover-motion classes with `motion-safe:`. These are:
    - `hover:-translate-y-0.5`, `hover:-translate-y-1`;
    - `group-hover:scale-105`;
    - `group-hover:translate-x-0.5`, `group-hover:-translate-y-0.5`;
    - `hover:gap-4`, `hover:gap-5`.
  - Colour transitions stay as they are.

### 2.4 `index.html`

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>I Gusti Ngurah Premana — Notaris & PPAT di Bali</title>
    <meta name="description" content="(id description from requirement §7.2)" />
    <meta name="theme-color" content="#F8F7F3" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" />
    <link rel="preload" as="image" href="/images/portrait-headshot.jpg" fetchpriority="high" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="I Gusti Ngurah Premana" />
    <meta property="og:title" content="(id title)" />
    <meta property="og:description" content="(id description)" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:locale:alternate" content="en_US" />
    <!-- og:url, og:image, twitter:card, canonical: after the domain is confirmed (O-09) -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- The hero image is rendered client-side. Without the preload, the browser would discover it late, which hurts LCP.
- `og:url`, `og:image` (a 1200×630 crop of an approved photo), `twitter:card`, and `<link rel="canonical">` wait for the domain (O-09).

## 3. File map

```text
index.html                         metadata, fonts, hero preload, #root
public/
  favicon.svg                      Scale mark (replaces the Vite logo)
  images/                          7 JPGs extracted from docs/preview.html (A3)
  robots.txt  sitemap.xml          P1, once the domain is confirmed (D3)
scripts/
  extract-preview-images.mjs       one-off, no deps: data URIs → public/images/*.jpg
src/
  main.tsx                         imports ./style.css; <StrictMode><LocaleProvider><App />
  App.tsx                          composition only; owns dialog state (ServiceId | null)
  style.css                        Tailwind import, @theme, base, helpers, motion
  types/site.ts                    Locale, ServiceId, ImageKey, Dictionary, SiteConfig
  config/site.ts                   facts, URLs, map embed, images, service/gallery order, flags
  content/id.ts                    export const id: Dictionary
  content/en.ts                    export const en: Dictionary
  i18n/context.ts                  LocaleContext (createContext)
  i18n/LocaleProvider.tsx          state + effects (html lang, title, description, storage)
  i18n/useLocale.ts                hook; throws outside the provider
  components/
    Logo.tsx  SectionHeader.tsx  SkipLink.tsx
    Header.tsx                     desktop nav, language toggle, CTA, mobile menu
    Footer.tsx
    ServiceDialog.tsx              native <dialog>
    OfficeGallery.tsx              2-up gallery, prev/next, live status
    MapEmbed.tsx                   embedded 2D map, requested near the viewport
  sections/
    Hero.tsx  About.tsx  Principle.tsx  PracticeAreas.tsx
    Values.tsx  Office.tsx  Insights.tsx
playwright.config.ts               P1 (D4)
tests/e2e/smoke.spec.ts            P1 (D4): AT-01…AT-07
```

## 4. Key decisions

### 4.1 Types and content (B5, B7)

- Core types:
  - `type Locale = 'id' | 'en'`
  - `type ServiceId = 'notary' | 'ppat' | 'auction'`
  - `type ImageKey = 'headshot' | 'formal' | 'seated' | 'team' | 'writing' | 'exterior' | 'interior'`. The prototype's `hero` key becomes `headshot`.
- **One `Dictionary` interface.** `id.ts` and `en.ts` are both typed `Dictionary`, so a missing or extra key fails `tsc`. Translation parity is enforced at build time.
- **Services are keyed by ID:** `services: Record<ServiceId, { title: string; summary: string; detail: string }>`. Images belong in config; icons belong in the component, not in copy.
- **Alt text is keyed by image:** `images: Record<ImageKey, string>`.
- **Accessible names live under `a11y`:** menu open/close, language toggle, main and footer nav, gallery prev/next, dialog close, skip link.
- **Dynamic strings are small functions**, e.g. `galleryStatus: (current: number, total: number) => string` ("Foto 1 dari 4" / "Photo 1 of 4").
- **No `enum`** (`erasableSyntaxOnly`): unions and `as const` only.

### 4.2 Site config (B6)

```ts
export const site = {
  name: 'I Gusti Ngurah Premana',
  titles: 'S.T., S.H., M.Kn.', // O-01
  links: {
    linkedin: 'https://www.linkedin.com/in/igustingurahpremana', // O-11
    maps: 'https://maps.app.goo.gl/TyGB2XTzgziTXk4T9',
  },
  mapEmbedUrl: (locale) => `https://www.google.com/maps/embed?pb=…!5e0!3m2!1s${locale}!2sid…`, // O-05: owner-supplied listing embed, road map
  images: {
    headshot: { src: '/images/portrait-headshot.jpg', width: 630, height: 630 },
    // one entry per ImageKey, with sizes from requirement §2.3
  },
  services: ['notary', 'ppat', 'auction'],
  serviceImages: { notary: 'writing', ppat: 'exterior', auction: 'seated' },
  gallery: ['interior', 'team', 'exterior', 'formal'],
  flags: { showAuctionOfficer: false }, // O-02
} as const satisfies SiteConfig
```

Service icons are presentation. They stay in `PracticeAreas.tsx` as a `Record<ServiceId, LucideIcon>` map.

As built:

- `images` is typed `Record<ImageKey, ImageMeta>` outside the `as const` object, so the optional `position` field (an `object-position` focal point) is visible on every entry. The exterior uses `70% 85%` so the notary signboard stays in view wherever it is cropped.
- `showAuctionOfficer` is widened to `boolean`, so code doesn't constant-fold the flag.
- `storageKey: 'premana.locale'` lives here too.

### 4.3 Locale (B8, C2)

- **Initial state.** `LocaleProvider` holds `locale`. Its initial value is a valid stored preference, otherwise `'id'`. Never infer it from `navigator.language`: the PRD makes Indonesian the first-visit default.
- **Persistence.** Save only explicit choices, to the `localStorage` key `premana.locale`. Wrap every access in `try/catch` (private mode, blocked storage).
- **Document sync.** One effect on `locale` sets `document.documentElement.lang`, `document.title`, and the `content` of `meta[name="description"]`.
- **Context value:** `{ locale, t, setLocale, toggleLocale }`.
- **File split.** The `react-refresh` lint rule requires separate files: the context object in `i18n/context.ts`, the hook in `i18n/useLocale.ts`, and the component in `i18n/LocaleProvider.tsx`.

### 4.4 Header and mobile menu (B9, C1: G-03, G-07, G-13, G-16)

- **Breakpoints** (as in the prototype): desktop nav at ≥1024 px; language toggle and "Lokasi Kantor" pill at ≥768 px; hamburger below 1024 px.
- **Toggle button:** `aria-expanded`, `aria-controls="mobile-menu"`, and an `aria-label` of `t.a11y.openMenu` or `t.a11y.closeMenu`.
- **Menu panel:** `<nav id="mobile-menu" aria-label={…}>`, with the `hidden` attribute while closed so `aria-controls` always resolves. No overlay.
- **Closing:** the menu closes on link click, on `Escape` (focus returns to the toggle), and when the viewport reaches ≥1024 px (`matchMedia` listener).
- **Language toggle:** the visible text stays "EN"/"ID" with the `Globe` icon. Its accessible name states the action in the current locale: id "Ganti bahasa ke English", en "Switch language to Bahasa Indonesia".
- **Anchors:** `id="home"` goes on the hero `<section>` (G-16). Every anchored section gets `scroll-margin-top` (G-07).
- **Skip link:** `SkipLink` ("Lewati ke konten utama" / "Skip to main content") targets `<main id="main" tabIndex={-1}>` and is visible on focus only (G-13).

### 4.5 Practice dialog (B11, C3: G-01, G-02)

- **State.** `App` holds `selectedService: ServiceId | null` plus a ref to the trigger button.
- **Opening and closing.** `ServiceDialog` renders a native `<dialog>`. An effect calls `showModal()` when an ID is set and `close()` when it is cleared. The native modal provides an inert background, focus containment, and `Escape` (the `cancel` event closes it).
- **Focus restore.** `onClose` sets `selectedService` to `null`, then focuses the stored trigger explicitly. Don't rely on the browser's focus restoration.
- **Backdrop click:** `onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close() }}`, with an inner wrapper that fills the dialog box.
- **Labels.** `aria-labelledby` points to the dialog's `<h2>`. The close button's `aria-label` is localized.
- **Text** is read from `t.services[selectedService]`, so switching locale updates the open dialog in place (G-01).
- **Small screens:** `max-h-[calc(100dvh-2rem)] overflow-y-auto` inside the dialog. The scroll lock comes from the CSS rule in §2.3.

### 4.6 Practice cards and Pejabat Lelang (B10, C4: G-09)

- Visible services: `site.services.filter((id) => id !== 'auction' || site.flags.showAuctionOfficer)`.
- The grid uses `md:grid-cols-2` for two cards and `md:grid-cols-3` for three.
- The intro text switches between `servicesText` (no auction mention) and `servicesTextWithAuction`, based on the flag.
- The auction `detail` copy contains no internal notes in either locale.

### 4.7 About and Office hybrid layouts (B10)

**About** (requirement §5.2):

- Desktop: `lg:grid-cols-[1fr_.9fr_1fr]`. At `md`, the text spans two columns above the portrait and list.
- Credential rows come from the dictionary (4 items), with icons `GraduationCap`, `FilePenLine`, `Landmark`, `MapPin`.
- Each icon sits in a circle, e.g. `grid h-11 w-11 place-items-center rounded-full bg-sand/10 text-sand`.
- Rows are separated by hairlines (`divide-y` with a light warm border colour).

**Office** (requirement §5.3):

- Split row: `lg:grid-cols-[1.15fr_1fr_.75fr] items-center`.
- Photos use fixed aspect ratios close to `preview.png`'s proportions (team wide landscape, exterior near-square), with `object-cover`, 16 px radius, and `photo-tint`. Never stretch them.
- Below the split come the gallery row (§4.8) and the location card with the map (§4.9).

Settle the exact proportions in the C10 visual pass. Use only prototype tokens, radii, and type.

As built:

- About uses `lg:grid-cols-[1fr_.9fr_1fr]` and a portrait at `aspect-[1.1]`.
- Office uses `lg:grid-cols-[1.4fr_1fr_.7fr]`. The team photo keeps the prototype's `aspect-[2.05]` at every width, because a narrower ratio would crop people out. The exterior is `aspect-[.85]`.
- `SectionHeader` gained a `compact` prop (`lg:text-[38px]` instead of `52px`) for these narrow columns. At 52 px, "Profesionalisme" alone is wider than the column.

### 4.8 Office gallery (B11, C5: G-15)

- **Display.** Index state with modulo wrap. Shows `photos[i]` and `photos[(i + 1) % n]`, as in the prototype.
- **Order** comes from `site.gallery`: interior → team → exterior → formal.
- **Prev/next buttons:** localized `aria-label` ("Foto sebelumnya" / "Previous photo") and 40 px targets (prototype `h-10 w-10`).
- **Position status:** `<p className="sr-only" aria-live="polite">{t.galleryStatus(i + 1, n)}</p>`.
- **No layout shift:** fixed heights (`h-[250px] md:h-[320px]`) with `object-cover`. Images are lazy and have intrinsic sizes.
- **Scope:** no carousel library and no autoplay. Swipe is optional, later.

### 4.9 Map (B11, C6: G-08, NFR-07)

- **Superseded (owner decision 2026-10-27): no click-to-load.** The owner asked for the map to be shown directly. `MapEmbed` renders the iframe immediately, and an `IntersectionObserver` (`rootMargin: 600px`) sets its `src` once the panel nears the viewport. Native `loading="lazy"` alone isn't enough: Chrome's iframe threshold fetched it at page load on a 1440×900 desktop. Note text:
  - id: "Peta disediakan oleh Google Maps dan dimuat saat bagian ini ditampilkan."
  - en: "The map is provided by Google Maps and loads when this section comes into view."
- **Iframe:** `<iframe src={near ? site.mapEmbedUrl(locale) : undefined} loading="lazy" title={t.map.iframeTitle} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full border-0" />`. The URL is the owner-supplied `/maps/embed?pb=…` for the business listing. `!5e0` forces the 2D road map (`!5e1` would be satellite), and both `!1s…` language slots take the active locale.
- **Fallback link.** A "Buka di Google Maps ↗" / "Open in Google Maps ↗" link (`site.links.maps`) is always rendered with the map, in case the iframe is blocked.
- **Referrer policy.** Drop the prototype's `referrerPolicy="no-referrer-when-downgrade"`; the browser default (`strict-origin-when-cross-origin`) is enough.

### 4.10 Insights accordion (B10, C7: G-06)

```tsx
<article className="relative (card classes from the prototype)">
  <span>{`0${i + 1}`}</span>
  <h3>
    <button
      id={`insight-button-${i}`}
      aria-expanded={open}
      aria-controls={`insight-panel-${i}`}
      className="focus-ring after:absolute after:inset-0 (prototype title classes)"
    >
      {item.name}
    </button>
  </h3>
  <p>{item.desc}</p>
  <div
    id={`insight-panel-${i}`}
    role="region"
    aria-labelledby={`insight-button-${i}`}
    hidden={!open}
    className="relative z-10 (prototype panel classes)"
  >
    {item.detail}
  </div>
</article>
```

- The stretched `::after` keeps the whole card clickable. The panel sits above it (`relative z-10`), so clicking or selecting panel text doesn't collapse it.
- Keep the prototype's one-open-at-a-time behaviour. The disclaimer paragraph sits below the grid.
- Keyboard focus shows on the whole card via `has-[button:focus-visible]:outline-*`, and the button's own outline is suppressed. The number and arrow row is `aria-hidden`.

### 4.10a External links and accessible names (C8, G-18)

- `components/ExternalLink.tsx` is the only place that writes `target="_blank"`. It always adds `rel="noopener noreferrer"` and a localized screen-reader "(membuka tab baru)" / "(opens in a new tab)".
- "Baca selengkapnya" buttons get a screen-reader-only ": <service title>" so each one has a unique accessible name, plus `aria-haspopup="dialog"`.
- The logo link's accessible name is its visible text plus a screen-reader-only ", beranda" / ", home" (label-in-name, WCAG 2.5.3).
- Language toggles carry `lang` on the target-language label.
- Footer links use a light focus outline (`focus-visible:outline-white/80`), because the forest ring is invisible on `forest-dark`.
- The map: the privacy note and the "Buka di Google Maps" link sit in the card's text column, so they stay visible after the map loads.

### 4.11 Images (A3, D2: G-11, NFR-05)

- **Extraction script.** `scripts/extract-preview-images.mjs` uses only `node:fs` and `node:path`. It:
  1. reads `docs/preview.html` and matches the `const images = {…}` block;
  2. decodes each `data:image/jpeg;base64,` value;
  3. writes `public/images/<file>.jpg` using the mapping in requirement §2.3;
  4. prints each name and byte size.
- **Sizes.** Every `<img>` gets `width` and `height` from `site.images`.
- **Loading.** The hero gets `fetchPriority="high"` and no lazy loading. All other images get `loading="lazy" decoding="async"`.
- **Alt text.** Photos repeated as decoration (practice-card images, the dialog image) use `alt=""`. Content photos use dictionary alt text.
- **Cleanup crop (A4).** `office-exterior.jpg` and `office-interior.jpg` are Google Maps screenshots that include Maps UI and part of the neighbouring team photo. `object-cover` can't remove chrome on two edges at once, so the script crops them with macOS `sips` (`formatOptions best`, no resampling). If `sips` is missing it warns and leaves the file uncropped.
- **Modern formats.** WebP/AVIF variants with `srcset` wait until the owner supplies originals (D8, O-06).

### 4.12 Icons (B9–B11)

`lucide-react` 1.61 no longer ships `Linkedin` (brand icons were removed) or `Globe2`.

| Prototype icon | lucide-react 1.61 | Where |
|---|---|---|
| `Scale` | `Scale` | Logo, favicon |
| `Globe2` | **`Globe`** (same drawing) | Language toggle |
| `Menu`, `X` | same | Mobile menu toggle, dialog close |
| `ArrowUpRight`, `ArrowRight`, `ArrowDown` | same | Links, CTAs, scroll hint |
| `FilePenLine`, `Landmark`, `Gavel` | same | Practice cards; About list (`FilePenLine`, `Landmark`) |
| `ShieldCheck`, `Award`, `BookOpen` | same | Values cards |
| `ChevronLeft`, `ChevronRight` | same | Gallery |
| `MapPin` | same | Location line, map, footer, About list |
| `Check` | same | Dialog close button |
| `Linkedin` | **`UserRound`** next to the text "LinkedIn" | Footer (the About link keeps `ArrowUpRight`) |
| (new) | `GraduationCap` | About credential list |

Use named imports only (`import { Scale } from 'lucide-react'`) so unused icons are tree-shaken.

### 4.13 SEO (B4, D1, D3: G-12)

- Static Indonesian metadata lives in `index.html`, so crawlers and social previews see `id`. The title and description switch with the locale at runtime.
- There is a single URL, so no `hreflang`.
- Headings: one `<h1>` (hero); section titles are `<h2>`; card titles are `<h3>`; the dialog title is `<h2>`.
- `robots.txt` (allow all, plus the sitemap URL) and `sitemap.xml` (a single `<url>`) are added only once the domain is known (D3, O-09).

### 4.14 Fonts and third parties (B4: G-17, O-10)

- Keep Google Fonts as in the prototype, with preconnect and `display=swap`.
- Add Playfair Display italic 400 so the hero `<em>` is a true italic (G-17). Confirm the look in C10.
- Self-hosting the two families is a P2 option, if O-10 asks for no third-party requests on page load.

## 5. Section port map

| Section | Component(s) | Prototype source (dictionary keys / JSX) | Changes |
|---|---|---|---|
| Header | `Header.tsx`, `Logo.tsx`, `SkipLink.tsx` | `nav`, `officeLink`; `Logo()`; `<header>` block | G-03, G-04, G-05, G-13; localized labels; `Globe` icon |
| Hero | `Hero.tsx` | `eyebrow`, `heroLead`, `heroAccent`, `heroSecond`, `heroSecondAccent`, `heroDesc`, `heroAction`, `heroSecondAction`, `photoTag`, `photoSub`, `scroll` | `id="home"` (G-16); hero image priority; localized alt text and badge |
| About | `About.tsx` | `aboutEyebrow`, `aboutTitle`, `aboutBody`, `aboutBody2`, `aboutExplore`, `infoItems` | **Hybrid 3-column layout with credential list** (requirement §5.2); drop the info box and the overlapping photo |
| Principle | `Principle.tsx` | `principleEyebrow`, `principleTitle`, `principleText` | none |
| Practice | `PracticeAreas.tsx`, `ServiceDialog.tsx` | `servicesEyebrow`, `servicesTitle`, `servicesText`, `more`, `services`, `modalTitle`, `modalButton` | IDs, flag, native dialog (G-01, G-02, G-09) |
| Values | `Values.tsx` | `focusLabel`, `focusTitle`, `values` | drop the unused `focusText` (G-14) |
| Office | `Office.tsx`, `OfficeGallery.tsx`, `MapEmbed.tsx` | `teamEyebrow`, `teamTitle`, `teamText`, `galleryTitle`, `locationLabel`, `locationTitle`, `locationText`, `locationButton` | **Hybrid split row** (requirement §5.3); gallery order; click-to-load map (G-08, G-15) |
| Insights | `Insights.tsx` | `insightsEyebrow`, `insightsTitle`, `insightsBody`, `insightCards`, `insightDetails` (inline in `App`), `disclaimer` | Accordion (G-06); details move into the dictionary |
| Footer | `Footer.tsx` | `footerDescription`, `footerSite`, `footerConnect`, `rights`, `footerTag` | localized labels; `UserRound` instead of `Linkedin` |

Read each block with the commands in `CLAUDE.md` → "Reference files", and port class strings verbatim. The only deliberate class changes are the `motion-safe:` prefixes (G-10) and the hybrid layouts.

## 6. Testing and verification

- **Every task:** `npm run lint` and `npm run build` (NFR-01).
- **Manual check:**
  1. Run `npm run build && npm run preview`.
  2. Run AT-01…AT-10 in a browser at 320, 375, 768, 1024, and 1440 px.
  3. Compare side by side with `docs/preview.html` (open it directly in a browser). For About and Office, compare with `docs/preview.png`.
- **Playwright (D4, P1).** `playwright.config.ts` uses `webServer: { command: 'npm run build && npm run preview -- --port 4173 --strictPort', url: 'http://localhost:4173' }` and two projects: `desktop` (1440×900) and `mobile` (375×812).

  `tests/e2e/smoke.spec.ts` covers AT-01…AT-07:

  | Test | Assertion |
  |---|---|
  | AT-01 | After clicking a nav link, the section heading is in the viewport and below the header |
  | AT-02 | The menu opens and closes; `document.documentElement.scrollWidth <= window.innerWidth` |
  | AT-03 | `html[lang]` and sample strings match each locale, including inside an open dialog |
  | AT-04 | Focus is inside the dialog after opening and never on page content behind it; after `Escape`, focus is back on the trigger |
  | AT-05 | Next and previous wrap; every gallery image has `naturalWidth > 0` |
  | AT-06 | `aria-expanded` and the panel's `hidden` state agree |
  | AT-07 | Link `href`, `target`, and `rel` values |

  Setup:
  - Add `"test:e2e": "playwright test"` to `package.json`.
  - Add `playwright.config.ts` and `tests` to the `include` of `tsconfig.node.json`.
  - Add `test-results/` and `playwright-report/` to `.gitignore`.
  - `tsconfig.node.json` also needs `"DOM"` in `lib` for the `page.evaluate` callbacks.
  - Scope as built: also checks one `<h1>`, heading order, image attributes, C4 (default flag), C6 (no Maps request before the click), and C9 (reduced motion).
- **Lighthouse (D6).** Run it against `npm run preview`, e.g. `npx lighthouse http://localhost:4173 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --view`, or use Chrome DevTools. Record the actual scores and explain any miss.
- **Content sweep (C11).** Every hit must be reviewed and justified in the verification log; ideally there are none.

  ```bash
  grep -rniE '17\+|1000\+|testimoni|rating|★|08\.00|konsultasi|terbaik|best|number one|garansi|guarantee' src index.html
  ```

## 7. Deployment notes (do not execute without authorization)

- **Output.** The build is a static `dist/`: `index.html`, hashed `assets/`, `images/`, and `favicon.svg`. Any static host, CDN, or Nginx works. HTTPS only.
- **Routing.** It is a single page with hash anchors, so no SPA rewrites are needed.
- **Caching:**
  - `assets/*`: `Cache-Control: public, max-age=31536000, immutable`
  - `index.html`: `no-cache`
  - `images/*`: moderate, e.g. 7 days
- **Suggested headers** (verify before enabling):
  - `Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.google.com https://maps.google.com`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Content-Type-Options: nosniff`
- **README.** A sample Nginx server block goes into the README (D7).

## 8. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Low-resolution screenshot crops look soft on large or retina screens | Keep display sizes modest, keep `photo-tint`, and request originals (O-06) |
| Client-side rendering delays LCP (target: Lighthouse ≥ 90 on mobile) | Preload the hero image; keep the bundle small with tree-shaken icon imports. Prerendering is a P2 option if the target is missed |
| Unverified facts slip into copy | Copy comes only from dictionaries and config; C11 sweep; open-items table |
| Third-party requests (fonts, maps) | The map is requested only near the viewport; the fonts decision is tracked as O-10 |
| The hybrid About and Office drift from the approved look | Use only prototype tokens, radii, and type; the owner reviews the C10 screenshots |
| Future `lucide-react` icon renames | Pin `^1.61`; §4.12 lists every icon used |
| Native `<dialog>` quirks in older browsers | Target the latest browsers (NFR-10); restore focus explicitly |
