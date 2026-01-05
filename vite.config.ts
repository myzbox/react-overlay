
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@myzbox/react-overlay': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.spec.tsx', 'src/**/*.test.tsx'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactOverlay',
      formats: ['es', 'umd'],
      fileName: (format) => `react-overlay.${format === 'es' ? 'es' : 'umd'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },

})
