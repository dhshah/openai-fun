import { fetchPosts } from '$lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const GET = async () => {
	const allPosts = await fetchPosts();

	const sortedPosts = allPosts
		.filter((post) => dev || new Date(post.meta.date).getTime() < Date.now())
		.sort((a, b) => {
			return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		});

	return json(sortedPosts);
};
