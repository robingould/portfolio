// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
//hi
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        yap: resolve(__dirname, 'pages/yap/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        codes: resolve(__dirname, 'codes/index.html'),
        success: resolve(__dirname, 'success.html'),
        final: resolve(__dirname, 'final.html'),
        failure: resolve(__dirname, 'codes/failure.html'),
        error: resolve(__dirname, 'codes/error.html'),
        music: resolve(__dirname, 'm.html'),
        spectrum: resolve(__dirname, 'projects/spectrum/index.html')
      },
    },
  },
})
