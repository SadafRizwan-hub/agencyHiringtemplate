<script setup lang="ts">
import { navItems } from '~/shared/routes'

const { t } = useI18n()
const { site, localize, telUrl, whatsappUrl } = useSiteConfig()
const common = useContent('common')
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 border-t border-muted">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
      <div class="flex flex-col gap-2">
        <p class="font-semibold">{{ localize(site.brand.name) }}</p>
        <p class="text-sm text-muted">{{ localize(site.brand.tagline) }}</p>
        <p class="text-sm text-muted">{{ common.footer.about }}</p>
      </div>

      <nav :aria-label="t('nav.footer')">
        <ul class="flex flex-col gap-2">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLinkLocale :to="item.path">{{ t(item.labelKey) }}</NuxtLinkLocale>
          </li>
          <li><NuxtLinkLocale to="/request">{{ t('nav.request') }}</NuxtLinkLocale></li>
        </ul>
      </nav>

      <address class="flex flex-col gap-2 not-italic">
        <a :href="`mailto:${site.contacts.email}`">{{ t('contact.email') }}: <span dir="ltr">{{ site.contacts.email }}</span></a>
        <a :href="telUrl(site.contacts.phone)">{{ t('contact.phone') }}: <span dir="ltr">{{ site.contacts.phone }}</span></a>
        <a v-if="whatsappUrl()" :href="whatsappUrl()" target="_blank" rel="noopener">{{ t('contact.whatsapp') }}</a>
      </address>

      <div v-if="site.contacts.offices.length">
        <p class="font-semibold">{{ t('contact.offices') }}</p>
        <ul class="mt-2 flex flex-col gap-2 text-sm">
          <li v-for="office in site.contacts.offices" :key="office.phone">
            {{ localize(office.city) }}, {{ localize(office.country) }}
            <br>
            <a :href="telUrl(office.phone)" dir="ltr">{{ office.phone }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted">
      © {{ year }} {{ localize(site.brand.name) }}. {{ t('footer.rights') }}
    </p>
  </footer>
</template>
