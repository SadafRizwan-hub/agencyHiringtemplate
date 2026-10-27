<script setup lang="ts">
const props = defineProps<{
  id?: string
  title?: string
  intro?: string
}>()

const headingId = computed(() => (props.id && props.title ? `${props.id}-title` : undefined))
</script>

<template>
  <section :id="id" :aria-labelledby="headingId" class="py-12">
    <div class="mx-auto max-w-6xl px-4">
      <header v-if="title || intro || $slots.header" class="mb-8 max-w-2xl">
        <h2 v-if="title" :id="headingId" class="text-2xl font-semibold">{{ title }}</h2>
        <p v-if="intro" class="mt-2 text-muted">{{ intro }}</p>
        <slot name="header" />
      </header>
      <slot />
    </div>
  </section>
</template>
