import { PrismaClient } from '../src/generated/prisma';
import { UserInput } from '../types/user.types';

const prisma = new PrismaClient();

export const createUser = async (data: UserInput) => {
  return prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({ include: { major: true } });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id }, include: { major: true } });
};

export const updateUser = async (id: number, data: UserInput) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};
