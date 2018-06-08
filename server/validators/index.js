let Joi = require('joi');

const VALIDATIONS = {
    MIN_LENGTH_FIRST_NAME: 3,
    MAX_LENGTH_FIRST_NAME: 30,

    MIN_LENGTH_LAST_NAME: 3,
    MAX_LENGTH_LAST_NAME: 30,

    MIN_LENGTH_PASSWORD: 3,
    MAX_LENGTH_PASSWORD: 30,

    MIN_LENGTH_POST_DESC: 1,
    MAX_LENGTH_POST_DESC: 255,

};

const PASSWORD = {
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
};

exports.EMAIL = {
    email: Joi.string().email().required()
};

exports.FIRST_NAME = {
    firstName: Joi.string().alphanum().min(VALIDATIONS.MIN_LENGTH_FIRST_NAME).max(VALIDATIONS.MAX_LENGTH_FIRST_NAME).required()
};

exports.LAST_NAME = {
    lastName: Joi.string().alphanum().min(VALIDATIONS.MIN_LENGTH_LAST_NAME).max(VALIDATIONS.MAX_LENGTH_LAST_NAME).required()
};

exports.POST_DESC = {
    description: Joi.string().min(VALIDATIONS.MIN_LENGTH_POST_DESC).max(VALIDATIONS.MAX_LENGTH_POST_DESC).required()
};

exports.PASSWORD = {...PASSWORD};

exports.REPEAT_PASSWORD = {repeatPassword: PASSWORD.password};
