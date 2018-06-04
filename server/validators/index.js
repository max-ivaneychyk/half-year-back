let Joi = require('joi');

const VALIDATIONS = {
    MIN_LENGTH_FIRST_NAME: 3,
    MAX_LENGTH_FIRST_NAME: 30,

    MIN_LENGTH_LAST_NAME: 3,
    MAX_LENGTH_LAST_NAME: 30,

    MIN_LENGTH_PASSWORD: 3,
    MAX_LENGTH_PASSWORD: 30,
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

exports.PASSWORD = {...PASSWORD};

exports.REPEAT_PASSWORD = {...PASSWORD};
