import globals from "globals";
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import pluginJs from "@eslint/js";
import tslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      '@typescript-eslint': tslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      "indent": ["error", 2],
      "eol-last": ["error", "always"],
      "max-len": [
        "warn",
        {
          "code": 120,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true
        }
      ],
      "semi": ["error", "always"],
      "no-trailing-spaces": ["error"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "arrow-body-style": ["warn", "as-needed"],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': tslint,
    },
    rules: {
      ...tslint.configs.recommended.rules,
    },
  },
  {
    ignores: ['.next/*'],
  },
];
