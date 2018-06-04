const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');

class UserController {
    constructor () {
        this.signUp = [
            Validator.create(UserRegistrationModel),
            middlewares.addAuthToken,
            middlewares.sendLinkToVerifyEmail,
            middlewares.addNewUser,
            middlewares.clearSessionFromResponse,
            middlewares.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel),
            middlewares.signInUser,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new UserController;