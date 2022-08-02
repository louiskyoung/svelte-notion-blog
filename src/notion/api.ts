import { NOTION_DATABASE_ID, NOTION_KEY } from '$env/static/private'

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
