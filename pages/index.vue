<script setup lang="ts">
const content = useContent('home')
const common = useContent('common')
const { site } = useSiteConfig()

usePageSeo(() => content.value.seo)
</script>

<template>
  <div>
    <HeroSection :eyebrow="content.hero.eyebrow" :title="content.hero.title" :subtitle="content.hero.subtitle">
      <template #actions>
        <BaseButton to="/request">{{ content.hero.primaryCta }}</BaseButton>
        <BaseButton to="/services" variant="secondary">{{ content.hero.secondaryCta }}</BaseButton>
      </template>
    </HeroSection>

    <BaseSection id="services" :title="content.services.title" :intro="content.services.intro">
      <ServiceList :items="content.services.items" />
    </BaseSection>

    <BaseSection v-if="site.features.showIndustries" id="industries" :title="content.industries.title" :intro="content.industries.intro">
      <IndustryGrid />
    </BaseSection>

    <BaseSection v-if="site.features.showWhyUs" id="why-us" :title="content.whyUs.title">
      <WhyUsList :items="content.whyUs.items" />
    </BaseSection>

    <CtaBanner :title="common.cta.title" :body="common.cta.body" :button="common.cta.button" to="/request" />
  </div>
</template>
