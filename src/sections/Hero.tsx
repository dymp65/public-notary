import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

// Owner request 2026-10-27 (G-22): text column as in the original hero (serif headline with
// italic accents, eyebrow rule, pill + underlined link, scroll hint); portrait in the
// current style (rounded tile with a frosted name caption) plus the original floating
// formal-portrait card. The caption sits to the right of the card so the name stays
// visible; the card is hidden below 640 px and at md, where there is no room for both.
export function Hero() {
  const { t } = useLocale()
  const { headshot, formal } = site.images
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#f9f8f4]">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 bg-[radial-gradient(ellipse_at_70%_55%,#e8eee7_0%,transparent_66%)] lg:block" />
      <div className="mx-auto grid max-w-[1250px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:grid-cols-[1fr_.85fr] md:pt-20 lg:min-h-[640px] lg:gap-16 lg:px-10 lg:py-16">
        <div className="relative z-10 order-2 md:order-1">
          <p className="mb-7 flex items-center gap-3 text-label font-semibold uppercase text-muted">
            <span className="h-px w-8 bg-sand" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 className="font-display text-display-sm font-normal text-ink lg:text-display">
            {t.heroLead} <em className="font-normal text-forest">{t.heroAccent}</em>
            <br />
            {t.heroSecond} <em className="font-normal text-forest">{t.heroSecondAccent}</em>
          </h1>
          <p className="mt-8 max-w-[505px] text-lead text-body">{t.heroDesc}</p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a href="#about" className="focus-ring inline-flex items-center gap-3 rounded-full bg-forest px-6 py-4 text-ui font-semibold text-white transition-all hover:bg-forest-dark motion-safe:hover:-translate-y-0.5">
              {t.heroAction}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="#practice" className="focus-ring inline-flex items-center gap-2 border-b border-[#9eb0a5] pb-1 text-ui font-semibold text-forest transition-all motion-safe:hover:gap-4">
              {t.heroSecondAction}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-16 hidden items-center gap-4 text-label font-semibold uppercase text-muted lg:flex" aria-hidden="true">
            <ArrowDown size={14} />
            {t.scroll}
          </div>
        </div>
        <figure className="relative order-1 mx-auto w-full max-w-[360px] md:order-2 lg:max-w-[420px]">
          <div className="overflow-hidden rounded-[32px] bg-sage">
            <img
              src={headshot.src}
              width={headshot.width}
              height={headshot.height}
              alt={t.images.headshot}
              fetchPriority="high"
              className="aspect-square w-full object-cover photo-tint md:aspect-[4/5]"
            />
          </div>
          <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 px-4 py-3 backdrop-blur-md sm:left-[118px] md:left-4 lg:left-[182px]">
            <span className="block text-[15px] font-semibold tracking-[-.01em] text-ink">{site.name}</span>
            <span className="block text-small text-muted">{t.photoSub}</span>
          </figcaption>
          <div className="absolute -bottom-7 hidden w-[215px] rounded-xl border-[7px] border-[#f9f8f4] bg-white p-2 shadow-xl sm:-left-28 sm:block md:hidden lg:-left-12 lg:block">
            <img
              src={formal.src}
              width={formal.width}
              height={formal.height}
              alt={t.images.formal}
              loading="lazy"
              decoding="async"
              className="aspect-[1.7] w-full rounded-md object-cover photo-tint"
            />
            <div className="px-1 pb-1 pt-2 text-label font-semibold uppercase text-forest">{t.heroBadge}</div>
          </div>
        </figure>
      </div>
    </section>
  )
}
