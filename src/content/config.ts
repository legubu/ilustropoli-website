import { defineCollection, z } from 'astro:content';

const artworks = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.number().optional(),
    images: z.array(image()),
    palette: z.string().optional(),
    surface: z.string().optional(),
    stock: z.number().default(1),
    featured: z.boolean().default(false),
    for_sale: z.boolean().default(false),
    category: z.enum(['acuarela', 'acrilico', 'oleo', 'sketch']).optional(),
    payment_link: z.string().url().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const workshops = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    image: image().optional(),
    date: z.union([z.string(), z.date()]).transform(val =>
      val instanceof Date ? val.toISOString().split('T')[0] : val
    ),
    duration: z.string(),
    price: z.number(),
    capacity: z.number(),
    payment_link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { artworks, workshops, tags };
