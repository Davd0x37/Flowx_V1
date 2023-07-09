/** @type {import("prettier").Options} */
const config = {
  printWidth: 120,
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  proseWrap: 'never',
  plugins: [require('@trivago/prettier-plugin-sort-imports'), require('prettier-plugin-tailwindcss')],
  importOrder: [
    '^vue(.*)$',
    '^react(.*)$',
    '^react-dom(.*)$',
    '^react-router-dom(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@flowx/(.*)$',
    '^app/(.*)$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '(c|sc)ss$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
