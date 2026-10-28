import { ArrowUpRight, MapPin } from 'lucide-react'
import { ExternalLink } from '../../components/ExternalLink.tsx'
import { site } from '../../config/site.ts'
import { useLocale } from '../../i18n/useLocale.ts'
import { MapEmbed } from '../components/MapEmbed.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'

// Same bento as v2 (G-21, G-23, G-24): team photo | location tile, optional photo row, map
export function Office() {
  const { t } = useLocale()
  const { team } = site.images
  return (
    <section id="office" aria-labelledby="office-title" className="border-t border-white/[.08] py-24 lg:py-32">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={t.teamEyebrow} title={t.teamTitle} titleId="office-title" desc={t.teamText} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="overflow-hidden rounded-[28px] border border-white/15 bg-night-raised md:col-span-2 lg:col-span-4">
            <img
              src={team.src}
              width={team.width}
              height={team.height}
              alt={t.images.team}
              loading="lazy"
              decoding="async"
              className="aspect-[2.05] w-full object-cover photo-tint"
            />
          </div>
          <div className="flex flex-col items-start rounded-[28px] border border-white/10 bg-night-raised p-8 md:col-span-2 lg:col-span-2">
            <MapPin size={22} strokeWidth={1.6} className="text-white/75" aria-hidden="true" />
            <p className="mt-4 text-h3 font-semibold text-white">{t.locationText}</p>
            <p className="mt-2 text-small text-white/60">{t.map.note}</p>
            <div className="mt-auto pt-6">
              <ExternalLink href={site.links.maps} className="focus-ring btn-glass">
                {t.locationButton}
                <span className="btn-glass-icon">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </ExternalLink>
            </div>
          </div>
          {site.flags.showOfficePhotos && site.officePhotos.map((key) => {
            const image = site.images[key]
            return (
              <div key={key} className="overflow-hidden rounded-[28px] border border-white/15 bg-night-raised lg:col-span-3">
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={t.images[key]}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: image.position }}
                  className="aspect-[4/3] w-full object-cover photo-tint lg:aspect-[16/10]"
                />
              </div>
            )
          })}
          <div className="md:col-span-2 lg:col-span-6">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  )
}
