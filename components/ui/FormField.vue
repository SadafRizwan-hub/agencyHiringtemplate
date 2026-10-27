<script setup lang="ts">
/**
 * Label + control + hint + error wrapper.
 * The default slot receives `{ id, describedby, invalid }` to bind onto the control.
 */
const props = defineProps<{
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
}>()

const describedby = computed(
  () => [props.hint && `${props.id}-hint`, props.error && `${props.id}-error`].filter(Boolean).join(' ') || undefined,
)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="font-medium">
      {{ label }}<span v-if="required" aria-hidden="true"> *</span>
    </label>
    <slot :id="id" :describedby="describedby" :invalid="!!error" />
    <p v-if="hint" :id="`${id}-hint`" class="text-sm text-muted">{{ hint }}</p>
    <p v-if="error" :id="`${id}-error`" class="text-sm font-medium text-accent">{{ error }}</p>
  </div>
</template>
