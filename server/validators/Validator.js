let Joi = require('joi');

class Validator {

    constructor(schema = {}) {
        this.schema = schema;
    }

    validate(model) {
        return Joi.validate(model, this.schema);
    }

    validateWithMiddleware(req, res, next) {
        let {error} = this.validate(req.body);

        return error ? next(error) : next();
    }
}

exports.Validator = Validator;