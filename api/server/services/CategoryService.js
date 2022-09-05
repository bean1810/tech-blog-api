import database from '../src/models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
class CategoryService {
    static async getCategoryByName(name) {
        try {
            return await database.Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

    static async getAllCategories() {
        try {
            return await database.Category.findAll();
        } catch (error) {
            throw error
        }
    }

    static async createCategory(newCategory) {
        try {
            return await database.Category.create(newCategory)
        } catch (error) {
            throw error
        }
    }

    static async createMultipleCategories(categories) {
        try {
            return await database.Category.bulkCreate(categories);
        } catch (error) {
            throw error
        }
    }
}

export default CategoryService;