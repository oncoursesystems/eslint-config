import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

interface TailwindPlugin {
    configs: Record<string, Array<Linter.Config>>;
}

/**
 * Tailwind CSS recommended flat config (opt-in). Uses the `eslint-plugin-tailwindcss`
 * v4 track, which ships a flat-config array under `configs['flat/recommended']`.
 *
 * The `as string` on the import specifier keeps TypeScript from trying to
 * resolve types for the untyped module; the runtime import is unaffected.
 */
export async function tailwind(): Promise<Array<TypedFlatConfigItem>> {
    await ensurePackages(['eslint-plugin-tailwindcss']);
    const pluginTailwind = await interopDefault(
        import('eslint-plugin-tailwindcss' as string),
    ) as TailwindPlugin;

    return pluginTailwind.configs['flat/recommended'] as Array<TypedFlatConfigItem>;
}
