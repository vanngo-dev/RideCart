import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'

import '../src/assets/main.css'

setup((app) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div />' },
      },
      {
        path: '/products',
        component: { template: '<div />' },
      },
      {
        path: '/products/:slug',
        component: { template: '<div />' },
      },
    ],
  })

  app.use(createPinia())
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
