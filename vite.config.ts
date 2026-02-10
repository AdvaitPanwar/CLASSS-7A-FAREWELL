
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the browser to access process.env.API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
