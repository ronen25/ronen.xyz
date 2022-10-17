import { z } from 'zod';

const PostShortSchema = z.object({
  attributes: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    author: z.string().min(1),
    publishedAt: z.string(),
    socialimage: z.string().optional(),
    tags: z
      .array(
        z.object({
          attributes: z.object({
            value: z.string(),
          }),
        })
      )
      .optional(),
  }),
});

type PostShortSchemaType = z.infer<typeof PostShortSchema>;

const PostFullSchema = z.intersection(
  PostShortSchema,
  z.object({
    attributes: z.object({
      updatedAt: z.string(),
      content: z.string().min(1),
      views: z.string(),
      tags: z.array(
        z.object({
          attributes: z.object({
            value: z.string(),
          }),
        })
      ),
    }),
  })
);

type PostFullSchemaType = z.infer<typeof PostFullSchema>;

export {
  PostShortSchema,
  type PostShortSchemaType,
  PostFullSchema,
  type PostFullSchemaType,
};
