import ArticlesService from '../services/ArticlesService';
import ResponseUtil from "../utils/ResponseUtils";
import ObjectUtils from '../utils/ObjectUtils';

const responseUtils = new ResponseUtil();

class ArticlesController {
    static async getAllArticles(req, res, next) {
        try {
            const allArticles = await ArticlesService.getAllArticles();
            const message = allArticles.length ? 'Articles retrieved successfully' : 'No articles retrieved';
            responseUtils.setSuccess(200, message, allArticles);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    };

    static async getArticleById(req, res, next) {
        const { slug } = req.params;

        try {
            const foundArticle = await ArticlesService.getArticleById(slug);
            const message = foundArticle ? 'Found Article' : 'No Article Found';
            responseUtils.setSuccess(200, message, foundArticle);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    };

    static async createNewArticle(req, res, next) {
        const article = req.body;
        try {
            const createdArticle = await ArticlesService.createNewArticle(article);
            responseUtils.setSuccess(200, 'Article created', createdArticle);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    };

    static async updateArticleById(req, res, next) {
        const altereArticle = req.body;
        const { id } = req.params;
        try {
            const updateArticle = await ArticlesService.updateArticleById(id, altereArticle);
            const message = updateArticle ? 'Article updated' : 'Article not exist'
            responseUtils.setSuccess(200, message, updateArticle);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    };

    static async deleteArticleById(req, res, next) {
        const { id } = req.params;
        try {
            const deletedArticle = await ArticlesService.deleteArticleById(id);
            const message = deletedArticle ? 'Article deleted' : `Article with id ${id} cannot be found`;
            responseUtils.setSuccess(200, message);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    };
}

export default ArticlesController