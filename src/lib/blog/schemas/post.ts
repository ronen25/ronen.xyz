import { z } from 'zod';

const PostSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  tags: z.array(z.string().min(1)),
  publishDate: z.date().optional(),
  updateDate: z.date().optional(),
  isVisible: z.boolean().optional(),
  contents: z.string().min(1),
});

type PostSchemaType = z.infer<typeof PostSchema>;

export { PostSchema, type PostSchemaType };
