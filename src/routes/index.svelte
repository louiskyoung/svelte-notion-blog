<script scope="module" lang="ts">
	import { pages } from '../stores/pages'
</script>

{#if $pages.length > 0}
	{#each $pages as page}
		<li>
			<a href="/pages/{page.id}" sveltekit:prefetch>
				{page.title}
			</a>
			| {page.createdAt}
		</li>
	{/each}
{:else}
	Loading...
{/if}
