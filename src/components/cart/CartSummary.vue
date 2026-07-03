<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalItems: number
  subtotal: number
}>()

const formattedSubtotal = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(props.subtotal),
)
</script>

<template>
  <section class="cart-summary" aria-labelledby="cart-summary-heading">
    <h3 id="cart-summary-heading">Cart summary</h3>

    <dl>
      <div>
        <dt>Total items</dt>
        <dd data-testid="cart-total-items">{{ totalItems }}</dd>
      </div>

      <div>
        <dt>Subtotal</dt>
        <dd data-testid="cart-subtotal">{{ formattedSubtotal }}</dd>
      </div>
    </dl>

    <p>
      Checkout is outside the scope of this frontend slice.
    </p>
  </section>
</template>

<style scoped>
.cart-summary {
  display: grid;
  gap: 1rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 1rem;
}

.cart-summary h3 {
  margin: 0;
  color: #111827;
  font-size: 1rem;
}

.cart-summary dl {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.cart-summary div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.cart-summary dt {
  color: #4b5563;
}

.cart-summary dd {
  margin: 0;
  color: #111827;
  font-weight: 900;
}

.cart-summary p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
