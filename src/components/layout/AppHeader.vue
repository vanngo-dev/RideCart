<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <nav class="site-nav" aria-label="Main navigation">
      <RouterLink class="site-title" to="/">RideCart</RouterLink>

      <div class="nav-links">
        <RouterLink to="/products">Products</RouterLink>
        <button type="button" class="cart-button" aria-label="Open cart">
          Cart
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #dde3ea;
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 10;
  padding: 0.75rem 1rem;
  background: #172026;
  color: #ffffff;
  border-radius: 0.5rem;
}

.skip-link:focus {
  top: 1rem;
}

.site-nav {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.site-title {
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  font-weight: 600;
}

.nav-links a.router-link-active {
  text-decoration: underline;
}

.cart-button {
  border: 1px solid #172026;
  background: #172026;
  color: #ffffff;
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-weight: 700;
}

@media (max-width: 520px) {
  .site-nav {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
