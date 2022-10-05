import database from '../src/models';

class UserService {
    static async getUser() {
        try {
            return await database.Users.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async createUser(newUser) {
        try {
            const user = await database.Users.create(newUser);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async findUser(username) {
        try {
            const user = await database.Users.findOne({
                where: { user_name: username }
            });
            return user || null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService