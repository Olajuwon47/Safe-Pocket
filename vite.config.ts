import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';

const srcPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // visualizer({
    //   filename: 'bundle-report.html',
    //   open: true, // Automatically open after build
    //   gzipSize: true,
    //   brotliSize: true,
    //   template: 'treemap', // nicer layout
    // }),
  ],

  resolve: {
    alias: {
      '@': srcPath,
    },
  },

  build: {
    sourcemap: false,
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

});
