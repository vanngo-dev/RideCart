<script setup lang="ts">
import type { ProductSpec } from '@/types/product'

withDefaults(
  defineProps<{
    specs: ProductSpec[]
    caption?: string
  }>(),
  {
    caption: 'Product specifications',
  },
)
</script>

<template>
  <section class="specs-section" aria-labelledby="product-specs-heading">
    <h2 id="product-specs-heading">Specifications</h2>

    <table v-if="specs.length > 0" class="specs-table">
      <caption>
        {{ caption }}
      </caption>

      <tbody>
        <tr v-for="spec in specs" :key="`${spec.label}-${spec.value}`">
          <th scope="row">
            {{ spec.label }}
          </th>
          <td>
            {{ spec.value }}
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="specs-empty">
      No specifications available.
    </p>
  </section>
</template>

<style scoped>
.specs-section {
  display: grid;
  gap: 1rem;
}

.specs-section h2 {
  margin: 0;
  color: #111827;
  font-size: 1.5rem;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
}

.specs-table caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.specs-table th,
.specs-table td {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.875rem 1rem;
  text-align: left;
  vertical-align: top;
}

.specs-table tr:last-child th,
.specs-table tr:last-child td {
  border-bottom: 0;
}

.specs-table th {
  width: 35%;
  background: #f9fafb;
  color: #111827;
  font-weight: 800;
}

.specs-table td {
  color: #4b5563;
}

.specs-empty {
  margin: 0;
  color: #6b7280;
}
</style>
