/**
 * Base ESLint rules for TypeScript projects
 * Includes: security, sonarjs, complexity, strict TypeScript, code quality
 */
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';

export const basePlugins = {
  security,
  sonarjs,
};

export const baseRules = {
  // ═══════════════════════════════════════════════════════════════════════════
  // PLUGINS
  // ═══════════════════════════════════════════════════════════════════════════
  ...security.configs.recommended.rules,
  ...sonarjs.configs.recommended.rules,
  'security/detect-unsafe-regex': 'off', // Duplicates sonarjs/slow-regex
  'sonarjs/no-unused-vars': 'off', // Duplicates ts/no-unused-vars
  'sonarjs/unused-import': 'off', // Handled by antfu

  // ═══════════════════════════════════════════════════════════════════════════
  // UNICORN (antfu overrides)
  // ═══════════════════════════════════════════════════════════════════════════
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/filename-case': 'off',
  'unicorn/no-null': 'off',

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPLEXITY
  // ═══════════════════════════════════════════════════════════════════════════
  'max-depth': ['error', 4],
  'max-nested-callbacks': ['error', 3],
  'max-params': ['error', 4],
  'max-lines-per-function': ['error', { max: 60, skipBlankLines: true, skipComments: true }],
  'complexity': ['error', 10],

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPESCRIPT
  // ═══════════════════════════════════════════════════════════════════════════
  'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  'ts/no-explicit-any': 'error',
  'ts/consistent-type-imports': 'error',
  'ts/consistent-type-definitions': ['error', 'interface'],
  'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
  'ts/no-floating-promises': 'error',
  'ts/no-misused-promises': 'error',
  'ts/await-thenable': 'error',
  'ts/require-await': 'error',
  'ts/promise-function-async': 'error',
  'ts/no-unnecessary-type-assertion': 'error',
  'ts/no-unnecessary-condition': 'error',
  'ts/no-unnecessary-type-parameters': 'error',
  'ts/no-unnecessary-boolean-literal-compare': 'error',
  'ts/prefer-nullish-coalescing': 'error',
  'ts/prefer-optional-chain': 'error',
  'ts/strict-boolean-expressions': 'error',
  'ts/no-non-null-assertion': 'error',
  'ts/no-confusing-void-expression': 'error',
  'ts/no-unsafe-assignment': 'error',
  'ts/no-unsafe-member-access': 'error',
  'ts/no-unsafe-call': 'error',
  'ts/no-unsafe-return': 'error',
  'ts/no-unsafe-argument': 'error',
  'ts/no-shadow': 'error',
  'ts/no-require-imports': 'error',
  'ts/no-inferrable-types': 'error',
  'ts/no-duplicate-type-constituents': 'error',
  'ts/no-redundant-type-constituents': 'error',
  'ts/no-import-type-side-effects': 'error',
  'ts/no-useless-empty-export': 'error',
  'ts/no-array-delete': 'error',
  'ts/ban-ts-comment': ['error', {
    'ts-expect-error': 'allow-with-description',
    'ts-ignore': false,
    'ts-nocheck': false,
    'minimumDescriptionLength': 10,
  }],
  'ts/explicit-function-return-type': ['error', {
    allowExpressions: true,
    allowTypedFunctionExpressions: true,
    allowHigherOrderFunctions: true,
  }],
  'ts/explicit-member-accessibility': ['error', {
    accessibility: 'explicit',
    overrides: { constructors: 'no-public' },
  }],
  'ts/prefer-readonly': 'error',
  'ts/prefer-as-const': 'error',
  'ts/prefer-find': 'error',
  'ts/prefer-includes': 'error',
  'ts/prefer-string-starts-ends-with': 'error',
  'ts/prefer-reduce-type-parameter': 'error',
  'ts/switch-exhaustiveness-check': 'error',
  'ts/unified-signatures': 'error',
  'ts/method-signature-style': ['error', 'property'],
  'ts/array-type': ['error', { default: 'array-simple' }],
  'ts/consistent-generic-constructors': ['error', 'constructor'],
  'ts/return-await': ['error', 'always'],
  'ts/no-magic-numbers': ['error', {
    ignore: [],
    ignoreArrayIndexes: true,
    ignoreDefaultValues: true,
    ignoreEnums: true,
    ignoreNumericLiteralTypes: true,
    ignoreReadonlyClassProperties: true,
    ignoreTypeIndexes: true,
  }],
  'no-return-await': 'off',
  'no-magic-numbers': 'off',

  // ═══════════════════════════════════════════════════════════════════════════
  // CODE QUALITY
  // ═══════════════════════════════════════════════════════════════════════════
  'no-console': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-extend-native': 'error',
  'no-new-wrappers': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'no-labels': 'error',
  'no-with': 'error',
  'no-param-reassign': 'error',
  'no-multi-assign': 'error',
  'no-sequences': 'error',
  'no-lonely-if': 'error',
  'no-nested-ternary': 'error',
  'no-unneeded-ternary': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-throw-literal': 'error',
  'no-useless-return': 'error',
  'no-useless-rename': 'error',
  'no-template-curly-in-string': 'error',
  'no-unreachable-loop': 'error',
  'no-implicit-coercion': 'error',
  'no-restricted-syntax': ['error', {
    selector: 'UnaryExpression[operator=\'void\'][argument.value=0]',
    message: 'Do not use \'void 0\' as a substitute for \'undefined\'.',
  }],
  'eqeqeq': ['error', 'always'],
  'curly': ['error', 'all'],
  'radix': 'error',
  'yoda': 'error',
  'guard-for-in': 'error',
  'default-case-last': 'error',
  'grouped-accessor-pairs': ['error', 'getBeforeSet'],
  'prefer-const': 'error',
  'prefer-template': 'error',
  'prefer-spread': 'error',
  'prefer-rest-params': 'error',
  'prefer-object-spread': 'error',
  'prefer-destructuring': ['error', { array: false, object: true }],
  'object-shorthand': ['error', 'always'],
  'antfu/no-import-dist': 'error',
  'antfu/no-import-node-modules-by-path': 'error',
};

/** Rules to relax for test files */
export const testFileRules = {
  'max-lines-per-function': 'off',
  'complexity': 'off',
  'sonarjs/cognitive-complexity': 'off',
  'no-console': 'off',
  'ts/no-magic-numbers': 'off',
  'ts/no-explicit-any': 'off',
  'ts/no-unsafe-assignment': 'off',
  'ts/no-unsafe-member-access': 'off',
  'ts/no-unsafe-call': 'off',
  'ts/no-unsafe-return': 'off',
  'ts/no-unsafe-argument': 'off',
  'ts/explicit-function-return-type': 'off',
  'ts/no-non-null-assertion': 'off',
  'no-void': 'off',
  'ts/no-confusing-void-expression': 'off',
  'unicorn/prefer-top-level-await': 'off',
  'ts/await-thenable': 'off',
  'ts/no-floating-promises': 'off',
  'ts/require-await': 'off',
};
