import { Globe, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site.ts'
import { useLocale } from '../../i18n/useLocale.ts'
import { Wordmark } from './Wordmark.tsx'

// Reference layout: links left, serif name centred, outlined pill right (from xl).
// Below xl the name moves left and the links go into the menu. Menu behaviour as in v2 (G-03).
export function Header() {
  const { t, locale, toggleLocale } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const otherLocale = locale === 'id' ? 'en' : 'id'

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 80rem)')
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
    <header className="sticky top-0 z-50 border-b border-white/[.08] bg-night/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[72px] max-w-[1250px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-6 xl:flex">
          {site.sections.map((section) => (
            <a key={section} href={`#${section}`} className="focus-ring text-ui text-white/75 transition-colors hover:text-white">
              {t.nav[section]}
            </a>
          ))}
        </nav>
        <Wordmark />
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              aria-label={t.a11y.switchLanguage}
              onClick={toggleLocale}
              className="focus-ring flex min-h-10 items-center gap-1.5 rounded-full px-2 text-ui font-medium text-white/75 transition-colors hover:text-white"
            >
              <Globe size={15} aria-hidden="true" />
              <span lang={otherLocale}>{t.languageCode}</span>
            </button>
            <a href="#office" className="focus-ring btn-glass min-h-10">
              {t.officeLink}
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="focus-ring -mr-2 rounded-full p-2.5 text-white xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mobileNav}
        hidden={!menuOpen}
        className="absolute left-0 top-[71px] w-full border-b border-white/10 bg-night px-5 pb-6 pt-2 sm:px-8 xl:hidden"
      >
        {site.sections.map((section) => (
          <a key={section} href={`#${section}`} onClick={closeNav} className="focus-ring block border-b border-white/10 py-3.5 text-h3 font-medium text-white">
            {t.nav[section]}
          </a>
        ))}
        <button
          type="button"
          aria-label={t.a11y.switchLanguage}
          className="focus-ring mt-4 flex min-h-11 items-center gap-2 text-ui font-medium text-white/75"
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
