<script lang="ts">
	export let data;
</script>

<div class="prose w-full max-w-4xl mx-auto">
	<h1 class="text-3xl">Blog</h1>
	{#each data.posts as post}
		<h3>
			<a href={`./blog/${post.path}`}>{post.meta.title}</a>
			<span class="badge badge-primary">{post.meta.date}</span>
			{#each post.meta.tags as tag}
				<span class="badge badge-primary">{tag}</span>&nbsp;
			{/each}
		</h3>
	{/each}
</div>
