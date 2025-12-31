
// imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// configs
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@images': path.resolve(__dirname, 'public/images'),
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@components': path.resolve(__dirname, 'src/components'),
         '@contexts': path.resolve(__dirname, 'src/contexts'),
         '@pages': path.resolve(__dirname, 'src/pages'),
         '@routes': path.resolve(__dirname, 'src/routes'),
         '@services': path.resolve(__dirname, 'src/services'),
         '@styles': path.resolve(__dirname, 'src/styles'),
         '@interfaces': path.resolve(__dirname, '../shared/interfaces/frontend'),         

         '@root': path.resolve(__dirname, 'src')
      }
   }
});