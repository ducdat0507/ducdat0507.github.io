import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
        appDir: '_app',
		adapter: adapter({
			fallback: "404.html",
			pages: "./dist"
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				return;
			},
		},
	}
};

export default config;
