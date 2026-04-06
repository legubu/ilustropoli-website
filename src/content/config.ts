import { defineCollection, z } from 'astro:content';

const artworks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    price: z.number(),
    images: z.array(z.string()),
    palette: z.string().optional(),
    surface: z.string().optional(),
    stock: z.number().default(1),
    featured: z.boolean().default(false),
    payment_link: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

const workshops = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    duration: z.string(),
    price: z.number(),
    capacity: z.number(),
    payment_link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { artworks, workshops };
