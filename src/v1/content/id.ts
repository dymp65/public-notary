import { id as current } from '../../content/id.ts'
import type { Dictionary } from '../types/site.ts'

// v1 copy: the current dictionary plus v1's numbered uppercase eyebrows and gallery/location keys.
export const id: Dictionary = {
  ...current,
  a11y: {
    ...current.a11y,
    gallery: 'Galeri kantor',
    galleryPrev: 'Foto sebelumnya',
    galleryNext: 'Foto berikutnya',
  },
  eyebrow: 'PRAKTIK NOTARIS & PPAT DI BALI',
  aboutEyebrow: '01 / TENTANG SAYA',
  principleEyebrow: 'NILAI PROFESIONAL',
  servicesEyebrow: '02 / BIDANG PRAKTIK',
  focusLabel: 'PENDEKATAN PROFESIONAL',
  focusTitle: 'Ketelitian dalam proses. Kejelasan dalam dokumentasi.',
  teamEyebrow: '03 / KANTOR KAMI',
  galleryTitle: 'Sekilas suasana kantor',
  galleryStatus: (current, total) => `Foto ${current} dari ${total}`,
  locationLabel: 'ALAMAT & LOKASI',
  locationTitle: 'Kunjungi kantor kami',
  map: {
    ...current.map,
    openLink: 'Buka di Google Maps',
  },
  insightsEyebrow: '04 / INFORMASI',
}
