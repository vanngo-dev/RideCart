<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    class="app-button"
    :class="[`app-button--${variant}`, `app-button--${size}`]"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    opacity 140ms ease;
}

.app-button:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.app-button--primary {
  background: #111827;
  color: #ffffff;
}

.app-button--primary:hover:not(:disabled) {
  background: #374151;
}

.app-button--secondary {
  border-color: #d1d5db;
  background: #ffffff;
  color: #111827;
}

.app-button--secondary:hover:not(:disabled) {
  background: #f9fafb;
}

.app-button--ghost {
  background: transparent;
  color: #111827;
}

.app-button--ghost:hover:not(:disabled) {
  background: #f3f4f6;
}

.app-button--sm {
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.app-button--md {
  min-height: 2.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
}

.app-button--lg {
  min-height: 3rem;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
}
</style>
