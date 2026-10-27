<script setup lang="ts">
const { site, localize } = useSiteConfig()
// lang, dir, canonical, hreflang alternates and og:locale for the current locale.
const i18nHead = useLocaleHead({ lang: true, dir: true, seo: true })

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
  titleTemplate: (title?: string) =>
    title ? `${title} · ${localize(site.brand.name)}` : localize(site.seo.defaultTitle),
}))

useSeoMeta({
  description: () => localize(site.seo.defaultDescription),
  ogSiteName: () => localize(site.brand.name),
  ogType: 'website',
  ogImage: `${site.seo.siteUrl}${site.seo.ogImage}`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
