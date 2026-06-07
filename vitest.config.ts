import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // CI runs on resource-constrained runners where spawning real eslint
        // subprocesses (fixtures) and loading the full plugin graph is slow,
        // so allow generous timeouts.
        testTimeout: 120_000,
        hookTimeout: 120_000,
    },
});
