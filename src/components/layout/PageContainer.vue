<template>
  <section class="page-container">
    <slot />
  </section>
</template>

<style scoped>
.page-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3rem 0;
}
</style>
