import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import postcss from './postcss.config';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      },
    },
  ],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      app: resolve(__dirname, './src'),
      features: resolve(__dirname, './src/features'),
    },
  },
});
