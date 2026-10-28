import { Scale } from 'lucide-react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLocale()
  return (
    <a href="#home" className={`group flex items-center gap-3 focus-ring ${light ? 'focus-visible:outline-white/80' : ''}`}>
      <span className={`grid h-11 w-11 place-items-center rounded-full border ${light ? 'border-white/25 text-[#decbaa]' : 'border-[#c9bca4] text-[#ad916b]'}`}>
        <Scale size={21} strokeWidth={1.35} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-[15px] font-semibold tracking-[.025em] sm:text-[17px] ${light ? 'text-white' : 'text-ink'}`}>
          {site.name}
        </span>
        <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[.22em] ${light ? 'text-white/60' : 'text-muted'}`}>
          {t.logoSubtitle}
        </span>
      </span>
      <span className="sr-only">, {t.a11y.logoHome}</span>
    </a>
  )
}
