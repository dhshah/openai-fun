import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { TOKEN_LIMIT } from '$env/static/private';
import { openai } from '$lib/openapi';

const getPrompt = (query: string) =>
	`I want you to act as a rapper. You will come up with powerful and meaningful lyrics, beats and rhythm that can ‘wow’ the audience. Your lyrics should have an intriguing meaning and message which people can relate too. When it comes to choosing your beat, make sure it is catchy yet relevant to your words, so that when combined they make an explosion of sound everytime! My first request is “${query}"`;

export const POST = (async ({ request }) => {
	const { query } = await request.json();

	const chatGPT = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: getPrompt(query) }],
		max_tokens: parseInt(TOKEN_LIMIT)
	});
	return json(chatGPT.data.choices[0].message);
}) satisfies RequestHandler;
