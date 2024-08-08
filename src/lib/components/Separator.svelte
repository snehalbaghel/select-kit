<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	// @ts-expect-error Import from internal package
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '@smui/common/internal';

	interface $$Props extends Partial<HTMLAttributes<HTMLDivElement>> {}

	const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} role="separator" use:forwardEvents>
	<slot />
</div>
