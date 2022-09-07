import AuthorsService from '../services/AuthorsService';
import ResponseUtil from '../utils/ResponseUtils';
import ObjectUtils from '../utils/ObjectUtils';

const responseUtils = new ResponseUtil();

class AuthorController {
    static async getAllAuthors(req, res) {
        try {
            const allAuthors = await AuthorsService.getAllAuthors();
            if (allAuthors.length) {
                responseUtils.setSuccess(200, 'Authors retrieved', allAuthors);
            } else {
                responseUtils.setSuccess(200, 'No Author found', allAuthors);
            }
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async upsertAuthor(req, res) {
        if (!ObjectUtils.isObjectNotEmpty(req.body)) return responseUtils.sendResponseErrorWhenRequestInvalid(res);

        try {
            const isAuthorExist = await AuthorsService.getOneAuthor(req.body.author_id);
            if (isAuthorExist) {
                AuthorController.updateAuthor(req, res);
            } else {
                AuthorController.addAuthor(req, res);
            }
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }

    }

    static async addAuthor(req, res) {
        const newAuthor = req.body;
        try {
            const createdAuthor = await AuthorsService.addAuthor(newAuthor);
            responseUtils.setSuccess(201, 'Author Added!', createdAuthor);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async updateAuthor(req, res) {
        const alteredAuthor = req.body;
        const id = req.body.author_id;
        try {
            const updateAuthor = await AuthorsService.updateAuthor(id, alteredAuthor);
            responseUtils.setSuccess(200, 'Author updated', updateAuthor);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async fincAuthorToUpdate(req, res) {
        const alteredAuthor = req.body;
        const { id } = !ObjectUtils.isEmpty(req.params) ? req.params : { id: req.body.author_id };
        if (!Number(id)) return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Please input a valid numeric value');

        try {
            const updateAuthor = await AuthorsService.findAuthorToUpdate(id, alteredAuthor);
            if (!updateAuthor) {
                responseUtils.setError(404, `Cannot find Author with the author_id: ${id}`);
            } else {
                responseUtils.setSuccess(200, 'Author updated', updateAuthor);
            }
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async getAAuthor(req, res) {
        const { id } = req.params;
        if (!Number(id)) return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Please input a valid numeric value');

        try {
            const theAuthor = await AuthorsService.getOneAuthor(id);

            if (!theAuthor) {
                responseUtils.setError(404, `Cannot find Author with the author_id ${id}`);
            } else {
                responseUtils.setSuccess(200, 'Found Author', theAuthor);
            }
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async deleteAuthor(req, res) {
        const { id } = req.params;
        if (!Number(id)) return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Please input a valid numeric value');

        try {
            const authorToDelete = await AuthorsService.deleteAuthor(id);

            if (authorToDelete) {
                responseUtils.setSuccess(200, 'Author deleted');
            } else {
                responseUtils.setError(404, `Author with the author_id ${id} cannot be found`);
            }
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }
}

export default AuthorController;