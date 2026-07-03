<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string
}

withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    options: SelectOption[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="app-select">
    <label class="app-select__label" :for="id">
      {{ label }}
    </label>

    <select
      :id="id"
      class="app-select__control"
      :value="modelValue"
      :disabled="disabled"
      @change="handleChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.app-select {
  display: grid;
  gap: 0.375rem;
}

.app-select__label {
  color: #111827;
  font-size: 0.875rem;
  font-weight: 700;
}

.app-select__control {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: #ffffff;
  color: #111827;
  font: inherit;
  padding: 0.625rem 0.75rem;
}

.app-select__control:focus {
  border-color: #2563eb;
  outline: 3px solid #bfdbfe;
  outline-offset: 1px;
}

.app-select__control:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
</style>
