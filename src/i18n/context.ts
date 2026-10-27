import { createContext } from 'react'
import type { Dictionary, Locale } from '../types/site.ts'

export interface LocaleContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
