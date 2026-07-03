# RideCart Vue 3 Commerce UI

A compact Vue 3 + TypeScript commerce frontend slice for product browsing, filtering, product details, and cart interactions.

## Overview

RideCart demonstrates a maintainable frontend structure with typed product data, reusable components, route-driven views, Pinia cart state, accessible UI behavior, and test coverage around core interactions.

The application is intentionally scoped as a frontend UI slice rather than a full e-commerce platform. It focuses on clean component boundaries, predictable state management, responsive layout, and reviewable engineering documentation.

## Features

- Responsive product listing page
- Product search, category filtering, and sorting
- Route-driven product detail pages
- Cart drawer with quantity management
- Pinia cart state for add, remove, increment, decrement, and subtotal behavior
- Reusable UI components for buttons, badges, inputs, selects, drawers, and tabs
- Typed product and cart models
- Accessible controls, image metadata, skip link, and keyboard-aware drawer behavior
- Unit and component tests for core frontend behavior
- Playwright E2E coverage for the browsing-to-cart flow
- Accessibility smoke coverage with axe-core
- Storybook component examples for isolated UI review
- Engineering notes for testing, accessibility, performance, and debugging decisions

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Vitest
- Vue Test Utils
- Playwright
- axe-core
- Storybook
- Plain CSS

## Run Locally

Install dependencies:

    npm install

Start the development server:

    npm run dev

Run Storybook:

    npm run storybook

## Quality Checks

Run the main project gate:

    npm run type-check
    npm run test:unit
    npm run build
    npm run test:e2e
    npm run build-storybook

## Application Routes

    /                  Home page
    /products          Product browsing page
    /products/:slug    Product detail page

Unknown routes render a not-found page instead of crashing the application.

## Product Browsing

The product listing view supports search, category filtering, sort options, responsive cards, and clear empty states.

Filtering logic is isolated in a composable so the view remains focused on layout and event handling.

## Product Detail

Product detail routes are driven by product slugs and include:

- Product name
- Product image
- Price
- Stock state
- Description
- Technical specifications
- Tags
- Related products
- Add to cart behavior

Invalid product slugs render a not-found state.

## Cart Behavior

Cart state is managed with Pinia and kept separate from page components.

Supported cart behavior includes:

- Add item
- Increment quantity
- Decrement quantity
- Remove item
- Clear cart
- Calculate subtotal
- Calculate total item count
- Open and close cart drawer

The cart drawer uses accessible controls and supports keyboard dismissal.

## Component Notes

The UI layer is organized around small reusable components to keep page-level views simpler and reduce repeated markup.

Current reusable components include:

- `AppButton`
- `AppBadge`
- `AppInput`
- `AppSelect`
- `AppDrawer`
- `AppTabs`
- `ProductCard`
- `ProductFilters`
- `ProductGrid`
- `ProductImageGallery`
- `ProductSpecsTable`
- `CartDrawer`
- `CartItemRow`
- `CartSummary`

See:

    docs/component-guidelines.md

## Storybook

Storybook documents reusable UI, product, and cart components in isolated states.

Run:

    npm run storybook

Build:

    npm run build-storybook

Storybook examples are intended for component review. Full route and cart behavior is covered by the app and Playwright E2E tests.

## Testing

Testing focuses on high-value frontend behavior:

- Product data assumptions
- Product filtering
- Product lookup by slug
- Cart state transitions
- Reusable component behavior
- Product specifications rendering
- Full browsing-to-cart E2E flow
- Basic accessibility smoke coverage

See:

    docs/testing-notes.md

## Accessibility Notes

The application uses semantic HTML, labeled form controls, keyboard-accessible buttons, meaningful image alt text, visible focus states, and drawer behavior that can be dismissed with Escape.

See:

    docs/accessibility-notes.md

## Performance Notes

The project uses local product images, lazy image loading, async image decoding, computed filtering, Pinia-derived cart totals, and Vite production builds.

See:

    docs/performance-notes.md

## Engineering Review Notes

Engineering notes document implementation decisions, debugging issues, testing fixes, Storybook setup issues, and phase-by-phase validation.

See:

    docs/engineering-review-log.md

Useful debugging references:

    docs/cart-runtime-debugging-notes.md
    docs/e2e-debugging-notes.md
    docs/phase-08-add-to-cart-e2e-debugging-notes.md
    docs/phase-10-unit-test-storybook-devtools-error.md
    docs/phase-10-typecheck-storybook-args-error.md
    docs/phase-10-other-setup-errors.md

## Screenshots

Add screenshots before final release.

Recommended screenshot files:

    docs/images/home.png
    docs/images/products.png
    docs/images/product-detail.png
    docs/images/cart-drawer.png
    docs/images/storybook.png

Screenshot capture guidance is documented in:

    docs/screenshot-guide.md

After screenshots are added, include them here:

    ![Home page](docs/images/home.png)
    ![Product browsing](docs/images/products.png)
    ![Product detail](docs/images/product-detail.png)
    ![Cart drawer](docs/images/cart-drawer.png)
    ![Storybook component examples](docs/images/storybook.png)

## Scope

This project is a frontend UI slice.

Included:

- Product browsing
- Product detail
- Cart drawer
- Local typed data
- Reusable components
- Responsive UI
- Accessibility notes
- Unit/component tests
- E2E flow
- Storybook examples

Not included:

- Real payment processing
- Authentication
- Real backend API
- Admin dashboard
- User accounts
- Inventory synchronization
- Full CMS integration

## Final Review Commands

Before final release, run:

    npm run type-check
    npm run test:unit
    npm run build
    npm run test:e2e
    npm run build-storybook

## Repository Description

Recommended GitHub description:

    Vue 3 + TypeScript commerce UI with reusable components, Pinia cart state, responsive product browsing, accessibility notes, and test coverage.