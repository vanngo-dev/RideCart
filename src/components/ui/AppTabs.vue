<script setup lang="ts">
export interface TabItem {
  label: string
  value: string
}

defineProps<{
  tabs: TabItem[]
  modelValue: string
  ariaLabel: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectTab = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="app-tabs">
    <div class="app-tabs__list" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="app-tabs__tab"
        :class="{ 'app-tabs__tab--active': tab.value === modelValue }"
        type="button"
        role="tab"
        :aria-selected="tab.value === modelValue"
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="app-tabs__panel" role="tabpanel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-tabs {
  display: grid;
  gap: 1rem;
}

.app-tabs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.app-tabs__tab {
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 0.5rem 0.875rem;
}

.app-tabs__tab:hover {
  background: #f9fafb;
}

.app-tabs__tab:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.app-tabs__tab--active {
  border-color: #111827;
  background: #111827;
  color: #ffffff;
}

.app-tabs__panel {
  min-width: 0;
}
</style>
