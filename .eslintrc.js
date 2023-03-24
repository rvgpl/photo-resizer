module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:markdown/recommended',
  ],
  env: {
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest', 'markdown'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
  },
};
