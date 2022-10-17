import { z } from 'zod';

export const PostShortSchema = z.object({
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

export type PostShortSchemaType = z.infer<typeof PostShortSchema>;

export const PostFullSchema = z.intersection(
  PostShortSchema,
  z.object({
    attributes: z.object({
      updatedAt: z.string(),
      content: z.string().min(1),
      views: z.string(),
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
  })
);

export type PostFullSchemaType = z.infer<typeof PostFullSchema>;

export const PostNamesSchema = z.object({
  attributes: z.object({
    name: z.string().min(1),
  }),
});

export type PostNamesSchemaType = z.infer<typeof PostNamesSchema>;
