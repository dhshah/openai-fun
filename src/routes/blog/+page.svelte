<script lang="ts">
	export let data;
</script>

<div class="prose [&_*]:text-primary-content w-full max-w-4xl mx-auto px-4">
	<h1 class="text-3xl">Blog</h1>
	<ul class="list-none p-0">
		{#each data.posts as post}
			<li class="p-0">
				<a href={`./blog/${post.path}`}>{post.meta.title}</a>
				<span class="badge badge-primary">{post.meta.date}</span>
				{#each post.meta.tags as tag}
					<span class="badge badge-primary">{tag}</span>&nbsp;
				{/each}
			</li>
		{/each}
	</ul>
</div>
