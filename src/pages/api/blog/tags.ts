import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import addTags from '../../../lib/blog/tags/addTags';
import getTags from '../../../lib/blog/tags/getTags';

interface ResponseData {
  status: 'ok' | 'error';
  message?: string;
  data?: any;
}

const TagsData = z.object({
  tags: z.array(
    z.object({
      name: z.string().min(1, { message: 'Tag name must not be empty' }),
    })
  ),
});

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
      const { tags } = TagsData.parse(req.body);
      await addTags(tags);
    } else if (req.method === 'GET') {
      const tags = await getTags();
      return res.status(200).json({ status: 'ok', data: tags });
    } else {
      return res.status(405);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      // Schema validation error
      return res
        .status(400)
        .json({ status: 'error', message: JSON.stringify(error.issues) });
    }

    console.error(error);

    return res.status(500).json({ status: 'error', message: JSON.stringify(error) });
  }

  return res.status(200).json({ status: 'ok' });
}
