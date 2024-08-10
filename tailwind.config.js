/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export const content = ['./src/**/*.{html,js,svelte,ts}'];
export const theme = {
	extend: {
		fontFamily: {
			sans: ['Inter var', ..._fontFamily.sans]
		}
	}
};
export const plugins = [typography];
export const darkMode = 'selector'