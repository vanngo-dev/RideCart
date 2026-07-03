import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

describe('App', () => {
  it('mounts with router shell', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/products',
          name: 'products',
          component: ProductListView,
        },
        {
          path: '/products/:slug',
          name: 'product-detail',
          component: ProductDetailView,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: NotFoundView,
        },
      ],
    })

    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('RideCart')
  })
})
