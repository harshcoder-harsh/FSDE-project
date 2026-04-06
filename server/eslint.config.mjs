import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        node: true,
        jest: true,
        process: true,
        require: true,
        module: true,
        __dirname: true,
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
];
