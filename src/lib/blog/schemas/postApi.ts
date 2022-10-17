import { z } from 'zod';
import { PostShortSchema } from './post';

export const PostsShortResponse = z.object({
  data: z.array(PostShortSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});
