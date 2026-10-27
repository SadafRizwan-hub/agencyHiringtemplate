import siteConfig from '~/config/site.config'
import themeConfig from '~/config/theme.config'
import tradesJson from '~/config/trades.json'
import type { LocaleCode, LocalizedText, Trade, TradesConfig, Industry } from '~/types/config'

const trades = tradesJson as TradesConfig

// Logo lives in assets/brand/ so it is fingerprinted at build; site.config.ts names the file.
const brandAssets = import.meta.glob<string>('../assets/brand/*', { eager: true, query: '?url', import: 'default' })

const tradeIndex = new Map<string, { trade: Trade; industry: Industry }>(
  trades.industries.flatMap((industry) => industry.trades.map((trade) => [trade.id, { trade, industry }] as const)),
)

/** Typed access to config/ plus locale-aware helpers. */
export function useSiteConfig() {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value as LocaleCode)

  /** Pick the current locale's string, falling back to English. */
  function localize(text: LocalizedText): string {
    return text[currentLocale.value] || text.en
  }

  function findTrade(id: string) {
    return tradeIndex.get(id)
  }

  /** wa.me link to the configured number, optionally with a prefilled message. Empty when WhatsApp is not configured. */
  function whatsappUrl(message?: string): string {
    const number = siteConfig.contacts.whatsapp.replace(/\D/g, '')
    if (!number) return ''
    return message ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/${number}`
  }

  function telUrl(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`
  }

  return {
    site: siteConfig,
    theme: themeConfig,
    trades,
    locale: currentLocale,
    logoUrl: brandAssets[`../assets/brand/${siteConfig.brand.logo}`] ?? '',
    localize,
    findTrade,
    whatsappUrl,
    telUrl,
  }
}
