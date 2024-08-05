import { render, screen } from '@testing-library/svelte';
import ListBox from './ListBox.svelte';
import TestBed, { TEST_LABEL } from './TestBed.svelte';

describe('ListBox Test', () => {
	render(TestBed, {
		props: {
			Component: ListBox
		}
	});
	const listbox = screen.getByRole('listbox');

	test('renders a listbox', () => {
		expect(listbox).toBeInTheDocument();
	});

	test('listbox follows all the required accessibility attributes', () => {
		expect(listbox).toHaveAttribute('id', `${TEST_LABEL}-listbox`);
		expect(listbox).toHaveAttribute('aria-label', `${TEST_LABEL} Listbox`);
	});
});
