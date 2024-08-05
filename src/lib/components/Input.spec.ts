import { render, screen } from '@testing-library/svelte';
import Input from './Input.svelte';
import TestBed, { TEST_LABEL } from './TestBed.svelte';

describe('Input Test', () => {
	render(TestBed, {
		props: {
			Component: Input
		}
	});
	const input = screen.getByRole('combobox');

	test('renders a combobox input', () => {
		expect(input).toBeInTheDocument();
	});

	// As per: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list
	test('input follows all the required accessibility attributes', () => {
		expect(input).toHaveAttribute('aria-autocomplete', 'list');
		expect(input).toHaveAttribute('aria-expanded', 'true');
		expect(input).toHaveAttribute('aria-controls', `${TEST_LABEL}-listbox`);
	});
});
