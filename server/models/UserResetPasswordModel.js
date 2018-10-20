const {EMAIL, PASSWORD, REPEAT_PASSWORD} = require('../validators');
let Joi = require('joi');

exports.UserResetPasswordModel = Joi.object().keys({
    ...PASSWORD,
    ...REPEAT_PASSWORD,
    ...EMAIL
});