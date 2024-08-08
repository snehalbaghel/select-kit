import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svelteInlineCompile from 'vite-plugin-svelte-inline-compile';
import examples from 'mdsvexamples/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteInlineCompile(), examples],
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
