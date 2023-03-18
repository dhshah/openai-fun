import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

interface ChatMessage {
	role: string;
	content: string;
	image?: string;
}

let _messages: Writable<ChatMessage[]>;
let _reset;
if (browser) {
	const localMessages = localStorage?.getItem('messages');
	_messages = writable<ChatMessage[]>(localMessages ? JSON.parse(localMessages) : []);
	_messages.subscribe((value) => (localStorage.messages = JSON.stringify(value)));
	_reset = () => _messages.set([]);
} else {
	_messages = writable<ChatMessage[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	_reset = () => {};
}

export const messages = _messages;
export const reset = _reset;
