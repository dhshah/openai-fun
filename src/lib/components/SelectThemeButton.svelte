<script lang="ts">
	import { themes } from '$lib/utils/themes';
	export let setTheme: (theme: string) => void;
</script>

<div class="dropdown dropdown-top dropdown-end">
	<button tabindex="0" class="btn btn-warning m-1">Select Theme</button>
	<ul class="dropdown-content bg-accent menu p-2 rounded-box w-52">
		{#each themes as _theme}
			<li class="text-accent-content">
				<button tabindex="0" on:click={() => setTheme(_theme)}>{_theme}</button>
			</li>
		{/each}
	</ul>
</div>
