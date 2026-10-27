import type { LocaleCode } from '../types/config'

/** Every page in `pages/`, locale-agnostic. Used for prerendering and the sitemap. */
export const pageRoutes = ['/', '/services', '/about', '/contact', '/request'] as const

/** Main navigation. Labels are i18n keys. */
export const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' },
] as const

/** Mirrors the `prefix_except_default` strategy configured in nuxt.config.ts. */
export function localizePath(path: string, locale: LocaleCode, defaultLocale: LocaleCode): string {
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
