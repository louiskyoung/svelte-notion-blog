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
		margin-top: 1em;
	}
	.row {
		width: 500px;
		background: white;
		padding: 1em;
		border-radius: 10px;
		box-shadow: 0 0 10px #00000011;
	}
</style>
