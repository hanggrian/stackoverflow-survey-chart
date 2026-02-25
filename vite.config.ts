import tailwindcss from '@tailwindcss/vite';
import {defineConfig, UserConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/stackoverflow-survey-chart/',
  plugins: [react(), tailwindcss()],
  test: {
    include: ['src/__tests__/*.tsx'],
    environment: 'jsdom',
    globals: true,
  },
} as UserConfig);
