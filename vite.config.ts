/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test'

  const plugins: PluginOption[] = [vue()]

  if (!isTest) {
    plugins.push(vueDevTools())
  }

  return {
    plugins,

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    test: {
      environment: 'jsdom',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/storybook-static/**',
        '**/e2e/**',
      ],
    },
  }
})
