<script lang="ts">
	import { tick } from 'svelte';
	// @ts-expect-error from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import type { HTMLAttributes } from 'svelte/elements';
	import { ITEM_ATTR, ITEM_VALUE_ATTR } from '$lib/constants.js';
	import { getStore } from '$lib/store.js';
	import { defaultFilter, type FilterFn } from '$lib/utils/defaultFilter.js';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {
		open?: boolean | undefined;
		shouldFilter?: boolean;
		label?: string;
		selectOnly?: boolean;
		filter?: FilterFn
	}

	export const label: string | undefined = undefined;
	export let shouldFilter = true;
	export let selectOnly = false;
	export let filter: FilterFn | undefined = undefined;
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
		open: openStore,
		selectOnly: selectOnlyStore
	} = getStore();
	const forwardEvents = forwardEventsBuilder(get_current_component());

	/**
	 * Update the store value when the prop updates
	 **/
	$: shouldFilterStore.set(shouldFilter);
	$: selectOnlyStore.set(selectOnly);

	/**
	 * Prefer passed prop value over store
	 **/
	$: if (typeof open === 'boolean' && open !== $openStore) {
		openStore.set(open);
	}

	/**
	 * Reset active when query is changed
	 */
	$: $query, tick().then(() => active.set(undefined));

	/**
	 * Scores all the items and sets it to store
	 */
	$: {
		if (!selectOnly && shouldFilter && $query && $listBoxRef) {
			const allItems = $listBoxRef.querySelectorAll(`[${ITEM_ATTR}]`);
			let newMatchCount = 0;
			const newScores: Record<string, number> = {};

			allItems.forEach((item) => {
				// TODO: Use a scoring algorithm?
				const id = item.getAttribute('id');
				const value = item.getAttribute(ITEM_VALUE_ATTR);
				const filterFn = filter || defaultFilter
				if (!id || ! value) {
					// Do nothing
				} else {
					const newScore = filterFn($query, value, id)
					if (newScore > 0) newMatchCount++
					newScores[id] = newScore
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
