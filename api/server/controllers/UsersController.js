import UserService from "../services/UserService";
import ResponseUtils from "../utils/ResponseUtils";
import ObjectUtils from "../utils/ObjectUtils"
import atob from "atob";
import btoa from "btoa";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';

require('dotenv').config();

const responseUtils = new ResponseUtils();

class UsersController {
    static async getAllUsers(req, res, next) {
        try {
            const allUsers = await UserService.getUser();
            const message = allUsers.length ? 'Users retrieved successfully' : 'No users retrieved';
            responseUtils.setSuccess(200, message, allUsers);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async createUser(req, res, next) {
        const newUser = req.body;
        newUser.password = bcryptjs.hashSync(newUser.password, 10);
        try {
            const createdUser = await UserService.createUser(newUser);
            responseUtils.setSuccess(200, 'User created successfully', createdUser);
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }

    static async authenticate(req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;
        try {
            const user = await UserService.findUser(userName);
            if (!user) {
                return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'User does not exist');
            }
            const compare = bcryptjs.compareSync(password, user.password);
            if (!compare) {
                responseUtils.setError(401, 'Cannot found any user. Please check the user name and password');
                return responseUtils.send(res);
            }
            let token = jwt.sign({ userName: userName, password: password },
                process.env.SECRET_KEY, { expiresIn: 86400 }
            )
            let date = new Date();
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
            res.cookie("auth_tk", token, {
                httpOnly: true,
                secure: false,
                expires: date,
                sameSite: "strict"
            });
            responseUtils.setSuccess(200, 'Success', { status: 'Success', auth: true });
            return responseUtils.send(res);
        } catch (error) {
            return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, error.message);
        }
    }
}

export default UsersController