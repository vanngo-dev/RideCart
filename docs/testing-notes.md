# Testing Notes

Testing focuses on high-value frontend behavior: typed data assumptions, product filtering, cart state, reusable component behavior, route lookup, accessibility smoke checks, and one complete browsing-to-cart user flow.

## Test Categories

### Unit Tests

Current unit coverage includes:

- Product data shape
- Unique product IDs
- Unique product slugs
- Product image alt text
- Product filter behavior
- Product lookup by slug
- Related product helper behavior
- Cart store state transitions
- Currency formatting utility

### Component Tests

Current component coverage includes:

- `AppButton`
- `AppInput`
- `ProductCard`
- `ProductFilters`
- `ProductGrid`
- `ProductSpecsTable`
- `CartDrawer`

### E2E Tests

Current E2E coverage includes:

- Home page smoke check
- Product page accessibility smoke check
- Keyboard-reachable product filters
- Cart drawer open/close with Escape
- Browsing-to-cart happy path

The browsing-to-cart flow checks that a user can:

1. Visit the product listing page.
2. Filter products.
3. Open a product detail page.
4. Add a product to cart.
5. Increase quantity.
6. Decrease quantity.
7. Remove the item.

## Selector Strategy

Use role and label selectors when testing accessible user behavior:

```ts
page.getByRole('heading', { name: 'Product browsing' })
page.getByLabel('Search products')
page.getByRole('button', { name: /increase quantity/i })

Use data-testid only for stable app-state smoke checks where role selectors may be brittle:

page.getByTestId('cart-button')
page.getByTestId('cart-drawer')
page.getByTestId('detail-add-to-cart')
Known Limits

This is not exhaustive test coverage. The goal is to cover the highest-value behavior in a compact frontend slice without making the project unnecessarily large.

Not currently covered:

Visual regression testing
Full cross-device responsive screenshot testing
Real checkout behavior
Real backend/API failure states
Full assistive technology audit
Full cart persistence behavior
Commands
npm run type-check
npm run test:unit
npm run build
npm run test:e2e
Review Notes

The test suite should remain practical. Add tests when they protect behavior that would matter during review, maintenance, or refactoring.