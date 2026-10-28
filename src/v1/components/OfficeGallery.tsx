import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

// 2-up gallery (current + next) with wrap-around controls and a live position status (G-15)
export function OfficeGallery() {
  const { t } = useLocale()
  const [index, setIndex] = useState(0)
  const photos = site.gallery
  const total = photos.length
  const shown = [photos[index], photos[(index + 1) % total]]

  return (
    <div role="group" aria-labelledby="gallery-title" className="mt-14">
      <div className="flex items-center justify-between gap-4">
        <p id="gallery-title" className="section-eyebrow">{t.galleryTitle}</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t.a11y.galleryPrev}
            aria-controls="gallery-photos"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[#ced8ce] hover:bg-sage"
            onClick={() => setIndex((index + total - 1) % total)}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t.a11y.galleryNext}
            aria-controls="gallery-photos"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[#ced8ce] hover:bg-sage"
            onClick={() => setIndex((index + 1) % total)}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div id="gallery-photos" className="mt-4 grid grid-cols-[1fr_1fr] gap-4 md:grid-cols-[1.35fr_.65fr]">
        {shown.map((key, position) => {
          const image = site.images[key]
          return (
            <img
              key={position}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={t.images[key]}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: image.position }}
              className="h-[250px] w-full rounded-[12px] object-cover photo-tint md:h-[320px]"
            />
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {t.galleryStatus(index + 1, total)}
      </p>
    </div>
  )
}
