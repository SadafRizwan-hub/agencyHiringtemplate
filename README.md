# Manpower agency website template

A config-driven, bilingual (English / Arabic, RTL) marketing site for Gulf manpower and recruitment agencies. One codebase, re-branded per client by editing **config, content and assets only**.

The site is aimed at employers. Its job is to turn hiring managers into "Request talent" enquiries through a 4-step wizard. There is no backend: the form posts to [Web3Forms](https://web3forms.com), and a prefilled WhatsApp link is offered as a fallback.

> **Status:** structure only. Components are semantic, lightly spaced shells with no visual design yet.

## Stack

- Nuxt 4, Vue 3 Composition API, TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- `@nuxtjs/i18n` (EN default at `/`, AR at `/ar`, `prefix_except_default`)
- Static output (`nuxt generate`) for Cloudflare Pages

## Getting started

Requires Node 22 LTS or 24+ (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # vue-tsc
npm run generate   # static site in .output/public
npx serve .output/public   # preview the static build
```

## Project structure

```
config/
  site.config.ts     brand, contacts, offices, countries, feature flags, form, SEO, analytics
  theme.config.ts    colour tokens, fonts, radius scale
  trades.json        industries -> trades (en + ar names, skill level)
content/<locale>/    page copy: home, services, about, contact, request, common
i18n/
  locales.ts         locale list (code, language, name, dir)
  locales/*.json     UI strings (navigation, form labels, validation, a11y)
  i18n.config.ts     vue-i18n options
assets/
  css/main.css       Tailwind entry; maps --brand-* variables to Tailwind tokens
  brand/             logo (file name set in site.config.ts)
public/              favicon, og-image
components/
  layout/            SiteHeader, SiteFooter, MobileMenu, LanguageSwitch, WhatsAppButton
  sections/          HeroSection, ServiceList, IndustryGrid, WhyUsList, CtaBanner
  request/           RequestWizard, TradePicker, StepIndicator
  ui/                BaseButton, BaseSection, BaseCard, FormField
composables/
  useSiteConfig.ts   typed config access + localize(), whatsappUrl(), telUrl()
  useContent.ts      reactive content/<locale>/<page>.json
  useRequestForm.ts  wizard state, validation, submit, WhatsApp link
  usePageSeo.ts      per-page title/description
pages/               index, services, about, contact, request
layouts/default.vue
plugins/head.ts      injects theme CSS variables, favicon, analytics
server/routes/       sitemap.xml and robots.txt (prerendered from config)
shared/routes.ts     page list + nav items (structure, not client data)
types/               config and content types
```

### Where things live

| Kind of value | Location |
|---|---|
| Brand name, phone, email, WhatsApp, offices, countries | `config/site.config.ts` |
| Colours, fonts, radius | `config/theme.config.ts` |
| Industries and trades | `config/trades.json` |
| Marketing copy (headings, paragraphs, CTAs, SEO title/description) | `content/<locale>/*.json` |
| Interface text (nav labels, form labels, errors) | `i18n/locales/<locale>.json` |
| Logo | `assets/brand/` |
| Favicon, social share image | `public/` |

### Conventions

1. No client values in `components/`, `pages/` or `layouts/`: no brand names, contacts, colours, trades or copy.
2. Use logical Tailwind utilities only (`ps-`, `pe-`, `ms-`, `me-`, `start-`/`end-`, `text-start`, `text-end`). Never `pl-`, `mr-`, `left-`, `text-left`, etc. RTL then works with no extra CSS.
3. Colours come only from theme tokens: `bg-primary`, `text-primary-contrast`, `bg-accent`, `bg-surface`, `text-text`, `text-muted`, `border-muted`, `rounded-sm|md|lg|full`.
4. All visible text goes through `t()` (interface) or `useContent()` (copy).

Quick check:

```bash
grep -rnE '#[0-9a-fA-F]{3,8}\b|example\.com|\+971' components pages layouts   # should print nothing
grep -rnoE '\b(pl|pr|ml|mr|left|right|text-left|text-right)-' components pages layouts   # should print nothing
```

## Re-skinning for a new client (checklist)

- [ ] **`config/site.config.ts`**
  - [ ] `brand`: name and tagline (EN + AR), logo file name, favicon path
  - [ ] `contacts`: email, phone, WhatsApp (digits only, international, no `+`), offices
  - [ ] `countries`: destination countries (wizard dropdown, About page) and source countries (About page)
  - [ ] `features`: switch industries / why-us sections, Arabic, WhatsApp button
  - [ ] `form.accessKey`: the client's Web3Forms access key (create one at web3forms.com with the client's inbox email)
  - [ ] `form.successRedirect`: leave `''` for the inline success message, or set a path such as `/thank-you` (you would need to add that page)
  - [ ] `seo.siteUrl`: production URL with no trailing slash. Used for canonical, hreflang, sitemap, robots and og:image.
  - [ ] `seo.defaultTitle` / `defaultDescription`
  - [ ] `analytics`: `none`, `plausible` (id = domain) or `ga4` (id = `G-XXXX`)
- [ ] **`config/theme.config.ts`**: colours, font stacks for Latin and Arabic, radius
- [ ] **`config/trades.json`**: the industries and trades the client supplies
- [ ] **`content/en/*.json` and `content/ar/*.json`**: rewrite all copy (every file currently says "Placeholder")
- [ ] **`assets/brand/`**: replace `logo.svg` (or add a new file and update `brand.logo`)
- [ ] **`public/`**: replace `favicon.svg` and `og-image.png` (1200×630)
- [ ] If the client's fonts are web fonts, load them: add a `link` in `plugins/head.ts` or self-host in `assets/`, then reference the family in `theme.config.ts`
- [ ] `npm run typecheck && npm run generate`, then click through `/` and `/ar`
- [ ] Submit a test request and confirm it reaches the client's inbox

## Adding a trade

Edit `config/trades.json`. Add an object to the `trades` array of the right industry:

```json
{ "id": "scaffolder", "name": { "en": "Scaffolder", "ar": "عامل سقالات" }, "skillLevel": "skilled" }
```

- `id` must be unique across all industries. It is the value stored in the form.
- `skillLevel` is one of `unskilled`, `semi-skilled`, `skilled`, `professional`.
- To add an industry, add `{ "id", "name": { "en", "ar" }, "trades": [...] }` to `industries`.

The trade then appears in the home page industry grid and in the wizard's trade picker, grouped by industry.

## Adding a language

Example: French (`fr`).

1. **Type**: in `types/config.ts`, extend `LocaleCode` to `'en' | 'ar' | 'fr'`. TypeScript will then flag every `LocalizedText` in `site.config.ts` that is missing `fr`.
2. **Locale entry**: in `i18n/locales.ts`, add `{ code: 'fr', language: 'fr', name: 'Français', dir: 'ltr', file: 'fr.json' }` to `allLocales`.
3. **UI strings**: copy `i18n/locales/en.json` to `fr.json` and translate it.
4. **Content**: copy `content/en/` to `content/fr/` and translate it. Any missing file falls back to English.
5. **Config strings**: add `fr` to every `{ en, ar }` object in `config/site.config.ts` and `config/trades.json`. Missing values fall back to English at runtime.
6. **Fonts** (only if the script needs its own font): add a CSS rule in `assets/css/main.css`, for example `:root[lang="ur"] { --brand-font: ... }`.
7. Run `npm run generate`. Routes are prefixed (`/fr/...`) and are added to prerendering, the sitemap and hreflang automatically.

To ship a site in English only, set `features.enableArabic: false`.

## Request wizard

`components/request/RequestWizard.vue`, with state in `composables/useRequestForm.ts`.

| Step | Fields | Validation |
|---|---|---|
| `trades` | one or more trade + headcount lines | trade required, headcount a whole number from 1 to 9999 |
| `job` | destination country, contract type, start date | all required, date must be today or later |
| `company` | company, contact name, email, phone, notes | all except notes required, email and phone format |
| `review` | read-only summary with Edit links | every step is re-validated before submit |

- **Order**: `features.wizardSteps` sets the step order. Keep `company` and `review`; only steps that are listed are validated.
- **Submit**: JSON `POST` to `form.endpoint` with `access_key`, `subject`, `from_name`, `email`, `phone`, `company`, `trades`, `destination`, `contract_type`, `start_date`, `notes`, `locale`. Trade and country names are sent in English, so the agency inbox reads the same whichever language the visitor used.
- **Honeypot**: a hidden `website` field. If it is filled, the form shows success without sending anything.
- **WhatsApp fallback**: on the review step (and after a failed submit), "Send via WhatsApp instead" opens `wa.me/<number>?text=...`, prefilled with the summary in the visitor's language.

## SEO

- Each page sets its title and description from `content/<locale>/<page>.json` (`seo` key) through `usePageSeo`.
- `app.vue` sets `<html lang dir>`, the canonical link, hreflang alternates (including `x-default`), `og:locale` and the default Open Graph tags through `useLocaleHead`.
- `/sitemap.xml` and `/robots.txt` are generated from `seo.siteUrl` (`server/routes/`) and prerendered as static files.

## Deploying to Cloudflare Pages

1. Push the repo to GitHub or GitLab.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then choose the repo.
3. Build settings:
   - Framework preset: **Nuxt.js** (or None)
   - Build command: `npm run generate`
   - Build output directory: `.output/public`
   - Environment variable: `NODE_VERSION` = `22` (Cloudflare also reads `.nvmrc`)
4. Deploy, then add the client's custom domain under **Custom domains**.
5. Make sure `seo.siteUrl` matches the final domain, then redeploy so that canonical URLs and the sitemap are correct.

Direct upload without Git: `npm run generate && npx wrangler pages deploy .output/public --project-name <name>`.

## Out of scope (v1)

Backend, database, auth, CMS, admin, candidate forms, job listings, tracking page, payments, animation libraries.
