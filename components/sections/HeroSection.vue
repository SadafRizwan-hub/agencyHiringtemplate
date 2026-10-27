<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="py-16">
    <div class="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4">
      <p v-if="eyebrow" class="text-sm font-medium text-muted">{{ eyebrow }}</p>
      <h1 class="max-w-3xl text-4xl font-bold">{{ title }}</h1>
      <p v-if="subtitle" class="max-w-2xl text-lg text-muted">{{ subtitle }}</p>
      <div v-if="$slots.actions" class="mt-4 flex flex-wrap gap-3">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
