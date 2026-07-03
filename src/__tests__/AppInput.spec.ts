import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppInput from '@/components/ui/AppInput.vue'

describe('AppInput', () => {
  it('associates label with input', () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'product-search',
        label: 'Search products',
        modelValue: '',
      },
    })

    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.attributes('for')).toBe('product-search')
    expect(input.attributes('id')).toBe('product-search')
  })

  it('emits update when input changes', async () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'product-search',
        label: 'Search products',
        modelValue: '',
      },
    })

    await wrapper.find('input').setValue('trail')

    expect(wrapper.emitted('update:modelValue')).toEqual([['trail']])
  })
})
