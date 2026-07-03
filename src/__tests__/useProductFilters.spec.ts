import { describe, expect, it } from 'vitest'

import { useProductFilters } from '@/composables/useProductFilters'
import { products } from '@/data/products'

describe('useProductFilters', () => {
  it('searches products by name', () => {
    const { searchQuery, filteredProducts } = useProductFilters(products)

    searchQuery.value = 'Apex'

    expect(filteredProducts.value).toHaveLength(1)
    expect(filteredProducts.value[0]?.name).toBe('Apex Road 2')
  })

  it('searches products by tag', () => {
    const { searchQuery, filteredProducts } = useProductFilters(products)

    searchQuery.value = 'commuter'

    expect(filteredProducts.value.length).toBeGreaterThan(1)
    expect(filteredProducts.value.every((product) => {
      const searchableText = [product.name, product.shortDescription, product.description, ...product.tags]
        .join(' ')
        .toLowerCase()

      return searchableText.includes('commuter')
    })).toBe(true)
  })

  it('filters products by category', () => {
    const { selectedCategory, filteredProducts } = useProductFilters(products)

    selectedCategory.value = 'gear'

    expect(filteredProducts.value.length).toBeGreaterThan(0)
    expect(filteredProducts.value.every((product) => product.category === 'gear')).toBe(true)
  })

  it('sorts products by price low to high', () => {
    const { selectedSort, filteredProducts } = useProductFilters(products)

    selectedSort.value = 'price-asc'

    const prices = filteredProducts.value.map((product) => product.price)
    const sortedPrices = [...prices].sort((a, b) => a - b)

    expect(prices).toEqual(sortedPrices)
  })

  it('can return an empty result state', () => {
    const { searchQuery, filteredProducts } = useProductFilters(products)

    searchQuery.value = 'zzzz-no-product-match'

    expect(filteredProducts.value).toHaveLength(0)
  })

  it('resets filters', () => {
    const {
      searchQuery,
      selectedCategory,
      selectedSort,
      filteredProducts,
      resetFilters,
    } = useProductFilters(products)

    searchQuery.value = 'helmet'
    selectedCategory.value = 'gear'
    selectedSort.value = 'price-desc'

    resetFilters()

    expect(searchQuery.value).toBe('')
    expect(selectedCategory.value).toBe('all')
    expect(selectedSort.value).toBe('featured')
    expect(filteredProducts.value).toHaveLength(products.length)
  })
})
