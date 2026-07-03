<script setup lang="ts">
import PageContainer from '@/components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <header class="page-header">
      <p class="eyebrow">Products</p>
      <h1>Product browsing</h1>
      <p>
        Product grid, filtering, sorting, and empty states will be added in the next
        product browsing phase.
      </p>
    </header>

    <div class="placeholder-panel">
      <h2>Phase 02 placeholder</h2>
      <p>
        This page confirms the route and layout shell are working before product
        components are introduced.
      </p>

      <RouterLink to="/products/apex-road-2">
        View sample product route
      </RouterLink>
    </div>
  </PageContainer>
</template>

<style scoped>
.page-header {
  max-width: 720px;
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

p {
  color: #4b5563;
  line-height: 1.7;
}

.placeholder-panel {
  margin-top: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
  padding: 1.5rem;
}

.placeholder-panel a {
  color: #111827;
  font-weight: 700;
}
</style>
