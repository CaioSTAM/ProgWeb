import Joi from 'joi';

export const createMajorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const updateMajorSchema = Joi.object({
  name: Joi.string().min(3).max(50),
});
