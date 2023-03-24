import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { OPENAPI_API_KEY, TOKEN_LIMIT } from '$env/static/private';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: OPENAPI_API_KEY
});

const openai = new OpenAIApi(configuration);
const system_messages = [
	{ role: 'system', content: 'Be more sarcastic and funny. And also answer like you are yoda.' }
];

export const POST = (async ({ request }) => {
	const { messages } = await request.json();
	try {
		const chatGPT = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [...system_messages, ...messages],
			max_tokens: parseInt(TOKEN_LIMIT)
		});
		return json(chatGPT.data.choices[0].message);
	} catch (e) {
		return json({ content: e });
	}
}) satisfies RequestHandler;
