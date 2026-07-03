import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProductGrid from '@/components/product/ProductGrid.vue'
import { products } from '@/data/products'

describe('ProductGrid', () => {
  it('renders an empty state when there are no products', () => {
    const wrapper = mount(ProductGrid, {
      props: {
        products: [],
      },
    })

    expect(wrapper.text()).toContain('No products found')
    expect(wrapper.text()).toContain('Try changing the search, category, or sort options.')
  })

  it('renders product cards when products exist', () => {
    const wrapper = mount(ProductGrid, {
      props: {
        products: products.slice(0, 2),
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Apex Road 2')
    expect(wrapper.text()).toContain('TrailCore Mountain 5')
  })
})
