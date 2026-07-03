<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageContainer from '../components/layout/PageContainer.vue'

const route = useRoute()

const productSlug = computed(() => String(route.params.slug ?? ''))
</script>

<template>
  <PageContainer>
    <header class="page-header">
      <h1>Product Detail</h1>
      <p>Route slug: {{ productSlug }}</p>
      <p>Product lookup and details will be added in a later phase.</p>
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
