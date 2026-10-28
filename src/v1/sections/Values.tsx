import { Award, BookOpen, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { useLocale } from '../i18n/useLocale.ts'

const valueIcons = [ShieldCheck, Award, BookOpen]

export function Values() {
  const { t } = useLocale()
  return (
    <section className="bg-[#eaf0eb] py-20 sm:py-24">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={t.focusLabel} title={t.focusTitle} centered />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.values.map((value, index) => {
            const Icon = valueIcons[index]
            return (
              <div key={index} className="rounded-xl border border-[#dce5dd] bg-[#f9fbf7]/70 p-8">
                <Icon size={29} strokeWidth={1.4} className="text-forest" aria-hidden="true" />
                <h3 className="mt-5 font-display text-[23px]">{value.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.75] text-muted">{value.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
