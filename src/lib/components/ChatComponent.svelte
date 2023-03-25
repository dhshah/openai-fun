<script lang="ts">
	import FocussedInput from '$lib/components/FocussedInput.svelte';

	export let chatTitle: string;
	export let onTrigger: (query: string) => void;

	let value: string;

	let chatting: boolean;

	async function performAction() {
		chatting = true;
		let val = (' ' + value).slice(1);
		value = '';
		await onTrigger(val);
		chatting = false;
	}
</script>

<div class="container">
	<h1>{chatTitle}</h1>
	<div class="content">
		<slot />
	</div>
	<FocussedInput bind:value disabled={chatting} onTrigger={performAction} />
</div>

<style>
	.container {
		height: 100vh;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		flex-direction: column;
	}

	.container > h1 {
		font-family: AnakCute;
		text-align: center;
		margin-top: 10px;
		font-size: 2em;
	}
	.container > .content {
		flex: 1;
		padding: 5px;
	}
</style>
