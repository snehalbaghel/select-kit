<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { NO_RESULT_ATTR } from '$lib/constants.js';
	// @ts-expect-error Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { getStore } from '$lib/store.js';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {}
	const { matchCount, query } = getStore();

	const forwardEvents = forwardEventsBuilder(get_current_component());

	$: noResults = $query && $matchCount === 0;
	$: hiddenAttrs = !noResults ? { hidden: true, 'aria-hidden': true } : {};
	$: noResultAttrs = { [NO_RESULT_ATTR]: '', ...hiddenAttrs };
</script>

<div {...$$restProps} {...noResultAttrs} role="presentation" use:forwardEvents>
	<slot />
</div>

<style>
	[hidden] {
		display: none !important;
	}
</style>
