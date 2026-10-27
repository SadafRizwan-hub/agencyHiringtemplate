<script setup lang="ts">
defineProps<{
  items: { title: string; body: string }[]
}>()
</script>

<template>
  <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="item in items" :key="item.title" class="flex flex-col gap-2">
      <h3 class="font-semibold">{{ item.title }}</h3>
      <p class="text-muted">{{ item.body }}</p>
    </li>
  </ul>
</template>
