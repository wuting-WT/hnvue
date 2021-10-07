import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@comps": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@store": path.resolve(__dirname, "./src/vuex"),
      "@router": path.resolve(__dirname, "./src/router"),
    },
  },

  plugins: [
    vue(),
    viteMockServe({ supportTs: false }) // 不使用ts的情况下可以设置为false
  ]
})
