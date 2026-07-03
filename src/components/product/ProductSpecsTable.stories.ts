import type { Meta, StoryObj } from '@storybook/vue3'

import ProductSpecsTable from './ProductSpecsTable.vue'
import { products } from '@/data/products'

const product = products[0]

if (!product) {
  throw new Error('Expected at least one product for ProductSpecsTable stories')
}

const meta = {
  title: 'Product/ProductSpecsTable',
  component: ProductSpecsTable,
  args: {
    specs: product.specs,
    caption: 'Product specifications',
  },
} satisfies Meta<typeof ProductSpecsTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    specs: [],
    caption: 'Empty specifications',
  },
}
