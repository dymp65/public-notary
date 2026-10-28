import { site } from '../../config/site.ts'
import { useLocale } from '../../i18n/useLocale.ts'

// Serif uppercase name as the logo, as in the reference header
export function Wordmark() {
  const { t } = useLocale()
  return (
    <a href="#home" className="focus-ring whitespace-nowrap font-display text-[13px] uppercase tracking-[.06em] text-white sm:text-[17px] sm:tracking-widest">
      {site.name}
      <span className="sr-only">, {t.a11y.logoHome}</span>
    </a>
  )
}
