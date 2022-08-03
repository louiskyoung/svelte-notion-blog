<script scope="module" lang="ts">
	import { pages } from '../stores/pages'
	import { format } from '../utils/date'
</script>

{#if $pages.length > 0}
	<ul class="pages">
		{#each $pages as page}
			<li>
				<a href="/pages/{page.id}" sveltekit:prefetch>
					{page.title}
				</a>
				<div class="createdAt">{format(page.createdAt)}</div>
			</li>
		{/each}
	</ul>
{:else}
	Loading...
{/if}

<style>
	.createdAt {
		opacity: 0.5;
		font-size: small;
	}

	ul.pages {
		margin: 0;
		padding: 1em;
		list-style: none;
	}

	ul.pages li {
		margin-bottom: 1em;
	}

	ul.pages li:last-child {
		margin-bottom: 0;
	}
</style>
