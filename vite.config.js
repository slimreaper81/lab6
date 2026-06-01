import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/lab-5/',
  plugins: [
    tailwindcss(),
  ],
})