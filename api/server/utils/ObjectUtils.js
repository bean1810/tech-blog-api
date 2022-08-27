export default class ObjectUtils {
    static isObjectNotEmpty(obj) {
        return Object.values(obj).every(v => !!v);
    }
    static isEmpty(obj) {
        return obj &&
            Object.keys(obj).length === 0 &&
            Object.getPrototypeOf(obj) === Object.prototype
    }
}