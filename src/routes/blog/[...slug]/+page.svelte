<script>
	export let data;
</script>

<div>
	<article class="mx-auto prose p-4">
		<h1>{data.title}</h1>
		<p>Published: {data.date}</p>
		{#each data.tags as tag}
			<span class="badge badge-primary">{tag}</span>&nbsp;
		{/each}
		<svelte:component this={data.content} />
	</article>
</div>
