<script lang="ts">
	import FocussedInput from '$lib/components/FocussedInput.svelte';
	import { onMount } from 'svelte';
	import { messages, reset } from '../../stores/messages';
	interface ChatMessage {
		role: string;
		content: string;
		image?: string;
	}

	let chatting = false;
	let newMessage: string;

	async function chat() {
		chatting = true;
		console.log('chatting');
		messages.update((currentMessages: ChatMessage[]) => [
			...currentMessages,
			{ role: 'user', content: newMessage }
		]);

		const res = await fetch('/yoda-chat', {
			method: 'POST',
			body: JSON.stringify({ messages: $messages })
		});

		const chatGptMessage = await res.json();
		console.log(chatGptMessage);

		messages.update((currentMessages: ChatMessage[]) => [...currentMessages, chatGptMessage]);
		chatting = false;
	}

	async function clearMessages() {
		reset();
	}
</script>

<div class="container">
	<h1>Sarcastic & Funny Yoda Bot</h1>
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
	<FocussedInput bind:value={newMessage} disabled={chatting} onTrigger={chat} />
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.message {
		border-radius: 10px;
		padding: 10px;
		margin: 10px;
		width: 50%;
	}
	.user-message {
		background-color: rgba(244, 144, 144, 0.75);
		align-self: flex-end;
	}
	.gpt-message {
		background-color: #f59090;
		align-self: flex-start;
	}
	.chat {
		flex: auto;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
	}
	.clear-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: #f77;
		color: #000;
		border: 3px solid #000;
	}
	.container > h1 {
		text-align: center;
		margin: 0;
		font-size: 2em;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
