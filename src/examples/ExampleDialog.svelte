<!-- 
	Basic example for Dialog with CMD+K
-->
<script lang="ts">
	import Select from '$lib/index.js';
	import { onMount } from 'svelte';
	import { items } from '../routes/examples/items.js';

	let showModal = false;
	let dialog: HTMLDialogElement | null = null;

	function keyTriggerListener(event: KeyboardEvent) {
		if (event.metaKey && event.key.toLowerCase() === 'k') {
			if (!dialog) {
				return;
			}

			showModal = !showModal;

			if (showModal) {
				dialog.showModal();
			} else {
				dialog.close();
			}
		}
	}

	onMount(() => {
		document.addEventListener('keydown', keyTriggerListener);

		return () => document.removeEventListener('keydown', keyTriggerListener);
	});
</script>

<Select.Root label="Navigation" class="flex items-center justify-center pt-12">
	<p class="flex items-center gap-4 text-3xl font-semibold text-gray-900">
		Press
		<span class="inline-flex items-center gap-1">
			<span
				class="bg-gray-800 w-8 h-8 inline-flex items-center justify-center p-1 text-lg text-white border-2 border-gray-700 rounded-lg shadow-sm"
			>
				⌘
			</span>
			<span
				class="bg-gray-800 w-8 h-8 inline-flex items-center justify-center p-1 text-lg text-white border-2 border-gray-700 rounded-lg shadow-sm"
			>
				K
			</span>
		</span>
	</p>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog?.close()}
		class="mt-12"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<div
				class="flex w-[480px] flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ring-1 ring-gray-300"
			>
				<div class="relative inline-flex items-center">
					<span
						class="pointer-events-none absolute left-5 inline-flex h-6 w-6 items-center justify-center"
					>
						🔎
					</span>

					<Select.Input
						placeholder="Search..."
						class="input h-14 w-full py-4 pl-14 pr-5 text-lg font-medium text-black outline-none placeholder:text-gray-200"
					/>
				</div>

				<Select.ListBox class="p-2">
					{#each items as item}
						<Select.Item
							id={item.name}
							onSelectItem={() => null}
							value={item.name}
							class="flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 data-[active=true]:bg-gray-100"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="fill-black"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.99991 5.99683C8.99991 6.55683 9.44991 6.99683 9.99991 6.99683H15.5899L4.69991 17.8868C4.30991 18.2768 4.30991 18.9068 4.69991 19.2968C5.08991 19.6868 5.71991 19.6868 6.10991 19.2968L16.9999 8.40683V13.9968C16.9999 14.5468 17.4499 14.9968 17.9999 14.9968C18.5499 14.9968 18.9999 14.5468 18.9999 13.9968V5.99683C18.9999 5.44683 18.5499 4.99683 17.9999 4.99683H9.99991C9.44991 4.99683 8.99991 5.44683 8.99991 5.99683Z"
								/>
							</svg>

							<div class="space-y-1">
								<p class="text-base font-medium text-black">{item.name}</p>

								<ul class="flex items-center gap-1 text-sm text-gray-500">
									{#each item.navigationBreadcrumbs as navigation, index}
										<li>{navigation}</li>

										{#if item.navigationBreadcrumbs.length - 1 !== index}
											<li>
												<svg
													width="12"
													height="12"
													viewBox="0 0 12 12"
													class="text-gray-500"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M4.5 2.5L8 6L4.5 9.5"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</li>
										{/if}
									{/each}
								</ul>
							</div>
						</Select.Item>
					{/each}

					<Select.NoResults class="p-3">
						<p class="text-sm text-gray-900">No results found</p>
					</Select.NoResults>
				</Select.ListBox>
			</div>
		</div>
	</dialog>
</Select.Root>

<style>
	dialog {
		background: none;
		border: none;
		border-radius: 0;
		overflow: inherit;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
