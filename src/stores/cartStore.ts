import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  )

  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.product.price * item.quantity, 0),
  )

  const addItem = (product: Product, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity))
    const existingItem = items.value.find((item) => item.productId === product.id)

    if (existingItem) {
      existingItem.quantity += safeQuantity
      return
    }

    items.value.push({
      productId: product.id,
      product,
      quantity: safeQuantity,
    })
  }

  const removeItem = (productId: string) => {
    items.value = items.value.filter((item) => item.productId !== productId)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = items.value.find((cartItem) => cartItem.productId === productId)

    if (!item) {
      return
    }

    item.quantity = Math.max(1, Math.floor(quantity))
  }

  const incrementItem = (productId: string) => {
    const item = items.value.find((cartItem) => cartItem.productId === productId)

    if (!item) {
      return
    }

    item.quantity += 1
  }

  const decrementItem = (productId: string) => {
    const item = items.value.find((cartItem) => cartItem.productId === productId)

    if (!item) {
      return
    }

    item.quantity = Math.max(1, item.quantity - 1)
  }

  const clearCart = () => {
    items.value = []
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    incrementItem,
    decrementItem,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }
})
