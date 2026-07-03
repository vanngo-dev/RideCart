<script setup lang="ts">
import { ref } from 'vue'

import PageContainer from '@/components/layout/PageContainer.vue'
import ProductFilters from '@/components/product/ProductFilters.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { useProductFilters } from '@/composables/useProductFilters'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/product'

const {
  searchQuery,
  selectedCategory,
  selectedSort,
  filteredProducts,
  resetFilters,
} = useProductFilters(products)

const cartStore = useCartStore()
const lastAddedProductName = ref('')

const handleAddToCart = (product: Product) => {
  cartStore.addItem(product)
  cartStore.openCart()
  lastAddedProductName.value = product.name
}
</script>

<template>
  <PageContainer>
    <header class="page-header">
      <p class="eyebrow">Products</p>
      <h1>Product browsing</h1>
      <p>
        Browse bikes and gear with search, category filtering, sorting, responsive
        product cards, and clear empty states.
      </p>
    </header>

    <section class="product-section" aria-labelledby="product-results-heading">
      <ProductFilters
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :selected-sort="selectedSort"
        @update:search-query="searchQuery = $event"
        @update:selected-category="selectedCategory = $event"
        @update:selected-sort="selectedSort = $event"
        @reset="resetFilters"
      />

      <div class="results-summary">
        <h2 id="product-results-heading">
          {{ filteredProducts.length }} product{{ filteredProducts.length === 1 ? '' : 's' }}
        </h2>

        <p v-if="lastAddedProductName" role="status" aria-live="polite">
          {{ lastAddedProductName }} added to cart.
        </p>
      </div>

      <ProductGrid :products="filteredProducts" @add-to-cart="handleAddToCart" />
    </section>
  </PageContainer>
</template>

<style scoped>
.page-header {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2 {
  color: #111827;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.page-header p {
  color: #4b5563;
  line-height: 1.7;
}

.product-section {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.results-summary {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.results-summary h2,
.results-summary p {
  margin: 0;
}

.results-summary p {
  color: #4b5563;
  font-weight: 700;
}

@media (max-width: 640px) {
  .results-summary {
    align-items: start;
    flex-direction: column;
  }
}
</style>
