import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        silent: false,
        globals: true,
        clearMocks: true,
        isolate: false,
        exclude: ['./node_modules/**', './dist/**', './public/**'],
        testTimeout: 30000,
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            assets: '/src/assets',
            lib: '/src/lib',
        },
    },
});
