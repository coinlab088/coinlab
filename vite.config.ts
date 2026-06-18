import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  /** GitHub Pages 项目页：https://coinlab088.github.io/coinlab/ */
  base: command === 'serve' ? '/' : '/coinlab/',
  plugins: [react()],
}))
