import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//elementPlus导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          // 配置 Element Plus 使用 sass 样式
          ElementPlusResolver({ importStyle: "sass" }),
        ],
      }),
    ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `@use "@/styles/element/index.scss" as *;`,

      },
    },
  },
})
