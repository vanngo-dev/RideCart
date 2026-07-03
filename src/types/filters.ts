import type { ProductCategory } from './product'

export type ProductSortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc'

export interface ProductFilters {
  searchQuery: string
  category: ProductCategory | 'all'
  sortBy: ProductSortOption
}
