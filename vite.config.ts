import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'bundle-report.html',
      open: true, // Automatically open after build
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // nicer layout
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        // 💡 This breaks large libraries into smaller chunks
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios', 'react-router-dom', 'recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // optional: raises limit from 500kB to 1MB
  },

  server: {
    hmr: {
      host: 'localhost',
      port: 24678,
    },
  },
});
