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
	@font-face {
		font-family: AnakCute;
		src: url('../static/AnakCute.ttf');
	}

	@media screen and (min-width: 480px) {
		:root {
			font-size: 16px;
		}
	}
	@media screen and (max-width: 480px) {
		:root {
			font-size: 11px;
		}
	}
	:root {
		--bg-primary: #001829;
		--bg-secondary: #297ea6;
		--text-primary: #fff;
		--text-dark: #000;
		--home-color: #7cddfe;
		--yoda-chat-color: #f59090;
		--rapbot-color: #867eec;
		--warning-color: #f5c490;
		--warning-text-color: #000;
	}
	.container {
		margin-left: 5rem;
		height: 100%;
		box-sizing: border-box;
		background-color: #001829;
	}
</style>
