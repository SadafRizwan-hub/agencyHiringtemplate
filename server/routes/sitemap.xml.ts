import siteConfig from '../../config/site.config'
import { defaultLocale, enabledLocales } from '../../i18n/locales'
import { localizePath, pageRoutes } from '../../shared/routes'

/** Prerendered to /sitemap.xml at generate time, with hreflang alternates per page. */
export default defineEventHandler((event) => {
  const base = siteConfig.seo.siteUrl
  const url = (path: string, code: (typeof enabledLocales)[number]['code']) => `${base}${localizePath(path, code, defaultLocale)}`

  const entries = pageRoutes.flatMap((path) =>
    enabledLocales.map((l) => {
      const alternates = enabledLocales
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.language}" href="${url(path, alt.code)}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(path, defaultLocale)}"/>`)
        .join('\n')
      return `  <url>\n    <loc>${url(path, l.code)}</loc>\n${alternates}\n  </url>`
    }),
  )

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
  ].join('\n')
})
