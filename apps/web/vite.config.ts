import react from '@vitejs/plugin-react-swc';
import * as postcssNested from 'postcss-nested';
import * as postcssNested from 'postcss-nested';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
});
