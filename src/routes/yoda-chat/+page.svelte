<script lang="ts">
	import { onMount } from 'svelte';
	import { messages, reset } from '../../stores/messages';
	interface ChatMessage {
		role: string;
		content: string;
		image?: string;
	}

	let inputBox: HTMLInputElement;
	let chatting = false;
	let newMessage: string;

	async function chat() {
		messages.update((currentMessages: ChatMessage[]) => [
			...currentMessages,
			{ role: 'user', content: newMessage }
		]);

		newMessage = '';

		const res = await fetch('/chat', {
			method: 'POST',
			body: JSON.stringify({ messages: $messages })
		});

		const chatGptMessage = await res.json();

		messages.update((currentMessages: ChatMessage[]) => [...currentMessages, chatGptMessage]);
	}

	async function handleKeydown(e: any) {
		if (e.key === 'Enter') {
			chatting = true;
			await chat();
			chatting = false;
		}
	}

	async function clearMessages() {
		reset();
	}

	onMount(() => {
		inputBox.focus();
	});
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
	<div class="input-container">
		<input
			bind:this={inputBox}
			on:blur={() => inputBox.focus()}
			disabled={chatting}
			bind:value={newMessage}
			on:keydown={handleKeydown}
		/>
	</div>
</div>

<style>
	* {
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
	}
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
		background-color: #e6e6e6;
		align-self: flex-end;
	}
	.gpt-message {
		background-color: #c6c6c6;
		align-self: flex-start;
	}
	.chat {
		flex: auto;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
	}
	.input-container {
		padding: 5px;
	}
	.input-container > input {
		box-sizing: border-box;
		display: block;
		width: 100%;
		border: 3px solid #000;
		padding: 10px;
		color: #000;
		background: transparent;
		border-radius: var(--size-radius);
	}
	.input-container > input:disabled {
		background: #c6c6c6;
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
