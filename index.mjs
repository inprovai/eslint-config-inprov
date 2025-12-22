/**
 * eslint-config-inprov
 *
 * Strict ESLint configuration for TypeScript projects
 * Built on @antfu/eslint-config with additional security, quality, and complexity rules
 *
 * @example
 * // eslint.config.mjs
 * import eslintConfig from './eslint-config-inprov';
 *
 * export default eslintConfig({
 *   react: true,
 *   nextjs: true,
 *   tsconfigPath: './tsconfig.json',
 *   ignores: ['dist/**'],
 * });
 */
import antfu from '@antfu/eslint-config';

import { basePlugins, baseRules, testFileRules } from './presets/base.mjs';

/**
 * @typedef {Object} ConfigOptions
 * @property {boolean} [react=false] - Enable React rules
 * @property {boolean} [nextjs=false] - Enable Next.js rules
 * @property {string} tsconfigPath - Path to tsconfig.json
 * @property {string[]} [ignores=[]] - Additional ignore patterns
 * @property {string[]} [testFiles] - Test file patterns for relaxed rules
 * @property {string[]} [consoleAllowedFiles] - Files where console is allowed
 */

/**
 * Create ESLint configuration
 * @param {ConfigOptions} options
 * @returns {Promise<import('eslint').Linter.Config[]>}
 */
export default async function eslintConfig(options = {}) {
  const {
    react = false,
    nextjs = false,
    tsconfigPath = './tsconfig.json',
    ignores = [],
    testFiles = ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    consoleAllowedFiles = [],
  } = options;

  // Build plugins object
  const plugins = { ...basePlugins };
  const rules = { ...baseRules };

  // Load React plugins if enabled
  if (react) {
    try {
      const reactCompiler = await import('eslint-plugin-react-compiler');
      plugins['react-compiler'] = reactCompiler.default || reactCompiler;
      rules['react-compiler/react-compiler'] = 'error';
    } catch {
      // eslint-plugin-react-compiler not installed, skip
    }
  }

  // Build config array
  const configs = [
    // Base antfu config
    antfu({
      react,
      nextjs,
      typescript: {
        tsconfigPath,
      },
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
      },
      perfectionist: false,
      ignores: [
        '.next/**',
        'node_modules/**',
        '.claude/**',
        '**/*.md/**',
        'docs/**',
        ...ignores,
      ],
    }),

    // Our strict rules for TS/TSX files
    {
      files: ['**/*.{ts,tsx}'],
      plugins,
      rules,
    },

    // Relaxed rules for test files
    {
      files: testFiles,
      rules: testFileRules,
    },
  ];

  // Console allowed files override
  if (consoleAllowedFiles.length > 0) {
    configs.push({
      files: consoleAllowedFiles,
      rules: {
        'no-console': 'off',
      },
    });
  }

  // Flatten the config (antfu returns a promise of array)
  const antfuConfig = await configs[0];
  return [
    ...antfuConfig,
    ...configs.slice(1),
  ];
}

// Re-export presets for advanced usage
export { basePlugins, baseRules, testFileRules } from './presets/base.mjs';
export { loadReactPlugins, reactRules } from './presets/react.mjs';
