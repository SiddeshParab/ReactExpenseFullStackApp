import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // eslint-disable-next-line no-undef
    port: parseInt(process.env.VITE_PORT),
  },
});
