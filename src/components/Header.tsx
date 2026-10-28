import { Globe, Menu, X } from 'lucide-react'
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
    <header className="sticky top-0 z-50 border-b border-black/[.06] bg-cream/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[72px] max-w-[1250px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-6 lg:flex xl:gap-8">
          {site.sections.map((section) => (
            <a key={section} href={`#${section}`} className="text-ui text-body transition-colors hover:text-ink focus-ring">
              {t.nav[section]}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label={t.a11y.switchLanguage}
            onClick={toggleLocale}
            className="focus-ring flex min-h-10 items-center gap-1.5 rounded-full px-2 text-ui font-medium text-body transition-colors hover:text-ink"
          >
            <Globe size={15} aria-hidden="true" />
            <span lang={otherLocale}>{t.languageCode}</span>
          </button>
          <a href="#office" className="focus-ring btn btn-primary min-h-10 px-4">
            {t.officeLink}
          </a>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="focus-ring -mr-2 rounded-full p-2.5 text-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mobileNav}
        hidden={!menuOpen}
        className="absolute left-0 top-[71px] w-full border-b border-black/[.06] bg-cream px-5 pb-6 pt-2 shadow-[0_24px_40px_-24px_rgba(0,0,0,.18)] sm:px-8 lg:hidden"
      >
        {site.sections.map((section) => (
          <a key={section} href={`#${section}`} onClick={closeNav} className="focus-ring block border-b border-black/[.06] py-3.5 text-[17px] font-medium tracking-[-.01em] text-ink">
            {t.nav[section]}
          </a>
        ))}
        <button
          type="button"
          aria-label={t.a11y.switchLanguage}
          className="focus-ring mt-4 flex min-h-11 items-center gap-2 text-ui font-medium text-forest"
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
