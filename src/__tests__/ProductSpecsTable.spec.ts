import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProductSpecsTable from '@/components/product/ProductSpecsTable.vue'
import type { ProductSpec } from '@/types/product'

const specs: ProductSpec[] = [
  { label: 'Frame', value: 'Aluminum endurance frame' },
  { label: 'Brake Type', value: 'Hydraulic disc' },
]

describe('ProductSpecsTable', () => {
  it('renders spec labels and values', () => {
    const wrapper = mount(ProductSpecsTable, {
      props: {
        specs,
      },
    })

    expect(wrapper.text()).toContain('Frame')
    expect(wrapper.text()).toContain('Aluminum endurance frame')
    expect(wrapper.text()).toContain('Brake Type')
    expect(wrapper.text()).toContain('Hydraulic disc')
  })

  it('renders an empty state when no specs are available', () => {
    const wrapper = mount(ProductSpecsTable, {
      props: {
        specs: [],
      },
    })

    expect(wrapper.text()).toContain('No specifications available.')
  })
})
