export default [
  {
    files: ['**/*.ts'],
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
  },
  {
    files: ['**/*.vue'],
    root: true,
    parser: 'vue-eslint-parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
  },
  {
    files: ['**/*.vue', '**/*.ts'],
    root: true,
    extends: ['prettier'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
    ignorePatterns: ['node_modules'],
  },
  {
    files: ['*.graphql'],
    root: true,
    extends: 'plugin:@graphql-eslint/schema-recommended',
    rules: {
      '@graphql-eslint/known-type-names': 'error',
    },
    ignorePatterns: ['node_modules'],
  },
];
