<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '@/components/ui/AppButton.vue'
import type { CartItem } from '@/types/cart'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  increment: [productId: string]
  decrement: [productId: string]
  remove: [productId: string]
}>()

const formattedLineTotal = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(props.item.product.price * props.item.quantity),
)
</script>

<template>
  <article class="cart-item">
    <img
      class="cart-item__image"
      :src="item.product.imageUrl"
      :alt="item.product.imageAlt"
      loading="lazy"
      decoding="async"
    />

    <div class="cart-item__body">
      <div class="cart-item__header">
        <h3>{{ item.product.name }}</h3>
        <p>{{ formattedLineTotal }}</p>
      </div>

      <p class="cart-item__meta">
        {{ item.product.category }} · {{ item.product.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }) }} each
      </p>

      <div class="cart-item__controls" :aria-label="`Quantity controls for ${item.product.name}`">
        <AppButton
          variant="secondary"
          size="sm"
          :aria-label="`Decrease quantity for ${item.product.name}`"
          @click="emit('decrement', item.productId)"
        >
          −
        </AppButton>

        <span class="cart-item__quantity" aria-label="Current quantity">
          {{ item.quantity }}
        </span>

        <AppButton
          variant="secondary"
          size="sm"
          :aria-label="`Increase quantity for ${item.product.name}`"
          @click="emit('increment', item.productId)"
        >
          +
        </AppButton>

        <AppButton
          variant="ghost"
          size="sm"
          :aria-label="`Remove ${item.product.name} from cart`"
          @click="emit('remove', item.productId)"
        >
          Remove
        </AppButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
}

.cart-item__image {
  width: 84px;
  height: 84px;
  border-radius: 0.75rem;
  background: #f3f4f6;
  object-fit: cover;
}

.cart-item__body {
  display: grid;
  gap: 0.625rem;
  min-width: 0;
}

.cart-item__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.cart-item__header h3,
.cart-item__header p,
.cart-item__meta {
  margin: 0;
}

.cart-item__header h3 {
  color: #111827;
  font-size: 1rem;
  line-height: 1.3;
}

.cart-item__header p {
  color: #111827;
  font-weight: 800;
}

.cart-item__meta {
  color: #6b7280;
  font-size: 0.875rem;
}

.cart-item__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.cart-item__quantity {
  min-width: 2rem;
  color: #111827;
  font-weight: 800;
  text-align: center;
}
</style>
