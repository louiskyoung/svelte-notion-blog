<script scope="module" lang="ts">
	import type { GETBodyReturnTypes } from './index'

	export let pages: GETBodyReturnTypes['pages']
</script>

{#each pages as page}
	<li>
		<a href="/pages/{page.id}">
			{page.title}
		</a>
		| {page.createdAt}
	</li>
{/each}
