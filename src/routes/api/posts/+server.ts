import { fetchPosts } from '$lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchPosts();

	const sortedPosts = allPosts
		.filter((post) => new Date(post.meta.date).getTime() < Date.now())
		.sort((a, b) => {
			return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		});

	return json(sortedPosts);
};
