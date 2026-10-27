import { ArrowUpRight, FilePenLine, GraduationCap, Landmark, MapPin } from 'lucide-react'
import { ExternalLink } from '../components/ExternalLink.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

const credentialIcons = [GraduationCap, FilePenLine, Landmark, MapPin]

// Bento (G-21): introduction tile | portrait tile, credentials strip below
export function About() {
  const { t } = useLocale()
  const { seated } = site.images
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1250px] gap-4 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="rounded-[28px] bg-sage-light p-8 sm:p-10 lg:col-span-7 lg:p-12">
          <SectionHeader eyebrow={t.aboutEyebrow} title={t.aboutTitle} titleId="about-title" />
          <p className="mt-6 text-para text-body">{t.aboutBody}</p>
          <p className="mt-4 text-para text-body">{t.aboutBody2}</p>
          <ExternalLink href={site.links.linkedin} className="focus-ring btn btn-secondary mt-8">
            {t.aboutExplore}
            <ArrowUpRight size={16} aria-hidden="true" />
          </ExternalLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sage lg:col-span-5 lg:aspect-auto">
          <img
            src={seated.src}
            width={seated.width}
            height={seated.height}
            alt={t.images.seated}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover photo-tint"
          />
        </div>
        <ul className="grid gap-8 rounded-[28px] bg-sage-light p-8 sm:grid-cols-2 sm:p-10 lg:col-span-12 lg:grid-cols-4 lg:gap-10 lg:p-12">
          {t.credentials.map((item, index) => {
            const Icon = credentialIcons[index]
            return (
              <li key={index}>
                <Icon size={22} strokeWidth={1.6} className="text-forest" aria-hidden="true" />
                <span className="mt-4 block text-h3 font-semibold text-ink">{item.title}</span>
                <span className="mt-1.5 block text-small text-muted">{item.subtitle}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
