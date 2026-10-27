import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { site } from '../config/site.ts'
import { en } from '../content/en.ts'
import { id } from '../content/id.ts'
import type { Dictionary, Locale } from '../types/site.ts'
import { LocaleContext } from './context.ts'

const dictionaries: Record<Locale, Dictionary> = { id, en }

// Indonesian is the first-visit default; never infer from navigator.language.
function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(site.storageKey)
    return stored === 'en' || stored === 'id' ? stored : 'id'
  } catch {
    return 'id'
  }
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(site.storageKey, locale)
  } catch {
    // Storage blocked (private mode); the choice lasts for this visit only.
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description)
  }, [locale, t])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    storeLocale(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'id' ? 'en' : 'id')
  }, [locale, setLocale])

  const value = useMemo(
    () => ({ locale, t, setLocale, toggleLocale }),
    [locale, t, setLocale, toggleLocale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
