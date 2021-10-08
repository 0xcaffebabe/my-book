import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DocServer from './src/plugins/DocServer'
import DocBuildMove from './src/plugins/DocBuildMove'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DocServer(),
    {
      ...DocBuildMove(),
      enforce: 'post'
    }
  ],
  build: {
    assetsDir: "resource",
    emptyOutDir: false
  }
})
