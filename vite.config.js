// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
//hi
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        yap: resolve(__dirname, '/yap/'),
        about: resolve(__dirname, '/about/'),
        projects: resolve(__dirname, '/projects/'),
        codes: resolve(__dirname, 'codes/index.html'),
        success: resolve(__dirname, 'success.html'),
        final: resolve(__dirname, 'final.html'),
        failure: resolve(__dirname, 'codes/failure.html'),
        error: resolve(__dirname, 'codes/error.html'),
        music: resolve(__dirname, 'm.html')
      },
    },
  },
})
