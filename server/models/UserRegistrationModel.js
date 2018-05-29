let Joi = require('joi');
let Model = require('./Model').Model;

class UserRegistrationModel extends Model {
    constructor () {
        super();

        this.schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().email().required()
        })
    }
}


exports.UserRegistrationModel = UserRegistrationModel;