
import { prisma } from '@/config/db';
import { usersModelType } from './types';

export const findAll = async () => {
  return prisma.users.findMany({
    where: { archived: null },
  });
};

export const findById = async (id: number) => {
  return prisma.users.findUnique({ where: { id, archived: null } });
};

export const findByUuid = async (uuid: string) => {
  return prisma.users.findUnique({ where: { uuid, archived: null } });
};

export const create = async (data: any) => {
  return prisma.users.create({ data });
};

export const updateById = async (id: number, data: any) => {
  return prisma.users.update({ where: { id }, data });
};

export const updateByUuid = async (uuid: string, data: any) => {
  return prisma.users.update({ where: { uuid }, data });
};

export const deleteById = async (id: number) => {
  return prisma.users.delete({ where: { id } });
};

export const deleteByUuid = async (uuid: string) => {
  return prisma.users.delete({ where: { uuid } });
};

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