
import { prisma } from '@/config/db';
import { foodModelType } from './types';

export const findAll = async () => {
  return prisma.food.findMany({
    where: { archived: null },
  });
};

export const findById = async (id: number) => {
  return prisma.food.findUnique({ where: { id , archived: null  } });
};

export const findByUuid = async (uuid: string) => {
  return prisma.food.findUnique({ where: { uuid , archived: null } });
};

export const create = async (data: any) => {
  return prisma.food.create({ data });
};

export const updateById = async (id: number, data: any) => {
  return prisma.food.update({ where: { id }, data });
};

export const updateByUuid = async (uuid: string, data: any) => {
  return prisma.food.update({ where: { uuid }, data });
};

export const deleteById = async (id: number) => {
  return prisma.food.delete({ where: { id } });
};

export const deleteByUuid = async (uuid: string) => {
  return prisma.food.delete({ where: { uuid } });
};
