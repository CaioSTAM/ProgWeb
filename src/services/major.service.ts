import { PrismaClient } from '../src/generated/prisma';
import { CreateMajorDTO, UpdateMajorDTO } from '../types/major.types';

const prisma = new PrismaClient();

export const createMajor = async (data: CreateMajorDTO) => {
  return await prisma.major.create({ data });
};

export const getAllMajors = async () => {
  return await prisma.major.findMany();
};

export const getMajorById = async (id: number) => {
  return await prisma.major.findUnique({ where: { id } });
};

export const updateMajor = async (id: number, data: UpdateMajorDTO) => {
  return await prisma.major.update({ where: { id }, data });
};

export const deleteMajor = async (id: number) => {
  return await prisma.major.delete({ where: { id } });
};
