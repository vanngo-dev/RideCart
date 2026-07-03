export type ProductCategory = 'road' | 'mountain' | 'hybrid' | 'electric' | 'gear'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  imageUrl: string
  imageAlt: string
  shortDescription: string
  description: string
  specs: ProductSpec[]
  tags: string[]
  inStock: boolean
  rating: number
}
