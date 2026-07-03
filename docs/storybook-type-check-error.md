# Phase 10 Type Check Error — Storybook Args and CartDrawer

## Context

After adding Storybook stories, `npm run type-check` failed on `CartDrawer.stories.ts`.

The issue was not with the `CartDrawer` component itself. The issue was the Storybook story using an extra arg that was not a real component prop.

## Symptom

TypeScript reported:

```text
src/components/cart/CartDrawer.stories.ts:20:5 - error TS2353:
Object literal may only specify known properties, and 'populated' does not exist

Additional related errors:

'populated' does not exist in type Partial<ComponentPropsAndSlots<...>>
Property 'populated' does not exist
Object literal may only specify known properties

The bad story args looked like:

args: {
  open: true,
  populated: false,
}
Root Cause

CartDrawer only accepts this prop:

open: boolean

The story added this extra story-only arg:

populated: boolean

Because the story used:

satisfies Meta<typeof CartDrawer>

Storybook inferred args from the actual CartDrawer component props. Since populated is not a real prop, TypeScript rejected it.

Incorrect Pattern
const meta = {
  title: 'Cart/CartDrawer',
  component: CartDrawer,
  args: {
    open: true,
    populated: false,
  },
  argTypes: {
    populated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CartDrawer>

This fails because populated is not part of CartDrawer props.

Fix

Remove populated from shared args and create two separate stories:

CartDrawer / Empty
CartDrawer / WithItems

The empty story clears the Pinia cart store.

The populated story seeds the Pinia cart store with sample products.

Correct Pattern
const meta = {
  title: 'Cart/CartDrawer',
  component: CartDrawer,
  args: {
    open: true,
  },
} satisfies Meta<typeof CartDrawer>

Then each story controls the store setup separately:

export const Empty: Story = {
  render: (args) => ({
    setup() {
      const cartStore = useCartStore()

      onMounted(() => {
        cartStore.clearCart()
      })

      return { args }
    },
  }),
}
export const WithItems: Story = {
  render: (args) => ({
    setup() {
      const cartStore = useCartStore()

      onMounted(() => {
        cartStore.clearCart()
        cartStore.addItem(firstProduct, 1)
        cartStore.addItem(secondProduct, 2)
      })

      return { args }
    },
  }),
}
Verification

Run:

npm run type-check

Expected result:

No TS2353 error
No "populated does not exist" error
Lesson

When using:

satisfies Meta<typeof Component>

Storybook args are checked against real component props.

Use args only for actual props.

For story-only state:

Use render setup
Use wrapper refs
Use Pinia seeding
Use separate stories
Use decorators if needed

Do not add fake props to component args unless the story type is explicitly extended.