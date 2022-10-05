let jwt = require('jsonwebtoken');
require('dotenv').config();
export default class ObjectUtils {

    static isObjectNotEmpty(obj) {
        return Object.values(obj).every(v => !!v);
    }

    static isEmpty(obj) {
        return obj &&
            Object.keys(obj).length === 0 &&
            Object.getPrototypeOf(obj) === Object.prototype
    }

    static isArrayEmpty(array) {
        return Array.isArray(array) && array.length;
    }

    static isArrayObjectEmpty(arrayObj) {
        if (!ObjectUtils.isArrayEmpty(arrayObj)) return false;
        for (const obj of arrayObj) {
            if (!ObjectUtils.isObjectNotEmpty(obj)) return false;
        }
        return true;
    }

    static convertStringToArray(string, separator) {
        return string.split(separator);
    }

    static extractToken(string) {
        const findEqualCharacter = string.indexOf('=');
        return string.slice(findEqualCharacter + 1);
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            return error ? false : true;
        })
    }
}