<script setup lang="ts">
import type { FormErrors, RequestLine } from '~/composables/useRequestForm'

/** Repeatable trade + headcount rows. Mutates the lines owned by useRequestForm. */
defineProps<{
  lines: RequestLine[]
  errors: FormErrors
}>()

const emit = defineEmits<{
  add: []
  remove: [key: number]
}>()

const { t } = useI18n()
const { trades, localize } = useSiteConfig()
</script>

<template>
  <div class="flex flex-col gap-4">
    <p v-if="errors.lines" class="text-sm font-medium text-accent">{{ t(errors.lines) }}</p>

    <fieldset
      v-for="(line, i) in lines"
      :key="line.key"
      class="grid items-start gap-4 sm:grid-cols-[1fr_8rem_auto]"
    >
      <legend class="sr-only">{{ t('wizard.trades.line', { n: i + 1 }) }}</legend>

      <FormField
        :id="`trade-${line.key}`"
        :label="t('wizard.trades.trade')"
        :error="errors[`lines.${i}.tradeId`] && t(errors[`lines.${i}.tradeId`]!)"
        required
      >
        <template #default="{ id, describedby, invalid }">
          <select :id="id" v-model="line.tradeId" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
            <option value="" disabled>{{ t('wizard.trades.selectTrade') }}</option>
            <optgroup v-for="industry in trades.industries" :key="industry.id" :label="localize(industry.name)">
              <option v-for="trade in industry.trades" :key="trade.id" :value="trade.id">
                {{ localize(trade.name) }}
              </option>
            </optgroup>
          </select>
        </template>
      </FormField>

      <FormField
        :id="`headcount-${line.key}`"
        :label="t('wizard.trades.headcount')"
        :error="errors[`lines.${i}.headcount`] && t(errors[`lines.${i}.headcount`]!)"
        required
      >
        <template #default="{ id, describedby, invalid }">
          <input
            :id="id"
            v-model.number="line.headcount"
            type="number"
            inputmode="numeric"
            min="1"
            max="9999"
            step="1"
            class="field-control"
            :aria-describedby="describedby"
            :aria-invalid="invalid"
          >
        </template>
      </FormField>

      <button
        v-if="lines.length > 1"
        type="button"
        class="py-2 text-sm underline sm:mt-7"
        @click="emit('remove', line.key)"
      >
        {{ t('wizard.trades.removeLine') }}
      </button>
    </fieldset>

    <div>
      <BaseButton variant="secondary" @click="emit('add')">{{ t('wizard.trades.addLine') }}</BaseButton>
    </div>
  </div>
</template>
