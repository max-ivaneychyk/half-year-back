const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');

class UserController {
    constructor () {
        this.signUp = [
            Validator.create(UserRegistrationModel),
            middlewares.addAuthToken,
            middlewares.sendLinkToVerifyEmail,
            middlewares.user.addNewUser,
            middlewares.clearSessionFromResponse,
            middlewares.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel),
            middlewares.user.signInUser,
            middlewares.addAuthToken,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new UserController;