import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [{ src: 'docs/**/*', dest: 'docs' }]
    }),
    react(),
    TanStackRouterVite()
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src')
    }
  }
})
