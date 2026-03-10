import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/cn/api': {
        target: 'https://cn.api.doxmind.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/cn/, ''),
        cookieDomainRewrite: { '*': '' },
      },
      '/api': {
        target: process.env.VITE_API_TARGET || 'https://api.doxmind.com',
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: { '*': '' },
      },
    },
  },
})
