import type { ReactNode } from 'react'
import { useLocale } from '../i18n/useLocale.ts'

// Every external link opens in a new tab with rel="noopener noreferrer" (NFR-06)
// and tells screen-reader users so.
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const { t } = useLocale()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {t.a11y.newTab}</span>
    </a>
  )
}
