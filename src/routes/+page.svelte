<div class="spacer layer1">
	<div class="hero">
		<h1>Welcome!</h1>
		<p>I made this thing.</p>
		<span class="link"> Try it here >>> <a href="/yoda-chat">Yoda Chat</a></span>
	</div>
</div>

<style>
	.spacer {
		aspect-ratio: 1920/1090;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.layer1 {
		background-image: url('../assets/background.svg');
	}

	.hero {
		width: 100%;
		height: 100%;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-family: AnakCute;
	}
	@font-face {
		font-family: AnakCute;
		src: url('../assets/AnakCute.ttf');
	}
	.hero h1 {
		font-size: 7.5rem;
	}
	.hero p {
		font-size: 3rem;
	}
	.link a {
		color: #f59090;
		text-shadow: #f59090 0 0 2px;
		transition: text-shadow 250ms ease;
	}

	.link a:hover {
		text-shadow: #f59090 0 0 20px;
	}

	.link {
		font-size: 2rem;
		font: sans-serif;
	}
</style>
