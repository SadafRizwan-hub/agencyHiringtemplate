<script setup lang="ts">
const content = useContent('services')
const common = useContent('common')

usePageSeo(() => content.value.seo)
</script>

<template>
  <div>
    <HeroSection :title="content.hero.title" :subtitle="content.hero.subtitle" />

    <BaseSection id="service-list">
      <ServiceList :items="content.items" />
    </BaseSection>

    <CtaBanner :title="common.cta.title" :body="common.cta.body" :button="common.cta.button" to="/request" />
  </div>
</template>
