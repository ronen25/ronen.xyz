import { z } from 'zod';
import { PostShortSchema, PostNamesSchema, PostFullSchema } from './post';

const MetaSchema = z.object({
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});

export const PostsShortResponse = z.intersection(
  z.object({
    data: z.array(PostShortSchema),
  }),
  MetaSchema
);

export const PostFullResponse = z.intersection(
  z.object({
    data: z.array(PostFullSchema),
  }),
  MetaSchema
);

export const PostsNamesResponse = z.intersection(
  z.object({
    data: z.array(PostNamesSchema),
  }),
  MetaSchema
);
