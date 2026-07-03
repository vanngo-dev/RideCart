import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import ProductFilters from './ProductFilters.vue'

const meta = {
  title: 'Product/ProductFilters',
  component: ProductFilters,
  args: {
    searchQuery: '',
    selectedCategory: 'all',
    selectedSort: 'featured',
  },
  render: (args) => ({
    components: { ProductFilters },
    setup() {
      const searchQuery = ref(args.searchQuery)
      const selectedCategory = ref(args.selectedCategory)
      const selectedSort = ref(args.selectedSort)

      const resetFilters = () => {
        searchQuery.value = ''
        selectedCategory.value = 'all'
        selectedSort.value = 'featured'
      }

      return {
        searchQuery,
        selectedCategory,
        selectedSort,
        resetFilters,
      }
    },
    template: `
      <ProductFilters
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :selected-sort="selectedSort"
        @update:search-query="searchQuery = $event"
        @update:selected-category="selectedCategory = $event"
        @update:selected-sort="selectedSort = $event"
        @reset="resetFilters"
      />
    `,
  }),
} satisfies Meta<typeof ProductFilters>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSearch: Story = {
  args: {
    searchQuery: 'helmet',
    selectedCategory: 'gear',
    selectedSort: 'price-asc',
  },
}
