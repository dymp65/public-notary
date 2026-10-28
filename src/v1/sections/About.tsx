import { ArrowUpRight, FilePenLine, GraduationCap, Landmark, MapPin } from 'lucide-react'
import { ExternalLink } from '../../components/ExternalLink.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

const credentialIcons = [GraduationCap, FilePenLine, Landmark, MapPin]

// Hybrid layout (requirement §5.2): text | portrait | credential list
export function About() {
  const { t } = useLocale()
  const { seated } = site.images
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1250px] items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_.9fr_1fr] lg:gap-14 lg:px-10">
        <div className="md:col-span-2 lg:col-span-1">
          <SectionHeader eyebrow={t.aboutEyebrow} title={t.aboutTitle} titleId="about-title" compact />
          <p className="mt-7 text-[15px] leading-[1.95] text-body">{t.aboutBody}</p>
          <p className="mt-4 text-[15px] leading-[1.95] text-body">{t.aboutBody2}</p>
          <ExternalLink
            href={site.links.linkedin}
            className="focus-ring mt-8 inline-flex items-center gap-3 border-b border-forest pb-2 text-[12px] font-bold text-forest motion-safe:hover:gap-5"
          >
            {t.aboutExplore}
            <ArrowUpRight size={16} aria-hidden="true" />
          </ExternalLink>
        </div>
        <div className="overflow-hidden rounded-[16px] bg-[#e7ebe6]">
          <img
            src={seated.src}
            width={seated.width}
            height={seated.height}
            alt={t.images.seated}
            loading="lazy"
            decoding="async"
            className="aspect-[1.1] w-full object-cover photo-tint"
          />
        </div>
        <ul className="divide-y divide-[#ebe5da]">
          {t.credentials.map((item, index) => {
            const Icon = credentialIcons[index]
            return (
              <li key={index} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand/10 text-sand">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-[12px] leading-[1.6] text-muted">{item.subtitle}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
