<script setup lang="ts">
import PageContainer from '../components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <section class="hero">
      <p class="eyebrow">Commerce frontend slice</p>
      <h1>RideCart Vue 3 Commerce UI</h1>
      <p>
        A compact Vue 3 + TypeScript commerce interface for product browsing,
        route-driven product details, and cart interactions.
      </p>
    </section>
  </PageContainer>
</template>

<style scoped>
.hero {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-weight: 700;
  color: #5c6670;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

p {
  font-size: 1.125rem;
  line-height: 1.7;
}
</style>
