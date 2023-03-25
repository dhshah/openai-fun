import { Configuration, OpenAIApi } from 'openai';

import { OPENAPI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	apiKey: OPENAPI_API_KEY
});

export const openai = new OpenAIApi(configuration);

export const model = 'gpt-3.5-turbo';
