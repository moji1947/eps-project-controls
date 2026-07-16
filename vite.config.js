import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

function sitesStaticAdapter() {
  return {
    name: 'sites-static-adapter',
    apply: 'build',
    async closeBundle() {
      await mkdir(resolve('dist/server'), { recursive: true })
      await mkdir(resolve('dist/.openai'), { recursive: true })
      await copyFile(resolve('worker/index.js'), resolve('dist/server/index.js'))
      await copyFile(resolve('.openai/hosting.json'), resolve('dist/.openai/hosting.json'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitesStaticAdapter()],
})
