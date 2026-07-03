# Accessibility Notes

This project uses semantic HTML, labeled form controls, keyboard-accessible buttons, visible focus states, meaningful image alt text, and simple route states for missing content.

## Checked Areas

- Product search input has an associated label.
- Category and sort controls are native labeled select elements.
- Product images include descriptive alt text.
- Product cards use links for navigation and buttons for actions.
- Cart drawer uses `role="dialog"` and `aria-modal="true"`.
- Cart drawer can be closed by button, backdrop click, and Escape key.
- Cart drawer moves focus to the close button when opened.
- Closing the cart drawer returns focus to the cart button where possible.
- Header includes a skip link to the main content.
- Main content uses a landmark through the `<main>` element.
- Empty product results use a polite live region.
- Cart updates use status/live region messaging.
- Missing product routes show a clear not-found state.

## Manual Keyboard Review

Recommended keyboard path:

1. Press Tab from the top of the page.
2. Confirm the skip link appears.
3. Move through the RideCart home link, Products link, and Cart button.
4. Open the cart with Enter or Space.
5. Confirm focus moves into the cart drawer.
6. Press Escape and confirm the drawer closes.
7. Confirm focus returns to the cart button.
8. Navigate product filters by keyboard.
9. Open a product detail link by keyboard.
10. Use Add to cart by keyboard.

## Automated Smoke Coverage

Playwright and axe-core are used for a lightweight accessibility smoke test on the product listing page. The test checks for obvious axe violations, labeled filter controls, and cart drawer open/close keyboard behavior.

## Known Scope

This pass is intentionally lightweight. It does not replace a full accessibility audit, assistive technology review, or cross-browser manual QA.
