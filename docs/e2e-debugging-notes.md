# Phase 07 — E2E debugging notes

@'
# E2E Debugging Notes

## Phase 07 — Cart Drawer Accessibility Test Issue

### Context

During the accessibility pass, the Playwright E2E test for the cart drawer failed even though the cart drawer component and Pinia cart store had unit coverage.

The failing test attempted to verify that the cart drawer opened and closed with Escape as part of the accessibility smoke coverage for the product page.

### Symptoms

The E2E failure reported:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog', { name: 'Shopping cart' })
Expected: visible
Error: element(s) not found

The failure happened across Chromium, Firefox, and WebKit.

Important Finding

The first mistake was assuming the issue was only the Playwright selector.

Manual browser testing showed that clicking the Cart button on /products did not open the cart drawer at all. That meant the problem was in runtime event wiring, not the E2E test.

The broken path was:

AppHeader Cart button click
→ emit event
→ App.vue listens for event
→ Pinia cartStore.openCart()
→ CartDrawer receives open=true
→ drawer appears
Root Cause

The cart button event wiring between AppHeader.vue and App.vue was unreliable because the emitted event name and listener needed to match clearly.

The app shell expected:

@open-cart="openCart"

The header needed to emit the matching event from the cart button click.

Fix

The cart button event path was reset so that:

defineEmits<{
  openCart: []
}>()

and the button used:

@click="emit('openCart')"

with the parent listening through:

@open-cart="openCart"

After this fix, manual testing confirmed:

Cart button opened the drawer.
Empty cart state appeared.
Escape closed the drawer.
Add to cart opened the drawer.
Cart count updated.
E2E Test Adjustment

After runtime behavior was fixed, the E2E test was made less brittle by using stable test IDs for the drawer smoke test.

The drawer component exposes:

data-testid="cart-drawer"
data-testid="drawer-close-button"

The header cart button exposes:

data-testid="cart-button"

The E2E test now checks:

await page.getByTestId('cart-button').click()
await expect(page.getByTestId('cart-drawer')).toBeVisible()
await expect(page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible()
await expect(page.getByTestId('drawer-close-button')).toBeVisible()

await page.keyboard.press('Escape')

await expect(page.getByTestId('cart-drawer')).toHaveCount(0)
Lesson Learned

When an E2E test says an element is missing, do not immediately assume the selector is wrong.

Debug in this order:

Reproduce manually in the browser.
Confirm the user action works without Playwright.
Check console errors.
Verify component emit/listener wiring.
Verify store state changes.
Only then adjust selectors or timing.
Recommended Pattern

For accessibility E2E tests:

Use role/name selectors when testing user-facing accessible behavior.
Use data-testid for app-state smoke checks where role selectors may be brittle.
Keep smoke tests focused on one behavior.
Do not combine product add-to-cart behavior, drawer role lookup, focus assertion, and Escape dismissal in one fragile test.
Add deeper happy-path E2E coverage in the dedicated testing phase.
Final Result

After fixing the runtime event path and using stable test IDs, the Phase 07 E2E tests passed.