import ResponseUtils from "./ResponseUtils";
import ObjectUtils from './ObjectUtils';

const responseUtils = new ResponseUtils();
export default class Validator {
    static isParameterString(req, res, next) {
        const { name } = req.params;
        if (!isNaN(name)) return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Category name must be a string');
        next();
    }

    static isParameterNumber(req, res, next) {
        const { id } = req.params;
        if (!Number(id)) return responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Please input a valid numeric value');
        next();
    }

    static isRequestBodyEmpty(req, res, next) {
        if (!ObjectUtils.isObjectNotEmpty(req.body)) return responseUtils.sendResponseErrorWhenRequestInvalid(res);
        next();
    }

    static verifyToken(req, res, next) {
        // let token = req.cookies.auth_tk
        // if (!token) {
        //     return res.status(401).send({
        //         auth: false,
        //         message: 'Invalid Authentication Token'
        //     })
        // }
        // jwt.verify(token, secretKey, (err, decoded) => {
        //     if (err) {
        //         return res.status(500).send({
        //             auth: false,
        //             message: 'Failed to authenticate token.'
        //         })
        //     }
        //     next();
        // })
    }
}