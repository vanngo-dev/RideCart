import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProductFilters from '@/components/product/ProductFilters.vue'

const mountFilters = () =>
  mount(ProductFilters, {
    props: {
      searchQuery: '',
      selectedCategory: 'all',
      selectedSort: 'featured',
    },
  })

describe('ProductFilters', () => {
  it('renders labeled filter controls', () => {
    const wrapper = mountFilters()

    expect(wrapper.find('label[for="product-search"]').text()).toBe('Search products')
    expect(wrapper.find('label[for="product-category"]').text()).toBe('Category')
    expect(wrapper.find('label[for="product-sort"]').text()).toBe('Sort by')
  })

  it('emits search query updates', async () => {
    const wrapper = mountFilters()

    await wrapper.find('#product-search').setValue('helmet')

    expect(wrapper.emitted('update:searchQuery')).toEqual([['helmet']])
  })

  it('emits category updates', async () => {
    const wrapper = mountFilters()

    await wrapper.find('#product-category').setValue('gear')

    expect(wrapper.emitted('update:selectedCategory')).toEqual([['gear']])
  })

  it('emits sort updates', async () => {
    const wrapper = mountFilters()

    await wrapper.find('#product-sort').setValue('price-asc')

    expect(wrapper.emitted('update:selectedSort')).toEqual([['price-asc']])
  })

  it('emits reset when reset button is clicked', async () => {
    const wrapper = mountFilters()

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('reset')).toHaveLength(1)
  })
})
