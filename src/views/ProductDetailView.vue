<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import PageContainer from '@/components/layout/PageContainer.vue'
import ProductCard from '@/components/product/ProductCard.vue'
import ProductImageGallery from '@/components/product/ProductImageGallery.vue'
import ProductSpecsTable from '@/components/product/ProductSpecsTable.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { getProductBySlug, getRelatedProducts } from '@/utils/productLookup'
import type { Product } from '@/types/product'

const route = useRoute()

const productSlug = computed(() => String(route.params.slug ?? ''))
const product = computed(() => getProductBySlug(productSlug.value))

const relatedProducts = computed(() => {
  if (!product.value) {
    return []
  }

  return getRelatedProducts(product.value)
})

const formattedPrice = computed(() => {
  if (!product.value) {
    return ''
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(product.value.price)
})

const stockLabel = computed(() => {
  if (!product.value) {
    return ''
  }

  return product.value.inStock ? 'In stock' : 'Out of stock'
})

const stockVariant = computed<'success' | 'warning'>(() => {
  if (!product.value) {
    return 'warning'
  }

  return product.value.inStock ? 'success' : 'warning'
})

const lastAddedProductName = ref('')

const handleAddToCart = (selectedProduct: Product) => {
  lastAddedProductName.value = selectedProduct.name
}
</script>

<template>
  <PageContainer>
    <article v-if="product" class="product-detail">
      <RouterLink class="back-link" to="/products">
        Back to products
      </RouterLink>

      <div class="product-detail__grid">
        <ProductImageGallery :product="product" />

        <section class="product-detail__summary" :aria-labelledby="`product-${product.slug}-heading`">
          <p class="eyebrow">
            {{ product.category }}
          </p>

          <h1 :id="`product-${product.slug}-heading`">
            {{ product.name }}
          </h1>

          <div class="product-detail__meta">
            <AppBadge :variant="stockVariant">
              {{ stockLabel }}
            </AppBadge>

            <span class="product-detail__rating" :aria-label="`${product.rating} out of 5 stars`">
              ★ {{ product.rating.toFixed(1) }}
            </span>
          </div>

          <p class="product-detail__price">
            {{ formattedPrice }}
          </p>

          <p class="product-detail__description">
            {{ product.description }}
          </p>

          <ul class="product-detail__tags" aria-label="Product tags">
            <li v-for="tag in product.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>

          <div class="product-detail__actions">
            <AppButton :disabled="!product.inStock" @click="handleAddToCart(product)">
              Add to cart
            </AppButton>
          </div>

          <p v-if="lastAddedProductName" class="product-detail__status" role="status" aria-live="polite">
            {{ lastAddedProductName }} selected. Cart behavior will be completed in the cart phase.
          </p>
        </section>
      </div>

      <ProductSpecsTable :specs="product.specs" />

      <section v-if="relatedProducts.length > 0" class="related-products" aria-labelledby="related-products-heading">
        <div class="related-products__header">
          <h2 id="related-products-heading">Related products</h2>
          <p>Products with similar categories or tags.</p>
        </div>

        <div class="related-products__grid">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </section>
    </article>

    <section v-else class="product-missing">
      <p class="eyebrow">Product not found</p>
      <h1>We could not find that product.</h1>
      <p>
        The product slug <code>{{ productSlug }}</code> does not match an available product.
      </p>

      <RouterLink to="/products">
        Return to products
      </RouterLink>
    </section>
  </PageContainer>
</template>

<style scoped>
.product-detail {
  display: grid;
  gap: 2.5rem;
}

.back-link {
  width: fit-content;
  color: #111827;
  font-weight: 800;
}

.product-detail__grid {
  display: grid;
  gap: 2rem;
}

.product-detail__summary {
  display: grid;
  align-content: start;
  gap: 1rem;
}

.eyebrow {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2 {
  color: #111827;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1;
}

.product-detail__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-detail__rating {
  color: #4b5563;
  font-weight: 800;
}

.product-detail__price {
  margin: 0;
  color: #111827;
  font-size: 1.75rem;
  font-weight: 900;
}

.product-detail__description {
  margin: 0;
  color: #4b5563;
  font-size: 1.0625rem;
  line-height: 1.7;
}

.product-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.product-detail__tags li {
  border-radius: 999px;
  background: #f3f4f6;
  color: #374151;
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 700;
}

.product-detail__actions {
  margin-top: 0.5rem;
}

.product-detail__status {
  margin: 0;
  color: #4b5563;
  font-weight: 700;
}

.related-products {
  display: grid;
  gap: 1rem;
}

.related-products__header h2,
.related-products__header p {
  margin: 0;
}

.related-products__header {
  display: grid;
  gap: 0.25rem;
}

.related-products__header p {
  color: #4b5563;
}

.related-products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 1rem;
}

.product-missing {
  max-width: 680px;
}

.product-missing p {
  color: #4b5563;
  line-height: 1.7;
}

.product-missing code {
  color: #111827;
  font-weight: 800;
}

.product-missing a {
  display: inline-flex;
  margin-top: 1rem;
  color: #111827;
  font-weight: 800;
}

@media (min-width: 860px) {
  .product-detail__grid {
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    align-items: start;
  }
}
</style>
