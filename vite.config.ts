import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  build: {
    minify: false, // 禁用压缩
    sourcemap: 'inline',
    
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        anotherEntry: path.resolve(__dirname, 'anotherEntry.html'),
      },
      output: {
        // 保留类名和函数名以便调试
        format: 'es',
        manualChunks: undefined,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
})
