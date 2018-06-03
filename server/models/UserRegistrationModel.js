const {EMAIL, FIRST_NAME, LAST_NAME, PASSWORD} = require('../validators');
let Joi = require('joi');

exports.UserRegistrationModel = Joi.object().keys({
    ...FIRST_NAME,
    ...LAST_NAME,
    ...PASSWORD,
    ...EMAIL
});