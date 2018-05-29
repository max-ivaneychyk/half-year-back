let Joi = require('joi');

 class Model {

    constructor() {
        this.schema = {};
    }

    validate(model) {
        return Joi.validate(model, this.schema);
    }
};

exports.Model = Model;