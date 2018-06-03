let Joi = require('joi');
const {EMAIL, PASSWORD} = require('../validators');

exports.UserLoginModel = Joi.object().keys({
    ...PASSWORD,
    ...EMAIL
});