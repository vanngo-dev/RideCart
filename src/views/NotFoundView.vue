<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageContainer from '../components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <section class="not-found">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <RouterLink to="/products">Browse products</RouterLink>
    </section>
  </PageContainer>
</template>

<style scoped>
.not-found {
  max-width: 640px;
}

h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3rem);
}

p {
  line-height: 1.7;
}

a {
  font-weight: 700;
}
</style>
