import type { PageSeo } from '~/types/content'

/**
 * Per-page title/description (+ Open Graph mirrors).
 * Canonical and hreflang are set globally in app.vue via useLocaleHead.
 */
export function usePageSeo(seo: () => PageSeo) {
  useSeoMeta({
    title: () => seo().title,
    description: () => seo().description,
    ogTitle: () => seo().title,
    ogDescription: () => seo().description,
  })
}
