import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unescaped apostrophes and quotes in JSX
      'react/no-unescaped-entities': 'off',

      // Allow JSX comment text nodes without braces
      'react/jsx-no-comment-textnodes': 'off',

      // Turn type "any" errors into warnings (TypeScript still checks)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Relax Function type rule
      '@typescript-eslint/no-unsafe-function-type': 'warn',

      // Allow empty object type
      '@typescript-eslint/no-empty-object-type': 'off',

      // Unused vars only warn
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Keep this error — it's often a real bug
      'react/jsx-no-duplicate-props': 'error'
    }
  }
];

export default eslintConfig;
