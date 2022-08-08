import type { GETBodyReturnTypes } from 'src/routes/api/pages'
import { writable } from 'svelte/store'
import { slugify } from '../utils/slugify'
import { get } from 'svelte/store'

export const pages = writable<GETBodyReturnTypes['pages']>([])

export const findBySlug = (slug: string) => get(pages).find((page) => slugify(page.title) === slug)
