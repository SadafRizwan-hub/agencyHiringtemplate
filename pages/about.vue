<script setup lang="ts">
const content = useContent('about')
const common = useContent('common')
const { site, localize } = useSiteConfig()

usePageSeo(() => content.value.seo)
</script>

<template>
  <div>
    <HeroSection :title="content.hero.title" :subtitle="content.hero.subtitle" />

    <BaseSection v-for="(section, i) in content.sections" :id="`about-${i}`" :key="section.title" :title="section.title">
      <p class="max-w-3xl">{{ section.body }}</p>
    </BaseSection>

    <BaseSection id="destinations" :title="content.destinationCountries.title" :intro="content.destinationCountries.intro">
      <ul class="flex flex-wrap gap-3">
        <li v-for="c in site.countries.destination" :key="c.code" class="rounded-full border border-muted px-4 py-1">
          {{ localize(c.name) }}
        </li>
      </ul>
    </BaseSection>

    <BaseSection id="sources" :title="content.sourceCountries.title" :intro="content.sourceCountries.intro">
      <ul class="flex flex-wrap gap-3">
        <li v-for="c in site.countries.source" :key="c.code" class="rounded-full border border-muted px-4 py-1">
          {{ localize(c.name) }}
        </li>
      </ul>
    </BaseSection>

    <CtaBanner :title="common.cta.title" :body="common.cta.body" :button="common.cta.button" to="/request" />
  </div>
</template>
