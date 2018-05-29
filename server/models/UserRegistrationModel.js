let Joi = require('joi');
let Model = require('./Model').Model;

const {EMAIL, FIRST_NAME, LAST_NAME, PASSWORD} = require('../validators');

class UserRegistrationModel extends Model {
    constructor() {
        super();

        this.schema = Joi.object().keys({
            ...FIRST_NAME,
            ...LAST_NAME,
            ...PASSWORD,
            ...EMAIL
        })

    }
}

exports.UserRegistrationModel = UserRegistrationModel;