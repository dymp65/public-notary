import { useLocale } from '../../i18n/useLocale.ts'
import { SectionHeader } from '../components/SectionHeader.tsx'

// One statement plus three values, on a soft forest glow
export function Values() {
  const { t } = useLocale()
  return (
    <section aria-labelledby="values-title" className="relative isolate overflow-hidden border-y border-white/[.08] bg-night-raised py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgb(69_102_94/.3)_0%,transparent_65%)]" aria-hidden="true" />
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={t.principleEyebrow} title={t.principleTitle} titleId="values-title" desc={t.principleText} centered />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.values.map((value, index) => (
            <div key={index} className="border-t border-white/15 pt-6">
              <h3 className="text-h3 font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-para text-white/75">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
