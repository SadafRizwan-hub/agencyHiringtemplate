<script setup lang="ts">
const content = useContent('request')

usePageSeo(() => content.value.seo)
</script>

<template>
  <div>
    <HeroSection :title="content.hero.title" :subtitle="content.hero.subtitle" />
    <BaseSection id="request-form">
      <div class="max-w-3xl">
        <RequestWizard />
      </div>
    </BaseSection>
  </div>
</template>
