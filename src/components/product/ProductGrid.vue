<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()
</script>

<template>
  <div v-if="products.length > 0" class="product-grid" aria-label="Product results">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="emit('addToCart', $event)"
    />
  </div>

  <section v-else class="empty-state" role="status" aria-live="polite">
    <h2>No products found</h2>
    <p>Try changing the search, category, or sort options.</p>
  </section>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 1rem;
}

.empty-state {
  border: 1px dashed #d1d5db;
  border-radius: 1rem;
  background: #f9fafb;
  padding: 2rem;
  text-align: center;
}

.empty-state h2 {
  margin: 0;
  color: #111827;
  font-size: 1.25rem;
}

.empty-state p {
  margin: 0.5rem 0 0;
  color: #4b5563;
}
</style>
