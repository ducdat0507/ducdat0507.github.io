import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
	kit: {
		appDir: '_app',
		adapter: adapter({ fallback: "404.html", pages: "./dist" }),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				return;
			}
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
