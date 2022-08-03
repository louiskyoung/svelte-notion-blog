type DateArg = ConstructorParameters<typeof Date>[0]

export const format = (date: DateArg) =>
	new Date(date).toLocaleDateString('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
