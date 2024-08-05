<script context="module">
	export const TEST_LABEL = 'test-label';
</script>

<script lang="ts">
	import { setContext, type ComponentType } from 'svelte';
	import { initializeStore, type Store } from '$lib/store.js';

	export let Component: ComponentType;

	const store = initializeStore();
	store.label.set(TEST_LABEL);

	setContext<Store>('store', store);
</script>

<svelte:component this={Component} />
