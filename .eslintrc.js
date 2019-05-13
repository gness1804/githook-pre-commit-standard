

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  'rules': {
    'no-console': 'error',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-alert': 'off',
    'global-require': 'off',
    'flowtype-errors/show-errors': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'error',
    'function-paren-newline': 'off',
    'no-confusing-arrow': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

