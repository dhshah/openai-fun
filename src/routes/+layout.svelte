<script>
	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '$lib/vitals';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Background from '$lib/components/Background.svelte';
	import { theme } from '$lib/theme_store';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<div class="h-screen max-h-screen max-w-screen w-screen flex flex-col" data-theme={$theme}>
	<Background />
	<Navbar />
	<div class="grow z-10 overflow-auto">
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/a-anak-cute');
</style>
