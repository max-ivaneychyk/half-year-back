let Joi = require('joi');
let constants = require('../const');

class Validator {

    constructor(schema = {}) {
        this.schema = schema;
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

        req[constants.RES_DATA] = value;

        next();
    }
}

exports.Validator = Validator;