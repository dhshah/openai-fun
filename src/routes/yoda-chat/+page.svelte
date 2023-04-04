<script lang="ts">
	import ChatInput from '$lib/components/ChatInput.svelte';
	import { createStore } from '$lib/store';
	interface ChatMessage {
		role: string;
		content: string;
	}

	const messages = createStore<ChatMessage[]>('messages', []);

	async function chat(query: string) {
		messages.update((currentMessages: ChatMessage[]) => [
			...currentMessages,
			{ role: 'user', content: query }
		]);

		const res = await fetch('/yoda-chat', {
			method: 'POST',
			body: JSON.stringify({ messages: $messages })
		});

		const chatGptMessage = await res.json();

		messages.update((currentMessages: ChatMessage[]) => [...currentMessages, chatGptMessage]);
	}

	async function clearMessages() {
		messages.set([]);
	}
</script>

<h1 class="text-5xl font-fun text-center">Sassy Yoda</h1>
<div class="flex flex-col mx-auto">
	<button class="btn btn-warning self-end mb-1" on:click={clearMessages}>Clear Messages</button>
	<div class="grow bg-base-100 md:border-4 md:rounded-2xl h-[calc(100vh-11rem)] overflow-auto">
		<div class="p-4 flex flex-col justify-end min-h-full">
			<div class="chat chat-start">
				<p class="chat-bubble bg-accent text-accent-content">
					Hello, I am Yoda. Ask me a question below.
				</p>
			</div>
			{#each $messages.filter((message) => message.role !== 'system') as message}
				<div class={'chat ' + (message.role === 'user' ? 'chat-end' : 'chat-start')}>
					<p
						class={'chat-bubble ' +
							(message.role === 'user'
								? 'bg-ghost text-ghost-content'
								: 'bg-accent text-accent-content')}
					>
						{message.content}
					</p>
				</div>
			{/each}
			<ChatInput color="accent-content" onSubmit={chat} />
		</div>
	</div>
</div>
