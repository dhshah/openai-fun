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
<button on:click={clearMessages}>Clear Messages</button>
<h1>Messages</h1>
{#each $messages.filter(message => message.role !== 'system') as message}
    <div>
        <p>{message.content}</p>
    </div>
{/each}
<input disabled={chatting} bind:value={newMessage} on:keydown={handleKeydown}/>
