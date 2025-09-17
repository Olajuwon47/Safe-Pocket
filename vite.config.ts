import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

//import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss(),
 
   ],
   
  resolve: {
     
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      host: 'localhost',
      port: 24678,
    },
  },
})