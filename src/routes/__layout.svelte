<script scope="module" lang="ts">
	import { page } from '$app/stores'
	import { pages } from '../stores/pages'

	fetch(`${$page.url.origin}/api/pages`)
		.then((res) => res.json())
		.then((res) => ($pages = res.pages))
</script>

<div class="container">
	<div class="row">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		background: #eee;
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 1em 0;
	}
	.row {
		width: 500px;
		background: white;
		padding: 1em;
		border-radius: 10px;
		box-shadow: 0 0 10px #00000011;
	}
</style>
