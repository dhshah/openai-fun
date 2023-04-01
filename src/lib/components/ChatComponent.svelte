<script lang="ts">
	import { onMount } from 'svelte';

	export let chatTitle: string;
	export let onTrigger: (query: string) => void;

	let value: string;
	let inputBox: HTMLInputElement;

	let chatting: boolean;
	async function handleKeydown(e: any) {
		if (e.key === 'Enter') {
			chatting = true;
			let val = (' ' + value).slice(1);
			value = '';
			await onTrigger(val);
			chatting = false;
		}
	}

	onMount(() => {
		inputBox.focus();
	});
</script>

<div class="flex flex-col h-full p-2">
	<h1 class="text-neutral text-5xl font-fun text-center">{chatTitle}</h1>
	<div class="grow py-2">
		<slot />
	</div>
	<input
		bind:this={inputBox}
		on:blur={() => inputBox.focus()}
		disabled={chatting}
		bind:value
		on:keydown={handleKeydown}
		class={'input input-ghost input-bordered input-lg w-full'}
	/>
</div>
