import { SectionHeader } from '../components/SectionHeader.tsx'
import { useLocale } from '../i18n/useLocale.ts'

// One statement plus three values (G-21: merges the prototype's Principle band and
// icon cards, which repeated the same message twice)
export function Values() {
  const { t } = useLocale()
  return (
    <section aria-labelledby="values-title" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={t.principleEyebrow} title={t.principleTitle} titleId="values-title" desc={t.principleText} centered />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.values.map((value, index) => (
            <div key={index} className="border-t border-black/10 pt-6">
              <h3 className="text-h3 font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-para text-body">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
