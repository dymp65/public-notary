import { site as current } from '../../config/site.ts'
import type { SiteConfig } from '../types/site.ts'

// Previous design (origin/dev-design-v1), kept for review behind the design switch.
// Facts, links, images, and flags come from the current config. The map embed stays
// coordinates-only: v1's listing embed showed the street address and a star rating (G-23).
export const site = {
  ...current,
  serviceImages: { notary: 'writing', ppat: 'exterior', auction: 'seated' },
  gallery: ['interior', 'team', 'exterior', 'formal'],
} as const satisfies SiteConfig
