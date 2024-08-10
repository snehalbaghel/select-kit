import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import examples from 'mdsvexamples/vite';

export default defineConfig({
	plugins: [sveltekit(), examples],
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./setupTest.ts']
	},
	build: {
		minify: 'esbuild'
	}
});
