import type { Meta, StoryObj } from '@storybook/vue3'

import ProductCard from './ProductCard.vue'
import { products } from '@/data/products'

const product = products[0]

if (!product) {
  throw new Error('Expected at least one product for ProductCard stories')
}

const outOfStockProduct = products.find((item) => !item.inStock) ?? product

const meta = {
  title: 'Product/ProductCard',
  component: ProductCard,
  args: {
    product,
  },
  render: (args) => ({
    components: { ProductCard },
    setup() {
      const handleAddToCart = () => undefined

      return { args, handleAddToCart }
    },
    template: `
      <div style="max-width: 340px">
        <ProductCard :product="args.product" @add-to-cart="handleAddToCart" />
      </div>
    `,
  }),
} satisfies Meta<typeof ProductCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OutOfStock: Story = {
  args: {
    product: outOfStockProduct,
  },
}
