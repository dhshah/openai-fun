<script lang="ts">
	import { onMount } from 'svelte';

	export let disabled: boolean = false;
	export let value: string = '';
	export let onTrigger: () => void = () => {};
	let inputBox: HTMLInputElement;
	function handleUpdate(e: any) {
		value = e.target.value;
	}

	async function handleKeydown(e: any) {
		if (e.key === 'Enter') {
			onTrigger();
		}
	}

	onMount(() => {
		inputBox.focus();
	});
</script>

<div class="input-container">
	<input
		bind:this={inputBox}
		on:blur={() => inputBox.focus()}
		{disabled}
		{value}
		on:keydown={handleKeydown}
		on:input={handleUpdate}
	/>
</div>

<style>
	.input-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.input-container > input:focus {
		outline: none;
	}
	.input-container > input {
		caret-color: var(--bg-secondary);
		caret-shape: bar;
		box-sizing: border-box;
		flex-grow: 1;
		border: 3px solid var(--bg-secondary);
		padding: 5px 10px;
		background: var(--bg-primary);
		border-radius: var(--size-radius);
		color: white;
	}
	.input-container > input:disabled {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
