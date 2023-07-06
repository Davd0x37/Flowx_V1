module.exports = {
  extends: ['@flowx/eslint-config-flowx'],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.cjs', 'tsconfig.json']
};
