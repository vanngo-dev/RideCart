<script setup lang="ts">
import PageContainer from '@/components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <section class="hero">
      <p class="eyebrow">Commerce UI Slice</p>
      <h1>RideCart Vue 3 Commerce UI</h1>
      <p>
        A compact frontend experience for browsing products, reviewing product details,
        and preparing cart interactions.
      </p>

      <RouterLink class="hero-link" to="/products">
        Browse products
      </RouterLink>
    </section>
  </PageContainer>
</template>

<style scoped>
.hero {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

p {
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.7;
}

.hero-link {
  display: inline-flex;
  margin-top: 1rem;
  border-radius: 999px;
  background: #111827;
  color: #ffffff;
  padding: 0.75rem 1rem;
  text-decoration: none;
}

.hero-link:hover {
  background: #374151;
}
</style>
