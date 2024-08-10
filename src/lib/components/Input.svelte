<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getRelativeElementId } from '$lib/dom.js';
	import { ITEM_ATTR } from '$lib/constants.js';
	// @ts-expect-error Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { getStore } from '$lib/store.js';
	import { tick } from 'svelte';

	interface $$Props extends Partial<HTMLInputAttributes> {}

	export let value = '';
	const forwardEvents = forwardEventsBuilder(get_current_component());
	const { active, query, listBoxRef, label, open } = getStore();

	// Two way binding, code looks a little fishy tho..
	$: query.set(value);
	$: value = $query;
</script>

<input
	{...$$restProps}
	id="{$label}-input"
	type="text"
	aria-autocomplete="list"
	role="combobox"
	aria-expanded="true"
	aria-labelledby="{$label}-label"
	aria-controls="{$label}-listbox"
	aria-activedescendant={$active}
	tabindex="0"
	bind:value
	use:forwardEvents
	on:input={() => {
		if (value && !$open) {
			open.set(true);
		}
	}}
	on:keydown={async (e) => {
		switch (e.key) {
			// REFER: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
			case 'ArrowDown':
				e.preventDefault();
				if (!$open) {
					open.set(true);
					await tick();
				}

				if (!$listBoxRef) {
					return;
				}

				active.set(getRelativeElementId($listBoxRef, 1, $active));
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (!$open) {
					open.set(true);
					await tick();
				}

				if (!$listBoxRef) {
					return;
				}

				active.set(getRelativeElementId($listBoxRef, -1, $active));

				break;
			case 'Enter':
				e.preventDefault();
				if (!$listBoxRef) {
					return;
				}

				/** Dispatch an event to the selected item so it can perform select action */
				const activeItem = $listBoxRef.querySelector(`[id="${$active}"][${ITEM_ATTR}]:not(hidden)`);
				if (activeItem) {
					const clickedEvent = new Event('click');
					activeItem.dispatchEvent(clickedEvent);
				}
				break;
			case 'Escape':
				if ($open) {
					open.set(false);
				} else if ($query) {
					query.set('');
				}
				break;
			default:
				break;
		}
	}}
	on:focus={() => {
		if (!$open) {
			open.set(true);
		}
	}}
	on:blur={(e) => {
		if ($open) {
			// If the click is within the listbox, don't close it
			// @ts-expect-error TODO: Fix this type pls
			if (e?.relatedTarget && $listBoxRef?.contains(e.relatedTarget)) {
				return;
			} else {
				open.set(false);
			}
		}
	}}
/>
