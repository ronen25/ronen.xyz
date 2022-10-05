import { prisma } from '../../db';

export default async () => {
  return prisma.tags.findMany();
};
