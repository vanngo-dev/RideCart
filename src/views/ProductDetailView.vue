<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PageContainer from '@/components/layout/PageContainer.vue'

const route = useRoute()

const productSlug = computed(() => String(route.params.slug ?? ''))
</script>

<template>
  <PageContainer>
    <article class="detail-shell">
      <RouterLink class="back-link" to="/products">
        Back to products
      </RouterLink>

      <p class="eyebrow">Product Detail</p>
      <h1>Product detail route</h1>

      <p>
        Product lookup, image gallery, specs, related products, and add-to-cart behavior
        will be added in later phases.
      </p>

      <dl class="route-details">
        <div>
          <dt>Current slug</dt>
          <dd>{{ productSlug }}</dd>
        </div>
      </dl>
    </article>
  </PageContainer>
</template>

<style scoped>
.detail-shell {
  max-width: 760px;
}

.back-link {
  display: inline-flex;
  margin-bottom: 1.5rem;
  color: #111827;
  font-weight: 700;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: clamp(2rem, 4vw, 3rem);
}

p {
  color: #4b5563;
  line-height: 1.7;
}

.route-details {
  margin-top: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1rem;
}

.route-details div {
  display: grid;
  gap: 0.25rem;
}

dt {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 700;
}

dd {
  margin: 0;
  color: #111827;
  font-family: monospace;
}
</style>
