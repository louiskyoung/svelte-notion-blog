import type {
	PageObjectResponse,
	PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import * as notion from '../notion/api'

export type GETBodyReturnTypes = Awaited<ReturnType<typeof GET>>['body']

export async function GET() {
	const response = await notion.queryDb()

	if (!response) {
		console.error('Notion DB not found')
		return { body: { pages: [] } }
	}

	const promises = response.results.map(async (page) => {
		if (!isPageObjectResponse(page)) throw new Error('"page" should be a PageObjectResponse')

		const title = await notion.getPageTitle(page.id)

		return {
			id: page.id,
			archived: page.archived,
			cover: page.cover,
			icon: page.icon,
			title,
			createdAt: page.created_time,
			updatedAt: page.last_edited_time,
		}
	})

	const pages = await Promise.all(promises)
	const result = { body: { pages } }
	return result
}

const isPageObjectResponse = (
	page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse => page.object === 'page'
