let Joi = require('joi');
let constants = require('../const');

class Validator {

    constructor(schema = {}) {
        this.schema = schema;
    }

    static create(schema) {
        let validator = new Validator(schema);

        return (req, res, next) => {
            return validator.validateWithMiddleware(req, res, next);
        }
    }

    validate(model) {
        return Joi.validate(model, this.schema);
    }

    validateWithMiddleware(req, res, next) {
        let {error, value} = this.validate(req.body);

        if (error) {
            res.status(constants.STATUS_CODE.FORBIDDEN);
            return next(error.details);
        }

        res[constants.RES_DATA] = value;

        next();
    }
}

module.exports = Validator;