<!-- Modified version of: https://github.com/themesberg/flowbite-svelte/blob/main/src/routes/utils/ExampleWrapper.svelte -->
<script lang="ts">
	export let divClass = 'w-full mx-auto bg-gradient-to-r bg-white dark:bg-zinc-900 p-6';

	// the source of the example, if you want it
	export let src: any = undefined;

	// all meta tags of the code block
	export let meta: any = undefined;

	let code: HTMLElement;

	// suppress vite-plugin-svelte warning about unused props
	$: src, meta;

	let showExpandButton: boolean = false;
	let expand: boolean = false;
	let dark: boolean = false;

	function updateDarkMode(ev: Event) {
		const target = ev.target as HTMLElement,
			isDark = target.ownerDocument.documentElement.classList.contains('dark');
		dark = isDark;
	}

	function init(node: HTMLElement) {
		const button: HTMLButtonElement = node.ownerDocument.querySelector(
			'button[aria-label="Dark mode"]'
		) as HTMLButtonElement;
		button?.addEventListener('click', updateDarkMode);

		dark = node.ownerDocument.documentElement.classList.contains('dark');

		return {
			destroy() {
				button?.removeEventListener('click', updateDarkMode);
			}
		};
	}

	const copyToClipboard = async (e: MouseEvent) => {
		const REG_HEX = /&#x([a-fA-F0-9]+);/g;
		const decodedText = code.innerText.replace(REG_HEX, function (_match, group1) {
			const num = parseInt(group1, 16);
			return String.fromCharCode(num);
		});

		await window.navigator.clipboard.writeText(decodedText);

		const button: HTMLButtonElement | null = e?.target as HTMLButtonElement;
		button?.blur();

		const lastChild = button?.lastChild;
		if (lastChild) {
			lastChild.textContent = 'Copied';
			setTimeout(() => (lastChild.textContent = 'Copy'), 3000);
		}
	};

	function checkOverflow(el: HTMLElement) {
		const isOverflowingY = el.clientHeight < el.scrollHeight;
		showExpandButton = isOverflowingY;
		el.firstElementChild?.classList.add('-mb-2');
	}

	let copy_text = 'Copy';
</script>

<div class="not-prose" use:init>
	{#if !meta.hideOutput}
		<div class="flex justify-center min-h-52">
			<div class="mb-10 mt-3">
				<slot name="example" />
			</div>
		</div>
	{/if}

	<div class="relative rounded-2xl border-gray-200 border-y border-x dark:border-zinc-800">
		<div
			class="grid w-full grid-cols-2 border-b border-gray-200 bg-gray-50 rounded-t-2xl dark:bg-zinc-900 dark:border-zinc-800"
		>
			<div />
			<div class="flex justify-end">
				<button
					on:click={(e) => copyToClipboard(e)}
					type="button"
					class="flex items-center px-3 py-2 text-sm rounded-tr-2xl font-medium text-gray-600 bg-gray-100 border-s border-gray-200 dark:border-zinc-800 dark:text-gray-400 dark:bg-zinc-900 hover:text-primary-700 dark:hover:text-white copy-to-clipboard-button"
				>
					<svg
						class="w-4 h-4 me-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
					{copy_text}
				</button>
			</div>
		</div>
		<div class="relative">
			<div
				class="overflow-hidden rounded-b-2xl"
				class:max-h-96={!expand}
				tabindex="-1"
				use:checkOverflow
			>
				<div class="highlight">
					<pre bind:this={code} class="language-svelte !-mt-2 text-sm"><slot name="code" /></pre>
				</div>
			</div>
			{#if showExpandButton && !expand}
				<button
					on:click={() => (expand = !expand)}
					data-expand-code=""
					type="button"
					class="absolute bottom-0 start-0 py-2.5 rounded-b-2xl px-5 w-full text-sm font-medium text-gray-900 bg-gray-100 border-t border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-zinc-900 dark:text-gray-400 dark:border-zinc-800 dark:hover:text-white dark:hover:bg-zinc-800"
				>
					Expand code
				</button>
			{/if}
		</div>
	</div>
</div>
