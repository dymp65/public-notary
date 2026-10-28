import { ArrowUpRight, FilePenLine, Gavel, Landmark } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'
import type { ServiceId } from '../types/site.ts'

const serviceIcons: Record<ServiceId, LucideIcon> = {
  notary: FilePenLine,
  ppat: Landmark,
  auction: Gavel,
}

// G-09: Pejabat Lelang stays hidden until O-02 confirms the appointment
const visibleServices = site.services.filter((id) => id !== 'auction' || site.flags.showAuctionOfficer)

export function PracticeAreas({ onOpen }: { onOpen: (id: ServiceId, trigger: HTMLElement) => void }) {
  const { t } = useLocale()
  return (
    <section id="practice" aria-labelledby="practice-title" className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={t.servicesEyebrow}
          title={t.servicesTitle}
          titleId="practice-title"
          desc={site.flags.showAuctionOfficer ? t.servicesTextWithAuction : t.servicesText}
        />
        <div className={`mt-12 grid gap-6 ${visibleServices.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {visibleServices.map((id) => {
            const service = t.services[id]
            const image = site.images[site.serviceImages[id]]
            const Icon = serviceIcons[id]
            return (
              <article key={id} className="soft-shadow group overflow-hidden rounded-[14px] border border-[#e7ebe4] bg-paper transition-transform duration-300 motion-safe:hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: image.position }}
                    className={`h-[230px] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 ${id !== 'ppat' ? 'photo-tint' : ''}`}
                  />
                  <span className="absolute bottom-0 left-6 grid h-12 w-12 translate-y-1/2 place-items-center rounded-full border-[4px] border-paper bg-forest text-white">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
                <div className="px-7 pb-8 pt-10">
                  <h3 className="font-display text-[25px] tracking-[-.02em]">{service.title}</h3>
                  <p className="mt-3 min-h-20 text-[13px] leading-[1.8] text-muted">{service.summary}</p>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => onOpen(id, event.currentTarget)}
                    className="focus-ring mt-6 inline-flex items-center gap-2 border-b border-[#9eb1a7] pb-1 text-[12px] font-bold text-forest motion-safe:hover:gap-4"
                  >
                    {t.more}
                    <span className="sr-only">: {service.title}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
