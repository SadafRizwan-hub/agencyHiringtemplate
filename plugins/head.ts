import siteConfig from '~/config/site.config'
import themeConfig from '~/config/theme.config'

/** Global head tags driven by config: theme variables, favicon, analytics. */
export default defineNuxtPlugin(() => {
  const { analytics, brand } = siteConfig

  useHead({
    style: [{ key: 'brand-theme', innerHTML: themeToCss(themeConfig) }],
    link: [{ rel: 'icon', href: brand.favicon }],
    script: [
      ...(analytics.provider === 'plausible' && analytics.id
        ? [{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': analytics.id }]
        : []),
      ...(analytics.provider === 'ga4' && analytics.id
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${analytics.id}`, async: true },
            {
              innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${analytics.id}');`,
            },
          ]
        : []),
    ],
  })
})
