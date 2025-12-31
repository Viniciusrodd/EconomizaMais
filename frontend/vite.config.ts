
// imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// configs
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@styles': path.resolve(__dirname, 'src/styles'),
         '@interfaces': path.resolve(__dirname, '../shared/interfaces/frontend'),         

         '@root': path.resolve(__dirname, 'src')
      }
   }
});