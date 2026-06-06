import type { Composer, OncourseOptions, UserConfigs } from './types';

import { antfu } from '@antfu/eslint-config';

import { baseOptions, baseRules } from './base';

/**
 * The OnCourse base config: `@antfu/eslint-config` + OnCourse house style
 * (4-space indent, single quotes, semicolons, formatters) for plain JS/TS
 * projects. The `react`, `expo`, and `sencha` factories all build on this.
 *
 * @example
 * ```ts
 * import oncourse from '@oncoursesystems/eslint-config';
 *
 * export default oncourse();
 * ```
 */
export async function oncourse(
    options: OncourseOptions = {},
    ...userConfigs: UserConfigs
): Promise<Composer> {
    return antfu(
        baseOptions(options),
        ...baseRules(options),
        ...userConfigs,
    );
}

export default oncourse;

export { baseOptions, baseRules } from './base';
export { expo } from './factories/expo';
export { react } from './factories/react';

export { sencha } from './factories/sencha';
export type { Composer, OncourseOptions, UserConfigs } from './types';

export * from '@antfu/eslint-config';
