import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

dotenv.config({
  'path': '../.env'
})

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${process.env.HTTP_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: parseInt(process.env.VITE_PORT)
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/Assets/scss/main.scss" as *;'
      }
    }
  }
})
