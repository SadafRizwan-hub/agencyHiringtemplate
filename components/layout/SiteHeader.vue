<script setup lang="ts">
import { navItems } from '~/shared/routes'

const { t } = useI18n()
const { site, localize, logoUrl } = useSiteConfig()
</script>

<template>
  <header class="relative border-b border-muted">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
      <NuxtLinkLocale to="/" class="flex items-center gap-3" :aria-label="t('a11y.home')">
        <img v-if="logoUrl" :src="logoUrl" alt="" class="h-10 w-auto" width="120" height="40">
        <span class="font-semibold">{{ localize(site.brand.name) }}</span>
      </NuxtLinkLocale>

      <nav :aria-label="t('nav.main')" class="hidden md:block">
        <ul class="flex gap-6">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLinkLocale :to="item.path">{{ t(item.labelKey) }}</NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <div class="hidden items-center gap-4 md:flex">
        <LanguageSwitch />
        <BaseButton to="/request">{{ t('nav.request') }}</BaseButton>
      </div>

      <MobileMenu class="md:hidden" />
    </div>
  </header>
</template>
