module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: 'off',
    'max-len': [
      1,
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
