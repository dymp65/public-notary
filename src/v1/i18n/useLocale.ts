import { useLocale as useCurrentLocale } from '../../i18n/useLocale.ts'
import { en } from '../content/en.ts'
import { id } from '../content/id.ts'
import type { Dictionary, Locale } from '../types/site.ts'

const dictionaries: Record<Locale, Dictionary> = { id, en }

// Shares the locale state with the current design, so switching designs keeps the language.
export function useLocale() {
  const value = useCurrentLocale()
  return { ...value, t: dictionaries[value.locale] }
}
