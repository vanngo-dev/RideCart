import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'

import CartDrawer from '@/components/cart/CartDrawer.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'

const product = products[0]

if (!product) {
  throw new Error('Expected at least one product for CartDrawer tests')
}

describe('CartDrawer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders empty cart state', async () => {
    mount(CartDrawer, {
      props: {
        open: true,
      },
      attachTo: document.body,
    })

    await nextTick()

    expect(document.body.textContent).toContain('Your cart is empty')
  })

  it('renders cart items and subtotal', async () => {
    const cartStore = useCartStore()
    cartStore.addItem(product, 2)

    mount(CartDrawer, {
      props: {
        open: true,
      },
      attachTo: document.body,
    })

    await nextTick()

    expect(document.body.textContent).toContain(product.name)
    expect(document.body.textContent).toContain('$2,998')
  })

  it('emits close when Escape is pressed', async () => {
    const wrapper = mount(CartDrawer, {
      props: {
        open: true,
      },
      attachTo: document.body,
    })

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
