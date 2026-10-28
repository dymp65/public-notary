import type { ImageKey, ImageMeta, Locale, SiteConfig } from '../types/site.ts'

// Single source for facts, URLs, images, and feature flags.
// O-xx references point to open items in docs/website-mvp/requirement.md §10.

const images: Record<ImageKey, ImageMeta> = {
  headshot: { src: '/images/portrait-headshot.jpg', width: 630, height: 630 },
  formal: { src: '/images/portrait-formal.jpg', width: 928, height: 488 },
  seated: { src: '/images/portrait-seated.jpg', width: 930, height: 488 },
  team: { src: '/images/team.jpg', width: 1418, height: 576 },
  writing: { src: '/images/legal-writing.jpg', width: 1400, height: 350 },
  exterior: { src: '/images/office-exterior.jpg', width: 520, height: 414, position: '70% 85%' }, // keep the signboard in view
  interior: { src: '/images/office-interior.jpg', width: 640, height: 490 },
}

export const site = {
  name: 'I Gusti Ngurah Premana',
  titles: 'S.T., S.H., M.Kn.', // O-01
  links: {
    linkedin: 'https://www.linkedin.com/in/igustingurahpremana', // O-11
    maps: 'https://maps.app.goo.gl/TyGB2XTzgziTXk4T9',
  },
  // Road-map embed pinned at the listing's coordinates (taken from the owner-supplied listing
  // embed, O-05). Coordinates only, on purpose: an embed that references the listing makes
  // Google overlay its place card (street address + star rating) once the map is wide,
  // and both are banned on this site (G-23).
  mapEmbedUrl: (locale: Locale) =>
    `https://maps.google.com/maps?q=-8.672171,115.168603&hl=${locale}&z=16&output=embed`,
  storageKey: 'premana.locale',
  images,
  sections: ['home', 'about', 'practice', 'office', 'insights'],
  services: ['notary', 'ppat', 'auction'],
  // Office tiles besides the team photo (G-21). The exterior and writing photos are not shown:
  // the exterior screenshot is too unclear (owner, 2026-10-27).
  officePhotos: ['interior', 'formal'],
  flags: {
    showAuctionOfficer: false as boolean, // O-02: hidden until the appointment and scope are confirmed
    showOfficePhotos: false as boolean, // Office bento's interior + formal photo row; hidden by the owner, kept for later (G-24)
    showDesignSwitch: true as boolean, // O-13: review-only V1 | V2 | V3 design switch; turn off before publishing
  },
} as const satisfies SiteConfig
