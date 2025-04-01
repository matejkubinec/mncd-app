import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      root: '.',
    }),
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {}]],
    }),
  ],
  resolve: {
    conditions: ['mui-modern', 'module', 'browser', 'development|production'],
    alias: {
      '@*': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    hmr: {
      protocol: 'ws',
    },
    proxy: {
      '/api': {
        target: 'https://mncd.kubine.cc',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
