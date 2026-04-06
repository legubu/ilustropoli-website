import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ilustropoli.com',
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
  ],
  image: {
    // Use Astro's built-in image optimization
    remotePatterns: [],
  },
});
