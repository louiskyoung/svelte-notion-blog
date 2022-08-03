export const format = (date: ConstructorParameters<typeof Date>[0]) =>
	new Date(date).toLocaleDateString('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
