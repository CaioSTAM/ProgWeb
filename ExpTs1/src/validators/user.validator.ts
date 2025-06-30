import Joi from 'joi';
import { UserInput } from '../types/user.types';

export const userSchema = Joi.object<UserInput>({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  majorId: Joi.number().optional().allow(null),
});
