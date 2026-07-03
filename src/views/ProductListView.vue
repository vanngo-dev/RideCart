<script setup lang="ts">
import PageContainer from '../components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <header class="page-header">
      <h1>Products</h1>
      <p>Product browsing, filtering, and sorting will be added in a later phase.</p>
    </header>
  </PageContainer>
</template>

<style scoped>
.page-header {
  max-width: 720px;
}

h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3rem);
}

p {
  line-height: 1.7;
}
</style>
