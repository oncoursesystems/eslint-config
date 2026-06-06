import type { Composer, OncourseOptions, UserConfigs } from '../types';

import { antfu } from '@antfu/eslint-config';

import { baseOptions, baseRules } from '../base';
import { expo as expoConfig } from '../plugins/expo';
import { query as queryConfig } from '../plugins/query';
import { tailwind as tailwindConfig } from '../plugins/tailwind';

/**
 * ESLint config for OnCourse React Native / Expo apps.
 *
 * Everything the `react` config provides, plus `eslint-plugin-expo` rules and
 * React Native ambient globals. TanStack Query is on by default; Tailwind
 * (e.g. NativeWind) is opt-in.
 *
 * @example
 * ```ts
 * import { expo } from '@oncoursesystems/eslint-config';
 *
 * export default expo();
 * ```
 */
export async function expo(
    options: OncourseOptions = {},
    ...userConfigs: UserConfigs
): Promise<Composer> {
    const { query = true, tailwind = false } = options;

    const integrations = [
        ...(query ? await queryConfig() : []),
        ...(tailwind ? await tailwindConfig() : []),
        ...(await expoConfig()),
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
