import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

export function Hero() {
  const { t } = useLocale()
  const { headshot, formal } = site.images
  return (
    <section id="home" className="relative isolate min-h-[690px] overflow-hidden bg-[#f9f8f4]">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 bg-[radial-gradient(ellipse_at_70%_55%,#e8eee7_0%,transparent_66%)] lg:block" />
      <div className="mx-auto grid max-w-[1250px] items-center gap-10 px-5 pb-16 pt-16 sm:px-8 md:grid-cols-[.97fr_1fr] md:pb-24 md:pt-24 lg:min-h-[675px] lg:gap-16 lg:px-10 lg:py-16">
        <div className="relative z-10 order-2 md:order-1">
          <p className="section-eyebrow mb-7 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-sand" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 className="font-display text-[45px] font-normal leading-[1.15] tracking-[-.055em] text-ink sm:text-[58px] lg:text-[69px]">
            {t.heroLead} <em className="font-normal text-forest">{t.heroAccent}</em>
            <br />
            {t.heroSecond} <em className="font-normal text-forest">{t.heroSecondAccent}</em>
          </h1>
          <p className="mt-8 max-w-[505px] text-[15px] leading-[2] text-body">{t.heroDesc}</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#about" className="focus-ring inline-flex items-center gap-3 rounded-full bg-forest px-6 py-4 text-[12px] font-semibold text-white transition-all motion-safe:hover:-translate-y-0.5 hover:bg-forest-dark">
              {t.heroAction}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="#practice" className="focus-ring inline-flex items-center gap-2 border-b border-[#9eb0a5] pb-1 text-[12px] font-bold text-forest transition-all motion-safe:hover:gap-4">
              {t.heroSecondAction}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-16 hidden items-center gap-4 text-[10px] font-semibold uppercase tracking-[.19em] text-muted lg:flex" aria-hidden="true">
            <ArrowDown size={14} />
            {t.scroll}
          </div>
        </div>
        <div className="relative order-1 mx-auto w-full max-w-[530px] md:order-2">
          <div className="hero-blob absolute -inset-12 rounded-full" />
          <div className="relative mx-auto w-[81%] max-w-[400px] overflow-hidden rounded-t-[210px] rounded-b-[12px] bg-[#e5e9e0] shadow-[0_30px_80px_-38px_rgba(42,67,56,.25)] md:w-[90%]">
            <img
              src={headshot.src}
              width={headshot.width}
              height={headshot.height}
              alt={t.images.headshot}
              fetchPriority="high"
              className="aspect-[.82] w-full object-cover object-center photo-tint"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#20352d]/70 to-transparent" />
            <div className="absolute bottom-5 left-6 right-3 text-white">
              <div className="font-display text-xl">{site.name}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/80">{t.photoSub}</div>
            </div>
          </div>
          <div className="absolute -bottom-7 left-0 hidden w-[215px] rounded-xl border-[7px] border-[#f9f8f4] bg-white p-2 shadow-xl sm:block md:-left-8 lg:-left-12">
            <img
              src={formal.src}
              width={formal.width}
              height={formal.height}
              alt={t.images.formal}
              loading="lazy"
              decoding="async"
              className="aspect-[1.7] w-full rounded-md object-cover photo-tint"
            />
            <div className="px-1 pb-1 pt-2 text-[9px] font-bold uppercase tracking-wider text-forest">{t.heroBadge}</div>
          </div>
          <span className="absolute right-0 top-10 hidden h-20 w-20 rounded-full border border-[#b8c7bb]/70 sm:block" aria-hidden="true" />
          <span className="absolute right-5 top-16 hidden h-20 w-20 rounded-full border border-[#b8c7bb]/70 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
