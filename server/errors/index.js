

class AppError extends Error {

    constructor(params) {
        if (!(params instanceof Object)) {
            throw Error('params must be an object type');
        }
        super(params);
        Object.assign(this, params);
    }

    static create (...params) {
        return new AppError(...params);
    }
}


module.exports = AppError;
