import { ArrowUpRight, Globe, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'
import { Logo } from './Logo.tsx'

export function Header() {
  const { t, locale, toggleLocale } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const otherLocale = locale === 'id' ? 'en' : 'id'

  // G-03: close on Escape (focus back to the toggle) and when the desktop nav appears
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      // An open practice dialog handles its own Escape
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  const closeNav = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e9e2] bg-[#fafaf7]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[86px] max-w-[1250px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-8 lg:flex">
          {site.sections.map((section) => (
            <a key={section} href={`#${section}`} className="text-[12px] font-semibold text-body transition-colors hover:text-forest focus-ring">
              {t.nav[section]}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <button
            type="button"
            aria-label={t.a11y.switchLanguage}
            onClick={toggleLocale}
            className="focus-ring flex min-h-10 items-center gap-1.5 text-[11px] font-bold text-forest"
          >
            <Globe size={15} aria-hidden="true" />
            <span lang={otherLocale}>{t.languageCode}</span>
          </button>
          <a href="#office" className="focus-ring rounded-full bg-forest px-5 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-forest-dark">
            {t.officeLink} <ArrowUpRight className="ml-1 inline" size={14} aria-hidden="true" />
          </a>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="focus-ring rounded-lg p-2 text-forest lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mobileNav}
        hidden={!menuOpen}
        className="absolute left-0 top-[85px] w-full border-b border-[#e5e8e2] bg-paper p-5 shadow-lg lg:hidden"
      >
        {site.sections.map((section) => (
          <a key={section} href={`#${section}`} onClick={closeNav} className="focus-ring block border-b border-[#eff0e9] py-3 text-sm font-semibold text-ink">
            {t.nav[section]}
          </a>
        ))}
        <button
          type="button"
          aria-label={t.a11y.switchLanguage}
          className="focus-ring mt-4 flex min-h-10 items-center gap-2 text-sm text-forest"
          onClick={() => {
            toggleLocale()
            closeNav()
          }}
        >
          <Globe size={17} aria-hidden="true" />
          <span lang={otherLocale}>{t.languageName}</span>
        </button>
      </nav>
    </header>
  )
}
