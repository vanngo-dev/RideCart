# Component Guidelines

The UI layer is organized around small reusable components to keep page-level views simpler and reduce repeated markup.

## Component Rules

- Use `<script setup lang="ts">`.
- Use typed props.
- Use typed emits when a component raises events.
- Prefer semantic HTML before adding ARIA.
- Use native buttons, links, labels, inputs, and selects where possible.
- Keep component APIs small.
- Avoid mixing page-specific business logic into shared UI components.
- Support keyboard behavior where the component creates an interactive pattern.

## Current Components

- `AppButton` handles button variants, sizes, disabled state, and click emission.
- `AppBadge` displays compact status labels.
- `AppInput` provides a labeled text/search input with `v-model` support.
- `AppSelect` provides a labeled select control with `v-model` support.
- `AppDrawer` provides a dismissible dialog-style drawer.
- `AppTabs` provides a simple tab selection pattern.

## Review Notes

Reusable components should remain generic. Product, cart, and route-specific behavior should live in product components, cart components, stores, composables, or views.

## Component Examples

Reusable components include isolated examples for default, variant, disabled, empty, and populated states. These examples make component behavior easier to review outside of full page flows.

Current Storybook examples include:

- `AppButton`
- `AppBadge`
- `AppInput`
- `ProductCard`
- `ProductFilters`
- `ProductSpecsTable`
- `CartDrawer`

Storybook is used for component review only. Product, route, and cart integration behavior remains covered by unit/component tests and Playwright E2E tests.
