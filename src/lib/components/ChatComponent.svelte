<script lang="ts">
	import { onMount } from 'svelte';

	export let chatTitle: string;
	export let onTrigger: (query: string) => void;

	let value: string;
	let inputBox: HTMLInputElement;

	let chatting: boolean;

	async function chat() {
		chatting = true;
		let val = (' ' + value).slice(1);
		value = '';
		await onTrigger(val);
		chatting = false;
	}

	async function handleKeydown(e: any) {
		if (e.key === 'Enter') {
			await chat();
		}
	}

	onMount(() => {
		inputBox.focus();
	});
</script>

<div class="flex flex-col h-full p-2">
	<h1 class="text-5xl font-fun text-center">{chatTitle}</h1>
	<div class="grow py-2">
		<slot />
	</div>
	<div class="form-control">
		<div class="input-group input-group-lg">
			<input
				bind:this={inputBox}
				disabled={chatting}
				bind:value
				on:keydown={handleKeydown}
				class={'input w-full'}
			/>
			<button class="btn btn-square" on:click={chat}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
