<template>
  <header class="site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <div class="header-inner">
      <RouterLink class="brand-link" to="/" aria-label="RideCart home">
        RideCart
      </RouterLink>

      <nav class="site-nav" aria-label="Main navigation">
        <RouterLink to="/products">Products</RouterLink>
      </nav>

      <button class="cart-button" type="button" aria-label="Open cart">
        Cart
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.header-inner {
  width: min(1120px, calc(100% - 2rem));
  min-height: 4rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-link {
  color: #111827;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.site-nav a {
  color: #374151;
  text-decoration: none;
}

.site-nav a:hover,
.site-nav a.router-link-active {
  color: #111827;
  text-decoration: underline;
}

.cart-button {
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  font: inherit;
  padding: 0.5rem 0.875rem;
}

.cart-button:hover {
  background: #f9fafb;
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -10rem;
  z-index: 10;
  background: #111827;
  color: #ffffff;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
}

.skip-link:focus {
  top: 1rem;
}

@media (max-width: 520px) {
  .header-inner {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.75rem 0;
  }

  .site-nav {
    order: 3;
    width: 100%;
    margin-left: 0;
  }
}
</style>
