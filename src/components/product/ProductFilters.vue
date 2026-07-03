<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import type { ProductCategory } from '@/types/product'
import type { ProductSortOption } from '@/types/filters'

defineProps<{
  searchQuery: string
  selectedCategory: ProductCategory | 'all'
  selectedSort: ProductSortOption
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: ProductCategory | 'all']
  'update:selectedSort': [value: ProductSortOption]
  reset: []
}>()

const categoryOptions = [
  { label: 'All categories', value: 'all' },
  { label: 'Road', value: 'road' },
  { label: 'Mountain', value: 'mountain' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Electric', value: 'electric' },
  { label: 'Gear', value: 'gear' },
]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Highest rated', value: 'rating-desc' },
]

const updateCategory = (value: string) => {
  emit('update:selectedCategory', value as ProductCategory | 'all')
}

const updateSort = (value: string) => {
  emit('update:selectedSort', value as ProductSortOption)
}
</script>

<template>
  <form class="product-filters" role="search" @submit.prevent>
    <AppInput
      id="product-search"
      label="Search products"
      type="search"
      :model-value="searchQuery"
      placeholder="Search bikes, gear, or tags"
      @update:model-value="emit('update:searchQuery', $event)"
    />

    <AppSelect
      id="product-category"
      label="Category"
      :model-value="selectedCategory"
      :options="categoryOptions"
      @update:model-value="updateCategory"
    />

    <AppSelect
      id="product-sort"
      label="Sort by"
      :model-value="selectedSort"
      :options="sortOptions"
      @update:model-value="updateSort"
    />

    <div class="product-filters__actions">
      <AppButton variant="ghost" type="button" @click="emit('reset')">
        Reset filters
      </AppButton>
    </div>
  </form>
</template>

<style scoped>
.product-filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
  padding: 1rem;
}

.product-filters__actions {
  display: flex;
  align-items: end;
}

@media (min-width: 760px) {
  .product-filters {
    grid-template-columns: minmax(220px, 1fr) 180px 190px auto;
    align-items: end;
  }
}
</style>
