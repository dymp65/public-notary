import { en as current } from '../../content/en.ts'
import type { Dictionary } from '../types/site.ts'

// v1 copy: the current dictionary plus v1's numbered uppercase eyebrows and gallery/location keys.
export const en: Dictionary = {
  ...current,
  a11y: {
    ...current.a11y,
    gallery: 'Office gallery',
    galleryPrev: 'Previous photo',
    galleryNext: 'Next photo',
  },
  eyebrow: 'NOTARIAL PRACTICE IN BALI',
  aboutEyebrow: '01 / ABOUT',
  principleEyebrow: 'PROFESSIONAL VALUES',
  servicesEyebrow: '02 / PRACTICE AREAS',
  focusLabel: 'OUR APPROACH',
  focusTitle: 'Precision in process. Clarity in documentation.',
  teamEyebrow: '03 / OUR OFFICE',
  galleryTitle: 'Inside the office',
  galleryStatus: (current, total) => `Photo ${current} of ${total}`,
  locationLabel: 'LOCATION',
  locationTitle: 'Find our office',
  map: {
    ...current.map,
    openLink: 'Open in Google Maps',
  },
  insightsEyebrow: '04 / INSIGHTS',
}
