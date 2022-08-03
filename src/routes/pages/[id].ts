import type {
	BlockObjectResponse,
	GetPageResponse,
	PageObjectResponse,
	PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

import type { Page } from '@sveltejs/kit/types/internal'
import type { BlockObjectResponseWithChildren } from '../../notion/api'
import * as notion from '../../notion/api'

export type GETBodyReturnTypes = Awaited<ReturnType<typeof GET>>['body']

export async function GET(props: Page) {
	const { id } = props.params

	const { results } = await notion.getBlockChildren(id)
	const blocks = results as BlockObjectResponse[]

	const promises: [
		Promise<GetPageResponse>,
		Promise<string>,
		Promise<BlockObjectResponseWithChildren[]>
	] = [
		//
		notion.getPage(id),
		notion.getPageTitle(id),
		notion.getBlocksWithResolvedDescendants(blocks),
	]

	const resolved = await Promise.all(promises)

	const page = resolved[0]
	const title = resolved[1]
	const resolvedBlocks = resolved[2] as BlockObjectResponseWithChildren[]

	const meta = isPageObjectResponse(page)
		? {
				createdAt: page.created_time,
				updatedAt: page.last_edited_time,
				cover: page.cover,
				icon: page.icon,
				archived: page.archived,
		  }
		: {}

	return {
		body: {
			blocks: resolvedBlocks,
			meta,
			title,
		},
	}
}

const isPageObjectResponse = (
	object: PageObjectResponse | PartialPageObjectResponse
): object is PageObjectResponse => {
	return 'created_time' in object
}
