export type Locale = 'id' | 'en'

export type SectionId = 'home' | 'about' | 'practice' | 'office' | 'insights'

export type ServiceId = 'notary' | 'ppat' | 'auction'

export type ImageKey =
  | 'headshot'
  | 'formal'
  | 'seated'
  | 'team'
  | 'writing'
  | 'exterior'
  | 'interior'

export interface ImageMeta {
  src: string
  width: number
  height: number
  // object-position focal point for cropped displays (default: centre)
  position?: string
}

export interface SiteConfig {
  name: string
  titles: string
  links: {
    linkedin: string
    maps: string
  }
  mapEmbedUrl: (locale: Locale) => string
  storageKey: string
  images: Record<ImageKey, ImageMeta>
  sections: readonly SectionId[]
  services: readonly ServiceId[]
  officePhotos: readonly ImageKey[]
  flags: {
    showAuctionOfficer: boolean
    showOfficePhotos: boolean
  }
}

export interface ServiceCopy {
  title: string
  summary: string
  detail: string
}

export interface TitledText {
  title: string
  desc: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  a11y: {
    skipToContent: string
    logoHome: string
    mainNav: string
    mobileNav: string
    footerNav: string
    openMenu: string
    closeMenu: string
    switchLanguage: string
    newTab: string
    closeDialog: string
  }
  images: Record<ImageKey, string>
  logoSubtitle: string
  languageCode: string
  languageName: string
  nav: Record<SectionId, string>
  officeLink: string

  eyebrow: string
  heroLead: string
  heroAccent: string
  heroSecond: string
  heroSecondAccent: string
  heroDesc: string
  heroAction: string
  heroSecondAction: string
  photoSub: string
  heroBadge: string
  scroll: string

  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  aboutBody2: string
  aboutExplore: string
  credentials: { title: string; subtitle: string }[]

  principleEyebrow: string
  principleTitle: string
  principleText: string

  servicesEyebrow: string
  servicesTitle: string
  servicesText: string
  servicesTextWithAuction: string
  more: string
  services: Record<ServiceId, ServiceCopy>
  modalTitle: string
  modalButton: string

  values: TitledText[]

  teamEyebrow: string
  teamTitle: string
  teamText: string
  locationText: string
  locationButton: string
  map: {
    note: string
    iframeTitle: string
  }

  insightsEyebrow: string
  insightsTitle: string
  insightsBody: string
  insights: (TitledText & { detail: string })[]
  disclaimer: string

  footerDescription: string
  footerSite: string
  footerConnect: string
  rights: string
  footerTag: string
}
