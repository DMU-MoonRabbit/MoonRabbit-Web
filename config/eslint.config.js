import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Import 순서 및 그룹핑 자동 정렬
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',    // Node.js 내장 모듈 (fs, path 등)
            'external',   // 외부 패키지 (react, axios 등)
            'internal',   // '@/' 절대 경로
            'parent',     // 상위 폴더 ('../')
            'sibling',    // 같은 폴더 ('./')
            'index',      // index 파일
            'object',
            'type'        // TypeScript 타입 import
          ],
          'pathGroups': [
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'before'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          }
        }
      ],
      // 중복 import 방지
      'no-duplicate-imports': 'error',
    },
  },
)
