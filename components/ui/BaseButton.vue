<script setup lang="ts">
/**
 * `to`: internal, locale-agnostic path (localised automatically).
 * `href`: external URL (opens in a new tab).
 * Neither: a <button>.
 */
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { to: undefined, href: undefined, variant: 'primary', type: 'button', disabled: false },
)

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-medium disabled:opacity-50',
  props.variant === 'primary' ? 'bg-primary text-primary-contrast' : 'border border-primary text-primary',
])
</script>

<template>
  <NuxtLinkLocale v-if="to" :to="to" :class="classes"><slot /></NuxtLinkLocale>
  <a v-else-if="href" :href="href" target="_blank" rel="noopener" :class="classes"><slot /></a>
  <button v-else :type="type" :disabled="disabled" :class="classes"><slot /></button>
</template>
