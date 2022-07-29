<script>
	export let italic = false
</script>

{#if italic}
	<em>
		<slot />
	</em>
{:else}
	<slot />
{/if}
