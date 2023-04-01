<script lang="ts">
	import ChatComponent from '$lib/components/ChatComponent.svelte';
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

<ChatComponent chatTitle={'Rapbot'} onTrigger={chat}>
	<div class="h-full w-full flex items-center content-center">
		<p class="shrink">{$rap != '' ? $rap : $greeting}</p>
	</div>
</ChatComponent>
