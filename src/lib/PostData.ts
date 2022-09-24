import { PrismaClient } from '@prisma/client';

const getTop10PopularPosts = async () => {
  const prisma = new PrismaClient();

  const posts = await prisma.posts.findMany({
    take: 10,
    orderBy: {
      views: 'desc',
    },
  });

  return posts;
};

const getPostsByDate = async (page: number, countPerPage: number) => {
  const prisma = new PrismaClient();

  const toSkip = page * countPerPage;

  const posts = await prisma.posts.findMany({
    skip: toSkip,
    take: countPerPage,
    orderBy: [
      {
        publishdate: 'desc',
      },
    ],
  });

  return posts;
};

export { getPostsByDate, getTop10PopularPosts };
