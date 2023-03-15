// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        codes: resolve(__dirname, 'codes/index.php'),
        success: resolve(__dirname, 'codes/success.php'),
        failure: resolve(__dirname, 'codes/failure.php'),
        error: resolve(__dirname, 'codes/error.php'),
      },
    },
  },
})