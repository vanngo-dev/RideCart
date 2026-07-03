import type { Meta, StoryObj } from '@storybook/vue3'
import { onBeforeUnmount, onMounted } from 'vue'

import CartDrawer from './CartDrawer.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'

const firstProduct = products[0]
const secondProduct = products[5] ?? products[0]

if (!firstProduct || !secondProduct) {
  throw new Error('Expected products for CartDrawer stories')
}

const meta = {
  title: 'Cart/CartDrawer',
  component: CartDrawer,
  args: {
    open: true,
  },
} satisfies Meta<typeof CartDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: (args) => ({
    components: { CartDrawer },
    setup() {
      const cartStore = useCartStore()

      onMounted(() => {
        cartStore.clearCart()
      })

      onBeforeUnmount(() => {
        cartStore.clearCart()
      })

      const closeDrawer = () => undefined

      return { args, closeDrawer }
    },
    template: `
      <CartDrawer :open="args.open" @close="closeDrawer" />
    `,
  }),
}

export const WithItems: Story = {
  render: (args) => ({
    components: { CartDrawer },
    setup() {
      const cartStore = useCartStore()

      onMounted(() => {
        cartStore.clearCart()
        cartStore.addItem(firstProduct, 1)
        cartStore.addItem(secondProduct, 2)
      })

      onBeforeUnmount(() => {
        cartStore.clearCart()
      })

      const closeDrawer = () => undefined

      return { args, closeDrawer }
    },
    template: `
      <CartDrawer :open="args.open" @close="closeDrawer" />
    `,
  }),
}
