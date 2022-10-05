import { prisma } from '../../db';

export default async (tags: { name: string }[]) => {
  return prisma.tags.createMany({
    data: tags,
    skipDuplicates: true,
  });
};
