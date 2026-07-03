import { describe, expect, it } from 'vitest'

import { products } from '@/data/products'
import { getProductBySlug, getRelatedProducts } from '@/utils/productLookup'

describe('product lookup helpers', () => {
  it('finds a product by slug', () => {
    const product = getProductBySlug('apex-road-2')

    expect(product?.name).toBe('Apex Road 2')
  })

  it('returns undefined for an unknown slug', () => {
    const product = getProductBySlug('missing-product')

    expect(product).toBeUndefined()
  })

  it('returns related products and excludes the current product', () => {
    const currentProduct = getProductBySlug('apex-road-2')

    if (!currentProduct) {
      throw new Error('Expected Apex Road 2 to exist for related product test')
    }

    const relatedProducts = getRelatedProducts(currentProduct, products)

    expect(relatedProducts.length).toBeGreaterThan(0)
    expect(relatedProducts.every((product) => product.id !== currentProduct.id)).toBe(true)
  })
})
