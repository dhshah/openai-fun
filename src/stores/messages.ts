import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

interface ChatMessage {
	role: string;
	content: string;
	image?: string;
}

const system_prompts: ChatMessage[] = [
	{ role: 'system', content: 'Be more sarcastic and funny. And also answer like you are yoda.' }
];

let _messages: Writable<ChatMessage[]>;
let _reset;
if (browser) {
	const localMessages = localStorage?.getItem('messages');
	_messages = writable<ChatMessage[]>(localMessages ? JSON.parse(localMessages) : system_prompts);
	_messages.subscribe((value) => (localStorage.messages = JSON.stringify(value)));
	_reset = () => _messages.set(system_prompts);
} else {
	_messages = writable<ChatMessage[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	_reset = () => {};
}

export const messages = _messages;
export const reset = _reset;
