# Product Requirements Document (PRD)

## I Gusti Ngurah Premana — Personal Notary & PPAT Website

| Field            | Value                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| Product          | Professional personal website for I Gusti Ngurah Premana, S.T., S.H., M.Kn.       |
| Document version | 1.0                                                                               |
| Status           | **Development-ready brief**; content/legal approval required before publication   |
| Product type     | Public-facing, informational, single-page website                                 |
| Primary locale   | Indonesian (`id`)                                                                 |
| Secondary locale | English (`en`)                                                                    |
| Delivery stack   | React 19, TypeScript, Vite 7, Tailwind CSS 4                                      |
| Starting point   | Existing `premana-notary-react/` prototype (enhance; do not rewrite from scratch) |
| Backend          | **None in MVP**                                                                   |

> **For the development agent:** Treat the existing React prototype, its supplied photo assets, and this PRD as the implementation baseline. Do not interpret benchmark PDFs as permission to copy their content, testimonials, ratings, or claims. When requirements are uncertain, preserve a safe informational presentation and log the outstanding item rather than inventing details.

---

## 1. Product overview

Build and refine a polished, responsive, bilingual personal website for **I Gusti Ngurah Premana, S.T., S.H., M.Kn.**, presenting his professional identity and the notarial/PPAT office in the Kerobokan/Badung area of Bali. The site should be modern, elegant, approachable, easy to navigate, and predominantly light-colored.

This is a **professional information website**, **not** a commercial legal-service marketplace, lead-generation funnel, or appointment-booking platform. Because Indonesian notarial professional ethics can restrict advertising, the finished content and any contact call-to-action must be reviewed by the practitioner and the appropriate professional/legal reviewer before publication.

### Problem

Visitors coming from search, LinkedIn, or Maps need a credible and easily accessible way to understand the notary's background, practice areas, office environment, and location. Generic legal templates tend to look overly corporate, dark, or promotional, and often hide the actual professional and office behind stock photos.

### Product outcome

An attractive, accurate, fast, accessible website using **real professional and office imagery**, with clear Indonesian/English information and reliable external links to the existing LinkedIn profile and Google Maps listing.

## 2. Goals and non-goals

### Goals (MVP)

- Present the notary's name, professional titles **subject to final verification**, and personal biography without unsupported claims.
- Use the genuine photos supplied by the project owner, including a personal portrait, office/team image, interior, and exterior.
- Preserve the approved **Soft Contemporary Elegance** design: warm ivory, sage, stone, muted bronze, high-quality typography.
- Offer one coherent, responsive page: Hero, About, Professional Values, Practice Areas, Office/Gallery/Map, Insights, Footer.
- Offer readable Indonesian and English content through a functional language switcher.
- Make internal navigation, practice details, gallery browsing, educational cards, and external links work properly.
- Ensure accessibility, SEO fundamentals, basic performance optimization, and a repeatable production build.

### Explicitly out of scope (MVP)

- User accounts, authentication, dashboard, CMS, databases, payment, invoicing, appointment scheduling, online legal advice, WhatsApp automation, CRM, lead capture, contact form, or chatbots.
- Client testimonials, star ratings, client counts, case studies, partner logos, price packages, promises of faster services, or claims of guaranteed outcomes.
- Fabricated office phone number, email, opening hours, credentials, awards, appointment history, or exact street address.
- A redesign of the approved visual identity into a dark/gold-heavy or stock-image-heavy law-firm template.

## 3. Users and use cases

| Audience                              | Need                                                                | Expected action                              |
| ------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------- |
| Prospective local visitor             | Understand the professional's identity and official practice fields | Read hero, About, Practice Areas             |
| Overseas / English-speaking visitor   | Understand the office and essential concepts in English             | Switch language, navigate content            |
| Visitor planning to locate the office | See the authentic environment and navigate to the correct location  | View office gallery; open Google Maps        |
| Professional contact / referral       | Verify the professional profile                                     | Open the LinkedIn profile                    |
| Website owner / maintainer            | Update text, images, and links without changing layout code         | Edit centralized configuration/content files |

## 4. Approved visual identity

### Design principles

1. **Bright and premium:** predominantly off-white, warm natural light, no dominant black or deep-green blocks above the fold.
2. **Person-first:** professional portrait must carry the hero; real office/team photos should support trust and authenticity.
3. **Quiet authority:** legible serif headlines, restrained colors, clear margins, no heavy animations or aggressive sales prompts.
4. **Balanced personality and institution:** the professional is the primary identity; the office is secondary supporting context.
5. **Understated Bali presence:** local authenticity through genuine office/location imagery, not tourist/resort motifs.

### Existing design tokens — retain unless a visual review approves changes

| Purpose               | Token         | Hex       |
| --------------------- | ------------- | --------- |
| Main background       | `cream`       | `#F8F7F3` |
| White / paper surface | `paper`       | `#FFFEFC` |
| Soft sage             | `sage`        | `#E8EEEA` |
| Lighter sage          | `sage-light`  | `#F0F3EE` |
| Main accent / buttons | `forest`      | `#45665E` |
| Footer / dark accent  | `forest-dark` | `#263F38` |
| Primary text          | `ink`         | `#293832` |
| Supporting text       | `muted`       | `#73817B` |
| Elegant small accent  | `sand`        | `#B79770` |

**Fonts:** Playfair Display (headings) and DM Sans (body/UI) as currently configured. Use system fallbacks and `font-display: swap`/equivalent. Do not add many font families.

**Layout:** ~1250 px maximum content width; roomy section spacing; modest radii (8–16 px for cards; pill style for primary CTAs); delicate borders/shadows; subtle hover/focus states; icon style consistent with `lucide-react`.

**Motion:** Optional subtle opacity/translation, 150–300 ms; honor `prefers-reduced-motion`; no parallax requirement.

**Responsive breakpoints to test:** 320, 375, 768, 1024, and 1440 px. No horizontal overflow, clipping, or overlapping text.

## 5. Information architecture and functional requirements

Keep this a single-page site for MVP, using stable URL fragments:

| ID    | Section / feature            | Requirements                                                                                                                     | Acceptance criteria                                                                                              |
| ----- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| FR-01 | Header and navigation        | Brand name/role, Home/About/Practice/Office/Insights anchor links; sticky desktop header, collapsible mobile menu                | All links scroll to correct sections; menu closes on selection; keyboard-operable                                |
| FR-02 | Language switch              | Indonesian default; switch all visible UI and explanatory content to English and back                                            | No mixed-language labels/content; `document.documentElement.lang` updates; selected modal/accordion also updates |
| FR-03 | Hero                         | Bright, minimal split layout; authentic portrait; professional name and carefully worded intro; About and Practice links         | Desktop and mobile visual hierarchy matches approved mood; photo not stretched; both links work                  |
| FR-04 | About                        | Formal portrait/photo, factual introduction, professional values, accessible external LinkedIn link                              | Accurate approved text; LinkedIn opens proper URL in new tab securely                                            |
| FR-05 | Professional values          | Short informational section for precision, integrity, confidentiality                                                            | Content is non-promotional and bilingual                                                                         |
| FR-06 | Practice Areas               | Up to three approved categories: Kenotariatan, PPAT/Pertanahan, and **Pejabat Lelang only after appointment/scope confirmation** | Cards display summaries; details open in accessible dialog; content does not imply unverified authority          |
| FR-07 | Office and gallery           | Genuine team/office images; basic carousel controls; image descriptions                                                          | Previous/next work, wrap properly, images load responsively, meaningful alt text                                 |
| FR-08 | Location                     | Approximate Kerobokan, Badung location, map link and optional map embed                                                          | Map link points to the supplied Google Maps listing; do not invent address/hours                                 |
| FR-09 | Insights / FAQs              | Three short educational topics: authentic deed, Notary vs PPAT, document preparation                                             | Accessible expanding content; bilingual; clearly flagged as general information, not individualized legal advice |
| FR-10 | Footer                       | Professional name, contextual info, internal links, LinkedIn and Maps                                                            | All links valid; current year; correct language                                                                  |
| FR-11 | SEO / metadata               | Descriptive per-language page title/description where supported, social preview, favicon, robots, sitemap                        | Valid metadata, no false claims; no `hreflang` unless distinct indexable language URLs exist                     |
| FR-12 | Responsive and accessibility | Semantic elements, focus indicators, meaningful labels, modal focus management                                                   | Functions on keyboard and screen readers; meets WCAG 2.2 AA requirements where applicable                        |

### Interaction details

**Header:** Maintain the working sticky menu. On mobile, the toggle must have an accurate accessible name and `aria-expanded`; close the menu on link click and `Escape`. Do not allow a hidden overlay to trap clicks.

**Language:** Prefer a single state/context source for locale with separate `id` and `en` dictionaries. Store service selection using a **stable service ID**, not a full translated service object, so opening a practice dialog then switching language does not leave stale text. Optional `localStorage` preference is allowed, but Indonesian must be the first-visit default.

**Practice-area dialog:** Focus dialog on open, trap focus while open, close via button, backdrop, and `Escape`, then restore focus to the original trigger. Lock body scrolling safely. Use the current translated text. Avoid a modal if the content is too long on small screens.

**Office gallery:** Visible previous/next controls, accessible labels, consistent aspect ratios and sensible crops. The default display should prioritize the office/team. Optional thumbnail navigation may be added if it improves UX, without creating a complex carousel dependency.

**Educational cards:** Use a semantic accordion pattern (`aria-expanded` and controlled panel IDs), not visual-only expansion. All revealed text must follow selected language.

**Maps:** Use the given Google Maps place link as the source of truth. If embedding Google Maps, prefer lazy loading or a click-to-load privacy-friendly pattern and show a usable link if the iframe is blocked.

## 6. Source material and content governance

### Supplied inputs

1. **LinkedIn**: <https://www.linkedin.com/in/igustingurahpremana> — professional identity/profile reference.
2. **Google Maps**: <https://maps.app.goo.gl/TyGB2XTzgziTXk4T9> — office/location reference.
3. Owner-supplied LinkedIn and Maps screenshots — visual assets and reference to actual individual, team, and office.
4. Benchmark PDF 1: `public notary ref 1.pdf` — `asi-wang.com`; useful for structuring About, services, process, and footer. **Do not copy promotional or testimonial content.**
5. Benchmark PDF 2: `public notary ref 2.pdf` — `notarisbali.web.id`; useful for light page organization, service grid, and readability. **Do not copy phone numbers, ratings, claims, or testimonials.**
6. Existing visual mockup: `a_clean_modern_elegant_website_homepage_mockup_f.png` — mood and structure inspiration, **not** authoritative data (contains invented placeholder statistics/testimonials).
7. Existing source: `premana-notary-react/` — implementation baseline and current photographs.

### Current code assets

```text
public/images/
  portrait-headshot.jpg   # Hero photo
  portrait-formal.jpg     # Supporting professional portrait
  portrait-seated.jpg     # About portrait
  team.jpg                # Actual office/team photo
  office-interior.jpg     # Interior crop
  office-exterior.jpg     # Exterior crop
  legal-writing.jpg      # Supporting document image
```

**Asset rule:** The existing JPGs are cropped from supplied screenshots and may be low-resolution. Do not fabricate high-resolution replacement portraits or alter the person's identity. Replace with original authorized images if the owner supplies them. Verify portrait and group-photo publication permissions before launch; optimize images (e.g. WebP/AVIF variants) after originals are approved.

### Content status

**Currently safe to treat as project-provided context, but still require owner sign-off:** name as shown in existing prototype, Bali/Badung/Kerobokan association, LinkedIn and Maps URLs, visual identity.

**Must be explicitly verified before public launch:** exact professional credentials and active appointment(s), whether Pejabat Lelang is an active designation, education and career timelines, office address and hours, contact information, any employee imagery rights, the precise service/authority descriptions, and any legal article details.

**Never generate as facts:** '17+ years', '1000+ clients', a 5-star rating, client reviews/testimonials, named client organizations, phone numbers, public endorsements, or guarantees. The earlier **image-only mockup contains illustrative placeholders**; these do **not** authorize factual claims on the website.

**Language and tone:** Professional, warm, factual and restrained. Avoid superlatives ('best', 'number one'), urgency, exaggerated claims, and commercial solicitation. The existing headline _“Komitmen pada ketelitian. Berlandaskan kepercayaan.”_ is a design copy candidate and requires editorial approval.

## 7. Engineering requirements

### Stack and deployment

- Work in the **existing** React + TypeScript + Vite + Tailwind project; do not migrate frameworks.
- Keep dependencies small. Continue using `lucide-react` for icons.
- Static build and static hosting are sufficient (Nginx, CDN, or equivalent). No Node.js application server required after building.
- Deployment should serve the Vite `dist/` artifacts, route requests appropriately, and use HTTPS.
- Environment variables are **not needed for MVP**. No secrets in client code.

### Suggested pragmatic structure (refactor gradually)

```text
src/
  App.tsx
  main.tsx
  style.css
  components/
    Header.tsx
    Footer.tsx
    SectionHeader.tsx
    ServiceDialog.tsx
    OfficeGallery.tsx
  sections/
    Hero.tsx
    About.tsx
    PracticeAreas.tsx
    Office.tsx
    Insights.tsx
  content/
    id.ts
    en.ts
  config/
    site.ts                # Approved name, URLs, and other verified facts
  types/
    site.ts
public/images/
docs/
  PRD.md
index.html
```

The structure is a **guide**, not a demand for excessive abstraction. Keep the components simple; no domain-driven architecture, repository layer, unnecessary global state framework, or backend scaffolding.

### Non-functional criteria

| ID     | Requirement          | Target / verification                                                                                                 |
| ------ | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Production build     | `npm run build` completes without TypeScript or Vite errors                                                           |
| NFR-02 | Visual consistency   | Screenshots at 320/375/768/1024/1440 px are reviewed against approved light palette                                   |
| NFR-03 | Performance          | Target Lighthouse ≥ 90 Performance on representative mobile tests; record actual results and constraints              |
| NFR-04 | Accessibility        | Target Lighthouse ≥ 95 Accessibility plus manual keyboard/dialog review                                               |
| NFR-05 | Image delivery       | Responsive sizes, lazy load below-the-fold media, avoid layout shift; hero image prioritized                          |
| NFR-06 | Security             | External links use `rel="noopener noreferrer"` when `target="_blank"`; no hardcoded secrets or user data collection   |
| NFR-07 | Privacy              | No analytics or third-party tracking without a separate approved requirement; disclose/consider embedded map requests |
| NFR-08 | Semantics/SEO        | Single H1, logical heading sequence, descriptive title/meta description, accurate alt text, valid sitemap/robots      |
| NFR-09 | Internationalization | All visible text localized; locale reflected in `<html lang>`; no unintentional mixed-language content                |
| NFR-10 | Browser support      | Latest stable Chrome, Firefox, Safari, and common mobile browsers; graceful fallbacks                                 |

## 8. Development plan for AI coding agent

**Priority legend:** P0 = required for MVP, P1 = desirable before launch, P2 = future enhancement.

### Phase A — Audit and prepare (P0)

- [ ] Read `docs/PRD.md`, `README.md`, `package.json`, `src/App.tsx`, `src/style.css`, and inspect all `public/images/`.
- [ ] Run `npm install` (if necessary), `npm run dev`, and `npm run build`; record any baseline errors.
- [ ] Review the existing desktop and mobile page; do not lose working functionality.
- [ ] Create an explicit TODO or issues list for unverified real-world facts and rights/ethics approvals.

### Phase B — Organize and stabilize (P0)

- [ ] Extract reusable sections and core UI components without unnecessary abstractions.
- [ ] Centralize approved URLs, image descriptions, and site-specific facts in `config/site.ts`.
- [ ] Centralize Indonesian and English copy; ensure consistent translations.
- [ ] Fix language-switching issues in open service details, gallery UI, and modal headings.
- [ ] Make menu, modal, and FAQs accessible and keyboard friendly.
- [ ] Ensure all nav anchors and external links work.

### Phase C — Design fidelity and polish (P0)

- [ ] Preserve approved warm ivory/sage/muted bronze palette and typography.
- [ ] Improve spacing, alignment, typography, image crop, and visual hierarchy at target breakpoints.
- [ ] Use genuine owner-supplied photos; add fallbacks and responsive image behavior.
- [ ] Remove any placeholders or unsupported claims that appeared in the image mockup.
- [ ] Verify site is usable without hover and respects reduced-motion preferences.

### Phase D — SEO, performance, and quality (P0/P1)

- [ ] Update title, description, favicon, Open Graph metadata (P0, after factual approval).
- [ ] Create `robots.txt` and `sitemap.xml` for real published URLs (P1; requires confirmed domain).
- [ ] Add responsive image optimization, preload only the critical image/font, lazy-load lower sections (P0).
- [ ] Add automated smoke tests for navigation, locale switch, practice dialog, office gallery, Insights, and external links (P1; Playwright recommended).
- [ ] Test TypeScript build, browser console, keyboard navigation, and mobile behavior (P0).
- [ ] Update README with run/build/deploy/test instructions (P0).

### Phase E — Publication gate (P0, human approvals)

- [ ] Obtain owner confirmation for name, professional titles, active appointments, professional history, and exact office details.
- [ ] Obtain rights/consent for personal, team, and office photographs.
- [ ] Have practitioner/professional advisor review content and website presentation for applicable Indonesian notarial/PPAT professional ethics.
- [ ] Check legal explanations for accuracy, localization, and disclaimer wording.
- [ ] Configure production domain, HTTPS, robots/sitemap, and deployment settings after confirmation.
- [ ] Publish only when all blocking approvals are recorded.

## 9. Acceptance testing scenarios

| Test                        | Steps                                          | Expected result                                                        |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| AT-01 Navigation            | Open homepage, click each nav item             | Scrolls to correct section; header never hides target heading          |
| AT-02 Mobile menu           | Open 375 px viewport, open menu, choose Office | Menu opens/closes and navigates correctly; no horizontal scroll        |
| AT-03 Locale                | Switch ID → EN → ID                            | All titles, descriptions, controls, dialog copy, and disclaimer update |
| AT-04 Practice details      | Open category; press Tab and Escape            | Dialog gains focus, traps focus, closes safely, restores trigger focus |
| AT-05 Gallery               | Click Next repeatedly, then Previous           | Correct images display and wrap; no broken images or layout shifts     |
| AT-06 Insights              | Expand and collapse each FAQ                   | Correct text appears/disappears and `aria-expanded` reflects state     |
| AT-07 External destinations | Follow LinkedIn and Maps links                 | URLs match supplied sources and open with secure new-tab attributes    |
| AT-08 Responsive            | Test 320–1440 px viewport widths               | No clipping, image stretching, tiny tap targets, or overflow           |
| AT-09 Metadata              | Inspect built HTML and network                 | Accurate title/description, no missing assets, no exposed secrets      |
| AT-10 Production            | Run `npm run build` and serve `dist/`          | Compiles and operates with no runtime exceptions                       |
| AT-11 Content approval      | Review final page and image assets with owner  | No unapproved professional claims, private details, or photo use       |

## 10. Definition of Done (DoD)

Development is complete when all **P0** requirements and scenarios pass, the production build succeeds, the implementation follows the existing design direction, bilingual content and interactions behave correctly, and the developer updates the documentation with test outcomes. **Deployment authorization remains a separate human decision** requiring the publication-gate approvals.

### Expected agent handoff

The agent must provide:

1. Brief summary of files/components changed.
2. Functional requirements completed and any deferred P1/P2 work.
3. Commands run and their actual results (do not claim tests passed unless executed).
4. Screenshots or comparable visual verification at desktop and mobile widths, where tooling allows.
5. A list of unresolved factual, professional-ethics, accessibility, performance, or photo-rights blockers.
6. Clear instructions to run locally and deploy the static build.

## 11. Guardrails and change management

- **Preserve** existing appearance and content structure unless this PRD explicitly calls for change.
- **Prioritize** bugs/accessibility over extra embellishments.
- **Do not** replace authentic images with generated substitutes unless explicitly requested.
- **Do not** add features not included in the requirements merely because benchmark websites have them.
- **Do not** treat screenshot-only placeholder claims as verified facts.
- **Do not** silently delete working UI; document changes and obtain approval for material changes in behavior.
- **Do not** expose personal/contact data not supplied or approved.
- If an approval-dependent fact is missing, display neutral content or omit the specific element; track the blocker in the handoff.

## 12. Copy-paste agent instruction

```text
You are working in an existing React + TypeScript + Vite + Tailwind CSS project.

Read docs/PRD.md and README.md in full before making changes. Then inspect
src/App.tsx, src/style.css, the images, and package.json. Implement the
P0 items in the PRD phase-by-phase, starting from the current working
prototype rather than rebuilding from scratch.

Preserve the bright ivory/sage professional design and real office photos.
Keep the site simple, static, bilingual, accessible, and informational.
Do not invent professional credentials, reviews, statistics, office
contact details, or appointments. Treat legal/ethics and photo-rights
approvals as blockers for publication, not a reason to invent content.

Run the production build and relevant tests. At the end, report changed
files, completed requirements, test commands/results, deferred work, and
outstanding approval items. Do not deploy unless explicitly authorized.
```

---

**Sources of truth, in priority order:** (1) explicit owner confirmations, (2) this PRD, (3) current React project and supplied images, (4) approved visual mockup for _style only_, (5) benchmark PDFs for _inspiration only_. Any disagreement affecting professional facts, content rights, or ethics must be raised for owner review.
