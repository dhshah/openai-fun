<script lang="ts">
	import ChatComponent from '$lib/components/ChatComponent.svelte';
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

<ChatComponent chatTitle={'Sassy Yoda'} onTrigger={chat}>
	<div class="max-h-full flex flex-col">
		<button class="btn btn-warning self-end mb-1" on:click={clearMessages}>Clear Messages</button>
		<div class="max-h-full overflow-auto">
			<div class="grow flex flex-col justify-end">
				<div class="chat chat-start">
					<p class="chat-bubble bg-primary text-primary-content">
						Hello, I am Yoda. Ask me a question below.
					</p>
				</div>
				{#each $messages.filter((message) => message.role !== 'system') as message}
					<div class={'chat ' + (message.role === 'user' ? 'chat-end' : 'chat-start')}>
						<p
							class={'chat-bubble ' +
								(message.role === 'user'
									? 'bg-ghost text-ghost-content'
									: 'bg-primary text-primary-content')}
						>
							{message.content}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</ChatComponent>
