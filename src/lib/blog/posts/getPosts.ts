import { toNumber } from 'lodash';
import { prisma } from '../../db';

const POSTS_PER_PAGE = 10;

const getPosts = async (query: { [key: string]: string | string[] | undefined }) => {
  const pageNumber = query['page'] ? toNumber(query['page']) : 1;
  const orderBy = query['orderby'] === 'popular' ? 'views' : 'publishdate';

  const postsData = await prisma.posts.findMany({
    skip: POSTS_PER_PAGE * (pageNumber - 1),
    take: POSTS_PER_PAGE,
    where: {
      isvisible: true,
    },
    orderBy: {
      [orderBy]: 'desc',
    },
    select: {
      content: false,
      name: true,
      author: true,
      publishdate: true,
      updatedate: true,
      views: true,
      title: true,
      posts_tags: {
        select: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return postsData;
};

export default getPosts;
