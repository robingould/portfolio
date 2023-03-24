// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
//hi
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        neoc: resolve(__dirname, 'neoc.html'),
        cloudynite: resolve(__dirname, 'cloudynite.gif'),
        oneko: resolve(__dirname, 'oneko.gif'),
        sheep: resolve(__dirname, 'sheep.gif'),
        codes: resolve(__dirname, 'codes/index.html'),
        success: resolve(__dirname, 'success.html'),
        final: resolve(__dirname, 'final.html'),
        failure: resolve(__dirname, 'codes/failure.html'),
        error: resolve(__dirname, 'codes/error.html'),
      },
    },
  },
})