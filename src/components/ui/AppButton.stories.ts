import type { Meta, StoryObj } from '@storybook/vue3'

import AppButton from './AppButton.vue'

const meta = {
  title: 'UI/AppButton',
  component: AppButton,
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
    default: 'Add to cart',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  render: (args) => ({
    components: { AppButton },
    setup() {
      return { args }
    },
    template: `
      <AppButton
        :variant="args.variant"
        :size="args.size"
        :disabled="args.disabled"
        :type="args.type"
      >
        {{ args.default }}
      </AppButton>
    `,
  }),
} satisfies Meta<typeof AppButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Add to cart',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'View details',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    default: 'Reset filters',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Out of stock',
  },
}
