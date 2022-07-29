<script lang="ts">
	import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

	import Bold from './RichText/Bold.svelte'
	import Code from './RichText/Code.svelte'
	import Italic from './RichText/Italic.svelte'
	import Strikethrough from './RichText/Strikethrough.svelte'
	import Underline from './RichText/Underline.svelte'

	export let richText: RichTextItemResponse

	const { bold, italic, strikethrough, underline, code } = richText.annotations
</script>

<Underline {underline}>
	<Bold {bold}>
		<Code {code}>
			<Italic {italic}>
				<Strikethrough {strikethrough}>
					{richText.plain_text}
				</Strikethrough>
			</Italic>
		</Code>
	</Bold>
</Underline>
