<script>
	const items = [
		// { label: 'Home', href: '/' },
		// { label: 'About', href: '/about' },
		// { label: 'Contact', href: '/contact' },
		// { label: 'Blog', href: '/blog' },
		// { label: 'Projects', href: '/projects' },
		// { label: 'Resume', href: '/resume' },
		// { label: 'Chat', href: '/chat' },
		{ label: 'Yoda Chat', href: '/yoda-chat' }
	];
</script>

<div class="w-full navbar bg-base-300">
	<div class="flex-1 px-2 mx-2">
		<a href="/" class="text-base-content font-bold font-underline text-3xl font-fun"
			>AimlessTechie</a
		>
	</div>
	<div class="flex-none hidden lg:block">
		<ul class="menu menu-horizontal">
			{#each items as item}
				<li><a class="text-base-content" href={item.href}>{item.label}</a></li>
			{/each}
		</ul>
	</div>
	<div class="flex-none lg:hidden">
		<div class="flex-none lg:hidden dropdown dropdown-end">
			<button tabindex="0" class="btn btn-square btn-neutral btn-outline mb-1"
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
