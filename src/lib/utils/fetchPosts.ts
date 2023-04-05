export const fetchPosts = async () => {
	const allPostFiles = await import.meta.glob('../../blogs/**/*.svx');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async (entry) => {
			const [path, resolver] = entry;
			const { metadata } = await (resolver as App.MdsvexResolver)();
			const postPath = path.slice(12, -4);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return allPosts;
};
