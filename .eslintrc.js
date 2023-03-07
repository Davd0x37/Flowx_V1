module.exports = {
  env: {
    browser: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
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

  overrides: [],

  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules'],

  rules: {},

  settings: {
    react: {
      version: 'detect',
    },
  },
};
