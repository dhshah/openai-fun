export async function load({ params }: { params: { slug: string } }) {
	const post = await import(`../../../blogs/${params.slug}.svx`);
	console.log(post);
	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date
	};
}
