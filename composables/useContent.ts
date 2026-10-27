import type { ContentMap, ContentPage } from '~/types/content'
import type { LocaleCode } from '~/types/config'

const files = import.meta.glob('../content/*/*.json', { eager: true, import: 'default' })

/** Reactive page content from content/<locale>/<page>.json, falling back to English. */
export function useContent<P extends ContentPage>(page: P) {
  const { locale } = useI18n()
  return computed(() => {
    const code = locale.value as LocaleCode
    return (files[`../content/${code}/${page}.json`] ?? files[`../content/en/${page}.json`]) as ContentMap[P]
  })
}
