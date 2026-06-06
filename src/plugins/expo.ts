import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { ESLint } from 'eslint';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

/**
 * Expo / React Native specific linting. `eslint-plugin-expo` only exports
 * `{ meta, rules }` (no preset config) and ships no types, so we register the
 * plugin, enable its rules, and add the React Native ambient globals that
 * antfu's browser+node globals don't cover.
 *
 * The `as string` on the import specifier keeps TypeScript from trying to
 * resolve types for the untyped module; the runtime import is unaffected.
 */
export async function expo(): Promise<Array<TypedFlatConfigItem>> {
    await ensurePackages(['eslint-plugin-expo']);
    const pluginExpo = await interopDefault(import('eslint-plugin-expo' as string)) as ESLint.Plugin;

    return [
        {
            name: 'oncourse/expo/setup',
            plugins: {
                expo: pluginExpo,
            },
            languageOptions: {
                globals: {
                    __DEV__: 'readonly',
                    ErrorUtils: 'readonly',
                },
            },
        },
        {
            name: 'oncourse/expo/rules',
            rules: {
                'expo/no-dynamic-env-var': 'error',
                'expo/no-env-var-destructuring': 'error',
                'expo/prefer-box-shadow': 'warn',
                'expo/use-dom-exports': 'warn',
            },
        },
    ];
}
