

class AppError extends Error {

    constructor(params) {
        if (!(params instanceof Object)) {
            throw Error('params must be an object type');
        }
        super(params);

        this.name = params.name;
        this.message = params.message;
        this.code = params.code;
    }

    static create (...params) {
        return new AppError(...params);
    }
}


module.exports = AppError;
