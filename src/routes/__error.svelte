<script context="module" lang="ts">
	import { page } from '$app/stores'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = ({ error, status }) => ({ props: { error, status } })
</script>

<script lang="ts">
	export let status: number
	export let error: Error & { frame?: string } & { loc?: object }
</script>

<h2>Error {status}</h2>

<div class="error">
	<p>
		<span>{error.message}</span>{#if status === 404}: "{$page.url.pathname}"{/if}
	</p>
</div>

<style>
	h2,
	.error {
		text-align: center;
	}
</style>
