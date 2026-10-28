import { ArrowUpRight, MapPin } from 'lucide-react'
import { ExternalLink } from '../../components/ExternalLink.tsx'
import { MapEmbed } from '../components/MapEmbed.tsx'
import { OfficeGallery } from '../components/OfficeGallery.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

// Hybrid split row (requirement §5.3): team photo | text | exterior photo,
// followed by the prototype gallery and location card.
export function Office() {
  const { t } = useLocale()
  const { team, exterior } = site.images
  return (
    <section id="office" aria-labelledby="office-title" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.4fr_1fr_.7fr]">
          <div className="overflow-hidden rounded-[16px] bg-[#edf0ec] md:col-span-2 lg:col-span-1">
            <img
              src={team.src}
              width={team.width}
              height={team.height}
              alt={t.images.team}
              loading="lazy"
              decoding="async"
              className="aspect-[2.05] w-full object-cover object-center photo-tint"
            />
          </div>
          <div>
            <SectionHeader eyebrow={t.teamEyebrow} title={t.teamTitle} titleId="office-title" compact />
            <p className="mt-5 text-[14px] leading-[1.9] text-body">{t.teamText}</p>
            <p className="mt-5 flex items-start gap-2 text-[14px] leading-[1.8] text-body">
              <MapPin className="mt-1 shrink-0 text-forest" size={19} aria-hidden="true" />
              {t.locationText}
            </p>
            <ExternalLink
              href={site.links.maps}
              className="focus-ring mt-7 inline-flex items-center gap-3 rounded-full bg-forest px-6 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-forest-dark"
            >
              {t.locationButton}
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="overflow-hidden rounded-[16px] bg-[#edf0ec]">
            <img
              src={exterior.src}
              width={exterior.width}
              height={exterior.height}
              alt={t.images.exterior}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: exterior.position }}
              className="aspect-[.85] w-full object-cover photo-tint"
            />
          </div>
        </div>

        <OfficeGallery />

        <div className="mt-10 grid items-center gap-8 rounded-[16px] bg-sage-light p-7 sm:p-10 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-eyebrow">{t.locationLabel}</p>
            <h3 className="mt-3 font-display text-[32px]">{t.locationTitle}</h3>
            <p className="mt-4 flex items-start gap-2 text-[14px] leading-[1.8] text-body">
              <MapPin className="mt-1 shrink-0 text-forest" size={19} aria-hidden="true" />
              {t.locationText}
            </p>
            <p className="mt-4 max-w-[420px] text-[12px] leading-[1.7] text-muted">{t.map.note}</p>
            <ExternalLink
              href={site.links.maps}
              className="focus-ring mt-6 inline-flex items-center gap-2 border-b border-forest pb-1 text-[12px] font-bold text-forest motion-safe:hover:gap-4"
            >
              {t.map.openLink}
              <ArrowUpRight size={15} aria-hidden="true" />
            </ExternalLink>
          </div>
          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
