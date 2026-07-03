import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'

describe('products data', () => {
  it('has unique product ids', () => {
    const ids = products.map((product) => product.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })

  it('has unique product slugs', () => {
    const slugs = products.map((product) => product.slug)
    const uniqueSlugs = new Set(slugs)

    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('includes accessible image alt text for every product', () => {
    products.forEach((product) => {
      expect(product.imageAlt.trim().length).toBeGreaterThan(10)
    })
  })

  it('includes required product details', () => {
    products.forEach((product) => {
      expect(product.category).toBeTruthy()
      expect(product.price).toBeGreaterThan(0)
      expect(product.specs.length).toBeGreaterThan(0)
      expect(product.rating).toBeGreaterThanOrEqual(0)
      expect(product.rating).toBeLessThanOrEqual(5)
    })
  })
})
