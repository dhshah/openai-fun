<script>
	let scroll_y = 0;
	const items = [
		// { label: 'Home', href: '/' },
		// { label: 'Contact', href: '/contact' },
		// { label: 'Blog', href: '/blog' },
		// { label: 'Projects', href: '/projects' },
		// { label: 'Resume', href: '/resume' },
		// { label: 'Chat', href: '/chat' },
		{ label: 'Yoda Chat', href: '/yoda-chat' },
		{ label: 'About Me', href: '/about' }
	];
</script>

<svelte:window bind:scrollY={scroll_y} />
<div
	class={'sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 ' +
		'backdrop-blur transition-all duration-100 ' +
		(scroll_y > 20 ? ' bg-base-100 shadow-sm text-base-content' : 'text-primary-content')}
>
	<div class="navbar w-full">
		<div class="flex-1 px-2 mx-2 z-10">
			<a href="/" class="font-bold font-underline text-3xl font-fun">AimlessTechie</a>
		</div>
		<div class="flex-none hidden lg:block">
			<ul class="menu menu-horizontal">
				{#each items as item}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
			</ul>
		</div>
		<div class="flex-none lg:hidden">
			<div class="flex-none lg:hidden dropdown dropdown-end">
				<button tabindex="0" class="btn gap-1 normal-case btn-ghost"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					></button
				>
				<ul class="dropdown-content menu p-2 shadow bg-accent rounded-box w-52">
					{#each items as item}
						<li class="hover:bg-accent-focus">
							<a tabindex="0" class="text-accent-content" href={item.href}>{item.label}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
