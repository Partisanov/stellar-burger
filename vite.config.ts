import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: "/ya-practicum-react-burger",
  plugins: [react()],
});
