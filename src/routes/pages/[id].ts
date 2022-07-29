import type {
	BlockObjectResponse,
	PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

import type { Page } from '@sveltejs/kit/types/internal'
import * as notion from '../../notion/api'

export type GETBodyReturnTypes = Awaited<ReturnType<typeof GET>>['body']

export async function GET(props: Page) {
	const { id } = props.params

	const { results: blocks } = await notion.getPageBlocks(id)

	const pageObjectResponse = (await notion.getPage(id)) as PageObjectResponse
	const meta = {
		createdAt: pageObjectResponse.created_time,
		updatedAt: pageObjectResponse.last_edited_time,
		cover: pageObjectResponse.cover,
		icon: pageObjectResponse.icon,
		archived: pageObjectResponse.archived,
	}

	const title = await notion.getPageTitle(id)

	return {
		body: {
			blocks: blocks as BlockObjectResponse[],
			meta,
			title,
		},
	}
}
