import { NOTION_DATABASE_ID, NOTION_KEY } from '$env/static/private'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { Client } from '@notionhq/client'
import type {
	GetBlockParameters,
	GetPageParameters,
	TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

const client = new Client({ auth: NOTION_KEY })

// DB ------------

export async function queryDb() {
	try {
		const response = await client.databases.query({
			database_id: NOTION_DATABASE_ID,
		})
		return response
	} catch (error) {
		console.error(error)
	}
}

// PAGE ----------

export const getPageTitle = async (page_id: string) => {
	const titleProperties = await client.pages.properties.retrieve({
		page_id,
		property_id: 'Name',
	})

	if (
		titleProperties?.type !== 'property_item' ||
		titleProperties.object !== 'list' ||
		titleProperties.results.length === 0
	)
		return 'Untitled'

	return (titleProperties.results[0] as TitlePropertyItemObjectResponse).title.plain_text
}

export async function getPage(pageId: GetPageParameters['page_id']) {
	const response = await client.pages.retrieve({ page_id: pageId })
	return response
}

// BLOCK ---------

export async function getBlockChildren(block_id: GetBlockParameters['block_id']) {
	const response = await client.blocks.children.list({
		block_id,
		page_size: 50,
	})
	return response
}

export const getBlocksWithResolvedDescendants = async (
	blocks: BlockObjectResponse[],
	terse = true
) => {
	const input = terse ? makeTerse(blocks) : blocks

	const promises: Promise<Partial<BlockObjectResponse>>[] = input.map(async (block) => {
		if (!block.has_children) return block
		const children = await getBlockChildren(block.id)
		const results = children.results as BlockObjectResponse[]
		return { ...block, [block.type]: await getBlocksWithResolvedDescendants(results) }
	})

	return Promise.all(promises)
}

const makeTerse = (blocks: BlockObjectResponse[]) =>
	blocks
		.map(
			({
				/* eslint-disable @typescript-eslint/no-unused-vars*/
				parent,
				last_edited_time,
				last_edited_by,
				archived,
				created_time,
				created_by,
				/* eslint-enable @typescript-eslint/no-unused-vars*/
				...rest
			}) => ({ ...rest, has_children: rest.has_children || undefined })
		)
		.filter((e) => e)
