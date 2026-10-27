<script setup lang="ts">
/** Industries and their trades, straight from config/trades.json. */
withDefaults(defineProps<{ showTrades?: boolean }>(), { showTrades: true })

const { trades, localize } = useSiteConfig()
</script>

<template>
  <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="industry in trades.industries" :key="industry.id">
      <BaseCard :title="localize(industry.name)" class="h-full">
        <ul v-if="showTrades" class="text-sm text-muted">
          <li v-for="trade in industry.trades" :key="trade.id">{{ localize(trade.name) }}</li>
        </ul>
      </BaseCard>
    </li>
  </ul>
</template>
