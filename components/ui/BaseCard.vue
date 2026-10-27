<script setup lang="ts">
withDefaults(defineProps<{ title?: string; as?: string }>(), { title: undefined, as: 'article' })
</script>

<template>
  <component :is="as" class="flex flex-col gap-2 rounded-md border border-muted p-6">
    <h3 v-if="title" class="text-lg font-semibold">{{ title }}</h3>
    <slot />
  </component>
</template>
