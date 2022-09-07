import ResponseUtils from "./ResponseUtils";

const responseUtils = new ResponseUtils();
export default class Validator {
    static isParameterString(req, res, next) {
        const { name } = req.params;
        if (!isNaN(name)) responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Category name must be a string');
        next();
    }

    static isParameterNumber(req, res, next) {
        const { id } = req.params;
        if (!Number(id)) responseUtils.sendResponseErrorWhenRequestInvalid(res, 400, 'Please input a valid numeric value');
        next();
    }

    static isRequestBodyEmpty(req, res, next) {
        if (!ObjectUtils.isObjectNotEmpty(req.body)) responseUtils.sendResponseErrorWhenRequestInvalid(res);
        next();
    }
}