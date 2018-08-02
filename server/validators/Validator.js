let Joi = require('joi');
let constants = require('../const');

class Validator {

    constructor(schema = {}) {
        this.schema = schema;
    }

    static create(schema) {
        let validator = new Validator(schema);

        return {
            body: (req, res, next) => validator.validateBodyMiddleware(req, res, next),
            query:(req, res,next) => validator.validateQueryMiddleware(req, res, next),
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

    validateBodyMiddleware(req, res, next) {
        let {error, value} = this.validate(req.body);

       if (error) {
            res.status(constants.STATUS_CODE.FORBIDDEN);
            return next(error.details);
        }

        next();
    }

    validateQueryMiddleware(req, res, next) {
        let {error, value} = this.validate(req.query);

       if (error) {
            res.status(constants.STATUS_CODE.FORBIDDEN);
            return next(error.details);
        }

        next();
    }
}

module.exports = Validator;