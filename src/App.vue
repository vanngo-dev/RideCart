<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { RouterView } from 'vue-router'

import CartDrawer from '@/components/cart/CartDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const appHeaderRef = ref<InstanceType<typeof AppHeader> | null>(null)

const openCart = () => {
  cartStore.openCart()
}

const closeCart = async () => {
  cartStore.closeCart()
  await nextTick()
  appHeaderRef.value?.focusCartButton()
}
</script>

<template>
  <div class="app-shell">
    <AppHeader
      ref="appHeaderRef"
      :cart-count="cartStore.totalItems"
      @open-cart="openCart"
    />

    <main id="main-content" class="app-main" tabindex="-1">
      <RouterView />
    </main>

    <AppFooter />

    <CartDrawer :open="cartStore.isOpen" @close="closeCart" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
}
</style>
