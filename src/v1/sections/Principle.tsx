import { useLocale } from '../i18n/useLocale.ts'

export function Principle() {
  const { t } = useLocale()
  return (
    <section className="bg-sage-light py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1250px] items-center gap-7 px-5 sm:px-8 md:grid-cols-[1.1fr_.9fr] lg:px-10">
        <div>
          <p className="section-eyebrow">{t.principleEyebrow}</p>
          <h2 className="mt-4 max-w-[670px] font-display text-[30px] leading-[1.25] tracking-[-.035em] sm:text-[40px]">{t.principleTitle}</h2>
        </div>
        <div className="border-l border-[#c8d6cc] pl-6 text-[14px] leading-[1.9] text-body md:pl-12">{t.principleText}</div>
      </div>
    </section>
  )
}
