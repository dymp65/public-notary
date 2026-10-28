import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '../../config/site.ts'
import { useLocale } from '../../i18n/useLocale.ts'

// After the owner's 2026-10-28 reference: dark stage with the portrait blurred behind it,
// a large sans headline, a glass pill, the sharp portrait in an outlined frame with the
// name centred on it, and a four-column strip along the bottom. The reference's strip
// holds client and experience numbers, which this site never shows, so it carries the
// four factual credentials instead. The section runs under the translucent header.
export function Hero() {
  const { t } = useLocale()
  const { headshot } = site.images
  return (
    <section id="home" className="relative isolate -mt-[72px] overflow-hidden pt-[72px]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img src={headshot.src} alt="" className="h-full w-full scale-110 object-cover opacity-30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgb(69_102_94/.35)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night to-transparent" />
      </div>

      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 pb-16 pt-10 md:grid-cols-[1.15fr_.85fr] md:pt-16 lg:min-h-[620px] lg:gap-16">
          <div className="order-2 md:order-1">
            <p className="text-ui font-medium text-white/60">{t.eyebrow}</p>
            <h1 className="mt-5 text-hero-sm font-semibold text-white lg:text-hero">
              {t.heroLead} {t.heroAccent}
              <br />
              {t.heroSecond} {t.heroSecondAccent}
            </h1>
            <p className="mt-7 max-w-[480px] text-lead text-white/75">{t.heroDesc}</p>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#about" className="focus-ring btn-glass min-h-13 text-para">
                {t.heroAction}
                <span className="btn-glass-icon h-10 w-10">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </a>
              <a href="#practice" className="focus-ring inline-flex min-h-11 items-center gap-2 text-ui font-medium text-white/75 transition-colors hover:text-white">
                {t.heroSecondAction}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="relative order-1 mx-auto w-full max-w-[420px] md:order-2 md:max-w-none">
            <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-night-raised">
              <img
                src={headshot.src}
                width={headshot.width}
                height={headshot.height}
                alt={t.images.headshot}
                fetchPriority="high"
                className="aspect-square w-full object-cover photo-tint md:aspect-[4/5] lg:aspect-square"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center">
                <span className="block text-h3 font-semibold text-white sm:text-title">{site.name}</span>
                <span className="mt-1 block text-para text-white/75">{t.photoSub}</span>
              </figcaption>
            </div>
          </figure>
        </div>

        <ul className="grid gap-x-6 gap-y-10 pb-16 pt-4 sm:grid-cols-2 lg:grid-cols-4 lg:pb-20">
          {t.credentials.map((item, index) => (
            <li key={index} className="text-center">
              <span className="block text-h3 font-medium text-white">{item.title}</span>
              <span className="mx-auto mt-2 block max-w-[260px] text-small text-white/60">{item.subtitle}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
