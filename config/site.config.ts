import type { SiteConfig } from '../types/config'

/**
 * Per-client site configuration.
 * Re-skinning a client starts here. Everything below is placeholder data.
 */
const siteConfig: SiteConfig = {
  brand: {
    name: { en: 'Example Manpower Co.', ar: 'شركة المثال للقوى العاملة' },
    tagline: { en: 'Skilled workforce for Gulf employers', ar: 'قوى عاملة ماهرة لأصحاب العمل في الخليج' },
    logo: 'logo.svg',
    favicon: '/favicon.svg',
  },
  contacts: {
    email: 'hello@example.com',
    phone: '+971 4 000 0000',
    whatsapp: '971500000000',
    offices: [
      {
        country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
        city: { en: 'Dubai', ar: 'دبي' },
        phone: '+971 4 000 0000',
      },
      {
        country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
        city: { en: 'Riyadh', ar: 'الرياض' },
        phone: '+966 11 000 0000',
      },
      {
        country: { en: 'India', ar: 'الهند' },
        city: { en: 'Mumbai', ar: 'مومباي' },
        phone: '+91 22 0000 0000',
      },
    ],
  },
  countries: {
    destination: [
      { code: 'AE', name: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' } },
      { code: 'SA', name: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' } },
      { code: 'QA', name: { en: 'Qatar', ar: 'قطر' } },
      { code: 'KW', name: { en: 'Kuwait', ar: 'الكويت' } },
      { code: 'BH', name: { en: 'Bahrain', ar: 'البحرين' } },
      { code: 'OM', name: { en: 'Oman', ar: 'عُمان' } },
    ],
    source: [
      { code: 'IN', name: { en: 'India', ar: 'الهند' } },
      { code: 'PK', name: { en: 'Pakistan', ar: 'باكستان' } },
      { code: 'NP', name: { en: 'Nepal', ar: 'نيبال' } },
      { code: 'BD', name: { en: 'Bangladesh', ar: 'بنغلاديش' } },
      { code: 'PH', name: { en: 'Philippines', ar: 'الفلبين' } },
      { code: 'LK', name: { en: 'Sri Lanka', ar: 'سريلانكا' } },
    ],
  },
  features: {
    showIndustries: true,
    showWhyUs: true,
    enableArabic: true,
    enableWhatsAppButton: true,
    wizardSteps: ['trades', 'job', 'company', 'review'],
  },
  form: {
    provider: 'web3forms',
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: 'YOUR-WEB3FORMS-ACCESS-KEY',
    successRedirect: '',
  },
  seo: {
    siteUrl: 'https://www.example.com',
    defaultTitle: { en: 'Example Manpower Co.', ar: 'شركة المثال للقوى العاملة' },
    defaultDescription: {
      en: 'Placeholder description for a Gulf manpower and recruitment agency.',
      ar: 'وصف مؤقت لوكالة توظيف وقوى عاملة في الخليج.',
    },
    ogImage: '/og-image.png',
  },
  analytics: {
    provider: 'none',
    id: '',
  },
}

export default siteConfig
