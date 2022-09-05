import CategoryService from '../services/CategoryService';
import ResponseUtils from '../utils/ResponseUtils';
import ObjectUtils from '../utils/ObjectUtils';
import e from 'express';

const responseUtils = new ResponseUtils();

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const allCategories = await CategoryService.getAllCategories();
            const responseMessage = allCategories.length ? 'Categories retrieved successfully' : 'No category found';
            responseUtils.setSuccess(200, responseMessage, allCategories);

            return responseUtils.send(res);
        } catch (error) {
            responseUtils.setError(400, error);
            return responseUtils.send(res);
        }
    }

    static async getCategoryByName(req, res) {
        const { name } = req.params;

        if (!isNaN(name)) {
            responseUtils.setError(400, 'Category name must be a string');
            return responseUtils.send(res);
        }

        try {
            const category = await CategoryService.getCategoryByName(name);
            const responseMessage = category.length ? 'Found Category' : 'No Category Found';
            responseUtils.setSuccess(200, responseMessage, category);

            return responseUtils.send(res);
        } catch (error) {
            responseUtils.setError(400, error);
            return responseUtils.send(res);
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
        if (!ObjectUtils.isObjectNotEmpty(req.body)) {
            responseUtils.setError(400, 'Please provide complete details');
            return responseUtils.send(res);
        }
        try {
            const createdCategory = await CategoryService.createCategory(req.body);
            responseUtils.setSuccess(200, 'Category Added Successfully', createdCategory);
            return responseUtils.send(res)
        } catch (error) {
            responseUtils.setError(400, error.message);
            return responseUtils.send(res);
        }
    }

    static async createListCategory(req, res) {
        if (!ObjectUtils.isArrayObjectEmpty(req.body)) {
            responseUtils.setError(400, 'Please provide complete details');
            return responseUtils.send(res);
        }
        try {
            const createdCategory = await CategoryService.createMultipleCategories(req.body);
            responseUtils.setSuccess(200, 'Category Added Successfully', createdCategory);
            return responseUtils.send(res)
        } catch (error) {
            responseUtils.setError(400, error.message);
            return responseUtils.send(res);
        }
    }
}

export default CategoryController;