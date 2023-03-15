// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
//hi
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        codes: resolve(__dirname, 'codes/index.html'),
        success: resolve(__dirname, 'codes/success.html'),
        failure: resolve(__dirname, 'codes/failure.html'),
        error: resolve(__dirname, 'codes/error.html'),
      },
    },
  },
})