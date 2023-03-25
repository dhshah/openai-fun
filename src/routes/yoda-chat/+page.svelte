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
	<div class="container">
		<button class="clear-button" on:click={clearMessages}>Clear Messages</button>
		<div class="chat">
			<div class="message gpt-message">
				<p style="margin:0">Hello, I am Yoda. Ask me a question below.</p>
			</div>
			{#each $messages.filter((message) => message.role !== 'system') as message}
				<div class={'message ' + (message.role === 'user' ? 'user-message' : 'gpt-message')}>
					<p style="margin:0">{message.content}</p>
				</div>
			{/each}
		</div>
	</div>
</ChatComponent>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: stretch;
	}
	.message {
		border-radius: 10px;
		padding: 10px;
		margin: 10px;
		max-width: 500px;
		background-color: var(--yoda-chat-color);
	}
	.user-message {
		filter: brightness(0.85);
		align-self: flex-end;
		margin-left: 50px;
	}
	.gpt-message {
		align-self: flex-start;
		margin-right: 50px;
	}
	.chat {
		flex: auto;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
	}
	.clear-button {
		top: 10px;
		right: 10px;
		background: var(--warning-color);
		color: var(--warning-text-color);
		border: none;
		padding: 0.2rem;
		border-radius: 2px;
		box-shadow: 0 0 4px 0px white;
		align-self: flex-end;
		margin-right: 10px;
		transition: box-shadow 150ms ease;
	}
	.clear-button:hover {
		box-shadow: 0 0 10px 2px var(--yoda-chat-color);
	}
</style>
