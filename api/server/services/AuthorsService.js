import database from '../src/models';

class AuthorsService {
    static async getAllAuthors() {
        try {
            return await database.Authors.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addAuthor(newAuthor) {
        try {
            return await database.Authors.create(newAuthor);
        } catch (error) {
            throw error;
        }
    }

    static async updateAuthor(id, updateAuthor) {
        try {
            const authorToUpdate = await database.Authors.findOne({
                where: { author_id: Number(id) }
            });

            if (authorToUpdate) {
                await database.Authors.update(updateAuthor, { where: { author_id: Number(id) } });

                return updateAuthor;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getOneAuthor(id) {
        try {
            const theAuthor = await database.Authors.findOne({
                where: { author_id: Number(id) }
            });

            return theAuthor;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAuthor(id) {
        try {
            const authorToDelete = await database.Authors.findOne({ where: { author_id: Number(id) } });

            if (authorToDelete) {
                const deletedAuthor = await database.Authors.destroy({
                    where: { author_id: Number(id) }
                });
                return deletedAuthor;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthorsService;