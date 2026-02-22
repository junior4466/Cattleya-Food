import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'wynona-tonsilar-minh.ngrok-free.dev',
      '.ngrok-free.dev',
      'localhost'
    ]
  }
})