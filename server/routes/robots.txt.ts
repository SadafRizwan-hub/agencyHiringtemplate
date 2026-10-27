import siteConfig from '../../config/site.config'

/** Generated (not in public/) so the sitemap URL follows seo.siteUrl. */
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.seo.siteUrl}/sitemap.xml\n`
})
