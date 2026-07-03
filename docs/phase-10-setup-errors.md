# Phase 10 Other Setup Errors — Storybook, CSS, and Config Boundaries

## Context

Phase 10 added Storybook component documentation. During setup, several non-component errors appeared.

These errors were useful because they clarified the boundaries between:

```text
Vite app config
Vitest unit-test config
Storybook preview config
Project CSS setup
Error 1 — Storybook Could Not Resolve Global CSS
Symptom

Storybook failed to build the preview:

Failed to build the preview

[UNRESOLVED_IMPORT] Could not resolve '../src/assets/main.css' in .storybook/preview.ts

The failing import was:

import '../src/assets/main.css'
Root Cause

Storybook was configured to load the app's global CSS file, but the file did not exist yet:

src/assets/main.css
Fix

Create the missing CSS file:

New-Item -ItemType Directory -Force -Path src\assets | Out-Null

@'
* {
  box-sizing: border-box;
}

html {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #111827;
  background: #ffffff;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: #ffffff;
}

button,
input,
select,
textarea {
  font: inherit;
}

img {
  max-width: 100%;
}

a {
  color: inherit;
}

#app {
  min-height: 100vh;
}
'@ | Set-Content -Path src\assets\main.css -Encoding UTF8

Also confirm the app imports it:

import './assets/main.css'
Lesson

Storybook preview should use the same global CSS baseline as the app, but the file must actually exist.

Error 2 — Vitest Could Not Merge Callback Vite Config
Symptom

Vitest failed to start:

failed to load config from D:\MyApps\ridecart\vitest.config.ts

Error: Cannot merge config in form of callback
Root Cause

vite.config.ts had been changed into a callback-style config:

export default defineConfig(({ mode }) => {
  return {
    // config
  }
})

But vitest.config.ts was still trying to merge the Vite config.

Vitest/Vite cannot merge a callback-style config directly through mergeConfig.

Fix

Make vitest.config.ts standalone instead of merging vite.config.ts.

Correct pattern:

/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

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
  },
})
Lesson

Keep configs separated:

vite.config.ts
App dev/build config

vitest.config.ts
Unit-test config

.storybook/preview.ts
Storybook render environment

Avoid merging callback-style Vite configs into Vitest.

Error 3 — Playwright No Tests Found From Windows Path
Symptom

Running this command produced:

Error: No tests found.
Make sure that arguments are regular expressions matching test files.

Problem command:

npx playwright test .\e2e\cart-flow.spec.ts
Root Cause

Playwright treats the path argument like a pattern. Windows backslashes can cause matching issues.

Fix

Use forward slashes:

npx playwright test e2e/cart-flow.spec.ts

Or run by test title:

npx playwright test -g "browsing to cart flow"
Lesson

For Playwright CLI on Windows, prefer forward-slash paths.

Error 4 — Storybook Generated Extra Demo Files
Symptom

After Storybook initialization, extra files appeared under:

src/stories/

Examples:

Button.stories.ts
Header.stories.ts
Page.stories.ts

These were not RideCart components.

Root Cause

Storybook initialization creates demo stories by default.

Fix

Remove them:

if (Test-Path src\stories) {
  Remove-Item -Recurse -Force src\stories
}
Lesson

After Storybook init, remove generated demo files unless they are intentionally part of the project.

Phase 10 Final Setup Rule

Keep this separation:

npm run dev
Runs the app

npm run storybook
Runs component documentation

npm run test:unit
Runs app unit/component tests only

npm run test:e2e
Runs Playwright browser flows

npm run build-storybook
Builds static Storybook documentation

Phase 10 is complete only when all of these pass without hidden warnings or unhandled errors:

npm run type-check
npm run test:unit
npm run build
npm run test:e2e
npm run build-storybook