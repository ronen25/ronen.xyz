import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ZodError } from 'zod';
import { authOptions } from '../auth/[...nextauth]';

import addPost from '../../../lib/blog/posts/addPost';
import { PostSchema } from '../../../lib/blog/schemas/post';

interface ResponseData {
  status: 'ok' | 'error';
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  // TODO: Add support for getting posts
  try {
    if (req.method === 'POST') {
      const postData = PostSchema.parse(req.body);
      await addPost(postData);
    } else {
      return res.status(405).json({ status: 'ok' });
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
