import type { GETBodyReturnTypes } from 'src/routes/api/pages'
import { writable } from 'svelte/store'

export const pages = writable<GETBodyReturnTypes['pages']>([])
