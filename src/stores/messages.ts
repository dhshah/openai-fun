import { createStore } from '$lib/store';

interface ChatMessage {
	role: string;
	content: string;
	image?: string;
}

export const messages = createStore<ChatMessage[]>('messages', []);
export const reset = () => messages.set([]);
