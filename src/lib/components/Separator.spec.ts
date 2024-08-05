import { render, screen } from '@testing-library/svelte';
import Separator from './Separator.svelte';

describe('Separator Test', () => {
	render(Separator);
	const separator = screen.getByRole('separator');

	test('renders a separator', () => {
		expect(separator).toBeInTheDocument();
	});
});
