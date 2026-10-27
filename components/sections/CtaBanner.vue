<script setup lang="ts">
defineProps<{
  title: string
  body?: string
  button: string
  /** Locale-agnostic internal path */
  to: string
}>()
</script>

<template>
  <section class="py-12">
    <div class="mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-lg bg-primary px-6 py-10 text-primary-contrast md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">{{ title }}</h2>
        <p v-if="body">{{ body }}</p>
      </div>
      <NuxtLinkLocale :to="to" class="rounded-md bg-primary-contrast px-5 py-2.5 font-medium text-primary">
        {{ button }}
      </NuxtLinkLocale>
    </div>
  </section>
</template>
