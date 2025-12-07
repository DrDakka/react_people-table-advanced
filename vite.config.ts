import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const alias = {
  '@app': path.resolve(__dirname, 'src/app'),
  '@pages': path.resolve(__dirname, 'src/pages'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  base: '/react_people-table-advanced/',
})
