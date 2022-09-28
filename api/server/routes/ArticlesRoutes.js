import { Router } from 'express';
import Validator from '../utils/Validator';
import ArticlesController from '../controllers/ArticlesController';

const router = new Router();

router.get('/', ArticlesController.getAllArticles);
router.get('/:slug', ArticlesController.getArticleById);
router.post('/', ArticlesController.createNewArticle);
router.put('/:id', ArticlesController.updateArticleById);
router.delete('/:id', ArticlesController.deleteArticleById);

export default router;