<script lang="ts">
  import { messages, reset } from "../stores/messages";
  interface ChatMessage {
    role: string;
    content: string;
    image?: string;
  }

  let chatting = false;
  let newMessage: string;

  async function chat() {
    messages.update((currentMessages: ChatMessage[]) => [
      ...currentMessages,
      { role: 'user', content: newMessage}
    ])
    
    newMessage = '';

    const res = await fetch('/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: $messages}),
    });

    const chatGptMessage = await res.json();

    messages.update((currentMessages: ChatMessage[]) => [
      ...currentMessages,
      chatGptMessage
    ])
  }
  
	async function handleKeydown(e:any) {
    if (e.key === 'Enter') {
      chatting = true;
      await chat();
      chatting = false;
    }
	}

  async function clearMessages() {
    reset();
  }
</script>
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
    background-color: #6e6e6e;
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
  .clear-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #f77;
    color: #000;
    border: 3px solid #000;
  }
</style>
<div class="container">
  <button class="clear-button" on:click={clearMessages}>Clear Messages</button>
  <div class='chat'>
    {#each $messages.filter(message => message.role !== 'system') as message}
      <div class={'message ' + (message.role === 'user' ? 'user-message' : 'gpt-message')}>
        <p style="margin:0">{message.content}</p>
      </div>
    {/each}
  </div>
  <div class="input-container">
    <input disabled={chatting} bind:value={newMessage} on:keydown={handleKeydown}/>
  </div>
</div>
