# Phase 10 Unit Test Error — Storybook Stories and Vue DevTools

## Context

After adding Storybook, the normal unit test command reported that all test files and tests passed, but Vitest also reported multiple unhandled errors.

The output showed:

```text
Test Files  24 passed (24)
Tests       70 passed (70)
Errors      15 errors

This must be treated as a failed test gate even though the assertions passed.

Symptom

Vitest reported repeated unhandled rejections:

Vitest caught 15 unhandled errors during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

Main error:

TypeError: Cannot read properties of undefined (reading 'app')

Stack trace pointed to:

vite-plugin-vue-devtools
@vue/devtools-kit
hookable

The errors appeared while running Storybook story files such as:

src/stories/Button.stories.ts
src/stories/Header.stories.ts
src/stories/Page.stories.ts
src/components/ui/AppButton.stories.ts
src/components/ui/AppBadge.stories.ts
src/components/ui/AppInput.stories.ts
src/components/product/ProductCard.stories.ts
src/components/product/ProductFilters.stories.ts
src/components/product/ProductSpecsTable.stories.ts
src/components/cart/CartDrawer.stories.ts
Root Cause

Storybook story files were being executed by Vitest, and vite-plugin-vue-devtools was also active in the test environment.

The Vue DevTools plugin attempted to access a Vue app instance that did not exist in that Vitest/story execution context.

This caused unhandled errors even though normal assertions passed.

Why This Matters

A passing test count is not enough.

If Vitest reports unhandled errors, the test run can produce false positives. The gate should not be considered clean until the unhandled errors are removed.

Fix
1. Remove generated Storybook starter stories

The generated demo files were not part of RideCart and added noise:

if (Test-Path src\stories) {
  Remove-Item -Recurse -Force src\stories
}
2. Keep RideCart-specific stories only

Valid project stories live under:

src/components/ui/
src/components/product/
src/components/cart/
3. Use a standalone Vitest config

The Vitest config should focus on normal test files only:

test: {
  environment: 'jsdom',
  include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/storybook-static/**',
    '**/e2e/**',
    '**/*.stories.ts',
  ],
}
4. Disable Vue DevTools in test mode

Vue DevTools is useful for local development, but it should not run during unit tests.

Verification

Run:

npm run test:unit

Expected result:

No Vitest unhandled error warning
No "Cannot read properties of undefined (reading 'app')"
No Storybook starter stories being executed
Lesson

Storybook and Vitest are separate tools.

Recommended separation:

Vitest:
Unit/component behavior tests

Storybook:
Component documentation and visual review

Playwright:
End-to-end browser behavior

Vue DevTools:
Local development only

Do not allow dev-only tooling or generated Storybook starter files to pollute the normal unit-test gate.