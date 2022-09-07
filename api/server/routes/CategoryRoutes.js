import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import Validator from '../utils/Validator'

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:name', Validator.isParameterString, CategoryController.getCategoryByName);
router.post('/', CategoryController.createCategory);

export default router;