<script scope="module" lang="ts">
	import type { GETBodyReturnTypes } from './[slug]'

	import Block from '../../components/Block.svelte'
	import { format } from '../../utils/date'

	export let blocks: Exclude<GETBodyReturnTypes, Error>['blocks']
	export let title: Exclude<GETBodyReturnTypes, Error>['title']
	export let meta: Exclude<GETBodyReturnTypes, Error>['meta']

	const createdAt = meta.createdAt ? format(meta.createdAt) : undefined
</script>

<h1>
	<div>{title}</div>
	{#if createdAt}
		<div class="createdAt">{createdAt}</div>
	{/if}
</h1>

<div>
	{#each blocks as block}
		<Block {block} {blocks} />
	{/each}
</div>

<style>
	.createdAt {
		margin-bottom: 1em;
		font-size: 1rem;
		font-weight: normal;
		opacity: 0.5;
	}
</style>
