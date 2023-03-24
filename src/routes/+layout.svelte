<script>
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

<Nav />
<div class="container">
	<slot />
</div>

<style>
	:root {
		--bg-primary: #f5f5f5;
		--bg-secondary: #fff;
		--text-primary: #000;
		--text-secondary: #fff;
	}
	.container {
		margin-left: 5rem;
		height: 100vh;
	}
</style>
