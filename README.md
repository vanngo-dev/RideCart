# ridecart

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# RideCart Vue 3 Commerce UI

A compact Vue 3 + TypeScript commerce frontend slice for product browsing, filtering, product details, and cart interactions.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Vitest
- Playwright

## Focus

This project focuses on maintainable frontend architecture, reusable components, typed state, accessible interactions, and reviewable documentation.

## Application Routes

- `/` home page
- `/products` product browsing page
- `/products/:slug` product detail page

## Run Locally

```bash
npm install
npm run dev
Quality Checks
npm run typecheck
npm run lint
npm run test:unit
npm run build

## Data Model

The product model uses typed fields for category, pricing, image metadata, stock state, product tags, and technical specifications.

## Reusable UI Components

The UI layer uses small typed Vue components for common controls such as buttons, badges, inputs, selects, drawers, and tabs. Components use semantic HTML first and expose focused props and emits for reuse across page-level features.

## Product Browsing

The product listing view supports search, category filtering, sort options, responsive cards, and empty states. Filtering logic is isolated in a composable to keep the view easier to maintain.

## Product Detail

Product detail routes are driven by product slugs and include stock state, specifications, related items, tags, price display, and accessible image metadata.

## Cart Behavior

Cart state is managed with Pinia and kept separate from page components. The cart drawer supports keyboard dismissal, item quantity controls, item removal, subtotal calculation, and accessible controls for cart updates.

## Accessibility Notes

The interface uses semantic landmarks, labeled form controls, descriptive image alt text, native buttons and links, visible focus states, keyboard-friendly cart drawer behavior, and a Playwright axe smoke test for the product listing page.

See `docs/accessibility-notes.md`.

## E2E Debugging Notes

A Phase 07 E2E issue involving the cart drawer is documented in `docs/e2e-debugging-notes.md`. The note captures the debugging path from failing Playwright selector to manual runtime verification, event wiring fix, and final stable smoke test.

## Testing Notes

Testing covers product data assumptions, product filtering, reusable component behavior, cart state, route lookup, accessibility smoke checks, and a browsing-to-cart E2E flow.

See `docs/testing-notes.md`.

## Phase 08 Debugging Notes

The Phase 08 browsing-to-cart flow exposed both a runtime add-to-cart drawer issue and Playwright strict-mode selector issues. The debugging path and fixes are documented in `docs/phase-08-add-to-cart-e2e-debugging-notes.md`.

## Performance Notes

The project uses local placeholder product images, lazy image loading, async image decoding, computed product filtering, Pinia-derived cart totals, and production build checks.

See `docs/performance-notes.md`.
## Storybook Component Examples

Storybook documents reusable UI, product, and cart components in isolated states for review.

Run locally:

```bash
npm run storybook