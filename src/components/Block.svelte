<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
	import type { BlockObjectResponseWithChildren } from 'src/notion/api'

	import { imgProxy } from '../utils/imgProxy'
	import Block from './Block.svelte'
	import RichTexts from './RichTexts.svelte'

	export let block: BlockObjectResponseWithChildren
	export let blocks: typeof block[]

	const isFirstNumberedListItem = (block: Partial<NumberedListItemBlockObjectResponse>) => {
		const index = blocks.findIndex((b) => b.id === block.id)
		return index === 0 || blocks[index - 1].type !== 'numbered_list_item'
	}
</script>

{#if block.type === 'toggle' && Array.isArray(block.children)}
	<details>
		<summary>
			<RichTexts richTexts={block.toggle.rich_text} />
		</summary>

		<div class="content">
			{#each block.children as content}
				<Block block={content} blocks={block.children} />
			{/each}
		</div>
	</details>
{/if}

{#if block.type === 'column_list' && Array.isArray(block.children)}
	<div class="columns">
		{#each block.children as column}
			{#if column.children}
				<div class="column">
					{#each column.children as content}
						<Block block={content} blocks={column.children} />
					{/each}
				</div>
			{/if}
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

{#if block.type === 'heading_2' && block.heading_2}
	<h3>
		<RichTexts richTexts={block.heading_2.rich_text} />
	</h3>
{/if}

{#if block.type === 'heading_3' && block.heading_3}
	<h4>
		<RichTexts richTexts={block.heading_3.rich_text} />
	</h4>
{/if}

{#if block.type === 'bulleted_list_item' && block.bulleted_list_item}
	<li>
		<RichTexts richTexts={block.bulleted_list_item.rich_text} />
	</li>
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
	details {
		padding: 0;
	}

	details .content {
		padding: 0 0.75em;
		margin-left: 0.3em;
		border-left: 1px solid #00000030;
	}

	details .content > :global(*) {
		margin: 0.5em 0;
	}

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
