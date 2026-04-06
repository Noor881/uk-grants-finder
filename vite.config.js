import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise chunk warning — large article content is expected/acceptable
    chunkSizeWarningLimit: 1500,
  },
})
