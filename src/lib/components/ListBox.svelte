<script lang="ts">
	import { tick } from 'svelte';
	// @ts-ignore Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import type { HTMLAttributes } from 'svelte/elements';
	import { ITEM_ATTR, ITEM_VALUE_ATTR } from '$lib/constants.js';
	import { getStore } from '$lib/store.js';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {
		open?: boolean | undefined;
		shouldFilter?: boolean;
		label?: string;
	}

	export const label: string | undefined = undefined;
	export let shouldFilter = true;
	/** Passing this prop will make open a controlled prop! */
	export let open: boolean | undefined = undefined;
	const {
		query,
		active,
		listBoxRef,
		scores,
		matchCount,
		shouldFilter: shouldFilterStore,
		label: labelStore,
		open: openStore
	} = getStore();
	const forwardEvents = forwardEventsBuilder(get_current_component());

	/** Update the store value when the prop updates */
	$: shouldFilterStore.set(shouldFilter);

	/** This line ensure that the passed open prop overrides if theres any state changes to open
	 * Is there a better way to do this?
	 */
	$: if (typeof open === 'boolean' && open !== $openStore) {
		openStore.set(open);
	}

	/**
	 * Reset active when query is changed
	 */
	$: $query, tick().then(() => active.set(undefined));

	$: {
		if (shouldFilter && $query && $listBoxRef) {
			const allItems = $listBoxRef.querySelectorAll(`[${ITEM_ATTR}]`);
			let newMatchCount = 0;
			const newScores: Record<string, number> = {};

			allItems.forEach((item) => {
				// TODO: Use a scoring algorithm
				const id = item.getAttribute('id');
				const value = item.getAttribute(ITEM_VALUE_ATTR);
				if (!id) {
					// Do nothing
				} else if (value?.toLowerCase().includes($query.toLowerCase())) {
					newScores[id] = 1;
					newMatchCount += 1;
				} else {
					newScores[id] = 0;
				}
			});

			scores.set(newScores);
			matchCount.set(newMatchCount);
		}
	}
</script>

<div
	{...$$restProps}
	bind:this={$listBoxRef}
	id="{$labelStore}-listbox"
	role="listbox"
	aria-label={label || `${$labelStore} Listbox`}
	use:forwardEvents
>
	<slot open={$openStore} />
</div>
