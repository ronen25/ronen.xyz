import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ZodError } from 'zod';
import { authOptions } from '../auth/[...nextauth]';

import addPost from '../../../lib/blog/posts/addPost';
import { PostSchema } from '../../../lib/blog/schemas/post';
import getPosts from '../../../lib/blog/posts/getPosts';

interface ResponseData {
  status: 'ok' | 'error';
  message?: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  try {
    if (req.method === 'POST') {
      const postData = PostSchema.parse(req.body);
      await addPost(postData);
    } else if (req.method === 'GET') {
      const data = await getPosts(req.query);
      return res.status(200).json({ status: 'ok', data: data });
    } else {
      return res.status(405).json({ status: 'error' });
    }
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      // Schema validation error
      return res
        .status(400)
        .json({ status: 'error', message: JSON.stringify(error.issues) });
    }

    return res.status(500).json({ status: 'error', message: JSON.stringify(error) });
  }

  return res.status(200).json({ status: 'ok' });
}
