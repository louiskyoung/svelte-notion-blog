<script lang="ts">
	import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
	import RichText from './RichText.svelte'

	export let richTexts: RichTextItemResponse[]
</script>

{#each richTexts as richText}
	<RichText {richText} />
{/each}
