<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const others = computed(() => locales.value.filter((l) => l.code !== locale.value))
</script>

<template>
  <nav v-if="others.length" :aria-label="t('a11y.switchLanguage')">
    <ul class="flex gap-3">
      <li v-for="l in others" :key="l.code">
        <NuxtLink :to="switchLocalePath(l.code)" :lang="l.language" :hreflang="l.language">
          {{ l.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
