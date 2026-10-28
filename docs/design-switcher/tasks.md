# Tasks: Design switcher

Spec: [requirement.md](requirement.md) · How: [plan.md](plan.md)

**Legend:** `[ ]` todo · `[~]` in progress · `[x]` done and verified · `[!]` blocked (say by what).

- [x] **S1 · Port v1** (DS-04, DS-05)
  - Files: `src/v1/**`
  - Done when: v1 compiles against its own types and uses the coordinates-only map embed.
- [x] **S2 · Switch and root** (DS-01, DS-02, DS-03, DS-06, DS-07)
  - Files: `src/Root.tsx`, `src/components/DesignSwitch.tsx`, `src/main.tsx`, types, config, dictionaries
  - Done when: lint and build pass, and v1 is emitted as a separate chunk.
- [x] **S3 · Scoped v1 styles and fonts** (DS-04)
  - Files: `src/style.css`, `index.html`
  - Done when: v1 eyebrows render as uppercase 10 px muted text and the current eyebrows are unchanged.
- [x] **S4 · Test and visual check** (all)
  - Files: `tests/e2e/smoke.spec.ts`
  - Done when: the full e2e suite passes on desktop and mobile, and screenshots of both designs are reviewed.
- [x] **S6 · V3 design** (DS-08, owner request 2026-10-28)
  - Files: `src/v3/**`, `src/Root.tsx`, `src/types/site.ts` (`Design = 'v1' | 'v2' | 'v3'`), `src/content/{id,en}.ts`, `src/style.css`, `tests/e2e/smoke.spec.ts`
  - Done when: lint, build, and e2e pass, and screenshots at 320 to 1440 px show no overflow.
- [ ] **S7 · V3 owner decision** (DS-O2): keep V3 as a review variant only, or adopt it, which would mean overriding the light-first rule in CLAUDE.md.
- [ ] **S5 · Publication decision** (DS-06, O-13): the owner chooses whether the switch ships. The default is `flags.showDesignSwitch: false` before E6.

## Verification log

**2026-10-28**

- `npm run lint`: no output (pass).
- `npm run build`: pass. Output: `dist/assets/index-DB3myH16.css 43.68 kB`, `dist/assets/App-Br8lqoqH.js 26.46 kB` (the v1 lazy chunk), `dist/assets/index-dTnM2599.js 261.29 kB`.
- `npm run test:e2e`: `23 passed, 1 skipped` (12.2 s). The skip is AT-02 on desktop, which applies to mobile only. The new test "design switch loads the previous design, keeps the locale, and switches back" passed on desktop and mobile. It checks `aria-pressed`, `?design=v1`, the v1 eyebrow `01 / TENTANG SAYA`, a single `h1`, the coordinates-only map `src`, persistence across reload, switching back, and no horizontal scroll.
- Screenshots at 1440×900 and 375×812, both designs, plus the v1 Office section at 1440. v1 matches its branch: arch portrait, serif logo, numbered eyebrows, prev/next gallery. The switch sits bottom-left below the header. The v1 map shows no place card.

**2026-10-28 (owner request: labels "V1" / "V2")**

- Switch labels changed from "Terbaru" / "Sebelumnya" (en "Current" / "Previous") to "V1" / "V2" in both locales. V1 is the previous design (`origin/dev-design-v1`) and V2 is the current one (`dev-design-v2`). The buttons are now ordered V1 | V2.
- `npm run lint`: pass. `npm run test:e2e`: `23 passed, 1 skipped` (12.2 s), switch test updated to the new labels.

**2026-10-28 (V3)**

- `npm run lint`: pass. `npm run build`: pass. Output: `index-zFbk5fj4.css 53.16 kB`, `App-BP2arbp2.js 17.94 kB` (V3 chunk), `App-tUa9kh6r.js 26.48 kB` (V1 chunk), `index-CFD8lxXB.js 261.34 kB`. The figures are from the first V3 build; the later hero tweaks rebuilt cleanly.
- `npm run test:e2e`: `25 passed, 1 skipped` (15.4 s). The new V3 test checks 1 `h1`; all 5 section anchors; 4 credentials in the hero; no `N+`, `N%`, "konsultasi", "book", or "pejabat lelang" text; `rel="noopener noreferrer"` on external links; that the dialog closes on Escape with focus restored; the mobile menu (mobile project); the coordinates-only map; and no horizontal scroll.
- Screenshots of `?design=v3` at 1440, 1280, 1024, 768, 375, and 320 px: horizontal overflow 0 at every width. Also checked: the full page at 1440, the loaded map (no place card), and the dark dialog. Fixes after the first pass: headline tracking −0.04 → −0.025em with a line break between the two sentences, and the hero caption at h3 size below 640 px so the name no longer wraps over the face.
