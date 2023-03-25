import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { TOKEN_LIMIT } from '$env/static/private';
import { openai } from '$lib/openapi';

const system_messages = [
	{ role: 'system', content: 'Be more sarcastic and funny. And also answer like you are yoda.' }
];

export const POST = (async ({ request }) => {
	const { messages } = await request.json();

	console.log(messages);

	const chatGPT = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [...system_messages, ...messages],
		max_tokens: parseInt(TOKEN_LIMIT)
	});
	return json(chatGPT.data.choices[0].message);
}) satisfies RequestHandler;
