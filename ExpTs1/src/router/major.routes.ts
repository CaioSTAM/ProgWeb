import { Router } from 'express';
import * as majorController from '../controllers/major.controller';

const router = Router();

router.post('/', majorController.create);
router.get('/', majorController.getAll);
router.get('/:id', majorController.getById);
router.put('/:id', majorController.update);
router.delete('/:id', majorController.remove);

export default router;
