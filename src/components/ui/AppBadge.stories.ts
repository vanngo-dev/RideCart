import type { Meta, StoryObj } from '@storybook/vue3'

import AppBadge from './AppBadge.vue'

const meta = {
  title: 'UI/AppBadge',
  component: AppBadge,
  args: {
    variant: 'neutral',
    default: 'Neutral',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning'],
    },
  },
  render: (args) => ({
    components: { AppBadge },
    setup() {
      return { args }
    },
    template: `
      <AppBadge :variant="args.variant">
        {{ args.default }}
      </AppBadge>
    `,
  }),
} satisfies Meta<typeof AppBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    default: 'Road',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    default: 'In stock',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    default: 'Out of stock',
  },
}
