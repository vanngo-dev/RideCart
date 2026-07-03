import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import { routes } from '@/router'

describe('router', () => {
  it('includes the products route', () => {
    expect(routes.some((route) => route.path === '/products')).toBe(true)
  })

  it('includes the product detail route', () => {
    expect(routes.some((route) => route.path === '/products/:slug')).toBe(true)
  })

  it('renders the not found route for unknown paths', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    router.push('/missing-page')
    await router.isReady()

    const wrapper = mount(
      {
        template: '<RouterView />',
      },
      {
        global: {
          plugins: [router],
        },
      },
    )

    expect(wrapper.text()).toContain('Page not found')
  })
})
