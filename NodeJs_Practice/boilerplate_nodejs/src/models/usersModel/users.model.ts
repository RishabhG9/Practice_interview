import { prisma } from '@/config/db';

export const createUser = async (name: string, email_id: string) => {
  return prisma.users.create({
    data: { name, email_id }
  });
};

export const findUserByEmail = async (email_id: string) => {
  return prisma.users.findFirst({
    where: { email_id }
  });
};