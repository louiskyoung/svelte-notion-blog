<script scope="module" lang="ts">
	import Block from '../../components/Block.svelte'
	import type { GETBodyReturnTypes } from './[id]'

	export let blocks: GETBodyReturnTypes['blocks']
	export let title: GETBodyReturnTypes['title']
	export let meta: GETBodyReturnTypes['meta']
</script>

<h1>{title}</h1>
<div>{meta.createdAt}</div>

<div>
	{#each blocks as block}
		<Block {block} {blocks} />
	{/each}
</div>
