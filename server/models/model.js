let Joi = require('joi');

exports.Model = {

    UserRegistration (model) {
        const schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(30).required().error(() => 'my error'),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: Joi.string().email()
        });

        return Joi.validate(model, schema);
    }
}