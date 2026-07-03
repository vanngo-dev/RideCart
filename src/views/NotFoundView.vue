<script setup lang="ts">
import PageContainer from '@/components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <section class="not-found">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>

      <RouterLink to="/products">
        Return to products
      </RouterLink>
    </section>
  </PageContainer>
</template>

<style scoped>
.not-found {
  max-width: 640px;
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

a {
  display: inline-flex;
  margin-top: 1rem;
  color: #111827;
  font-weight: 700;
}
</style>
