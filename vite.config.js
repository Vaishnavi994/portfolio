// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   cacheDir: '.vite-cache',
//   server: {
//     port: 3000,
//     host: '0.0.0.0',
//     open: false
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  cacheDir: '.vite-cache',
  base: mode === 'production' ? './' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
}))
