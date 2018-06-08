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

    static deleteFields (fields) {
        return (req, res, next) => {
            fields.forEach(field => {
                delete req.body[field];
            });

            next();
        }
    }

    static isSameFields (fields) {
        return (req, res, next) => {
            let ctx = req.body;
            let value = ctx[fields[0]];
            
            for (let field of fields) {
                if (ctx[field] !== value) {
                    return next({message: `Diff value in fields ${fields[0]} and ${field}`})
                }
            }

            next();
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