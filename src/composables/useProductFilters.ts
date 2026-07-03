import { computed, ref } from 'vue'

import { products as defaultProducts } from '@/data/products'
import type { ProductCategory } from '@/types/product'
import type { ProductSortOption } from '@/types/filters'
import type { Product } from '@/types/product'

export const useProductFilters = (sourceProducts: Product[] = defaultProducts) => {
  const searchQuery = ref('')
  const selectedCategory = ref<ProductCategory | 'all'>('all')
  const selectedSort = ref<ProductSortOption>('featured')

  const filteredProducts = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    let result = [...sourceProducts]

    if (selectedCategory.value !== 'all') {
      result = result.filter((product) => product.category === selectedCategory.value)
    }

    if (query) {
      result = result.filter((product) => {
        const searchableText = [
          product.name,
          product.shortDescription,
          product.description,
          product.category,
          ...product.tags,
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(query)
      })
    }

    if (selectedSort.value === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    }

    if (selectedSort.value === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    if (selectedSort.value === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  })

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedSort.value = 'featured'
  }

  return {
    searchQuery,
    selectedCategory,
    selectedSort,
    filteredProducts,
    resetFilters,
  }
}
