<div align="center">
  <img width="250" alt="OnCourse Systems logo" src="https://raw.githubusercontent.com/oncoursesystems/.github/master/assets/logo.jpg" />
  <br/><br/>

# `@oncoursesystems/eslint-config`

OnCourse Systems' ESLint config presets for JS/TS, React, React Native/Expo, and Sencha ExtJS.

  <a href="https://github.com/oncoursesystems/eslint-config/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="OnCourse Systems ESLint config is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.com/package/@oncoursesystems/eslint-config">
    <img src="https://img.shields.io/npm/v/@oncoursesystems/eslint-config.svg" alt="NPM version" />
  </a>
</div>

## What's in the box

Built on top of [`@antfu/eslint-config`](https://github.com/antfu/eslint-config) (v9) with OnCourse house style (4-space indent, single quotes, semicolons, Prettier-backed formatters). Requires **ESLint 10** and the flat config format.

Four factories are exported:

| Factory              | Use it for                       | Includes                                                        |
| -------------------- | -------------------------------- | --------------------------------------------------------------- |
| `oncourse` (default) | Plain JS/TS libraries & services | antfu base + OnCourse house style                               |
| `react`              | React web apps                   | base + React (`@eslint-react`, hooks, refresh) + TanStack Query |
| `expo`               | React Native / Expo apps         | `react` + `eslint-plugin-expo` rules + RN globals               |
| `sencha`             | Sencha ExtJS apps                | lean classic-JS base + `@sencha/eslint-plugin-extjs`            |

## Install

```bash
# pnpm
pnpm add -D eslint @oncoursesystems/eslint-config

# npm
npm install -D eslint @oncoursesystems/eslint-config
```

Create an `eslint.config.{js,ts,mjs}` file in your project root and pick the factory that matches your project:

```ts
// eslint.config.ts — plain JS/TS project
import oncourse from '@oncoursesystems/eslint-config';

export default oncourse();
```

```ts
// eslint.config.ts — React web app
import { react } from '@oncoursesystems/eslint-config';

export default react();
```

```ts
// eslint.config.ts — React Native / Expo app
import { expo } from '@oncoursesystems/eslint-config';

export default expo();
```

```ts
// eslint.config.ts — Sencha ExtJS app
import { sencha } from '@oncoursesystems/eslint-config';

export default sencha();
```

The first time you run `npx eslint`, you'll be prompted to install any framework-specific plugins that aren't present yet (React, Expo, Sencha, TanStack Query, Tailwind). You can also install them up front:

```bash
# React / Expo
pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh @tanstack/eslint-plugin-query

# Expo (in addition to the React plugins above)
pnpm add -D eslint-plugin-expo

# Sencha ExtJS
pnpm add -D @sencha/eslint-plugin-extjs
```

## Add scripts to package.json

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

## Options

Each factory accepts the same `(options?, ...userConfigs)` signature. `options` is passed straight through to `@antfu/eslint-config`, so anything documented in [antfu's customization guide](https://github.com/antfu/eslint-config#customization) works here too. Additional flat-config objects can be appended after it.

```ts
// eslint.config.ts
import { react } from '@oncoursesystems/eslint-config';

export default react(
    // Configure integrations here (antfu options + OnCourse flags)
    {
        typescript: {
            tsconfigPath: './tsconfig.json',
        },
    },
    // Any additional objects are passed in as ESLint flat configs
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        rules: {
            'ts/typedef': 'off',
        },
    },
);
```

### OnCourse-specific flags

These are available on the `react` and `expo` factories:

| Flag       | Default | Description                                                                                                                                           |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`    | `true`  | Enable [`@tanstack/eslint-plugin-query`](https://tanstack.com/query) recommended rules.                                                               |
| `tailwind` | `false` | Enable [`eslint-plugin-tailwindcss`](https://github.com/francoismassart/eslint-plugin-tailwindcss) (v4 track). Opt-in while the v4 plugin is in beta. |

```ts
import { react } from '@oncoursesystems/eslint-config';

export default react({
    tailwind: true, // turn on Tailwind linting
    query: false, // turn off TanStack Query linting
});
```

## Migrating from v1 to v2

v2 is a breaking change. The headline differences:

- **ESLint 10 is required** (v1 targeted ESLint 9). Bump `eslint` to `^10` in your project.
- **The `react` / `expo` / `sencha` boolean options are gone.** Instead of one `oncourse()` factory with flags, there are now dedicated factory exports. Pick the one for your project.
- **Plain JS/TS projects are unchanged** — the default `oncourse()` export still works the same way.
- **Tailwind is now opt-in** via the `tailwind` flag (and uses the `eslint-plugin-tailwindcss` v4 track).
- **TanStack Query is on by default** in the `react` and `expo` configs; disable it with `query: false`.

Update your `eslint.config.{js,ts}`:

```diff
- import oncourse from '@oncoursesystems/eslint-config';
+ import { react } from '@oncoursesystems/eslint-config';

- export default oncourse({ react: true });
+ export default react();
```

```diff
- import oncourse from '@oncoursesystems/eslint-config';
+ import { expo } from '@oncoursesystems/eslint-config';

- export default oncourse({ expo: true });
+ export default expo();
```

```diff
- import oncourse from '@oncoursesystems/eslint-config';
+ import { sencha } from '@oncoursesystems/eslint-config';

- export default oncourse({ sencha: true });
+ export default sencha();
```

Anything you previously passed to `oncourse()` (antfu options, extra flat-config objects) still works — just move it into the new factory call, e.g. `react({ typescript: { tsconfigPath: './tsconfig.json' } }, { rules: { /* ... */ } })`.

## Config VS Code auto-fix on save

Install the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and add to `.vscode/settings.json`:

```json
{
    // Disable the default formatter, use eslint instead
    "prettier.enable": false,
    "editor.formatOnSave": false,

    // Auto-fix on save
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "never"
    },

    // Silence the stylistic rules in your IDE, but still auto-fix them
    "eslint.rules.customizations": [
        { "rule": "style/*", "severity": "off", "fixable": true },
        { "rule": "format/*", "severity": "off", "fixable": true },
        { "rule": "*-indent", "severity": "off", "fixable": true },
        { "rule": "*-spacing", "severity": "off", "fixable": true },
        { "rule": "*-spaces", "severity": "off", "fixable": true },
        { "rule": "*-order", "severity": "off", "fixable": true },
        { "rule": "*-dangle", "severity": "off", "fixable": true },
        { "rule": "*-newline", "severity": "off", "fixable": true },
        { "rule": "*quotes", "severity": "off", "fixable": true },
        { "rule": "*semi", "severity": "off", "fixable": true }
    ],

    // Enable eslint for all supported languages
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "markdown",
        "json",
        "jsonc",
        "toml",
        "xml",
        "css",
        "less",
        "scss"
    ]
}
```

## View enabled rules

From the project root that contains your `eslint.config.{js,ts}`:

```bash
npx @eslint/config-inspector
```

## Release & publish

Make sure you're authenticated to npm (`npm login`), then run:

```sh
pnpm run release
```

This bumps the version, publishes to [NPM](https://www.npmjs.com/package/@oncoursesystems/eslint-config), and creates a tagged GitHub release.

## Credits

Built on top of Anthony Fu's excellent [`@antfu/eslint-config`](https://github.com/antfu/eslint-config).
