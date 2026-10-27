import { ArrowUpRight, MapPin, UserRound } from 'lucide-react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'
import { ExternalLink } from './ExternalLink.tsx'
import { Logo } from './Logo.tsx'

export function Footer() {
  const { t } = useLocale()
  return (
    <footer className="bg-forest-dark py-14 text-white">
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.7fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-[320px] text-[13px] leading-[1.8] text-white/75">{t.footerDescription}</p>
          </div>
          <nav aria-labelledby="footer-nav-title">
            <p id="footer-nav-title" className="mb-5 text-[11px] font-bold uppercase tracking-[.15em] text-white/60">{t.footerSite}</p>
            <div className="flex flex-col gap-3">
              {site.sections.map((section) => (
                <a key={section} className="focus-ring focus-visible:outline-white/80 w-fit text-[13px] text-white/75 transition-colors hover:text-white" href={`#${section}`}>
                  {t.nav[section]}
                </a>
              ))}
            </div>
          </nav>
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.15em] text-white/60">{t.footerConnect}</p>
            <ExternalLink href={site.links.linkedin} className="focus-ring focus-visible:outline-white/80 flex w-fit items-center gap-2 text-[13px] text-white/75 hover:text-white">
              <UserRound size={15} aria-hidden="true" />
              LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={site.links.maps} className="focus-ring focus-visible:outline-white/80 mt-4 flex w-fit items-center gap-2 text-[13px] text-white/75 hover:text-white">
              <MapPin size={15} aria-hidden="true" />
              Google Maps <ArrowUpRight size={13} aria-hidden="true" />
            </ExternalLink>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/15 pt-6 text-[11px] text-white/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </span>
          <span>{t.footerTag}</span>
        </div>
      </div>
    </footer>
  )
}
