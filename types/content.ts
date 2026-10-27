/**
 * Content shapes are inferred from the English JSON files.
 * Every other locale must mirror the same keys.
 */
import type about from '../content/en/about.json'
import type common from '../content/en/common.json'
import type contact from '../content/en/contact.json'
import type home from '../content/en/home.json'
import type request from '../content/en/request.json'
import type services from '../content/en/services.json'

export interface ContentMap {
  about: typeof about
  common: typeof common
  contact: typeof contact
  home: typeof home
  request: typeof request
  services: typeof services
}

export type ContentPage = keyof ContentMap

export interface PageSeo {
  title: string
  description: string
}
