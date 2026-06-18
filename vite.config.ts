import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages 子路径，本地开发默认为 / */
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
})
