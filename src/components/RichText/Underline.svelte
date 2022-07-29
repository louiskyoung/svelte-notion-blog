<script>
	export let underline = false
</script>

{#if underline}
	<u>
		<slot />
	</u>
{:else}
	<slot />
{/if}
