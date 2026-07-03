<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue?: string
    placeholder?: string
    type?: 'text' | 'search' | 'email' | 'number'
    disabled?: boolean
    helpText?: string
  }>(),
  {
    modelValue: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    helpText: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="app-input">
    <label class="app-input__label" :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      class="app-input__control"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-describedby="helpText ? `${id}-help` : undefined"
      @input="handleInput"
    />

    <p v-if="helpText" :id="`${id}-help`" class="app-input__help">
      {{ helpText }}
    </p>
  </div>
</template>

<style scoped>
.app-input {
  display: grid;
  gap: 0.375rem;
}

.app-input__label {
  color: #111827;
  font-size: 0.875rem;
  font-weight: 700;
}

.app-input__control {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: #ffffff;
  color: #111827;
  font: inherit;
  padding: 0.625rem 0.75rem;
}

.app-input__control:focus {
  border-color: #2563eb;
  outline: 3px solid #bfdbfe;
  outline-offset: 1px;
}

.app-input__control:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.app-input__help {
  margin: 0;
  color: #6b7280;
  font-size: 0.8125rem;
}
</style>
