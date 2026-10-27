<script setup lang="ts">
import type { WizardStepId } from '~/types/config'

defineProps<{
  steps: WizardStepId[]
  /** Zero-based index of the active step */
  current: number
}>()

const { t } = useI18n()
</script>

<template>
  <div>
    <p class="sr-only">{{ t('wizard.stepOf', { current: current + 1, total: steps.length }) }}</p>
    <ol class="flex flex-wrap gap-4" aria-hidden="true">
      <li
        v-for="(step, i) in steps"
        :key="step"
        class="flex items-center gap-2"
        :class="i === current ? 'font-semibold' : 'text-muted'"
      >
        <span class="inline-flex size-7 items-center justify-center rounded-full border border-current text-sm">{{ i + 1 }}</span>
        <span>{{ t(`wizard.steps.${step}`) }}</span>
      </li>
    </ol>
  </div>
</template>
