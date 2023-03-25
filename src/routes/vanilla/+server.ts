import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { TOKEN_LIMIT } from '$env/static/private';
import { model, openai } from '$lib/openapi';

export const POST = (async ({ request }) => {
	const { query } = await request.json();

	const chatGPT = await openai.createChatCompletion({
		model,
		messages: [{ role: 'user', content: query }],
		max_tokens: parseInt(TOKEN_LIMIT)
	});
	return json(chatGPT.data.choices[0].message);
}) satisfies RequestHandler;
