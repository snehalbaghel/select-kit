import { getContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export interface Store {
	query: Writable<string>;
	active: Writable<string | undefined>;
	selected: Writable<string | undefined>;
	listBoxRef: Writable<HTMLDivElement | undefined>;
	scores: Writable<Record<string, number>>;
	matchCount: Writable<number | undefined>;
	shouldFilter: Writable<boolean>;
	open: Writable<boolean>;
	label: Writable<string>;
	selectOnly: Writable<boolean>;
}

/**
 * Setup individual stores for all the state required
 * This should called on the Root component
 */
export const initializeStore = () => {
	const query: Store['query'] = writable('');
	const active: Store['active'] = writable(undefined);
	const selected: Store['selected'] = writable(undefined);
	const listBoxRef: Store['listBoxRef'] = writable(undefined);
	const scores: Store['scores'] = writable({});
	const matchCount: Store['matchCount'] = writable(undefined);
	const shouldFilter: Store['shouldFilter'] = writable(true);
	const open: Store['open'] = writable(false);
	const label: Store['label'] = writable('');
	const selectOnly: Store['selectOnly'] = writable(false);

	const store: Store = {
		query,
		active,
		listBoxRef,
		scores,
		matchCount,
		shouldFilter,
		selected,
		open,
		label,
		selectOnly
	};

	return store;
};

/**
 * The stores are set in context by the Root component,
 * this function fetches that store
 */
export const getStore = () => {
	const storeObj = getContext<Store>('store');
	if (!storeObj) {
		throw Error(
			"svelte-select: Unable to get context, make sure you've wrapped your components with the Root component!"
		);
	}

	return storeObj;
};
