# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Project

Personal website for **I Gusti Ngurah Premana, S.T., S.H., M.Kn.**, Notaris & PPAT in Kerobokan, Badung, Bali.

It is a bilingual, single-page, **informational** site: Indonesian is the default and English is secondary. It covers the notary's identity, practice areas, office, location, and short legal explainers. It is a static build with no backend, no forms, and no tracking.

It is **not** a marketing or lead-generation site. Indonesian notarial ethics restrict advertising, so every claim and call-to-action must stay factual and restrained.

Docs and code comments are in English. Site copy is in Indonesian and English.

## Sources of truth (highest first)

1. Explicit owner confirmations. Record them in the active task's `requirement.md` → open items.
2. [`PRD.md`](PRD.md): product requirements v1.0. It lives at the repo root. Where the PRD says `docs/PRD.md`, it means this file.
3. The active task spec: `docs/<task_name>/requirement.md` → `plan.md` → `tasks.md`.
4. [`docs/preview.html`](docs/preview.html): compiled build of the approved prototype. Source for layout, copy (id/en), design tokens, class names, and the only copies of the 7 site photos.
5. [`docs/preview.png`](docs/preview.png): image-only mockup. Use it **only as a composition reference for the About and Office sections**, never as a source of content.
6. Benchmark PDFs named in PRD §6 (not in this repo): inspiration only. Never copy their content.

If sources disagree on a professional fact, a content right, or an ethics question, stop and raise it for owner review. Never resolve the conflict by inventing content.

## Active task

**[`docs/website-mvp/`](docs/website-mvp/)**: build the MVP site from the PRD.
State on 2026-10-27: phases A–D implemented and verified (see the verification log in tasks.md). Open: A2 (git, owner decision), D3/D8 (blocked on O-09/O-06), D5 human checks (VoiceOver, Firefox/Safari/real mobile), and the phase E publication gate. Update this line as phases complete.

Side task **[`docs/design-switcher/`](docs/design-switcher/)** (2026-10-28, done): a floating review switch `V1 | V2 | V3`: the previous design (`origin/dev-design-v1`, `src/v1/`), the current design, and a dark variant after an owner reference image (`src/v3/`). V3 breaks the light-first rule and is review-only until the owner decides (DS-O2). It sits behind `flags.showDesignSwitch` and must be off before publishing (O-13).

- [requirement.md](docs/website-mvp/requirement.md): scope, FR/NFR, hybrid design spec, prototype gaps (`G-xx`), open items (`O-xx`)
- [plan.md](docs/website-mvp/plan.md): architecture, file map, key technical decisions
- [tasks.md](docs/website-mvp/tasks.md): ordered checklist (`A1`…`E6`) and verification log

## Task workflow: `docs/<task_name>/`

Every non-trivial piece of work gets its own kebab-case folder `docs/<task_name>/` with exactly three files:

| File | Holds |
|---|---|
| `requirement.md` | What and why: scope, requirements with acceptance criteria (IDs trace to PRD `FR-`/`NFR-`/`AT-`), open items |
| `plan.md` | How: architecture, files to touch, decisions and trade-offs, verification strategy |
| `tasks.md` | Ordered checklist (ID, priority, refs, "Done when") plus a verification log |

Rules:

- At the start of a session, read the active task's three files. Then take the first unchecked task whose dependencies are done.
- Tick a task `[x]` only after its "Done when" check passes. Append the command and its **actual** result to the verification log.
- Mark work in progress `[~]`. Mark blocked work `[!]` and say what blocks it.
- If a decision changes the approach, update `plan.md` in the same change.
- If a new fact or approval arrives, update the open items in `requirement.md`.
- New scope gets a new folder. Don't append unrelated work to an existing task.

## Reference files (`docs/`)

| File | What it is | Use it for | Never |
|---|---|---|---|
| `preview.html` | Compiled prototype (`premana-notary-react`): 756 KB of React app, Tailwind 4 CSS, and 7 base64 JPEGs | Layout, copy, tokens, class names, photos | `Read` it raw: base64 lines reach 165K characters |
| `preview.png` | Image-only mockup (PRD §6 item 6), 1024×1536 | Composition of About (credential list) and Office (split layout) | Take any content from it. Its stats, testimonials, hours, "Konsultasi" CTA, and social icons are fabricated placeholders |
| `profile-one.png` | LinkedIn profile photo (headshot) | Identity and photo reference | Upscale or alter it |
| `profile-two.png` | LinkedIn banner (hands writing, B&W) | Source of `legal-writing.jpg` | |
| `profile-tree.png` | LinkedIn "Media" portraits | Portrait references | |
| `profile-four.png` | Google Maps listing: team, exterior, interior, map pin | Office photo references; sanity check for the location | Take an address or hours from it |

External sources:

- LinkedIn: `https://www.linkedin.com/in/igustingurahpremana`
- Google Maps, the location source of truth: `https://maps.app.goo.gl/TyGB2XTzgziTXk4T9`

Read `preview.html` safely with these commands (all tested):

```bash
# Prototype app source (dictionary + components), base64 stripped: ~179 lines
sed -E 's#data:image/jpeg;base64,[A-Za-z0-9+/=]+#<base64>#g' docs/preview.html \
  | awk '/^\(function\(module,exports,require\)/,/^\}\)\(module,module\.exports,require\);/'

# id/en dictionary only: ~135 lines
sed -E 's#data:image/jpeg;base64,[A-Za-z0-9+/=]+#<base64>#g' docs/preview.html \
  | awk '/^const dictionary = \{/,/^const anchors/'

# Design tokens and custom helper classes
grep -E -- '^\s*--(color-(cream|paper|sage|sage-light|forest|forest-dark|ink|muted|sand)|font-(display|sans)):' docs/preview.html
grep -A3 -E '^\.(soft-shadow|hero-blob|section-eyebrow|photo-tint|focus-ring:focus-visible) \{' docs/preview.html
```

The prototype's JSX render is a single line of about 20K characters. Append `| fold -w 200` to read it in chunks.

## Commands

```bash
npm install          # Node 24, npm 11
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build → dist/ (must pass: NFR-01)
npm run lint         # ESLint 10 flat config
npm run preview      # serve dist/ locally
npm run test:e2e     # Playwright smoke tests, added by task D4
```

## Stack (installed versions, checked 2026-10-27)

- React 19.3, react-dom 19.3, TypeScript 6.0, Vite 8.3 (`@vitejs/plugin-react` 6), ESLint 10 with typescript-eslint 8.
- The PRD says "Vite 7". The installed Vite 8 supersedes that; don't downgrade.
- Task B1 adds `tailwindcss` and `@tailwindcss/vite` 4.3 (supports Vite 8), plus `lucide-react` 1.61. Task D4 (P1) adds the dev dependency `@playwright/test`.
- `lucide-react` 1.x has **no `Linkedin` or `Globe2`** icons. Use `UserRound` next to the text "LinkedIn", and `Globe` for the language toggle.
- Any other dependency needs a written justification in the active `plan.md` first. No UI kits, carousel libraries, i18n frameworks, state libraries, CSS-in-JS, or analytics.
- TypeScript flags that matter:
  - `verbatimModuleSyntax`: use `import type` for types.
  - `erasableSyntaxOnly`: no `enum`, `namespace`, or constructor parameter properties. Use unions and `as const`.
  - `noUnusedLocals` / `noUnusedParameters`.

## Code style

- Match the existing files:
  - 2-space indent, single quotes, no semicolons, trailing commas.
  - Explicit `.ts`/`.tsx` extensions on relative imports (`import App from './App.tsx'`).
- Use function components and hooks only. Keep components small and flat: no repository layers, dependency injection, or global state frameworks (PRD §7).
- `react-refresh/only-export-components` is on, so a `.tsx` file exports components only. Put contexts and hooks in their own `.ts` files.
- Put Tailwind utility classes in JSX. Custom CSS goes only in `src/style.css`. Since the owner redesign 2026-10-27, G-21, `preview.html` is the source for copy and content only; the visual language is the one described under "Design system" below.

## Architecture (target; details in `docs/website-mvp/plan.md` §3)

```text
index.html               lang="id", metadata, fonts, hero preload
public/images/           7 photos extracted from docs/preview.html
scripts/                 extract-preview-images.mjs (one-off, no deps)
src/
  main.tsx  Root.tsx  App.tsx  style.css   Root = design switch (current App | lazy v1 App)
  config/site.ts         name, titles, URLs, map embed, image metadata, feature flags
  content/id.ts  en.ts   every visible string, aria-label, and alt text
  i18n/                  locale context, LocaleProvider, useLocale()
  types/site.ts          Locale, ServiceId, ImageKey, Dictionary, SiteConfig
  components/            Header, Footer, Logo, SectionHeader, SkipLink, ExternalLink, ServiceDialog, MapEmbed
  sections/              Hero, About, Values, PracticeAreas, Office, Insights
  v3/                    dark review variant (shared dictionary/config, own markup); review only
  v1/                    previous design (origin/dev-design-v1) for review only; mirrors src/ and reuses i18n,
                         ExternalLink, images, and facts. Don't evolve it; fix guardrail issues only
```

- Components get text only through `useLocale()`. JSX contains no hard-coded strings, including `aria-label` and `alt`.
- Facts, URLs, and flags live only in `src/config/site.ts`.
- State stores stable IDs (such as `ServiceId`), never translated objects.

## Design system: "Soft Contemporary Elegance"

| Token | Hex | Use |
|---|---|---|
| `cream` | `#F8F7F3` | page background |
| `paper` | `#FFFEFC` | cards, surfaces |
| `sage` | `#E8EEEA` | soft fills, hover |
| `sage-light` | `#F0F3EE` | light bands |
| `forest` | `#45665E` | accent, buttons |
| `forest-dark` | `#263F38` | footer, hover |
| `ink` | `rgb(0 0 0 / .9)` | headings, titles (owner request 2026-10-27: neutral text after notion.com, G-19) |
| `body` | `rgb(0 0 0 / .72)` | paragraphs, nav, location lines |
| `muted` | `rgb(0 0 0 / .58)` | eyebrows, captions, card descriptions, notes. Text uses only these three tiers (white · white/75 · white/60 on the footer); green is for accents and links |
| `sand` | `#B79770` | small bronze accents |

- **Fonts:** DM Sans (optical-size axis, 400–700) for everything, with section headings semibold and tightly tracked, after apple.com / notion.com (G-21). Playfair Display (400 + italic 400, `font-display`) is used **only for the hero `<h1>`**, at the owner's request (G-22). `display=swap`. No other families.
- **Type scale (G-20, G-21):** use the theme tokens in `src/style.css`, never arbitrary `text-[Npx]`/`leading-[…]`/`tracking-[…]`. `text-display`/`text-display-sm` (hero h1 in Playfair, 64/44), `text-h2`/`text-h2-sm` (44/32), `text-title` (28, tile and dialog titles), `text-h3` (20), `text-lead` (19), `text-para` (16, body), `text-small` (14), `text-caption` (13), `text-ui` (15, nav/buttons), `text-label` (11 uppercase, logo and footer only). Headings use `font-semibold` and `text-balance`. Only the logo wordmark keeps fixed sizes.
- **Layout:** about 1250 px maximum content width. Content sits in large tiles with a 28 px radius (`bg-sage-light`/`bg-sage` on `paper`/`cream` sections) arranged as bento grids; no drop shadows on tiles. Buttons are pills (`btn btn-primary` filled forest, `btn btn-secondary` outlined). Arrow icons only on external links (exception: the hero's two links, as in the original design, G-22). Sentence-case eyebrows in forest, no numbering or wide-tracked caps. No decorative blobs, circles, overlapping cards, or scroll hints. Icons come from `lucide-react`, used sparingly.
- **Helper classes** (`src/style.css`): `section-eyebrow`, `btn`, `btn-primary`, `btn-secondary`, `photo-tint`, `focus-ring`.
- **Motion** is optional and subtle (150–300 ms). It always respects `prefers-reduced-motion`. No parallax.
- **Light first:** no dark or gold-heavy blocks above the fold. The only dark surface is the footer.
- **Breakpoints:** check 320, 375, 768, 1024, and 1440 px. There must be no horizontal scroll, clipping, overlap, or stretched photos.
- **Page layout (owner redesign 2026-10-27, G-21; full spec in requirement.md §5):** Hero (original text column: serif headline with italic accents, eyebrow rule, pill + underlined link, scroll hint | rounded portrait with frosted caption and the floating formal-portrait card, G-22) → About bento (intro tile | portrait tile, credentials strip) → Values (one statement + three values) → Practice tiles → Office + location bento (team photo | location tile, [interior | formal: hidden by flag, G-24], full-width map, G-23) → Insights FAQ list → Footer.
  - The map embed uses **coordinates only** (`site.mapEmbedUrl`). An embed that references the Google listing (the owner's `/maps/embed?pb=…`) overlays a place card with the street address and a star rating once the map is wide, and both are banned. Check this with screenshots, not frame text: the card's text isn't readable from the frame.

## Content guardrails (hard rules)

- **Never invent or display any of these as fact:**
  - years of experience, client counts, ratings, testimonials, client names or logos;
  - phone, email, WhatsApp, opening hours, street address;
  - awards, education institutions, career dates, speaking roles;
  - guarantees or speed promises.
- **`preview.png` placeholders are banned:**
  - the stats "17+ Tahun Pengalaman" and "1000+ Klien";
  - star ratings and the "Apa Kata Mereka?" testimonials;
  - office hours ("08.00 – 17.00 WITA");
  - the "Konsultasi" button and the "Konsultasi Hukum" card;
  - Instagram/YouTube icons;
  - the "Kebijakan Privasi" / "Syarat & Ketentuan" links.
- **Pejabat Lelang** stays hidden (`showAuctionOfficer: false`) until the owner confirms the appointment and its scope.
- **Office photo row** (interior + formal portrait) is hidden (`showOfficePhotos: false`) at the owner's request, kept for later use (G-24). Don't delete it.
- **Tone:** professional, warm, factual, restrained. No superlatives ("terbaik", "best", "number one"), no urgency, no solicitation, and no "konsultasi" or "hubungi kami" sales CTAs.
- **Legal explainers** are general information and must show the disclaimer ("Konten bersifat informasi umum, bukan nasihat hukum…").
- **Missing or unverified facts:** omit them or use neutral wording, and log them as an open item (`O-xx`). Never use placeholder text that could ship.
- **Photos:** owner-supplied only. Never generate, AI-upscale, retouch, or alter a person's appearance. Alt text describes what is shown.
- Visitors must never see internal notes such as "confirm before publishing".

## i18n, accessibility, privacy checklist

- Indonesian is the first-visit default (never use `navigator.language`). English comes from the switcher. A `localStorage` preference is optional.
- `<html lang>`, `document.title`, and the meta description follow the locale.
- No mixed-language UI. Aria-labels, alt texts, the dialog, the map title, and the disclaimer are all localized.
- One `<h1>` and a logical heading order. Use semantic landmarks, a skip link, and visible focus (`focus-ring`). Tap targets are at least 24 px (WCAG 2.2 AA); aim for 44 px.
- **Mobile menu:** uses `aria-expanded` + `aria-controls` and closes on link click and `Escape`. No overlay traps clicks.
- **Practice dialog:** uses native `<dialog>` with `showModal()`. Focus moves in and the background is inert. It closes via the button, the backdrop, or `Escape`, and focus returns to the trigger. Body scroll is locked while it is open.
- **Insights:** accordion buttons use `aria-expanded` + `aria-controls` pointing at panel IDs.
- **Office photos:** fixed tiles with meaningful, localized alt text per photo (the prev/next gallery was replaced, owner redesign 2026-10-27, G-21).
- **External links:** `target="_blank"` always comes with `rel="noopener noreferrer"`.
- No analytics, cookies, trackers, or forms. The Google Maps iframe (2D road map) is shown directly but only requested when the Office location card nears the viewport (IntersectionObserver, owner decision 2026-10-27); the plain Maps link always works.
- No secrets or environment variables are needed. Never commit any.

## Definition of done and handoff

A task is done when:

- its "Done when" check passes;
- `npm run lint` and `npm run build` succeed;
- `tasks.md` is updated.

At the end of a work session, report (PRD §10):

1. Files and components changed.
2. Requirements completed, and deferred P1/P2 work.
3. Commands run, with their **actual** output. Never claim a test passed if it was not run.
4. Visual check at desktop and mobile widths, with screenshots where tooling allows.
5. Unresolved factual, ethics, accessibility, performance, or photo-rights blockers.
6. How to run locally and how to deploy `dist/`.

## Never

- Deploy, publish, or configure a domain without explicit owner authorization. PRD Phase E is a human gate.
- Commit, push, or `git init` unless asked. The repo is not under git yet.
- Rewrite from scratch or migrate frameworks.
- Add a backend, CMS, forms, auth, booking, chat, or analytics.
- Restyle toward a dark or gold "law-firm template" or stock imagery.
- Silently remove working UI. Document behaviour changes in the task docs.
- Edit `PRD.md` or the reference files in `docs/` unless the owner asks. They are inputs.
