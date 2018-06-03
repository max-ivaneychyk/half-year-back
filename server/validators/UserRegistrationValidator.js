
let {Validator} = require('./Validator');
let {UserRegistrationModel} = require('../models/index')

class UserRegistrationValidator extends Validator {
    constructor() {
        super(UserRegistrationModel);
   }
}

exports.UserRegistrationValidator = UserRegistrationValidator;
exports.userRegistrationValidator = new UserRegistrationValidator;