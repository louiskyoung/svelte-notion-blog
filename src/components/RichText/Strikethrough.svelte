<script>
	export let strikethrough = false
</script>

{#if strikethrough}
	<del>
		<slot />
	</del>
{:else}
	<slot />
{/if}
