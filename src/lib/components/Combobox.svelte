<script lang="ts">
	import { getRelativeElementId } from '$lib/dom.js';
	import { ITEM_ATTR } from '$lib/constants.js';
	// @ts-ignore Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { getStore } from '$lib/store.js';
	import { onMount } from 'svelte';

	let timeout: number | undefined;

	onMount(() => {
		getStore().selectOnly.set(true);
	});

	const forwardEvents = forwardEventsBuilder(get_current_component());
	const { active, listBoxRef, label, open, query, selected } = getStore();
	$: console.log($query, $active);
</script>

<!-- TODO: Add home, end, pageup, pagedown listeners -->
<div
	{...$$restProps}
	id="{$label}-combo"
	role="combobox"
	aria-expanded="false"
	aria-haspopup="listbox"
	aria-controls="{$label}-listbox"
	aria-activedescendant={$active}
	tabindex="0"
	use:forwardEvents
	on:click={() => open.update((o) => !o)}
	on:keydown={(e) => {
		if (!$listBoxRef) {
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				if (!$open) {
					open.set(true);
				}

				e.preventDefault();
				active.set(getRelativeElementId($listBoxRef, 1, $active));
				break;
			case 'ArrowUp':
				if (!$open) {
					open.set(true);
				}

				e.preventDefault();
				active.set(getRelativeElementId($listBoxRef, -1, $active));
				break;
			case 'Enter':
			case ' ':
				if (!$open) {
					open.set(true);
					break;
				}

				e.preventDefault();
				/** Dispatch an event to the selected item so it can perform select action */
				const activeItem = $listBoxRef.querySelector(`[id="${$active}"][${ITEM_ATTR}]:not(hidden)`);
				if (activeItem) {
					const clickedEvent = new Event('click');
					activeItem.dispatchEvent(clickedEvent);
				}
				break;
			default:
				// // This block keeps track of search query entered in quick succession
				if (e.key.length === 1) {
					if (typeof timeout === 'number') {
						clearTimeout(timeout);
					}

					timeout = setTimeout(() => query.set(''), 500);

					query.update((s) => s + e.key);
				}
				break;
		}
	}}
	on:blur={(e) => {
		if ($open) {
			// If the click is within the listbox, don't close it
			// @ts-ignore TODO: Fix this type pls
			if (e?.relatedTarget && $listBoxRef?.contains(e.relatedTarget)) {
				return;
			} else {
				open.set(false);
			}
		}
	}}
>
	<slot selected={$selected} />
</div>
