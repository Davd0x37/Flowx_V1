import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer, postcssNested, postcssPresetEnv],
};
