<script setup lang="ts">
const { t } = useI18n()
const { site, whatsappUrl } = useSiteConfig()
const common = useContent('common')

const href = computed(() =>
  site.features.enableWhatsAppButton ? whatsappUrl(common.value.whatsapp.greeting) : '',
)
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener"
    :aria-label="t('a11y.whatsapp')"
    class="fixed bottom-4 end-4 z-50 rounded-full bg-primary px-4 py-3 font-medium text-primary-contrast"
  >
    {{ t('contact.whatsapp') }}
  </a>
</template>
