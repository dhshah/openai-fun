export async function load({ params }: { params: { slug: string } }) {
	const post = await import(`../../../blogs/${params.slug}.svx`);
	console.log(post);
	const content = post.default;

	return {
		content,
		...post.metadata
	};
}
