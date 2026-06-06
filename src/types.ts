import type {
    antfu,
    Awaitable,
    OptionsConfig,
    TypedFlatConfigItem,
} from '@antfu/eslint-config';
import type { Linter } from 'eslint';

/**
 * The composer instance returned by every OnCourse factory. It is awaitable and
 * can be further customised with `.append()`, `.override()`, etc.
 *
 * Derived from antfu's own return type so we don't take a direct dependency on
 * `eslint-flat-config-utils`.
 */
export type Composer = ReturnType<typeof antfu>;

/**
 * Extra flat-config items consumers may pass after the options object. Mirrors
 * the shape accepted by `@antfu/eslint-config`.
 */
export type UserConfigs = Array<
    Awaitable<
        | Array<Linter.Config> |
        Array<TypedFlatConfigItem> |
        Composer |
        TypedFlatConfigItem
    >
>;

/**
 * Options shared by every OnCourse factory. Everything `@antfu/eslint-config`
 * accepts, plus a couple of OnCourse-specific integration toggles.
 */
export type OncourseOptions = Omit<TypedFlatConfigItem, 'files'> &
    OptionsConfig & {
        /**
         * Enable Tailwind CSS linting via `eslint-plugin-tailwindcss`.
         *
         * Off by default — the v4 plugin track is still beta. Requires the
         * plugin to be installed (you will be prompted).
         *
         * @default false
         */
        tailwind?: boolean;

        /**
         * Enable TanStack Query linting via `@tanstack/eslint-plugin-query`.
         *
         * @default true
         */
        query?: boolean;
    };
