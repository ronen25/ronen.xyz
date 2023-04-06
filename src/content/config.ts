import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.date(),
    updatedAt: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
