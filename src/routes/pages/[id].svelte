<script scope="module" lang="ts">
	import type { GETBodyReturnTypes } from './[id]'

	import Block from '../../components/Block.svelte'
	import { format } from '../../utils/date'

	export let blocks: GETBodyReturnTypes['blocks']
	export let title: GETBodyReturnTypes['title']
	export let meta: GETBodyReturnTypes['meta']

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
