<script setup lang="ts">
defineProps<{
  items: { title: string; body: string; points?: string[] }[]
}>()
</script>

<template>
  <ul class="grid gap-6 md:grid-cols-2">
    <li v-for="item in items" :key="item.title">
      <BaseCard :title="item.title" class="h-full">
        <p class="text-muted">{{ item.body }}</p>
        <ul v-if="item.points?.length" class="mt-2 list-disc ps-5">
          <li v-for="point in item.points" :key="point">{{ point }}</li>
        </ul>
      </BaseCard>
    </li>
  </ul>
</template>
