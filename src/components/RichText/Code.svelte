<script>
	export let code = false
</script>

{#if code}
	<code>
		<slot />
	</code>
{:else}
	<slot />
{/if}

<style>
	code {
		background: #ddd;
		padding: 0.25em 0.5em;
	}
</style>
