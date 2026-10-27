import siteConfig from '../config/site.config'
import type { LocaleCode } from '../types/config'

// A type alias (not an interface) so it satisfies @nuxtjs/i18n's indexed LocaleObject.
export type LocaleMeta = {
  code: LocaleCode
  /** BCP 47 tag used for <html lang> and hreflang */
  language: string
  /** Label shown in the language switch, in its own language */
  name: string
  dir: 'ltr' | 'rtl'
  /** File inside i18n/locales/ */
  file: string
}

export const defaultLocale: LocaleCode = 'en'

export const allLocales: LocaleMeta[] = [
  { code: 'en', language: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
  { code: 'ar', language: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
]

/** Locales in the build. Arabic can be switched off with `features.enableArabic` in site.config.ts. */
export const enabledLocales: LocaleMeta[] = allLocales.filter(
  (l) => l.code !== 'ar' || siteConfig.features.enableArabic,
)
