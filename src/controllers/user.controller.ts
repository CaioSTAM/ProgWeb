import { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { userSchema } from '../validators/user.validator';

export async function create(req: Request, res: Response) {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await UserService.createUser(value);
  res.status(201).json(user);
}

export async function getAll(req: Request, res: Response) {
  const users = await UserService.getAllUsers();
  res.json(users);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await UserService.getUserById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updated = await UserService.updateUser(id, value);
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await UserService.deleteUser(id);
  res.status(204).send();
}
