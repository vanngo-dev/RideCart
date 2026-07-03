<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <figure class="product-gallery">
    <div class="product-gallery__frame">
      <img
        class="product-gallery__image"
        :src="product.imageUrl"
        :alt="product.imageAlt"
        loading="lazy"
        decoding="async"
      />
    </div>

    <figcaption class="product-gallery__caption">
      {{ product.imageAlt }}
    </figcaption>
  </figure>
</template>

<style scoped>
.product-gallery {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.product-gallery__frame {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #f3f4f6;
}

.product-gallery__image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.product-gallery__caption {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
