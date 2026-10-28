import { ArrowUpRight } from 'lucide-react'
import { ExternalLink } from '../../components/ExternalLink.tsx'
import { site } from '../../config/site.ts'
import { useLocale } from '../../i18n/useLocale.ts'
import { SectionHeader } from '../components/SectionHeader.tsx'

// Text | framed photo. The credentials live in the hero strip, so they are not repeated here.
export function About() {
  const { t } = useLocale()
  const { seated } = site.images
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1250px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <SectionHeader eyebrow={t.aboutEyebrow} title={t.aboutTitle} titleId="about-title" />
          <p className="mt-6 text-para text-white/75">{t.aboutBody}</p>
          <p className="mt-4 text-para text-white/75">{t.aboutBody2}</p>
          <ExternalLink href={site.links.linkedin} className="focus-ring btn-glass mt-10">
            {t.aboutExplore}
            <span className="btn-glass-icon">
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </ExternalLink>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/15 bg-night-raised">
          <img
            src={seated.src}
            width={seated.width}
            height={seated.height}
            alt={t.images.seated}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover photo-tint"
          />
        </div>
      </div>
    </section>
  )
}
