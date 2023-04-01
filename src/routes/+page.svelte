<script lang="ts">
	import { theme } from '$lib/theme_store';

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
		theme.set(themes[random]);
	};
</script>

<div class="hero h-full">
	<div class="hero-content">
		<div class="max-w-md">
			<div class="mockup-code bg-accent-content text-accent">
				<pre data-prefix="$"><code>./helloworld</code></pre>
				<pre data-prefix=">"><code>Welcome!</code></pre>
				<pre data-prefix=">"><code>I made this thing</code></pre>
				<pre data-prefix=">"><code
						>Try it >>> <a
							class="text-accent-focus transition-[text-shadow] duration-300 [text-shadow:_0_0_20px_hsl(var(--a))] hover:[text-shadow:_0_0_0_#fff]"
							href="/yoda-chat">Yoda Chat</a
						></code
					></pre>
			</div>
		</div>
	</div>
</div>
<button class="btn btn-warning fixed bottom-2 right-2 w-40" on:click={randomTheme}>
	{$theme}
</button>
