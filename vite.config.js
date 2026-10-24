import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three-vendor', test: /node_modules[\\/]three[\\/]/, priority: 20 },
            { name: 'fiber-vendor', test: /node_modules[\\/]@react-three[\\/]fiber[\\/]/, priority: 18 },
            { name: 'motion-vendor', test: /node_modules[\\/]motion[\\/]|node_modules[\\/]framer-motion[\\/]/, priority: 16 },
          ],
        },
      },
    },
  },
})
