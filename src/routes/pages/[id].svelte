<script scope="module" lang="ts">
	import Block from '../../components/Block.svelte'
	import type { GETBodyReturnTypes } from './[id]'

	export let blocks: GETBodyReturnTypes['blocks']
	export let title: GETBodyReturnTypes['title']
	export let meta: GETBodyReturnTypes['meta']
</script>

<h1>
	<div>{title}</div>
	<div class="meta">{meta.createdAt}</div>
</h1>

<div>
	{#each blocks as block}
		<Block {block} {blocks} />
	{/each}
</div>

<style>
	.meta {
		margin-bottom: 1em;
		font-size: 1rem;
		font-weight: normal;
		opacity: 0.5;
	}
</style>
