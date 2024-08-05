<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext } from 'svelte';
	// @ts-ignore Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import { initializeStore, type Store } from '$lib/store.js';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {
		label: string;
	}

	export let label: string;

	const forwardEvents = forwardEventsBuilder(get_current_component());
	const store = initializeStore();
	const { label: labelStore, query, open, active, selected } = store;

	$: labelStore.set(label);

	setContext<Store>('store', store);
</script>

<div {...$$restProps} use:forwardEvents>
	<!-- Label has SR-ONLY styles applied: https://tailwindcss.com/docs/screen-readers -->
	<label
		style={`
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		`}
		for="{label}-input"
		id="{label}-label"
	/>
	<slot query={$query} open={$open} active={$active} selected={$selected} />
</div>
