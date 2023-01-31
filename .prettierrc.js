module.exports = {
  printWidth: 120,
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  proseWrap: 'never',
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  overrides: [
    {
      files: '*.scss',
      options: {
        tabWidth: 2,
        useTabs: true,
        singleQuote: true,
      },
    },
  ],
  importOrder: [
    '^react(.*)$',
    '^react-dom(.*)$',
    '^react-router-dom(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@flowx/(.*)$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '(c|sc)ss$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
