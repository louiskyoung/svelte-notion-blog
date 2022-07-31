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
	}
	.row {
		width: 900px;
		background: white;
		padding: 0 1em 1em;
		margin: 1em 0;
		border-radius: 10px;
		box-shadow: 0 0 10px #00000011;
	}
</style>
