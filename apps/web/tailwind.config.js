import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx,vue}'],
  theme: {
    // extend: {
    //   colors: {
    //     primary: '#1062ae',
    //     secondary: '#8dbe7e',
    //     // 'accent-light': '#5ca6c4',
    //     // 'accent-dark': '#365a68',
    //     // 'shade-light': '#d8e9d3', // Text color for light-on-dark (dark background)
    //     // 'shade-dark': '#171927', // Text color for dark-on-light (light background)
    //     success: '#3a986c',
    //     info: '#171927',
    //     warning: '#b78834',
    //     error: '#f44336',
    //     // 'color-default': '#040507',
    //     // 'color-light': 'rgba(255, 255, 255, 0.8)',
    //     // 'color-dark': 'rgba(255, 255, 255, 1)',
    //   },
    // },
  },
  plugins: [tailwindTypography, tailwindForms],
};
