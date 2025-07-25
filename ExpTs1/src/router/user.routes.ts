import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

export default router;
