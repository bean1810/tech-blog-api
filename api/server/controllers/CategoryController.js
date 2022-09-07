import CategoryService from '../services/CategoryService';
import ResponseUtils from '../utils/ResponseUtils';
import ObjectUtils from '../utils/ObjectUtils';

const responseUtils = new ResponseUtils();

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const allCategories = await CategoryService.getAllCategories();
            const responseMessage = allCategories.length ? 'Categories retrieved successfully' : 'No category found';
            responseUtils.setSuccess(200, responseMessage, allCategories);

            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async getCategoryByName(req, res) {
        const { name } = req.params;
        try {
            const category = await CategoryService.getCategoryByName(name);
            const responseMessage = category.length ? 'Found Category' : 'No Category Found';
            responseUtils.setSuccess(200, responseMessage, category);

            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async createCategory(req, res) {
        if (Array.isArray(req.body)) {
            CategoryController.createListCategory(req, res);
        } else {
            CategoryController.createSingleCategory(req, res);
        }
    }

    static async createSingleCategory(req, res) {
        if (!ObjectUtils.isObjectNotEmpty(req.body)) return responseUtils.sendResponseErrorWhenRequestInvalid(res);
        try {
            const createdCategory = await CategoryService.createCategory(req.body);
            responseUtils.setSuccess(200, 'Category Added Successfully', createdCategory);
            return responseUtils.send(res)
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async createListCategory(req, res) {
        if (!ObjectUtils.isArrayObjectEmpty(req.body)) return responseUtils.sendResponseErrorWhenRequestInvalid(res);
        try {
            const createdCategory = await CategoryService.createMultipleCategories(req.body);
            responseUtils.setSuccess(200, 'Category Added Successfully', createdCategory);
            return responseUtils.send(res)
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }
}

export default CategoryController;