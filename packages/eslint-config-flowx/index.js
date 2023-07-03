module.exports = {
  env: {
    browser: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  plugins: ['react', 'react-hooks', '@typescript-eslint'],

  // overrides: [
  //   {
  //     files: ['*.graphql'],
  //     parser: '@graphql-eslint/eslint-plugin',
  //     plugins: ['@graphql-eslint'],
  //     rules: {
  //       '@graphql-eslint/known-type-names': 'error',
  //     },
  //   },
  // ],

  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules'],

  rules: {},

  settings: {
    react: {
      version: 'detect',
    },
  },
};
