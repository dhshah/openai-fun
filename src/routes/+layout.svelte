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

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

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
</script>

<div
	class="flex flex-col min-h-full bg-gradient-to-br from-primary to-secondary text-primary-content"
	data-theme={dev ? $theme : 'luxury'}
>
	<Navbar />
	<slot />
	{#if dev}
		<div class="dropdown dropdown-top dropdown-end fixed bottom-2 right-2">
			<button tabindex="0" class="btn btn-warning m-1">{$theme}</button>
			<ul class="dropdown-content bg-accent menu p-2 rounded-box w-52">
				{#each themes as _theme}
					<li class="text-accent-content">
						<button tabindex="0" on:click={() => theme.set(_theme)}>{_theme}</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/a-anak-cute');
</style>
