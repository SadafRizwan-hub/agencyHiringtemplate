import type { WizardStepId } from '~/types/config'

export type ContractType = 'permanent' | 'contract'

export interface RequestLine {
  /** Stable key for v-for */
  key: number
  tradeId: string
  headcount: number | null
}

export interface RequestFormState {
  lines: RequestLine[]
  destination: string
  contractType: ContractType | ''
  startDate: string
  companyName: string
  contactName: string
  email: string
  phone: string
  notes: string
  /** Honeypot. Real users never see or fill this. */
  website: string
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/** Field path -> i18n key of the error message. Line fields use `lines.<index>.<field>`. */
export type FormErrors = Record<string, string>

export interface SummaryRow {
  step: WizardStepId
  label: string
  value: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/

let lineKey = 0
const newLine = (): RequestLine => ({ key: ++lineKey, tradeId: '', headcount: null })

function initialState(): RequestFormState {
  return {
    lines: [newLine()],
    destination: '',
    contractType: '',
    startDate: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: '',
    website: '',
  }
}

/** Local YYYY-MM-DD, comparable with <input type="date"> values. */
export function todayIso(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Wizard state, validation, submission and WhatsApp fallback. One instance per RequestWizard. */
export function useRequestForm() {
  const { site, localize, findTrade, whatsappUrl } = useSiteConfig()
  const { t, locale } = useI18n()
  const localePath = useLocalePath()

  const steps = site.features.wizardSteps
  const stepIndex = ref(0)
  const currentStep = computed<WizardStepId>(() => steps[stepIndex.value] ?? 'review')
  const isLastStep = computed(() => stepIndex.value === steps.length - 1)

  const state = reactive<RequestFormState>(initialState())
  const errors = ref<FormErrors>({})
  const status = ref<SubmitStatus>('idle')

  function validateStep(step: WizardStepId): FormErrors {
    const e: FormErrors = {}
    const required = (field: keyof RequestFormState) => {
      if (!String(state[field]).trim()) e[field] = 'wizard.errors.required'
    }

    if (step === 'trades') {
      if (!state.lines.length) e.lines = 'wizard.errors.linesRequired'
      state.lines.forEach((line, i) => {
        if (!line.tradeId) e[`lines.${i}.tradeId`] = 'wizard.errors.required'
        const n = line.headcount
        if (n === null || !Number.isInteger(n) || n < 1 || n > 9999) e[`lines.${i}.headcount`] = 'wizard.errors.headcount'
      })
    }

    if (step === 'job') {
      required('destination')
      required('contractType')
      required('startDate')
      if (state.startDate && state.startDate < todayIso()) e.startDate = 'wizard.errors.dateFuture'
    }

    if (step === 'company') {
      required('companyName')
      required('contactName')
      required('email')
      required('phone')
      if (state.email && !EMAIL_RE.test(state.email.trim())) e.email = 'wizard.errors.email'
      if (state.phone && !PHONE_RE.test(state.phone.trim())) e.phone = 'wizard.errors.phone'
    }

    return e
  }

  /** Validate the current step and advance. Returns false if the step has errors. */
  function next(): boolean {
    errors.value = validateStep(currentStep.value)
    if (Object.keys(errors.value).length) return false
    stepIndex.value = Math.min(stepIndex.value + 1, steps.length - 1)
    return true
  }

  function back() {
    errors.value = {}
    stepIndex.value = Math.max(stepIndex.value - 1, 0)
  }

  /** Jump back to an earlier step (used by "Edit" on the review step). */
  function goTo(step: WizardStepId) {
    const i = steps.indexOf(step)
    if (i >= 0 && i <= stepIndex.value) {
      errors.value = {}
      stepIndex.value = i
    }
  }

  function addLine() {
    state.lines.push(newLine())
  }

  function removeLine(key: number) {
    if (state.lines.length > 1) state.lines = state.lines.filter((l) => l.key !== key)
  }

  function tradeName(id: string, localized = true) {
    const found = findTrade(id)
    if (!found) return id
    return localized ? localize(found.trade.name) : found.trade.name.en
  }

  function countryName(code: string, localized = true) {
    const country = site.countries.destination.find((c) => c.code === code)
    if (!country) return code
    return localized ? localize(country.name) : country.name.en
  }

  function linesText(localized = true) {
    return state.lines
      .filter((l) => l.tradeId)
      .map((l) => `${tradeName(l.tradeId, localized)} × ${l.headcount ?? 0}`)
      .join(', ')
  }

  /** Localised label/value pairs for the review step and the WhatsApp message. */
  const summary = computed<SummaryRow[]>(() => {
    const rows: SummaryRow[] = [
      { step: 'trades', label: t('wizard.review.trades'), value: linesText() },
      { step: 'job', label: t('wizard.review.destination'), value: countryName(state.destination) },
      {
        step: 'job',
        label: t('wizard.review.contractType'),
        value: state.contractType ? t(`wizard.job.${state.contractType}`) : '',
      },
      { step: 'job', label: t('wizard.review.startDate'), value: state.startDate },
      { step: 'company', label: t('wizard.review.companyName'), value: state.companyName },
      { step: 'company', label: t('wizard.review.contactName'), value: state.contactName },
      { step: 'company', label: t('wizard.review.email'), value: state.email },
      { step: 'company', label: t('wizard.review.phone'), value: state.phone },
      { step: 'company', label: t('wizard.review.notes'), value: state.notes },
    ]
    return rows.filter((r) => steps.includes(r.step) && r.value.trim())
  })

  /** Prefilled wa.me link built from the current form values. */
  const whatsappLink = computed(() => {
    const lines = summary.value.map((r) => `${r.label}: ${r.value}`)
    return whatsappUrl([t('wizard.message.intro'), '', ...lines].join('\n'))
  })

  /** Validate every step; on failure jump to the first invalid one. */
  function validateAll(): boolean {
    for (const step of steps) {
      const e = validateStep(step)
      if (Object.keys(e).length) {
        errors.value = e
        stepIndex.value = steps.indexOf(step)
        return false
      }
    }
    errors.value = {}
    return true
  }

  async function submit() {
    if (status.value === 'submitting' || !validateAll()) return

    // Honeypot filled: pretend success, send nothing.
    if (state.website) {
      status.value = 'success'
      return
    }

    status.value = 'submitting'
    try {
      // Field values are sent in English so the agency inbox is consistent across locales.
      const res = await $fetch<{ success?: boolean }>(site.form.endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: {
          access_key: site.form.accessKey,
          subject: t('wizard.message.subject', { company: state.companyName.trim() }),
          from_name: state.contactName.trim(),
          email: state.email.trim(),
          phone: state.phone.trim(),
          company: state.companyName.trim(),
          trades: linesText(false),
          destination: countryName(state.destination, false),
          contract_type: state.contractType,
          start_date: state.startDate,
          notes: state.notes.trim(),
          locale: locale.value,
        },
      })
      if (!res?.success) throw new Error('Form provider rejected the submission')
      status.value = 'success'
      if (site.form.successRedirect) await navigateTo(localePath(site.form.successRedirect))
    }
    catch {
      status.value = 'error'
    }
  }

  function reset() {
    Object.assign(state, initialState())
    errors.value = {}
    status.value = 'idle'
    stepIndex.value = 0
  }

  return {
    steps,
    stepIndex,
    currentStep,
    isLastStep,
    state,
    errors,
    status,
    summary,
    whatsappLink,
    validateStep,
    next,
    back,
    goTo,
    addLine,
    removeLine,
    submit,
    reset,
  }
}
