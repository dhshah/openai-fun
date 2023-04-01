<script>
	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '$lib/vitals';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<div class="h-screen flex flex-col">
	<Nav />
	<div class="grow">
		<slot />
	</div>
</div>

<style>
	@font-face {
		font-family: AnakCute;
		src: url('../static/AnakCute.ttf');
	}
</style>
