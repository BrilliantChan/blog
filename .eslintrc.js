module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [
      'warn',
      4
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    camelcase: 'off',
    'vue/html-indent': ['error', 4, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/multi-word-component-names': [
      'off'
    ],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: 1
    }],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    ignoreProperties: 0,
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea']
    }],
    'import/no-extraneous-dependencies': 0,
    'import/no-useless-path-segments': 'off',
    'no-underscore-dangle': [
      'error'
    ],
    'no-tabs': 0,
    'no-cond-assign': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': 0,
    'no-extra-semi': 2,
    'no-inner-declarations': [
      'error',
      'functions'
    ],
    'no-irregular-whitespace': 2,
    'no-obj-calls': 2,
    'no-regex-spaces': 2,
    'no-sparse-arrays': 2,
    'no-unreachable': 2,
    'use-isnan': 2,
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: true
      }
    ],
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true
      }
    ],
    'block-scoped-var': 2,
    complexity: 0,
    'default-case': 0,
    'no-alert': 1,
    'guard-for-in': 0,
    'no-eq-null': 2,
    'no-lone-blocks': 2,
    'no-multi-spaces': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-param-reassign': 0,
    'no-redeclare': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-unused-expressions': 2,
    'no-warning-comments': [
      1,
      {
        terms: [
          'todo',
          'fixme',
          'any other term'
        ]
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'no-undef': 0,
    'sort-vars': 0,
    'no-mixed-spaces-and-tabs': [
      2,
      'smart-tabs'
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 2
      }
    ],
    'no-trailing-spaces': 2,
    quotes: [
      1,
      'single',
      'avoid-escape'
    ],
    semi: [
      2,
      'always'
    ],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'linebreak-style': [
      0,
      'error',
      'windows'
    ],
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 4,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'max-depth': [
      'error',
      4
    ],
    'max-lines': [
      'error',
      {
        max: 400,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-nested-callbacks': [
      'error',
      3
    ],
    'import/no-cycle': 'off',
    'import/no-dynamic-require': 0,
    'import/no-dynamic-import': 0,
    'import/extensions': [
      'off',
      {
        js: 'never',
        jsx: 'never',
        vue: 'never',
        json: 'never'
      }
    ]
  }
};
