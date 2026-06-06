import type { OncourseOptions } from './types';
import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';

import process from 'node:process';

/**
 * Import groups for `perfectionist/sort-imports`, ordered the way OnCourse
 * codebases expect them.
 */
// perfectionist v5 names import groups as `modifier-selector` (e.g. `type-internal`),
// and dropped the `object` import selector. These are the v5-valid equivalents of
// the original OnCourse groups, keeping type imports grouped at the top.
const SORT_GROUPS: Array<string | [string, ...Array<string>]> = [
    'type',
    ['builtin', 'external'],
    'type-internal',
    'internal',
    ['type-parent', 'type-sibling', 'type-index'],
    ['parent', 'sibling', 'index'],
    'unknown',
];

/**
 * The OnCourse "house style" options layered on top of `@antfu/eslint-config`:
 * 4-space indent, single quotes, semicolons, Prettier-backed formatters for
 * non-JS files. Consumer-supplied options always win.
 */
export function baseOptions(
    options: OncourseOptions = {},
): Omit<TypedFlatConfigItem, 'files'> & OptionsConfig {
    const { tailwind: _tailwind, query: _query, ...rest } = options;

    return {
        name: 'oncourse',
        formatters: true,
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
        yaml: false,
        ...rest,
    };
}

/**
 * OnCourse rule overrides applied on top of antfu's defaults. These are the
 * cross-language house preferences — they intentionally do NOT re-add the old
 * `ts/*` overrides (array-type/accessibility/redeclare/use-before-define),
 * which antfu 9's defaults now handle better.
 *
 * The `style/*` overrides are only emitted when stylistic linting is enabled,
 * since antfu doesn't register the `style` plugin when `stylistic: false`.
 */
export function baseRules(options: OncourseOptions = {}): Array<TypedFlatConfigItem> {
    const stylisticEnabled = options.stylistic !== false;

    return [
        {
            name: 'oncourse/rules',
            rules: {
                'perfectionist/sort-imports': [
                    'error',
                    {
                        groups: SORT_GROUPS,
                        internalPattern: ['^#/.+'],
                        type: 'natural',
                    },
                ],
                'antfu/if-newline': 'off',
                'antfu/top-level-function': 'off',
                'curly': ['error', 'multi-line'],
                'no-console': [
                    process.env.NODE_ENV === 'production' ? 'error' : 'warn',
                    {
                        allow: ['table', 'info', 'warn', 'error'],
                    },
                ],
                'node/prefer-global/process': 'warn',
            },
        },
        ...(stylisticEnabled
            ? [{
                    name: 'oncourse/stylistic',
                    rules: {
                        'style/comma-dangle': 'off',
                        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
                        'style/jsx-one-expression-per-line': 'off',
                        'style/operator-linebreak': [
                            'error',
                            'after',
                            { overrides: { '?': 'before', ':': 'before' } },
                        ],
                    } as TypedFlatConfigItem['rules'],
                }]
            : []),
    ];
}
