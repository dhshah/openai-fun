<script lang="ts">
	import ChatInput from '$lib/components/ChatInput.svelte';
	import { createStore } from '$lib/store';
	import { onMount } from 'svelte';

	const rap = createStore<string>('rap', '');
	const greeting = createStore<string>('greeting', '');

	async function chat(query: string) {
		const res = await fetch('/rapbot', {
			method: 'POST',
			body: JSON.stringify({ query })
		});

		const chatGptMessage = await res.json();
		rap.set(chatGptMessage.content);
	}

	onMount(async () => {
		if ($greeting == '') {
			const res = await fetch('/vanilla', {
				method: 'POST',
				body: JSON.stringify({
					query: 'Introduce yourself as a rapper named Rapbot and ask for a song suggestion.'
				})
			});
			const json = await res.json();
			greeting.set(json.content);
		}
	});
</script>

<div class="flex flex-col h-full max-h-full p-2">
	<h1 class="text-5xl font-fun text-center">RapBot</h1>
	<div class="grow py-2 overflow-y-auto">
		<div class="h-full w-full flex items-center content-center">
			<p class="text-neutral shrink">{$rap != '' ? $rap : $greeting}</p>
		</div>
	</div>
	<ChatInput onSubmit={chat} />
</div>
