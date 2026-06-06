import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { ESLint, Linter } from 'eslint';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

interface SenchaPlugin extends ESLint.Plugin {
    configs: {
        recommended: { rules: Linter.RulesRecord };
    };
}

/**
 * Sencha ExtJS linting. The plugin's `configs.recommended` is still in the
 * legacy eslintrc shape (string-array `plugins`, `env`, top-level `globals`),
 * which is invalid in flat config — so we register the plugin object ourselves,
 * declare the `Ext` global, and forward only the recommended `rules`.
 *
 * The `as string` on the import specifier keeps TypeScript from trying to
 * resolve types for the untyped module; the runtime import is unaffected.
 */
export async function sencha(): Promise<Array<TypedFlatConfigItem>> {
    await ensurePackages(['@sencha/eslint-plugin-extjs']);
    const pluginSencha = await interopDefault(
        import('@sencha/eslint-plugin-extjs' as string),
    ) as SenchaPlugin;

    return [
        {
            name: 'oncourse/sencha/setup',
            plugins: {
                '@sencha/extjs': pluginSencha,
            },
            settings: {
                extjs: {
                    version: 'latest',
                },
            },
            languageOptions: {
                globals: {
                    Ext: 'readonly',
                },
            },
        },
        {
            name: 'oncourse/sencha/rules',
            rules: {
                ...pluginSencha.configs.recommended.rules,
            },
        },
    ];
}
