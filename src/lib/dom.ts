import { ITEM_ATTR } from '$lib/constants.js';

/**
 * Gets the list of visible items within a listbox
 * @param listbox The parent element within which the items reside
 * @returns
 */
function getVisibleItems(listbox: HTMLDivElement) {
	return listbox.querySelectorAll(`[${ITEM_ATTR}]:not([hidden])`);
}

export function getFirstElementId(listbox: HTMLDivElement) {
	const visibleItems = getVisibleItems(listbox);
	const firstVisibleItem = visibleItems?.[0];

	if (!firstVisibleItem) {
		return;
	}

	const firstVisibleItemID = firstVisibleItem.getAttribute('id');
	if (!firstVisibleItemID) {
		return;
	}

	return firstVisibleItemID;
}

export function getRelativeElementId(
	parent: HTMLDivElement,
	relativeChangeIndex: number,
	currentActive?: string
) {
	const visibleItems = getVisibleItems(parent);
	let currentIndex = 0;
	let found = false;
	let nextIndex;

	if (currentActive) {
		visibleItems.forEach((item) => {
			if (found) {
				return;
			}

			if (item.getAttribute('id') === currentActive && !found) {
				found = true;
			} else {
				currentIndex += 1;
			}
		});

		nextIndex = (currentIndex + relativeChangeIndex + visibleItems.length) % visibleItems.length;
	} else {
		// Select first or last element based on the change index sign if no current active element
		nextIndex = relativeChangeIndex > 0 ? 0 : visibleItems.length - 1;
	}

	const nextItemID = visibleItems[nextIndex].getAttribute('id');
	return nextItemID ?? undefined;
}
