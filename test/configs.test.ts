import type { Composer } from '../src/index';

import { describe, expect, it } from 'vitest';

import oncourse, { expo, react, sencha } from '../src/index';

/**
 * Resolve a factory's composer to a plain array of flat-config items and return
 * the set of config `name`s it produced. The composer is awaitable and resolves
 * to the final flat-config array.
 */
async function names(factory: Promise<Composer>) {
    const configs = await (await factory);
    return configs.map(c => c.name).filter(Boolean) as Array<string>;
}

describe('factories', () => {
    it('base (oncourse) builds and applies the oncourse rules layer', async () => {
        const configNames = await names(oncourse());
        expect(configNames).toContain('oncourse/rules');
    });

    it('react builds with the oncourse rules + tanstack query', async () => {
        const configNames = await names(react());
        expect(configNames).toContain('oncourse/rules');
        expect(configNames.some(n => n.includes('react'))).toBe(true);
        expect(configNames.some(n => n.includes('tanstack/query'))).toBe(true);
    });

    it('react can opt out of tanstack query', async () => {
        const configNames = await names(react({ query: false }));
        expect(configNames.some(n => n.includes('tanstack/query'))).toBe(false);
    });

    it('react can opt in to tailwind', async () => {
        const configNames = await names(react({ tailwind: true }));
        expect(configNames.some(n => n.includes('tailwind'))).toBe(true);
    });

    it('expo builds with react + the expo rules layer', async () => {
        const configNames = await names(expo());
        expect(configNames.some(n => n.includes('react'))).toBe(true);
        expect(configNames).toContain('oncourse/expo/setup');
        expect(configNames).toContain('oncourse/expo/rules');
    });

    it('sencha builds with the extjs rules and no react/typescript', async () => {
        const configNames = await names(sencha());
        expect(configNames).toContain('oncourse/sencha/setup');
        expect(configNames).toContain('oncourse/sencha/rules');
        expect(configNames.some(n => n.includes('react'))).toBe(false);
    });

    it('accepts extra user flat configs', async () => {
        const configNames = await names(
            oncourse({}, { name: 'my-custom-config', rules: { 'no-console': 'off' } }),
        );
        expect(configNames).toContain('my-custom-config');
    });
});
