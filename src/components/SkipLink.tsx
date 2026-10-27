import { useLocale } from '../i18n/useLocale.ts'

export function SkipLink() {
  const { t } = useLocale()
  return (
    <a
      href="#main"
      className="focus-ring sr-only rounded-full bg-forest px-5 py-3 text-ui font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {t.a11y.skipToContent}
    </a>
  )
}
