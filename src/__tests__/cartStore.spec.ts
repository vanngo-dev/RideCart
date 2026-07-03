import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { products } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'

const product = products[0]

if (!product) {
  throw new Error('Expected at least one product for cart store tests')
}

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds an item as a cart line', () => {
    const cartStore = useCartStore()

    cartStore.addItem(product)

    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.items[0]?.productId).toBe(product.id)
    expect(cartStore.items[0]?.quantity).toBe(1)
  })

  it('increments quantity when adding the same product again', () => {
    const cartStore = useCartStore()

    cartStore.addItem(product)
    cartStore.addItem(product)

    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.items[0]?.quantity).toBe(2)
    expect(cartStore.totalItems).toBe(2)
  })

  it('removes an item', () => {
    const cartStore = useCartStore()

    cartStore.addItem(product)
    cartStore.removeItem(product.id)

    expect(cartStore.items).toHaveLength(0)
  })

  it('calculates subtotal correctly', () => {
    const cartStore = useCartStore()

    cartStore.addItem(product, 2)

    expect(cartStore.subtotal).toBe(product.price * 2)
  })

  it('prevents quantity below one', () => {
    const cartStore = useCartStore()

    cartStore.addItem(product)
    cartStore.updateQuantity(product.id, 0)

    expect(cartStore.items[0]?.quantity).toBe(1)
  })

  it('opens and closes the cart drawer state', () => {
    const cartStore = useCartStore()

    cartStore.openCart()
    expect(cartStore.isOpen).toBe(true)

    cartStore.closeCart()
    expect(cartStore.isOpen).toBe(false)
  })
})
