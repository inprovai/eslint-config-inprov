/**
 * React/Next.js ESLint rules
 * Includes: react-compiler plugin
 */

/** React-specific plugins (loaded conditionally) */
export function getReactPlugins() {
  try {
    const reactCompiler = await import('eslint-plugin-react-compiler');
    return {
      'react-compiler': reactCompiler.default || reactCompiler,
    };
  } catch {
    return {};
  }
}

/** React-specific rules */
export const reactRules = {
  'react-compiler/react-compiler': 'error',
};

/** Async loader for React plugins */
export async function loadReactPlugins() {
  try {
    const reactCompiler = await import('eslint-plugin-react-compiler');
    return {
      'react-compiler': reactCompiler.default || reactCompiler,
    };
  } catch {
    // eslint-plugin-react-compiler not installed
    return {};
  }
}
