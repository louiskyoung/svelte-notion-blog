<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

	import type { GETBodyReturnTypes } from 'src/routes/pages/[id]'
	import { imgProxy } from '../utils/imgProxy'
	import Block from './Block.svelte'
	import RichTexts from './RichTexts.svelte'

	export let blocks: GETBodyReturnTypes['blocks']
	export let block: GETBodyReturnTypes['blocks'][0]

	const isFirstNumberedListItem = (block: Partial<NumberedListItemBlockObjectResponse>) => {
		const index = blocks.findIndex((b) => b.id === block.id)
		return index === 0 || blocks[index - 1].type !== 'numbered_list_item'
	}
</script>

{#if block.type === 'column_list' && Array.isArray(block.column_list)}
	<div class="columns">
		{#each block.column_list as column}
			<div class="column">
				{#each column.column as content}
					<Block block={content} blocks={column.column} />
				{/each}
			</div>
		{/each}
	</div>
{/if}

{#if block.type === 'callout' && block.callout}
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

{#if block.type === 'heading_1' && block.heading_1}
	<h2>
		<RichTexts richTexts={block.heading_1.rich_text} />
	</h2>
{/if}

{#if block.type === 'numbered_list_item' && block.numbered_list_item}
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

{#if block.type === 'paragraph' && block.paragraph}
	<p>
		<RichTexts richTexts={block.paragraph.rich_text} />
	</p>
{/if}

{#if block.type === 'image'}
	{#if block.image?.type === 'file'}
		<figure>
			<img alt={block.image.caption[0]?.plain_text ?? ''} src={imgProxy(block.image.file.url)} />
			{#if block.image.caption[0]?.plain_text}
				<figcaption>{block.image.caption[0].plain_text}</figcaption>
			{/if}
		</figure>
	{/if}
{/if}

{#if block.type === 'code' && block.code}
	<figure>
		<div class="code">
			<div class="language">
				{block.code.language}
			</div>
			<code>
				<RichTexts richTexts={block.code.rich_text} />
			</code>
		</div>

		{#if block.code.caption[0]?.plain_text}
			<figcaption>
				{block.code.caption[0].plain_text}
			</figcaption>
		{/if}
	</figure>
{/if}

<style>
	.callout {
		background: #eee;
		padding: 1em;
	}
	figure {
		margin: 0;
	}

	figcaption {
		opacity: 75%;
		text-align: center;
	}

	figure {
		max-width: 100%;
	}

	img {
		max-width: 100%;
	}

	.code {
		background: #00000010;
		padding: 1em;
		position: relative;
		border-radius: 10px;
	}
	.code .language {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		font-family: monospace;
		color: #000000a4;
		font-size: smaller;
	}

	.code code {
		font-family: monospace;
		font-size: small;
		white-space: pre;
	}

	.columns {
		display: flex;
		justify-content: space-around;
		gap: 10px;
	}

	.columns > .column {
		flex: 1;
	}
</style>
