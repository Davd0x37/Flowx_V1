/** @type {import("prettier").Options} */
const config = {
  printWidth: 120,
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: [require('@trivago/prettier-plugin-sort-imports'), require('prettier-plugin-tailwindcss')],
  importOrder: [
    '^dotenv(.*)$',
    '^vue(.*)$',
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
