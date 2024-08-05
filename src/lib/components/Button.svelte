<script lang="ts">
	import { getStore } from '$lib/store.js';
	// @ts-ignore Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends Partial<HTMLAttributes<HTMLButtonElement>> {
		label?: string;
	}

	export const label: string | undefined = undefined;

	const { open, label: labelStore } = getStore();
	const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<button
	{...$$restProps}
	id="{$labelStore}-button"
	aria-label={label || `${$labelStore} Button`}
	aria-controls="{$labelStore}-listbox"
	aria-expanded={open ? 'true' : 'false'}
	tabindex="-1"
	on:click={() => open.update((o) => !o)}
	use:forwardEvents
>
	<slot open={$open} />
</button>
