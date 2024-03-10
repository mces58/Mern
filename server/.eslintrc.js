module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    camelcase: ['error', { properties: 'never' }],
    curly: ['error', 'multi-line', 'consistent'],
    'linebreak-style': ['error', 'windows'],
    'no-console': ['error', { allow: ['log'] }],
    'import/no-unresolved': [
      'error',
      { commonjs: true, caseSensitive: true, ignore: ['@src'] },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'arrow-body-style': ['error', 'always'],
    'implicit-arrow-linebreak': ['error', 'below'],
    'no-tabs': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { consistent: true },
        ObjectPattern: { consistent: true },
        ImportDeclaration: { consistent: true },
        ExportDeclaration: { consistent: true },
      },
    ],
    'operator-linebreak': ['error', 'after'],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
  },
};
