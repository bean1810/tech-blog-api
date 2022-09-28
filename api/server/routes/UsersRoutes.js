import { Router } from 'express';
import UsersController from '../controllers/UsersController'
import Validator from '../utils/Validator'

const router = Router();

router.get('/', UsersController.getAllUsers);
router.post('/authentication/', UsersController.authenticate);

export default router;