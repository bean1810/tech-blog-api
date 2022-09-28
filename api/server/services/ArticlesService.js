import database from '../src/models';

class ArticlesService {
    static async getAllArticles() {
        try {
            return await database.Articles.findAll();
        } catch (error) {
            throw error;
        }
    };
    static async getArticleById(slug) {
        try {
            const foundArticle = await database.Articles.findOne({
                where: { slug: slug }
            })

            return foundArticle || null;
        } catch (error) {
            throw error
        }
    };
    static async createNewArticle(newArticle) {
        try {
            return await database.Articles.create(newArticle)
        } catch (error) {
            throw error
        }
    };
    static async updateArticleById(id, newArticle) {
        try {
            const foundArticle = await database.Articles.findOne({
                where: { id: id }
            })

            if (!foundArticle) return null;
            await database.Articles.update(newArticle, { where: { id: id } })
            return newArticle;
        } catch (error) {
            throw error
        }
    };
    static async deleteArticleById(id) {
        try {
            const foundArticle = await database.Articles.findOne({
                where: { id: id }
            })
            if (!foundArticle) return null;
            return database.Articles.destroy({
                where: { id: id }
            });
        } catch (error) {
            throw error
        }
    };
}

export default ArticlesService