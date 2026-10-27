import { FilePenLine, Gavel, Landmark } from 'lucide-react'
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
    <section id="practice" aria-labelledby="practice-title" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={t.servicesEyebrow}
          title={t.servicesTitle}
          titleId="practice-title"
          desc={site.flags.showAuctionOfficer ? t.servicesTextWithAuction : t.servicesText}
        />
        <div className={`mt-14 grid gap-4 ${visibleServices.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {visibleServices.map((id) => {
            const service = t.services[id]
            const Icon = serviceIcons[id]
            return (
              <article key={id} className="flex min-h-[320px] flex-col items-start rounded-[28px] bg-sage-light p-8 sm:p-10 lg:p-12">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper text-forest">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-10 text-title font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 max-w-[460px] text-para text-body">{service.summary}</p>
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => onOpen(id, event.currentTarget)}
                    className="focus-ring btn btn-secondary"
                  >
                    {t.more}
                    <span className="sr-only">: {service.title}</span>
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
