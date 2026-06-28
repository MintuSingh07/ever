import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        // Cache-first strategy for all static assets
        globPatterns: ['**/*.{js,css,html,ico,svg,webp,png,jpg,jpeg,woff2,woff,mp4}'],
        // Max cache size per entry: 50MB (for video files)
        maximumFileSizeToCacheInBytes: 52_428_800,
        runtimeCaching: [
          {
            // Cache-first for all same-origin images/media
            urlPattern: /\.(?:webp|png|jpg|jpeg|svg|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'evercrown-images-v1',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache-first for video files
            urlPattern: /\.(?:mp4|webm)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'evercrown-videos-v1',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Stale-while-revalidate for fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'evercrown-fonts-v1',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'Evercrown Constructions',
        short_name: 'Evercrown',
        description: 'Transforming plots into future-ready landmarks',
        theme_color: '#050505',
        background_color: '#050505',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
