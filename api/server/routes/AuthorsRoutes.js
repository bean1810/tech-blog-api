import { Router } from 'express';
import AuthorsController from '../controllers/AuthorsController';
import Validator from '../utils/Validator'

const router = Router();

router.get('/', AuthorsController.getAllAuthors);
router.post('/', Validator.isRequestBodyEmpty, AuthorsController.upsertAuthor);
router.get('/:id', Validator.isParameterNumber, AuthorsController.getAAuthor);
router.put('/:id', AuthorsController.fincAuthorToUpdate);
router.delete('/:id', Validator.isParameterNumber, AuthorsController.deleteAuthor);

export default router;