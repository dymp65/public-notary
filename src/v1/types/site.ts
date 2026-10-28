import type {
  Dictionary as CurrentDictionary,
  ImageKey,
  ServiceId,
  SiteConfig as CurrentSiteConfig,
} from '../../types/site.ts'

export type { ImageKey, Locale, ServiceId } from '../../types/site.ts'

// The previous design's config and copy: the current shapes plus the keys only v1 uses.
export interface SiteConfig extends CurrentSiteConfig {
  serviceImages: Record<ServiceId, ImageKey>
  gallery: readonly ImageKey[]
}

export interface Dictionary extends Omit<CurrentDictionary, 'a11y' | 'map'> {
  a11y: CurrentDictionary['a11y'] & {
    gallery: string
    galleryPrev: string
    galleryNext: string
  }
  focusLabel: string
  focusTitle: string
  galleryTitle: string
  galleryStatus: (current: number, total: number) => string
  locationLabel: string
  locationTitle: string
  map: CurrentDictionary['map'] & {
    openLink: string
  }
}
