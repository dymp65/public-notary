# Plan: Design switcher

Spec: [requirement.md](requirement.md) · Tasks: [tasks.md](tasks.md)

## 1. Approach

The app hosts both designs and picks one at runtime. The alternative, building v1 separately into `dist/v1/`, was rejected because it needs two builds, duplicates the i18n and config, and v1 would need its own switch back.

```text
main.tsx → LocaleProvider → Root.tsx
                             ├─ App.tsx (current)                    design = 'v2'   (no parameter)
                             ├─ lazy(v1/App.tsx) in <Suspense>       design = 'v1'   (?design=v1)
                             ├─ lazy(v3/App.tsx) in <Suspense>       design = 'v3'   (?design=v3)
                             └─ components/DesignSwitch.tsx          fixed bottom-left, z-40 (below the z-50 header)
```

## 2. Files

| File | Change |
|---|---|
| `src/Root.tsx` | New. Holds the `Design` state, reads and writes `?design=v1|v3` (`history.replaceState`), and scrolls to the top on switch |
| `src/components/DesignSwitch.tsx` | New. Pill group with two `aria-pressed` buttons |
| `src/main.tsx` | Renders `<Root />` instead of `<App />` |
| `src/types/site.ts` | `Design` type, `flags.showDesignSwitch`, `Dictionary.designSwitch` |
| `src/config/site.ts` | `showDesignSwitch: true` (O-13) |
| `src/content/{id,en}.ts` | `designSwitch` labels |
| `src/style.css` | v1 helpers (`.soft-shadow`, `.hero-blob`, uppercase `.section-eyebrow`, 86 px `scroll-margin-top`), scoped to `[data-design='v1']` |
| `index.html` | Playfair weights 500 and 600 added for the v1 logo and headings. Browsers fetch font files only for weights in use, so the current design loads nothing extra |
| `src/v1/**` | Previous design |
| `tests/e2e/smoke.spec.ts` | Switch test |

## 3. How `src/v1/` is built

- `src/v1/` mirrors `src/`, so the 16 v1 files (`App`, 8 components, 7 sections) are copied from `origin/dev-design-v1` by `git show` with their relative imports intact. The only edits are:
  - `ExternalLink` imports point at the shared `src/components/ExternalLink.tsx`, which is identical on both branches.
  - The v1 root `<div>` gets `data-design="v1"`, which scopes its CSS.
- `v1/i18n/useLocale.ts` wraps the shared hook and swaps in the v1 dictionary. As a result, the locale state, `<html lang>`, and metadata stay shared.
- `v1/content/{id,en}.ts` spread the current dictionaries and override only the 11 keys that differ (numbered uppercase eyebrows, gallery and location strings). The types in `v1/types/site.ts` extend the current ones, so `tsc` enforces id/en parity for v1 too.
- `v1/config/site.ts` spreads the current `site` and adds v1's `serviceImages` and `gallery`. **Deviation from the branch:** v1's listing embed (`/maps/embed?pb=…`) is not restored; v1 inherits the coordinates-only `mapEmbedUrl` (G-23).

## 3a. How `src/v3/` is built

- V3 is new markup, not a copy. Every section reads the shared `useLocale()` dictionary and the shared `site` config directly, so its copy, facts, and flags (`showAuctionOfficer`, `showOfficePhotos`) always match V2. It has no dictionary of its own.
- Shared as-is: `SkipLink`, `ExternalLink`, i18n, and images. V3-owned: `Header` (links left, serif `Wordmark` centred, glass pill right from `xl`; below `xl` a menu with the same G-03 behaviour), `Footer`, `SectionHeader`, `ServiceDialog`, and `MapEmbed` (the same deferred, coordinates-only embed as V2, in a dark frame). These are copied because their V2 versions are styled for light surfaces, and V2 must stay untouched.
- Hero: the section runs under the translucent sticky header (`-mt-[72px] pt-[72px]`). The backdrop is the headshot, CSS-blurred and at 30% opacity, under dark gradients and a faint forest glow. The person's displayed portrait is the unaltered photo (`photo-tint` only, as on V2). The h1 is DM Sans semibold (`text-hero` 80 / `text-hero-sm` 44). The credentials strip replaces the reference's statistics. About therefore drops its credentials row, so they appear only once.
- Tokens added to `@theme`: `night`, `night-raised`, `text-hero`, `text-hero-sm`. Text uses the footer's white · white/75 · white/60 tiers. Helpers in `style.css`: `.btn-glass` and `.btn-glass-icon`, plus a white `focus-ring` and `color-scheme: dark` under `[data-design='v3']`.

## 4. Trade-offs

- **CSS:** Tailwind scans `src/v1`, so v1's arbitrary-value utilities are in the main stylesheet (43.7 KB total with v1; the share v1 adds was not measured). This is accepted while the switch exists. Deleting `src/v1/` removes the extra CSS.
- **Scroll position:** the designs have different section heights, so a switch scrolls to the top rather than trying to keep the same section.
- **Removal:** to remove the switch, set the flag to `false`. To delete it entirely, remove `src/v1/`, `src/v3/`, the V3 tokens and helpers, `Root.tsx`, `DesignSwitch.tsx`, the `designSwitch` keys, the scoped CSS block, and the test.

## 5. Verification

`npm run lint`, `npm run build` (separate v1 chunk), `npm run test:e2e` (the new switch test plus all existing tests on desktop and mobile), and screenshots of both designs at 1440 and 375 px.
