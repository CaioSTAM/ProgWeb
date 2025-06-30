import { Request, Response } from 'express';
import * as majorService from '../services/major.service';
import { createMajorSchema, updateMajorSchema } from '../schemas/major.schema';

export const create = async (req: Request, res: Response) => {
  const { error } = createMajorSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const major = await majorService.createMajor(req.body);
  return res.status(201).json(major);
};

export const getAll = async (_req: Request, res: Response) => {
  const majors = await majorService.getAllMajors();
  return res.json(majors);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const major = await majorService.getMajorById(id);
  if (!major) return res.status(404).json({ error: 'Major not found' });

  return res.json(major);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { error } = updateMajorSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updated = await majorService.updateMajor(id, req.body);
  return res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await majorService.deleteMajor(id);
  return res.status(204).send();
};
