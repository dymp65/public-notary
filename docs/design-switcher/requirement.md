# Requirement: Design switcher

Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md) · Parent: [website-mvp](../website-mvp/requirement.md)

## 1. What and why

The owner asked on 2026-10-28 for a button that switches between the current design (branch `dev-design-v2`) and the previous one (`origin/dev-design-v1`, before the G-21 redesign). The aim is to compare the two designs on the same build.

**Update 2026-10-28:** the owner asked for a third design, **V3**: the current page's full content in the style of a reference image (a dark keynote-speaker hero with a large sans headline, a framed portrait over a blurred backdrop, outlined pill buttons, a centred serif name in the header, and a four-figure statistics strip). The switch now reads `V1 | V2 | V3`.

This is a **review tool, not a visitor feature**. It must not change the current design, and it must be easy to remove before publication.

## 2. Requirements

| ID | Requirement | Acceptance criteria |
|---|---|---|
| DS-01 | A switch toggles between the current and previous design | One click swaps the whole page (header to footer). The active option shows `aria-pressed="true"` |
| DS-02 | The choice survives reload and can be shared | `?design=v1` opens the previous design. Switching back removes the parameter |
| DS-03 | The language is kept across the switch | Both designs read the same locale state. The switch labels are localized (`designSwitch` in the dictionaries) |
| DS-04 | No cost for the current design | v1 code is a lazy chunk, requested only after switching. The current design's markup and styles are unchanged |
| DS-05 | Guardrails still hold in v1 | v1 uses the coordinates-only map embed (G-23), the shared facts and config, and `showAuctionOfficer` |
| DS-06 | Removable before publishing | `flags.showDesignSwitch: false` hides the switch, ignores `?design`, and never loads the v1 or v3 chunk |
| DS-08 | V3 carries the current page's full content in the reference style | Same sections, anchors, copy, facts, flags, dialog, accordion, and map as V2. The reference's statistics strip shows the four factual credentials instead, and its booking buttons become the site's own links ("Lokasi Kantor", "Tentang Saya") |
| DS-07 | Accessible | Labelled group, native buttons, visible focus (`focus-ring`), 40 px targets, no horizontal scroll at 375 px |

## 3. Out of scope

- Improving or restyling v1. It stays as it was on its branch, apart from the guardrail fix in DS-05.
- Showing both designs side by side.

## 4. Open items

| ID | Item | Current handling |
|---|---|---|
| O-13 (website-mvp) | Should the switch be visible on the published site? | On for review. Planned to be turned off before E6 |
| DS-O2 | **V3 conflicts with the CLAUDE.md design rules** "Light first: no dark … blocks above the fold" and "Never restyle toward a dark … template". It exists only as a review variant at the owner's request. Adopting it would need an explicit owner decision recorded here, plus updates to CLAUDE.md and the website-mvp design spec | Review only; V2 stays the site |
| DS-O3 | Not taken from the reference, because the guardrails ban them: the statistics (250K+, 15+ years, 10K+, 92%), "Book a Meeting", and "Book Your Session" | Replaced as described in DS-08. Never fill in invented figures |
| DS-O1 | v1 keeps the owner-rejected bits that G-21…G-24 changed: exterior photo in the gallery, arch portrait, the floating card overlapping the hero caption | Kept on purpose, because they show what the previous design was |
