let Joi = require('joi');
const {POST_DESC} = require('../validators');

exports.PostModel = Joi.object().keys({
    ...POST_DESC
});