<script>
	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '$lib/vitals';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { theme } from '$lib/theme_store';
	import SelectThemeButton from '$lib/components/SelectThemeButton.svelte';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<div
	class="flex flex-col min-h-full bg-gradient-to-br from-primary to-secondary text-primary-content"
	data-theme={dev ? $theme : 'cmyk'}
>
	<Navbar />
	<slot />
	{#if dev}
		<span class="fixed bottom-2 right-2"
			><SelectThemeButton setTheme={(newTheme) => theme.set(newTheme)} /></span
		>
	{/if}
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/a-anak-cute');
</style>
