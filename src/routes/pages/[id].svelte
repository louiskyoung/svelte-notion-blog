<script scope="module" lang="ts">
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
	import type { GETBodyReturnTypes } from './[id]'
	import RichTexts from '../../components/RichTexts.svelte'

	export let blocks: GETBodyReturnTypes['blocks']
	export let title: GETBodyReturnTypes['title']
	export let meta: GETBodyReturnTypes['meta']

	const isFirstNumberedListItem = (block: BlockObjectResponse) => {
		const index = blocks.findIndex((b) => b.id === block.id)
		return index === 0 || blocks[index - 1].type !== 'numbered_list_item'
	}
</script>

<h1>{title}</h1>
<div>{meta.createdAt}</div>
<div>
	{#each blocks as block}
		{#if block.type === 'callout'}
			<div class="callout">
				{#if block.callout.icon?.type === 'emoji'}
					{block.callout.icon.emoji}
				{/if}
				<RichTexts richTexts={block.callout.rich_text} />
			</div>
		{/if}

		{#if block.type === 'divider'}
			<hr />
		{/if}

		{#if block.type === 'heading_1'}
			<h2>
				<RichTexts richTexts={block.heading_1.rich_text} />
			</h2>
		{/if}

		{#if block.type === 'numbered_list_item'}
			{#if isFirstNumberedListItem(block)}
				<li type="1" value="1">
					<RichTexts richTexts={block.numbered_list_item.rich_text} />
				</li>
			{:else}
				<li type="1">
					<RichTexts richTexts={block.numbered_list_item.rich_text} />
				</li>
			{/if}
		{/if}

		{#if block.type === 'paragraph' && block.paragraph.rich_text.length > 0}
			<p>
				<RichTexts richTexts={block.paragraph.rich_text} />
			</p>
		{/if}
	{/each}
</div>

<style>
	.callout {
		background: #eee;
		padding: 1em;
	}
</style>
