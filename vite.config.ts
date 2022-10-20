import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.');
    return {
        server: {
            open: true,
            hmr: {
                host: 'localhost'
            },
        },
        resolve: {},
        plugins: [react(), tsconfigPaths(), htmlPlugin(env)]
    }
});

const htmlPlugin = (env: ReturnType<typeof loadEnv>) => ({
    name: "html-transform",
    transformIndexHtml: {
        enforce: "pre" as const,
        transform: (html: string): string =>
            html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
});
