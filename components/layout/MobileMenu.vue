<script setup lang="ts">
import { navItems } from '~/shared/routes'

const { t } = useI18n()
const route = useRoute()
const open = ref(false)

watch(() => route.fullPath, () => (open.value = false))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
</script>

<template>
  <div @keydown="onKeydown">
    <button
      type="button"
      class="rounded-sm border border-muted px-3 py-2"
      aria-controls="mobile-menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ open ? t('a11y.closeMenu') : t('a11y.openMenu') }}
    </button>

    <div v-show="open" id="mobile-menu" class="absolute inset-x-0 top-full border-b border-muted bg-surface px-4 py-6">
      <nav :aria-label="t('nav.main')">
        <ul class="flex flex-col gap-4">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLinkLocale :to="item.path">{{ t(item.labelKey) }}</NuxtLinkLocale>
          </li>
        </ul>
      </nav>
      <div class="mt-6 flex flex-col items-start gap-4">
        <LanguageSwitch />
        <BaseButton to="/request">{{ t('nav.request') }}</BaseButton>
      </div>
    </div>
  </div>
</template>
