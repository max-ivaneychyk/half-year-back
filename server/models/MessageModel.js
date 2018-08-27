let Joi = require('joi');
const {MIDDLE_TEXT, PHOTOS, UUID, COVERSATION_ID} = require('../validators');

exports.MessageModel = Joi.object().keys({
    ...MIDDLE_TEXT,
    ...PHOTOS,
    ...UUID,
    ...COVERSATION_ID
});