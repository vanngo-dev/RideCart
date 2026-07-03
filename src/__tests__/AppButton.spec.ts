import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppButton from '@/components/ui/AppButton.vue'

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Add to cart',
      },
    })

    expect(wrapper.text()).toContain('Add to cart')
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Add to cart',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Unavailable',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
