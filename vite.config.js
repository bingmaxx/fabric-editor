import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { analyzer } from 'vite-bundle-analyzer'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: '/fabric-editor/',

  plugins: [
    vue(),
    svgLoader(),
    // analyzer({
    //   defaultSizes: 'parsed',
    // }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  esbuild: {
    drop: ["console", "debugger"],
  },
})
