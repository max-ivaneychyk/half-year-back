let Joi = require('joi');
const {MIDDLE_TEXT} = require('../validators');

exports.CommentModel = Joi.object().keys({
    ...MIDDLE_TEXT
});