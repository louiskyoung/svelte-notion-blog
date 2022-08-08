import { slugify } from './slugify'
import { describe, expect, it } from 'vitest'

describe.concurrent('slugify(string)', () => {
	it('collapses spaces, dashes, underscores', () => {
		const actual = slugify('---a__b  c-_-d')
		const expected = 'a-b-c-d'
		expect(expected).toEqual(actual)
	})

	it('removes accents and diacritics', () => {
		const actual = slugify('Journée à la rivière avec Sébastien?')
		const expected = 'journee-a-la-riviere-avec-sebastien'
		expect(expected).toEqual(actual)
	})

	it('handles text in French', () => {
		const actual = slugify(
			'. Que de fois ne désira-t-il pas voir survenir à Mme de Rênal quelque affaire qui l’obligeât de rentrer à la maison et de quitter le jardin !'
		)
		const expected =
			'que-de-fois-ne-desira-t-il-pas-voir-survenir-a-mme-de-renal-quelque-affaire-qui-lobligeat-de-rentrer-a-la-maison-et-de-quitter-le-jardin'
		expect(expected).toEqual(actual)
	})
})
