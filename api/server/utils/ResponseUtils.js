export default class ResponseUtil {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'Success';
    }

    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }

    send(res) {
        const result = {
            status: this.type,
            message: this.message,
            data: this.data,
        };

        if (this.type === 'Success') {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
            status: this.type,
            message: this.message,
        });
    }

    sendResponseErrorWhenRequestInvalid(response, statusCode = 400, message = 'Please provide complete details') {
        this.setError(statusCode, message)
        return this.send(response);
    }
}