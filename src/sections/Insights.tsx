import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { useLocale } from '../i18n/useLocale.ts'

// G-06: heading + button + region panel; the stretched ::after keeps the whole card clickable
export function Insights() {
  const { t } = useLocale()
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <section id="insights" aria-labelledby="insights-title" className="bg-[#f0f3ee] py-24 sm:py-28">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={t.insightsEyebrow} title={t.insightsTitle} titleId="insights-title" desc={t.insightsBody} />
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {t.insights.map((item, index) => {
            const open = expanded === index
            return (
              <article
                key={index}
                className="group relative flex min-h-[205px] flex-col rounded-xl border border-[#e0e7de] bg-paper p-7 text-left transition-all hover:border-[#b4c9b7] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-forest"
              >
                <span className="mb-6 flex items-center justify-between" aria-hidden="true">
                  <span className="text-[11px] font-bold tracking-widest text-[#887053]">0{index + 1}</span>
                  <ArrowUpRight size={17} className="text-forest transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                </span>
                <h3 className="font-display text-[23px]">
                  <button
                    type="button"
                    id={`insight-button-${index}`}
                    aria-expanded={open}
                    aria-controls={`insight-panel-${index}`}
                    onClick={() => setExpanded(open ? null : index)}
                    className="text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none"
                  >
                    {item.title}
                  </button>
                </h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted">{item.desc}</p>
                <div
                  id={`insight-panel-${index}`}
                  role="region"
                  aria-labelledby={`insight-button-${index}`}
                  hidden={!open}
                  className="relative z-10 mt-4 border-t border-[#e3e9e2] pt-4 text-[13px] leading-[1.8] text-body"
                >
                  {item.detail}
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-7 text-xs text-muted">{t.disclaimer}</p>
      </div>
    </section>
  )
}
