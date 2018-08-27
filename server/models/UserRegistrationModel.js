const {EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, REPEAT_PASSWORD} = require('../validators');
let Joi = require('joi');

exports.UserRegistrationModel = Joi.object().keys({
    ...FIRST_NAME,
    ...LAST_NAME,
    ...PASSWORD,
    ...REPEAT_PASSWORD,
    ...EMAIL
});