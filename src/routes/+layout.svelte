<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import IconSvelte from '../lib/Icons/IconSvelte.svelte';
	import IconTailwind from '../lib/Icons/IconTailwind.svelte';

	const guides = [
		{ title: 'Introduction', path: '/introduction' },
		{ title: 'Quickstart', path: '/quickstart' },
		{ title: 'Options', path: '/options' },
		{ title: 'Store', path: '/store' }
	];

	const docs = [
		{ title: 'Basic Combobox', path: '/examples/headless', tw: false },
		{ title: 'Select', path: '/examples/headless-select', tw: false },
		{ title: 'Async', path: '/examples/async', tw: false },
		{ title: 'With Button', path: '/examples/button', tw: false },
		{ title: 'Clearable', path: '/examples/clearable', tw: true },
		{ title: 'With Tabs', path: '/examples/with-tabs', tw: true },
		{ title: 'Dialog', path: '/examples/dialog', tw: true },
		{ title: 'Floating Menu', path: '/examples/floating', tw: true }
	];

	const setTheme = (theme: 'dark' | 'light') => {
		document.cookie = `theme=${theme};max-age=31536000;path="/"`;

		if (theme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
	};
</script>

<div class="h-full lg:ml-72 xl:ml-80">
	<header class="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
		<div
			class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10"
		>
			<div class="hidden lg:flex items-center">
				<IconSvelte class="h-7 mr-1" />
				<a aria-label="Home" href="/">
					<span class="text-2xl font-extralight text-gray-500"
						>Select <span class="text-black dark:text-white">Kit</span></span
					>
				</a>
			</div>
			<div
				class="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between lg:justify-end gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
				style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2;"
			>
				<div
					class="absolute inset-x-0 top-full h-px transition bg-zinc-900/10 dark:bg-white/10"
				></div>
				<div class="flex items-center lg:hidden">
					<button
						type="button"
						class="flex h-6 w-6 mr-2 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Toggle navigation"
						><svg
							viewBox="0 0 10 9"
							fill="none"
							stroke-linecap="round"
							aria-hidden="true"
							class="w-2.5 stroke-zinc-900 dark:stroke-white"
							><path d="M.5 1h9M.5 8h9M.5 4.5h9"></path></svg
						></button
					>
					<IconSvelte class="h-6" />
					<a aria-label="Home" href="/">
						<span class="text-xl font-extralight text-gray-500"
							>Select <span class="text-black dark:text-white">Kit</span></span
						>
					</a>
				</div>
				<div class="flex items-center gap-5">
					<nav class="hidden md:block">
						<ul role="list" class="flex items-center gap-8">
							<li>
								<a
									class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
									href="https://github.com/snehalbaghel/select-kit"
									target="_blank">GitHub</a
								>
							</li>
						</ul>
					</nav>
					<!-- <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div> -->
					<!-- <div class="flex gap-4"> -->
					<!-- <div class="contents lg:hidden">
						<button
							type="button"
							class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden dark:hover:bg-white/5"
							aria-label="Find something..."
							><svg
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
								class="h-5 w-5 stroke-zinc-900 dark:stroke-white"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
								></path></svg
							></button
						>
					</div> -->
					<button
						type="button"
						class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Switch to dark theme"
						on:click={() => {
							const currentTheme = document.documentElement.className.includes('dark')
								? 'dark'
								: 'light';
							if (currentTheme === 'dark') {
								setTheme('light');
							} else {
								setTheme('dark');
							}
						}}
						><svg
							viewBox="0 0 20 20"
							fill="none"
							aria-hidden="true"
							class="h-5 w-5 stroke-zinc-900 dark:hidden"
							><path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path><path
								stroke-linecap="round"
								d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"
							></path></svg
						><svg
							viewBox="0 0 20 20"
							fill="none"
							aria-hidden="true"
							class="hidden h-5 w-5 stroke-white dark:block"
							><path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"
							></path></svg
						></button
					>
					<!-- </div> -->
				</div>
			</div>
			<nav class="hidden lg:mt-10 lg:block">
				<ul role="list">
					<li class="md:hidden">
						<a
							class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
							href="/">GitHub</a
						>
					</li>
					<li class="relative mt-6 md:mt-0">
						<h2 class="text-xs font-semibold text-zinc-900 dark:text-white">Guide</h2>
						<div class="relative mt-3">
							<ul role="list" class="border-l border-transparent">
								{#each guides as guide}
									<li class="relative">
										<a
											class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
											class:font-bold={$page.url.pathname === guide.path}
											href={guide.path}><span class="truncate">{guide.title}</span></a
										>
									</li>
								{/each}
							</ul>
						</div>
					</li>
					<li class="relative mt-6">
						<h2 class="text-xs font-semibold text-zinc-900 dark:text-white">Examples</h2>
						<div class="relative mt-3">
							<ul role="list" class="border-l border-transparent">
								{#each docs as doc}
									<li class="relative flex items-center justify-between">
										<a
											class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
											class:font-bold={$page.url.pathname === doc.path}
											href={doc.path}><span class="truncate">{doc.title}</span></a
										>
										{#if doc.tw}
											<IconTailwind class="h-2" />
										{/if}
									</li>
								{/each}
							</ul>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</header>
	<div class="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden lg:ml-72 xl:ml-80">
		<div
			class="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-[#fcb69f] to-[#ffecd2] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#ff4000]/30 dark:to-[#f96743]/30 dark:opacity-100"
			/>
		</div>
	</div>
	<div class="relative flex h-full flex-col px-4 my-20 sm:px-6 lg:px-8">
		<div class="prose dark:prose-invert document">
			<slot />
		</div>
	</div>
</div>
