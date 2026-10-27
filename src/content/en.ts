import { site } from '../config/site.ts'
import type { Dictionary } from '../types/site.ts'

// Draft copy pending owner and editorial approval (O-07).
export const en: Dictionary = {
  meta: {
    title: `${site.name} — Notary & PPAT in Bali`,
    description: `Professional profile of ${site.name}, ${site.titles}, Notary & PPAT in Kerobokan, Badung, Bali: practice areas, office, and location.`,
  },
  a11y: {
    skipToContent: 'Skip to main content',
    logoHome: 'home',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language to Bahasa Indonesia',
    newTab: '(opens in a new tab)',
    closeDialog: 'Close details',
    gallery: 'Office gallery',
    galleryPrev: 'Previous photo',
    galleryNext: 'Next photo',
  },
  images: {
    headshot: `Portrait of ${site.name} in a white shirt and dark tie`,
    formal: `${site.name} in a dark suit inside the office`,
    seated: `${site.name} seated at a desk with a laptop`,
    team: `${site.name} with the office team in front of the Notaris - PPAT wall sign`,
    writing: 'Hands writing on a document',
    exterior: 'Front of the office building with the notary signboard',
    interior: 'Office hallway with artwork on the walls',
  },
  logoSubtitle: 'Notary · PPAT · Bali',
  languageCode: 'ID',
  languageName: 'Bahasa Indonesia',
  nav: {
    home: 'Home',
    about: 'About',
    practice: 'Practice Areas',
    office: 'Office',
    insights: 'Insights',
  },
  officeLink: 'Office Location',

  eyebrow: 'NOTARIAL PRACTICE IN BALI',
  heroLead: 'Committed to',
  heroAccent: 'precision.',
  heroSecond: 'Founded on',
  heroSecondAccent: 'trust.',
  heroDesc: `Learn about ${site.name}, ${site.titles} and the notarial and land-deed practice in Bali, Indonesia.`,
  heroAction: 'About the Notary',
  heroSecondAction: 'Practice Areas',
  photoSub: 'Notary Public & Land Deed Official',
  heroBadge: 'Notary & PPAT · Bali',
  scroll: 'Scroll to explore',

  aboutEyebrow: '01 / ABOUT',
  aboutTitle: 'Professional practice rooted in integrity.',
  aboutBody: 'Every legal document and formal process requires precision and professional responsibility. This website introduces the notary’s background and the scope of the practice.',
  aboutBody2: 'Based in Badung Regency, Bali, the office provides a professional setting for notarial and land-related administrative matters in accordance with applicable regulations.',
  aboutExplore: 'View LinkedIn Profile',
  credentials: [
    { title: site.titles, subtitle: 'Engineering, law, and notarial studies' },
    { title: 'Notarial practice', subtitle: 'Authentic deeds and documents within a notary’s authority' },
    { title: 'Land-deed practice (PPAT)', subtitle: 'Deeds relating to land rights within PPAT authority' },
    { title: 'Office in Badung, Bali', subtitle: 'Kerobokan, Badung Regency' },
  ],

  principleEyebrow: 'PROFESSIONAL VALUES',
  principleTitle: 'Trust is built through every detail.',
  principleText: 'Document precision, confidentiality, and compliance are essential aspects of notarial work.',

  servicesEyebrow: '02 / PRACTICE AREAS',
  servicesTitle: 'Areas of professional practice.',
  servicesText: 'General information about notarial work and land deeds. Authority and available matters depend on appointment and applicable regulations.',
  servicesTextWithAuction: 'General information about notarial work, land deeds, and auction-related functions. Authority and available matters depend on appointment and applicable regulations.',
  more: 'Learn more',
  services: {
    notary: {
      title: 'Notarial Matters',
      summary: 'Authentic deeds, agreements, and legal documents within a notary’s authority.',
      detail: 'Notarial matters include authentic deeds and other responsibilities vested in notaries under Indonesian law, including certain company-formation documents and agreements.',
    },
    ppat: {
      title: 'Land Deed Matters',
      summary: 'Deeds relating to land titles and apartment ownership rights within PPAT authority.',
      detail: 'A PPAT is a public official authorized to prepare authentic deeds for specified legal acts involving land rights and strata title. Requirements vary with the type of transaction.',
    },
    auction: {
      title: 'Auction Officer',
      summary: 'Information about auction procedures and documentation under applicable rules.',
      detail: 'Auction officer duties are governed by specific rules and limits arising from an appointment.',
    },
  },
  modalTitle: 'Practice Information',
  modalButton: 'Close',

  focusLabel: 'OUR APPROACH',
  focusTitle: 'Precision in process. Clarity in documentation.',
  values: [
    { title: 'Integrity', desc: 'Respect for ethics and professional obligations.' },
    { title: 'Precision', desc: 'Attention to detail in legal documents.' },
    { title: 'Confidentiality', desc: 'Respect for the confidentiality of information.' },
  ],

  teamEyebrow: '03 / OUR OFFICE',
  teamTitle: 'A professional and welcoming environment.',
  teamText: `A glimpse of the Notary & PPAT office of ${site.name} in Kerobokan, Badung Regency, Bali.`,
  galleryTitle: 'Inside the office',
  galleryStatus: (current, total) => `Photo ${current} of ${total}`,
  locationLabel: 'LOCATION',
  locationTitle: 'Find our office',
  locationText: 'Kerobokan, Badung Regency, Bali, Indonesia',
  locationButton: 'Open Google Maps',
  map: {
    note: 'The map is provided by Google Maps and loads when this section comes into view.',
    iframeTitle: 'Office location on Google Maps',
    openLink: 'Open in Google Maps',
  },

  insightsEyebrow: '04 / INSIGHTS',
  insightsTitle: 'A short guide to legal documents.',
  insightsBody: 'General educational information about notarial and land documentation procedures.',
  insights: [
    {
      title: 'What is an authentic deed?',
      desc: 'Understanding authentic deeds in Indonesian law.',
      detail: 'An authentic deed is executed in the prescribed statutory form by or before a competent public official.',
    },
    {
      title: 'Notary versus PPAT',
      desc: 'The roles of two different public officials.',
      detail: 'Notaries and PPATs have different legal foundations of authority. The legal act determines which public official is responsible.',
    },
    {
      title: 'Preparing documents',
      desc: 'Why completeness and validity matter.',
      detail: 'Identity, title, and supporting documents must be checked according to the requirements of each legal act.',
    },
  ],
  disclaimer: 'Content is general information, not legal advice for specific circumstances.',

  footerDescription: 'Professional profile and information about notarial practice in Bali.',
  footerSite: 'Explore',
  footerConnect: 'Connect',
  rights: 'All rights reserved.',
  footerTag: 'Notary Public & PPAT · Bali',
}
