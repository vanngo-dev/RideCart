import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProductCard from '@/components/product/ProductCard.vue'
import { products } from '@/data/products'

const product = products[0]

if (!product) {
  throw new Error('Expected at least one product for ProductCard tests')
}

const mountProductCard = () =>
  mount(ProductCard, {
    props: {
      product,
    },
    global: {
      stubs: {
        RouterLink: {
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('ProductCard', () => {
  it('renders product name, price, stock badge, and image alt text', () => {
    const wrapper = mountProductCard()

    expect(wrapper.text()).toContain(product.name)
    expect(wrapper.text()).toContain('$1,499')
    expect(wrapper.text()).toContain('In stock')
    expect(wrapper.find('img').attributes('alt')).toBe(product.imageAlt)
  })

  it('emits addToCart with the product when clicked', async () => {
    const wrapper = mountProductCard()

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('addToCart')).toEqual([[product]])
  })
})
