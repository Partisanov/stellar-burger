import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/stellar-burger',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
