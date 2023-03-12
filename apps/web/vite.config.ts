/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import postcss from './postcss.config';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
