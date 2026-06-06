import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

/**
 * TanStack Query recommended flat config. The plugin already ships a ready-made
 * flat-config array under `configs['flat/recommended']`, so we just forward it.
 */
export async function query(): Promise<Array<TypedFlatConfigItem>> {
    await ensurePackages(['@tanstack/eslint-plugin-query']);
    const pluginQuery = await interopDefault(import('@tanstack/eslint-plugin-query'));

    return pluginQuery.configs['flat/recommended'] as Array<TypedFlatConfigItem>;
}
