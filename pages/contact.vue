<script setup lang="ts">
const content = useContent('contact')
const { t } = useI18n()
const { site, localize, telUrl, whatsappUrl } = useSiteConfig()

usePageSeo(() => content.value.seo)
</script>

<template>
  <div>
    <HeroSection :title="content.hero.title" :subtitle="content.hero.subtitle" />

    <BaseSection id="channels" :title="content.channels.title">
      <dl class="grid gap-4 sm:grid-cols-3">
        <BaseCard as="div">
          <dt class="font-semibold">{{ t('contact.email') }}</dt>
          <dd><a :href="`mailto:${site.contacts.email}`" dir="ltr">{{ site.contacts.email }}</a></dd>
        </BaseCard>
        <BaseCard as="div">
          <dt class="font-semibold">{{ t('contact.phone') }}</dt>
          <dd><a :href="telUrl(site.contacts.phone)" dir="ltr">{{ site.contacts.phone }}</a></dd>
        </BaseCard>
        <BaseCard v-if="whatsappUrl()" as="div">
          <dt class="font-semibold">{{ t('contact.whatsapp') }}</dt>
          <dd><a :href="whatsappUrl()" target="_blank" rel="noopener" dir="ltr">+{{ site.contacts.whatsapp }}</a></dd>
        </BaseCard>
      </dl>
    </BaseSection>

    <BaseSection v-if="site.contacts.offices.length" id="offices" :title="content.offices.title">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="office in site.contacts.offices" :key="office.phone">
          <BaseCard :title="localize(office.city)" as="div">
            <p class="text-muted">{{ localize(office.country) }}</p>
            <a :href="telUrl(office.phone)" dir="ltr">{{ office.phone }}</a>
          </BaseCard>
        </li>
      </ul>
    </BaseSection>

    <CtaBanner :title="content.request.title" :body="content.request.body" :button="content.request.button" to="/request" />
  </div>
</template>
