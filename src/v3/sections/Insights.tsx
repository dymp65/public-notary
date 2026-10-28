import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useLocale } from '../../i18n/useLocale.ts'
import { SectionHeader } from '../components/SectionHeader.tsx'

// G-06: heading + button + region panel, as an FAQ-style list
export function Insights() {
  const { t } = useLocale()
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <section id="insights" aria-labelledby="insights-title" className="border-t border-white/[.08] bg-night-raised py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1250px] gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-10">
        <SectionHeader eyebrow={t.insightsEyebrow} title={t.insightsTitle} titleId="insights-title" desc={t.insightsBody} />
        <div>
          <div className="border-t border-white/15">
            {t.insights.map((item, index) => {
              const open = expanded === index
              return (
                <div key={index} className="border-b border-white/15">
                  <h3>
                    <button
                      type="button"
                      id={`insight-button-${index}`}
                      aria-expanded={open}
                      aria-controls={`insight-panel-${index}`}
                      onClick={() => setExpanded(open ? null : index)}
                      className="focus-ring group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span>
                        <span className="block text-h3 font-semibold text-white">{item.title}</span>
                        <span className="mt-1 block text-small text-white/60">{item.desc}</span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors group-hover:bg-white/10">
                        <Plus
                          size={18}
                          aria-hidden="true"
                          className={`motion-safe:transition-transform motion-safe:duration-200 ${open ? 'rotate-45' : ''}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`insight-panel-${index}`}
                    role="region"
                    aria-labelledby={`insight-button-${index}`}
                    hidden={!open}
                    className="max-w-[600px] pb-7 pr-12 text-para text-white/75"
                  >
                    {item.detail}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-6 text-caption text-white/60">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
