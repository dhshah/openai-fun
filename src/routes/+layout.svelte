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

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

	let randomTheme = () => {
		let themes = [
			'light',
			'dark',
			'emerald',
			'cupcake',
			'bumblebee',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumm',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter'
		];
		let random = Math.floor(Math.random() * themes.length);
		datatheme = themes[random];
	};

	let datatheme = 'retro';
</script>

<div class="h-screen max-h-screen max-w-screen w-screen flex flex-col" data-theme={datatheme}>
	<Background />
	<button class="btn btn-warning absolute bottom-2 right-2 w-40" on:click={randomTheme}>
		{datatheme}
	</button>
	<Navbar />
	<div class="grow bg-base-100">
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/a-anak-cute');
</style>
