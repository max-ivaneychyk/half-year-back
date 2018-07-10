let Joi = require('joi');
const {POST_DESC, PHOTOS} = require('../validators');

exports.PostModel = Joi.object().keys({
    ...POST_DESC,
    ...PHOTOS
});