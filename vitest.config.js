import {defineWorkspace} from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  {
    test: {
      include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      testTimeout: 30_000,
      hookTimeout: 30_000,
    },
  },
]);
