import { PrismaClient } from '@prisma/client';

export const AddPost = async (metadata: Object, data: string) => {
  const prisma = new PrismaClient();

  console.log(metadata);
  console.log(data);
};
