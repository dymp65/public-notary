import { Scale } from 'lucide-react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLocale()
  return (
    <a href="#home" className={`flex items-center gap-3 focus-ring ${light ? 'focus-visible:outline-white/80' : ''}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-full ${light ? 'bg-white/10 text-[#decbaa]' : 'bg-forest text-white'}`}>
        <Scale size={18} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className={`text-[15px] font-semibold leading-tight tracking-[-.01em] ${light ? 'text-white' : 'text-ink'}`}>
          {site.name}
        </span>
        <span className={`mt-0.5 text-[10px] font-medium uppercase leading-tight tracking-[.14em] ${light ? 'text-white/60' : 'text-muted'}`}>
          {t.logoSubtitle}
        </span>
      </span>
      <span className="sr-only">, {t.a11y.logoHome}</span>
    </a>
  )
}
