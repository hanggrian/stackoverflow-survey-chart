import js from '@eslint/js';
import globals from 'globals';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
    {ignores: ['dist']},
    {
      extends: [js.configs.recommended, ...typescriptEslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': eslintPluginReactHooks,
        'react-refresh': eslintPluginReactRefresh,
      },
      rules: {
        ...eslintPluginReactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          {allowConstantExport: true},
        ],

        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
);
