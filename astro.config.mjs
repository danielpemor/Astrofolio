import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({ 
            stage: 3,
            features: {
              'nesting-rules': true
            }
          }),
          autoprefixer()
        ]
      }
    }
  }
});