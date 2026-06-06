import type { Composer, OncourseOptions, UserConfigs } from '../types';

import { antfu } from '@antfu/eslint-config';

import { baseOptions, baseRules } from '../base';
import { sencha as senchaConfig } from '../plugins/sencha';

/**
 * ESLint config for OnCourse Sencha ExtJS apps.
 *
 * Deliberately lean: OnCourse house style over classic JavaScript only — no
 * TypeScript program, no React/JSX — plus the `@sencha/eslint-plugin-extjs`
 * recommended rules and the `Ext` global. ExtJS is global-heavy classic JS, so
 * the TypeScript and React layers are intentionally disabled.
 *
 * @example
 * ```ts
 * import { sencha } from '@oncoursesystems/eslint-config';
 *
 * export default sencha();
 * ```
 */
export async function sencha(
    options: OncourseOptions = {},
    ...userConfigs: UserConfigs
): Promise<Composer> {
    return antfu(
        {
            ...baseOptions(options),
            jsx: false,
            react: false,
            typescript: false,
        },
        ...baseRules(options),
        ...(await senchaConfig()),
        ...userConfigs,
    );
}
