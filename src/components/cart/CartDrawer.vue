<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppDrawer from '@/components/ui/AppDrawer.vue'
import CartItemRow from '@/components/cart/CartItemRow.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import { useCartStore } from '@/stores/cartStore'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const cartStore = useCartStore()
</script>

<template>
  <AppDrawer :open="open" title="Shopping cart" @close="emit('close')">
    <div class="cart-drawer">
      <section v-if="cartStore.items.length > 0" class="cart-drawer__items" aria-label="Cart items">
        <CartItemRow
          v-for="item in cartStore.items"
          :key="item.productId"
          :item="item"
          @increment="cartStore.incrementItem"
          @decrement="cartStore.decrementItem"
          @remove="cartStore.removeItem"
        />

        <div class="cart-drawer__actions">
          <AppButton variant="ghost" type="button" @click="cartStore.clearCart">
            Clear cart
          </AppButton>
        </div>
      </section>

      <section v-else class="cart-drawer__empty" role="status" aria-live="polite">
        <h3>Your cart is empty</h3>
        <p>Add a product from the product listing or product detail page.</p>
      </section>

      <CartSummary :total-items="cartStore.totalItems" :subtotal="cartStore.subtotal" />
    </div>
  </AppDrawer>
</template>

<style scoped>
.cart-drawer {
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
}

.cart-drawer__items {
  flex: 1;
}

.cart-drawer__actions {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}

.cart-drawer__empty {
  flex: 1;
  display: grid;
  align-content: center;
  gap: 0.5rem;
  min-height: 18rem;
  text-align: center;
}

.cart-drawer__empty h3,
.cart-drawer__empty p {
  margin: 0;
}

.cart-drawer__empty h3 {
  color: #111827;
  font-size: 1.25rem;
}

.cart-drawer__empty p {
  color: #4b5563;
  line-height: 1.6;
}
</style>
