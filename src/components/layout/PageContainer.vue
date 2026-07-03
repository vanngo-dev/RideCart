<template>
  <section class="page-container">
    <slot />
  </section>
</template>

<style scoped>
.page-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0;
}

@media (min-width: 768px) {
  .page-container {
    padding: 3rem 0;
  }
}
</style>
