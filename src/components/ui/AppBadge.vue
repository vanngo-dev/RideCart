<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'success' | 'warning'
  }>(),
  {
    variant: 'neutral',
  },
)
</script>

<template>
  <span class="app-badge" :class="`app-badge--${variant}`">
    <slot />
  </span>
</template>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
}

.app-badge--neutral {
  background: #f3f4f6;
  color: #374151;
}

.app-badge--success {
  background: #dcfce7;
  color: #166534;
}

.app-badge--warning {
  background: #fef3c7;
  color: #92400e;
}
</style>
