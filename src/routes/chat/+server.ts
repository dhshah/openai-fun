import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { OPENAPI_API_KEY, TOKEN_LIMIT } from '$env/static/private';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: OPENAPI_API_KEY
});

const openai = new OpenAIApi(configuration);

const token_limit = TOKEN_LIMIT ? parseInt(TOKEN_LIMIT) : 30;

export const POST = (async ({ request }) => {
	const { messages } = await request.json();

	try {
		const chatGPT = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages,
			max_tokens: token_limit
		});
		return json(chatGPT.data.choices[0].message);
	} catch (e) {
		return json({ content: e });
	}
}) satisfies RequestHandler;
