import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svelteInlineCompile from 'vite-plugin-svelte-inline-compile';

export default defineConfig({
	plugins: [sveltekit(), svelteInlineCompile()],
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
