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
  // Owner-supplied embed for the "I Gusti Ngurah Premana (Notary Public)" listing (O-05).
  // `!5e0` = road map (the supplied `!5e1` was satellite); `!1s<locale>` sets the label language.
  mapEmbedUrl: (locale: Locale) =>
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4129.088106260812!2d115.16860299999999!3d-8.672171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24749f809bde7%3A0xa0a405ad5a33d123!2sI%20Gusti%20Ngurah%20Premana%20(Notary%20Public)!5e0!3m2!1s${locale}!2sid!4v1793083274999!5m2!1s${locale}!2sid`,
  storageKey: 'premana.locale',
  images,
  sections: ['home', 'about', 'practice', 'office', 'insights'],
  services: ['notary', 'ppat', 'auction'],
  serviceImages: { notary: 'writing', ppat: 'exterior', auction: 'seated' },
  gallery: ['interior', 'team', 'exterior', 'formal'],
  flags: {
    showAuctionOfficer: false as boolean, // O-02: hidden until the appointment and scope are confirmed
  },
} as const satisfies SiteConfig
