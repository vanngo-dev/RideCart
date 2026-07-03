<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(props.product.price),
)

const stockLabel = computed(() => (props.product.inStock ? 'In stock' : 'Out of stock'))
const stockVariant = computed(() => (props.product.inStock ? 'success' : 'warning'))
</script>

<template>
  <article class="product-card">
    <RouterLink class="product-card__media-link" :to="`/products/${product.slug}`">
      <img
        class="product-card__image"
        :src="product.imageUrl"
        :alt="product.imageAlt"
        loading="lazy"
        decoding="async"
      />
    </RouterLink>

    <div class="product-card__body">
      <div class="product-card__meta">
        <AppBadge :variant="stockVariant">
          {{ stockLabel }}
        </AppBadge>

        <span class="product-card__rating" :aria-label="`${product.rating} out of 5 stars`">
          ★ {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <h2 class="product-card__title">
        <RouterLink :to="`/products/${product.slug}`">
          {{ product.name }}
        </RouterLink>
      </h2>

      <p class="product-card__description">
        {{ product.shortDescription }}
      </p>

      <div class="product-card__footer">
        <p class="product-card__price">
          {{ formattedPrice }}
        </p>

        <AppButton
          variant="secondary"
          size="sm"
          :disabled="!product.inStock"
          @click="emit('addToCart', product)"
        >
          Add to cart
        </AppButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
}

.product-card__media-link {
  display: block;
  background: #f3f4f6;
}

.product-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.product-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1rem;
}

.product-card__meta,
.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.product-card__rating {
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 700;
}

.product-card__title {
  margin: 0;
  color: #111827;
  font-size: 1.125rem;
  line-height: 1.3;
}

.product-card__title a {
  color: inherit;
  text-decoration: none;
}

.product-card__title a:hover {
  text-decoration: underline;
}

.product-card__description {
  flex: 1;
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.product-card__price {
  margin: 0;
  color: #111827;
  font-size: 1.125rem;
  font-weight: 800;
}
</style>
