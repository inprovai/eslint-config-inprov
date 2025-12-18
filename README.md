# eslint-config-inprov

Strict ESLint configuration for TypeScript projects with optional React/Next.js support.

Built on [@antfu/eslint-config](https://github.com/antfu/eslint-config) with additional security, code quality, and complexity rules.

## Features

- **Strict TypeScript** - 40+ type-aware rules for maximum type safety
- **Security** - eslint-plugin-security for vulnerability detection
- **Code Quality** - eslint-plugin-sonarjs for code smell detection
- **Complexity Limits** - max-depth, max-lines-per-function, cyclomatic complexity
- **React Compiler** - Optional react-compiler plugin for React 19+
- **Test Relaxations** - Automatic rule relaxation for test files

## Installation via Git Subtree

Add to your project:

```bash
git subtree add --prefix=eslint-config-inprov https://github.com/YOUR_USERNAME/eslint-config.git main --squash
```

Install peer dependencies:

```bash
npm install -D @antfu/eslint-config eslint eslint-plugin-security eslint-plugin-sonarjs typescript

# For React projects:
npm install -D eslint-plugin-react-compiler
```

## Usage

Create `eslint.config.mjs` in your project root:

```js
import eslintConfig from './eslint-config-inprov';

export default eslintConfig({
  // Enable React rules (default: false)
  react: true,

  // Enable Next.js rules (default: false)
  nextjs: true,

  // Path to tsconfig.json (required)
  tsconfigPath: './tsconfig.json',

  // Additional ignore patterns
  ignores: ['dist/**', 'build/**'],

  // Test file patterns for relaxed rules
  testFiles: ['**/__tests__/**/*.ts', '**/*.test.ts'],

  // Files where console.log is allowed
  consoleAllowedFiles: ['src/logger.ts'],
});
```

### Base TypeScript Project (no React)

```js
import eslintConfig from './eslint-config-inprov';

export default eslintConfig({
  tsconfigPath: './tsconfig.json',
});
```

### React/Next.js Project

```js
import eslintConfig from './eslint-config-inprov';

export default eslintConfig({
  react: true,
  nextjs: true,
  tsconfigPath: './tsconfig.json',
});
```

## Updating the Subtree

Pull latest changes:

```bash
git subtree pull --prefix=eslint-config-inprov https://github.com/YOUR_USERNAME/eslint-config.git main --squash
```

## Rule Categories

### Complexity Rules
- `max-depth: 4` - Maximum nesting depth
- `max-nested-callbacks: 3` - Maximum callback nesting
- `max-params: 4` - Maximum function parameters
- `max-lines-per-function: 60` - Maximum lines per function
- `complexity: 10` - Maximum cyclomatic complexity

### TypeScript Rules
- Strict type checking (`no-explicit-any`, `no-unsafe-*`)
- Consistent imports/exports (`consistent-type-imports`)
- Promise handling (`no-floating-promises`, `no-misused-promises`)
- Explicit return types and member accessibility

### Code Quality Rules
- No console statements (except in allowed files)
- Strict equality (`eqeqeq`)
- Curly braces required (`curly`)
- Prefer modern syntax (`prefer-const`, `prefer-template`)

### Test File Relaxations

Test files automatically get relaxed rules:
- No complexity limits
- `any` types allowed
- Console allowed
- Magic numbers allowed
- Explicit return types not required

## Advanced Usage

Import individual presets for customization:

```js
import { basePlugins, baseRules, testFileRules } from './eslint-config-inprov/presets/base.mjs';
```

## License

MIT
