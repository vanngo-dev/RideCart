# Phase 06 — Cart runtime debugging notes

@'
# Cart Runtime Debugging Notes

## Phase 06 — Cart Button Did Not Open Drawer

### Context

During the cart state and drawer phase, the Pinia cart store, cart drawer components, and cart tests were added. The unit tests passed, but manual testing later showed that clicking the Cart button on the `/products` page did not open the cart drawer.

This was discovered while debugging the Phase 07 Playwright accessibility test.

### Symptom

Manual browser behavior:

```text
/products
Click Cart button
Nothing happens
No drawer opens
No empty cart state appears

This meant the issue was not only an E2E selector problem. The runtime cart interaction was broken.

Expected Runtime Path

The cart button interaction should follow this path:

AppHeader Cart button click
→ AppHeader emits openCart
→ App.vue receives @open-cart
→ App.vue calls cartStore.openCart()
→ cartStore.isOpen becomes true
→ CartDrawer receives open=true
→ AppDrawer renders drawer through Teleport
Root Cause

The cart button event wiring between AppHeader.vue and App.vue needed to be reset and verified.

The parent shell listened for:

<AppHeader
  ref="appHeaderRef"
  :cart-count="cartStore.totalItems"
  @open-cart="openCart"
/>

The header button needed to emit a matching event from the button click:

<button
  ref="cartButtonRef"
  data-testid="cart-button"
  class="cart-button"
  type="button"
  :aria-label="cartButtonLabel"
  @click="emit('openCart')"
>
  Cart
</button>

The key Vue behavior: a camelCase emitted event such as openCart is listened to in templates as kebab-case @open-cart.

Fix

AppHeader.vue was reset to:

const emit = defineEmits<{
  openCart: []
}>()

and the button click was reset to:

@click="emit('openCart')"

App.vue was reset to:

const openCart = () => {
  cartStore.openCart()
}

const closeCart = async () => {
  cartStore.closeCart()
  await nextTick()
  appHeaderRef.value?.focusCartButton()
}

and the shell wiring was confirmed:

<AppHeader
  ref="appHeaderRef"
  :cart-count="cartStore.totalItems"
  @open-cart="openCart"
/>

<CartDrawer :open="cartStore.isOpen" @close="closeCart" />
Pinia Check

main.ts also needs Pinia installed before the app uses stores:

app.use(createPinia())
app.use(router)

If Pinia is missing, cart state will not behave correctly at runtime.

Verification

After the fix, manual browser testing confirmed:

Cart button opens the sidebar drawer.
Empty cart state appears.
Escape closes the drawer.
Close button closes the drawer.
Add to cart from /products opens the drawer.
Add to cart from product detail opens the drawer.
Header cart count updates.
Quantity controls update item count.
Remove and clear cart work.
Lesson Learned

Passing unit tests does not guarantee the full runtime event chain works.

For component/store features, verify in this order:

Store unit tests pass.
Component tests pass.
Parent-child event wiring is manually checked.
The feature works in the browser.
E2E tests are added or adjusted after runtime behavior is confirmed.
Future Debug Checklist

When a click does nothing in Vue:

Confirm the button is a real <button>.
Confirm the click handler is attached.
Confirm the emitted event name.
Confirm the parent listener name.
Confirm camelCase emit maps to kebab-case listener.
Confirm the parent method runs.
Confirm the Pinia action changes state.
Confirm the child component receives the updated prop.
Confirm the component is not hidden by conditional rendering.
Check browser console errors.
Final Result

The runtime cart drawer issue was fixed before the Phase 07 E2E test was stabilized. This confirmed that the E2E failure was useful because it exposed a real Phase 06 integration issue.