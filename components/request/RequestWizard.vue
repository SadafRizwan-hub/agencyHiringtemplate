<script setup lang="ts">
import { todayIso } from '~/composables/useRequestForm'

const { t } = useI18n()
const { site, localize } = useSiteConfig()
const form = useRequestForm()
const { state, errors, status, steps, stepIndex, currentStep, summary, whatsappLink } = form

const heading = ref<HTMLElement>()
const minDate = ref<string>()
onMounted(() => (minDate.value = todayIso()))

/** Translated error for a field, or undefined. */
const err = (field: string) => (errors.value[field] ? t(errors.value[field]) : undefined)
const hasErrors = computed(() => Object.keys(errors.value).length > 0)

// Move focus to the step heading whenever the step changes.
watch(stepIndex, () => nextTick(() => heading.value?.focus()))

function onSubmit() {
  if (currentStep.value === 'review') form.submit()
  else form.next()
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" role="status" class="flex flex-col items-start gap-4">
      <h2 class="text-2xl font-semibold">{{ t('wizard.success.title') }}</h2>
      <p>{{ t('wizard.success.body') }}</p>
      <BaseButton variant="secondary" @click="form.reset()">{{ t('wizard.actions.again') }}</BaseButton>
    </div>

    <form v-else novalidate :aria-label="t('wizard.label')" class="flex flex-col gap-8" @submit.prevent="onSubmit">
      <StepIndicator :steps="steps" :current="stepIndex" />

      <!-- Honeypot: hidden from users and assistive tech; bots tend to fill it. -->
      <div class="sr-only" aria-hidden="true">
        <label for="website">{{ t('wizard.company.honeypot') }}</label>
        <input id="website" v-model="state.website" type="text" name="website" tabindex="-1" autocomplete="off">
      </div>

      <h2 ref="heading" tabindex="-1" class="text-2xl font-semibold">{{ t(`wizard.steps.${currentStep}`) }}</h2>

      <p v-if="hasErrors" role="alert" class="font-medium text-accent">{{ t('wizard.errors.summary') }}</p>

      <!-- Step: trades -->
      <fieldset v-if="currentStep === 'trades'" class="flex flex-col gap-4">
        <legend class="mb-2">{{ t('wizard.trades.legend') }}</legend>
        <TradePicker :lines="state.lines" :errors="errors" @add="form.addLine()" @remove="form.removeLine" />
      </fieldset>

      <!-- Step: job -->
      <div v-else-if="currentStep === 'job'" class="flex flex-col gap-6">
        <FormField id="destination" :label="t('wizard.job.destination')" :error="err('destination')" required>
          <template #default="{ id, describedby, invalid }">
            <select :id="id" v-model="state.destination" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
              <option value="" disabled>{{ t('wizard.job.selectCountry') }}</option>
              <option v-for="c in site.countries.destination" :key="c.code" :value="c.code">{{ localize(c.name) }}</option>
            </select>
          </template>
        </FormField>

        <fieldset class="flex flex-col gap-2" :aria-describedby="err('contractType') ? 'contractType-error' : undefined">
          <legend class="font-medium">{{ t('wizard.job.contractType') }}<span aria-hidden="true"> *</span></legend>
          <label v-for="type in (['permanent', 'contract'] as const)" :key="type" class="flex items-center gap-2">
            <input v-model="state.contractType" type="radio" name="contractType" :value="type">
            {{ t(`wizard.job.${type}`) }}
          </label>
          <p v-if="err('contractType')" id="contractType-error" class="text-sm font-medium text-accent">{{ err('contractType') }}</p>
        </fieldset>

        <FormField id="startDate" :label="t('wizard.job.startDate')" :error="err('startDate')" required>
          <template #default="{ id, describedby, invalid }">
            <input :id="id" v-model="state.startDate" type="date" :min="minDate" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
          </template>
        </FormField>
      </div>

      <!-- Step: company -->
      <div v-else-if="currentStep === 'company'" class="flex flex-col gap-6">
        <FormField id="companyName" :label="t('wizard.company.companyName')" :error="err('companyName')" required>
          <template #default="{ id, describedby, invalid }">
            <input :id="id" v-model="state.companyName" type="text" autocomplete="organization" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
          </template>
        </FormField>
        <FormField id="contactName" :label="t('wizard.company.contactName')" :error="err('contactName')" required>
          <template #default="{ id, describedby, invalid }">
            <input :id="id" v-model="state.contactName" type="text" autocomplete="name" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
          </template>
        </FormField>
        <FormField id="email" :label="t('wizard.company.email')" :error="err('email')" required>
          <template #default="{ id, describedby, invalid }">
            <input :id="id" v-model="state.email" type="email" autocomplete="email" dir="ltr" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
          </template>
        </FormField>
        <FormField id="phone" :label="t('wizard.company.phone')" :error="err('phone')" required>
          <template #default="{ id, describedby, invalid }">
            <input :id="id" v-model="state.phone" type="tel" autocomplete="tel" dir="ltr" class="field-control" :aria-describedby="describedby" :aria-invalid="invalid">
          </template>
        </FormField>
        <FormField id="notes" :label="t('wizard.company.notes')" :hint="t('wizard.company.notesHint')">
          <template #default="{ id, describedby }">
            <textarea :id="id" v-model="state.notes" rows="4" class="field-control" :aria-describedby="describedby" />
          </template>
        </FormField>
      </div>

      <!-- Step: review -->
      <div v-else-if="currentStep === 'review'" class="flex flex-col gap-4">
        <p>{{ t('wizard.review.intro') }}</p>
        <dl class="grid gap-x-6 gap-y-3 sm:grid-cols-[12rem_1fr_auto]">
          <template v-for="row in summary" :key="row.label">
            <dt class="font-medium">{{ row.label }}</dt>
            <dd class="whitespace-pre-line">{{ row.value }}</dd>
            <dd>
              <button type="button" class="text-sm underline" @click="form.goTo(row.step)">
                {{ t('wizard.review.edit') }}<span class="sr-only">: {{ row.label }}</span>
              </button>
            </dd>
          </template>
        </dl>
      </div>

      <p v-if="status === 'error'" role="alert" class="font-medium text-accent">{{ t('wizard.errors.submit') }}</p>

      <div class="flex flex-wrap items-center gap-3">
        <BaseButton v-if="stepIndex > 0" variant="secondary" @click="form.back()">{{ t('wizard.actions.back') }}</BaseButton>
        <BaseButton type="submit" :disabled="status === 'submitting'">
          <template v-if="currentStep !== 'review'">{{ t('wizard.actions.next') }}</template>
          <template v-else-if="status === 'submitting'">{{ t('wizard.actions.submitting') }}</template>
          <template v-else>{{ t('wizard.actions.submit') }}</template>
        </BaseButton>
        <BaseButton v-if="currentStep === 'review' && whatsappLink" :href="whatsappLink" variant="secondary">
          {{ t('wizard.actions.whatsapp') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>
