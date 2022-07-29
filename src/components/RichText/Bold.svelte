<script>
	export let bold = false
</script>

{#if bold}
	<b>
		<slot />
	</b>
{:else}
	<slot />
{/if}
