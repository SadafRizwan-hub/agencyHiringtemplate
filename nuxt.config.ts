// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import siteConfig from './config/site.config'
import { defaultLocale, enabledLocales } from './i18n/locales'
import { localizePath, pageRoutes } from './shared/routes'

const prerenderRoutes = enabledLocales.flatMap((l) =>
  pageRoutes.map((path) => localizePath(path, l.code, defaultLocale)),
)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Keep the flat, root-level structure (components/, pages/, ...) instead of Nuxt 4's app/ dir.
  srcDir: '.',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  // Register components by file name only (SiteHeader, not LayoutSiteHeader).
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    baseUrl: siteConfig.seo.siteUrl,
    defaultLocale,
    strategy: 'prefix_except_default',
    locales: enabledLocales,
    detectBrowserLanguage: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...prerenderRoutes, '/sitemap.xml', '/robots.txt'],
    },
  },
})
