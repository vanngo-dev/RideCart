### `docs/engineering-review-log.md`

```powershell
@'
# Engineering Review Log

## Phase 00 â€” Project Setup and Baseline Quality

### Summary

Initialized the Vue 3 + TypeScript application with Vite, Vue Router, Pinia, Vitest, Playwright, ESLint, and Prettier.

### Validation

- npm run dev
- npm run typecheck
- npm run lint
- npm run test:unit
- npm run build

### Notes

Starter content was removed and replaced with a basic application shell, placeholder routes, and neutral project documentation.
## Phase 01 — Domain Model and Mock Product Data

### Summary

Added typed product and filter models with mock product data for the commerce UI slice.

### Validation

- npm run typecheck
- npm run test:unit
- npm run build

### Notes

Product data includes unique IDs, unique slugs, image alt text, stock state, ratings, tags, pricing, and technical specifications.

## Phase 02 — Routing, Layout, and Page Skeletons

### Summary

Added the base application layout, route-driven page skeletons, header navigation, footer, skip link, and router smoke coverage.

### Validation

- npm run typecheck
- npm run test:unit
- npm run build

### Notes

The layout now separates the app shell from page views. Product browsing and detail pages remain placeholders until the product component phases.

## Phase 03 — Reusable UI Components

### Summary

Added reusable typed UI components for buttons, badges, inputs, selects, drawers, and tabs.

### Validation

- npm run typecheck
- npm run test:unit
- npm run build

### Notes

The shared UI layer uses semantic HTML, typed props, typed emits, basic focus styling, and component tests for button and input behavior.

## Phase 04 — Product Listing, Filtering, and Sorting

### Summary

Added product browsing with reusable product cards, responsive grid layout, search, category filtering, sorting, and empty state handling.

### Validation

- npm run typecheck
- npm run test:unit
- npm run build

### Notes

Filtering and sorting logic is isolated in `useProductFilters`. Cart behavior remains a placeholder until the cart state phase.

## Phase 05 — Product Detail Page

### Summary

Added route-driven product detail pages with product lookup helpers, image display, specifications table, tags, stock state, related products, and invalid slug handling.

### Validation

- npm run type-check
- npm run test:unit
- npm run build

### Notes

Product detail behavior is driven by product slugs. Add-to-cart remains a placeholder until the Pinia cart phase.

## Phase 06 — Cart State and Cart Drawer

### Summary

Added Pinia cart state, cart item rows, cart summary, cart drawer behavior, quantity controls, item removal, clear cart behavior, subtotal calculation, and add-to-cart wiring from product listing and detail pages.

### Validation

- npm run type-check
- npm run test:unit
- npm run build

### Notes

Cart drawer behavior uses accessible buttons and Escape dismissal through the shared drawer component. The app shell returns focus to the cart button after closing the drawer where possible.

## Phase 07 — Accessibility Pass

### Summary

Added accessibility notes, improved cart button labeling, improved cart drawer focus handling, and added Playwright + axe smoke coverage for the product listing page.

### Validation

- npm run type-check
- npm run test:unit
- npm run build
- npm run test:e2e

### Notes

The accessibility pass focused on semantic controls, labels, keyboard navigation, drawer Escape behavior, focus movement, image alt text, and obvious axe violations.

## Phase 08 — Testing Expansion

### Summary

Expanded test coverage with a currency formatting unit test, product filter component tests, product grid component tests, a browsing-to-cart E2E flow, and testing documentation.

### Validation

- npm run type-check
- npm run test:unit
- npm run build
- npm run test:e2e

### Notes

The E2E happy path now covers filtering products, opening a product detail route, adding a product to cart, changing quantity, and removing the item. Stable test IDs are used only where they reduce brittleness for cart drawer state checks.

### Phase 08 Add-to-Cart and E2E Debugging Follow-up

Added `docs/phase-08-add-to-cart-e2e-debugging-notes.md`.

This note documents two separate issues discovered during the Phase 08 browsing-to-cart E2E flow:

1. A real runtime add-to-cart issue where the click handler updated local status text but did not open the Pinia cart drawer.
2. Playwright strict-mode selector issues caused by broad text selectors matching repeated content such as `Specifications` and `PeakGuard Helmet`.

Final fixes:
- Page-level add-to-cart handlers call both `cartStore.addItem(product)` and `cartStore.openCart()`.
- Product detail uses a direct native button for the main add-to-cart action.
- Cart E2E assertions use scoped drawer locators and stable `data-testid` hooks for cart state.

## Phase 09 — Performance and Build Review

### Summary

Added local product placeholder SVG images, updated product image paths, documented performance notes, and reviewed production-readiness checks.

### Validation

- npm run type-check
- npm run test:unit
- npm run build
- npm run test:e2e

### Notes

Product images now resolve locally instead of producing missing-image requests. Image elements use lazy loading and async decoding. Performance notes document image strategy, computed filtering, cart totals, build checks, and known scope limits.
