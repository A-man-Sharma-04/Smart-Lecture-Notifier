import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['firebase-messaging-sw.js'],
      manifest: {
        name: 'Smart Lecture Notifier',
        short_name: 'Lecture Notifier',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        start_url: '/',
        icons: []
      }
    })
  ],
  server: { port: 5173 }
})
