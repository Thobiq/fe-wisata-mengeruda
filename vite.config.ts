import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const backendUrl = env.VITE_PUBLIC_BACKEND_URL || env.PUBLIC_BACKEND_URL || 'http://localhost:8001';

	return {
		plugins: [
			sveltekit(),
			tailwindcss()
		],
		server: {
			port: 5175,
			proxy: {
				'/api': {
					target: backendUrl,
					changeOrigin: true,
				},
				'/sanctum': {
					target: backendUrl,
					changeOrigin: true,
				},
				'/storage': {
					target: backendUrl,
					changeOrigin: true,
				}
			}
		}
	};
});
