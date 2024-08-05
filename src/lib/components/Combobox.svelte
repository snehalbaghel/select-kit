<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getRelativeElementId } from '$lib/dom.js';
	import { ITEM_ATTR } from '$lib/constants.js';
	// @ts-ignore Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { getStore } from '$lib/store.js';

	interface $$Props extends Partial<HTMLInputAttributes> {
		placeholder: string;
	}

	export let placeholder = '';

	const forwardEvents = forwardEventsBuilder(get_current_component());
	const { active, listBoxRef, label } = getStore();
</script>

<div
	{...$$restProps}
	id="{$label}-input"
	role="combobox"
	aria-expanded="true"
	aria-haspopup="listbox"
	aria-controls="{$label}-listbox"
	aria-activedescendant={$active}
	tabindex="0"
	use:forwardEvents
	on:keydown={(e) => {
		if (!$listBoxRef || !$active) {
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				active.set(getRelativeElementId($listBoxRef, 1, $active));
				break;
			case 'ArrowUp':
				e.preventDefault();
				active.set(getRelativeElementId($listBoxRef, -1, $active));
				break;
			case 'Enter':
				e.preventDefault();
				/** Dispatch an event to the selected item so it can perform select action */
				const activeItem = $listBoxRef.querySelector(`[id="${$active}"][${ITEM_ATTR}]:not(hidden)`);
				if (activeItem) {
					const clickedEvent = new Event('click');
					activeItem.dispatchEvent(clickedEvent);
				}
			default:
				break;
		}
	}}
>
	{$active || placeholder}
</div>
