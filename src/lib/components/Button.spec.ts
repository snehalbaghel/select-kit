import { render, screen } from '@testing-library/svelte';
import Button from './Button.svelte';
import TestBed, { TEST_LABEL } from './TestBed.svelte';

describe('Button Test', () => {
	render(TestBed, {
		props: {
			Component: Button
		}
	});
	const button = screen.getByRole('button');

	test('renders a button', () => {
		expect(button).toBeInTheDocument();
	});

	test('button follows all the required accessibility attributes', () => {
		expect(button).toHaveAttribute('aria-label', `${TEST_LABEL} Button`);
		expect(button).toHaveAttribute('id', `${TEST_LABEL}-button`);
		expect(button).toHaveAttribute('tabindex', '-1');
		expect(button).toHaveAttribute('aria-controls', `${TEST_LABEL}-listbox`);
	});
});
