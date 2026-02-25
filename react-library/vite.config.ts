import {defineConfig, UserConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/__tests__/*.tsx'],
    environment: 'jsdom',
    globals: true,
  },
} as UserConfig);
