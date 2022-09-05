import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:name', CategoryController.getCategoryByName);
router.post('/', CategoryController.createCategory);

export default router;