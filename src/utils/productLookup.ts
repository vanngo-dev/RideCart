import { products } from '@/data/products'
import type { Product } from '@/types/product'

export const getProductBySlug = (
  slug: string,
  sourceProducts: Product[] = products,
): Product | undefined => {
  return sourceProducts.find((product) => product.slug === slug)
}

export const getRelatedProducts = (
  currentProduct: Product,
  sourceProducts: Product[] = products,
  limit = 3,
): Product[] => {
  const currentTags = new Set(currentProduct.tags)

  return sourceProducts
    .filter((product) => product.id !== currentProduct.id)
    .map((product) => {
      let score = 0

      if (product.category === currentProduct.category) {
        score += 2
      }

      product.tags.forEach((tag) => {
        if (currentTags.has(tag)) {
          score += 1
        }
      })

      return {
        product,
        score,
      }
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .slice(0, limit)
    .map((candidate) => candidate.product)
}
