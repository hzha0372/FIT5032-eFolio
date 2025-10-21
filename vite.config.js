/* global process */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/FIT5032-eFolio/'
    : '/',
  define: {
    'process.env': {
      BASE_URL: process.env.NODE_ENV === 'production'
        ? '/FIT5032-eFolio/'
        : '/'
    }
  },
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  }
})
