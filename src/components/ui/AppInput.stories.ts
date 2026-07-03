import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import AppInput from './AppInput.vue'

const meta = {
  title: 'UI/AppInput',
  component: AppInput,
  args: {
    id: 'storybook-product-search',
    label: 'Search products',
    modelValue: '',
    placeholder: 'Search bikes, gear, or tags',
    type: 'search',
    disabled: false,
    helpText: 'Try road, helmet, commuter, or electric.',
  },
  render: (args) => ({
    components: { AppInput },
    setup() {
      const value = ref(args.modelValue)

      return { args, value }
    },
    template: `
      <AppInput
        :id="args.id"
        :label="args.label"
        v-model="value"
        :placeholder="args.placeholder"
        :type="args.type"
        :disabled="args.disabled"
        :help-text="args.helpText"
      />
    `,
  }),
} satisfies Meta<typeof AppInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'helmet',
  },
}
