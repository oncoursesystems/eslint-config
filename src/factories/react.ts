import type { Composer, OncourseOptions, UserConfigs } from '../types';

import { antfu } from '@antfu/eslint-config';

import { baseOptions, baseRules } from '../base';
import { query as queryConfig } from '../plugins/query';
import { tailwind as tailwindConfig } from '../plugins/tailwind';

/**
 * ESLint config for OnCourse React (web) apps.
 *
 * antfu base + OnCourse house style + React (`@eslint-react`, react-hooks,
 * react-refresh) + TanStack Query (on by default). Tailwind is opt-in.
 *
 * @example
 * ```ts
 * import { react } from '@oncoursesystems/eslint-config';
 *
 * export default react();
 * // with options + extra flat configs:
 * export default react({ tailwind: true }, { rules: { 'no-console': 'off' } });
 * ```
 */
export async function react(
    options: OncourseOptions = {},
    ...userConfigs: UserConfigs
): Promise<Composer> {
    const { query = true, tailwind = false } = options;

    const integrations = [
        ...(query ? await queryConfig() : []),
        ...(tailwind ? await tailwindConfig() : []),
    ];

    return antfu(
        {
            ...baseOptions(options),
            react: true,
        },
        ...baseRules(options),
        ...integrations,
        ...userConfigs,
    );
}
