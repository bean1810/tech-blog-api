import { Router } from 'express';
import AuthorsController from '../controllers/AuthorsController';

const router = Router();

router.get('/', AuthorsController.getAllAuthors);
router.post('/', AuthorsController.upsertAuthor);
router.get('/:id', AuthorsController.getAAuthor);
router.put('/:id', AuthorsController.fincAuthorToUpdate);
router.delete('/:id', AuthorsController.deleteAuthor);

export default router;