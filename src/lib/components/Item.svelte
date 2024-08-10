<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { onMount, tick } from 'svelte';
	import { ITEM_ACTIVE_ATTR, ITEM_ATTR, ITEM_VALUE_ATTR } from '$lib/constants.js';
	// @ts-expect-error Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { getStore } from '$lib/store.js';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {
		id: string;
		onSelectItem?: (id: string) => void;
		value?: string | undefined;
	}

	export let id: string;
	export let value: string = '';
	export let onSelectItem: $$Props['onSelectItem'] = undefined;
	const forwardEvents = forwardEventsBuilder(get_current_component());

	const { query, scores, active, shouldFilter, open, selectOnly, selected } = getStore();

	let itemRef: HTMLDivElement | undefined;
	$: isSelected = $selected === id;
	$: isActive = $active === id;
	$: if (!id) {
		throw Error('Each item requires a unique id');
	}

	/**
	 * Value is optional, if it's not passed by the user try to use inner text
	 */
	onMount(() => {
		if (!value) {
			value = itemRef?.innerText ?? '';
		}
	});
	$: matchesQuery = !$query || !$shouldFilter || $selectOnly ? true : !!$scores[id];
	/**
	 * The reason we hide the div instead of removing it from dom is because its our
	 * only data source
	 *
	 * Note for some reason directly setting the hidden attribute in the markup does
	 * not remove it if the value resolves to false. Is it a svelte issue?
	 */
	$: hiddenAttrs = !matchesQuery ? { hidden: !matchesQuery, 'aria-hidden': !matchesQuery } : {};
	/**
	 * Attributes to identify items and their values, we use this in ListBox
	 */
	$: navAIItemAttrs = {
		[ITEM_ATTR]: true,
		[ITEM_VALUE_ATTR]: value,
		[ITEM_ACTIVE_ATTR]: !!isActive,
		...hiddenAttrs
	};
</script>

<div
	{...$$restProps}
	{...navAIItemAttrs}
	bind:this={itemRef}
	{id}
	role="option"
	aria-selected={isSelected}
	tabindex={-1}
	on:pointermove={() => {
		if (!isActive) {
			active.set(id);
		}
	}}
	on:click={async () => {
		query.set(value);
		selected.set(id);
		onSelectItem?.(id);
		await tick();
		open.set(false);
	}}
	use:forwardEvents
>
	<slot />
</div>

<style>
	[hidden] {
		display: none !important;
	}
</style>
