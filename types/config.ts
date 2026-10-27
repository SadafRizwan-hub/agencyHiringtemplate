/**
 * Shared types for everything under `config/` and `content/`.
 * Components never hold client values; they only consume these shapes.
 */

export type LocaleCode = 'en' | 'ar'

/** A string available in every supported locale. */
export type LocalizedText = Record<LocaleCode, string>

export interface Office {
  country: LocalizedText
  city: LocalizedText
  phone: string
}

export interface Country {
  /** ISO 3166-1 alpha-2 code */
  code: string
  name: LocalizedText
}

export type WizardStepId = 'trades' | 'job' | 'company' | 'review'

export type AnalyticsProvider = 'none' | 'plausible' | 'ga4'

export interface SiteConfig {
  brand: {
    name: LocalizedText
    tagline: LocalizedText
    /** File name inside `assets/brand/` */
    logo: string
    /** Path inside `public/` */
    favicon: string
  }
  contacts: {
    email: string
    /** Display + tel: format, e.g. "+971 4 000 0000" */
    phone: string
    /** Digits only, international format without "+", used for wa.me links. Empty string hides WhatsApp. */
    whatsapp: string
    offices: Office[]
  }
  countries: {
    destination: Country[]
    source: Country[]
  }
  features: {
    showIndustries: boolean
    showWhyUs: boolean
    enableArabic: boolean
    enableWhatsAppButton: boolean
    /** Ordered wizard steps. `company` and `review` are required. */
    wizardSteps: WizardStepId[]
  }
  form: {
    provider: 'web3forms'
    endpoint: string
    accessKey: string
    /** Locale-agnostic path to navigate to after a successful submit. Empty string = show inline success. */
    successRedirect: string
  }
  seo: {
    /** Absolute production URL, no trailing slash */
    siteUrl: string
    defaultTitle: LocalizedText
    defaultDescription: LocalizedText
    /** Path inside `public/` */
    ogImage: string
  }
  analytics: {
    provider: AnalyticsProvider
    /** Plausible: domain. GA4: measurement id (G-XXXX). */
    id: string
  }
}

export interface ThemeConfig {
  colors: {
    primary: string
    primaryContrast: string
    accent: string
    surface: string
    text: string
    muted: string
  }
  fonts: {
    latin: string
    arabic: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    full: string
  }
}

export type SkillLevel = 'unskilled' | 'semi-skilled' | 'skilled' | 'professional'

export interface Trade {
  id: string
  name: LocalizedText
  skillLevel: SkillLevel
}

export interface Industry {
  id: string
  name: LocalizedText
  trades: Trade[]
}

export interface TradesConfig {
  industries: Industry[]
}
