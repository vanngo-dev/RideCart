<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p>RideCart Commerce UI</p>
      <p>Vue 3 + TypeScript frontend slice</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #4b5563;
}

.footer-inner {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0;
  font-size: 0.875rem;
}

.footer-inner p {
  margin: 0;
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
  }
}
</style>
