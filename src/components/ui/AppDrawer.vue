<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
  }>(),
  {
    open: false,
  },
)

const emit = defineEmits<{
  close: []
}>()

const titleId = `drawer-title-${Math.random().toString(36).slice(2)}`

const closeDrawer = () => {
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) {
    closeDrawer()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  },
  {
    immediate: true,
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="drawer-overlay" @click.self="closeDrawer">
      <aside
        class="drawer-panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <header class="drawer-header">
          <h2 :id="titleId">
            {{ title }}
          </h2>

          <button class="drawer-close" type="button" aria-label="Close drawer" @click="closeDrawer">
            ×
          </button>
        </header>

        <div class="drawer-content">
          <slot />
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
  background: rgb(17 24 39 / 0.45);
}

.drawer-panel {
  width: min(420px, 100%);
  min-height: 100%;
  background: #ffffff;
  box-shadow: -20px 0 35px rgb(17 24 39 / 0.2);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
}

.drawer-header h2 {
  margin: 0;
  color: #111827;
  font-size: 1.25rem;
}

.drawer-close {
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.drawer-close:hover {
  background: #f9fafb;
}

.drawer-content {
  padding: 1rem;
}
</style>
