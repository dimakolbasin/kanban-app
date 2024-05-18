import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: 'kanban-app',
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      }
    }),
    svgLoader({
      defaultImport: 'component'
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
})
