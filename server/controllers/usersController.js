const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');

class UserController {
    constructor () {
        this.signUp = [
            Validator.create(UserRegistrationModel),
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            middlewares.sendLinkToVerifyEmail,
            middlewares.user.addNewUser,
            middlewares.clearSessionFromResponse,
            middlewares.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel),
            middlewares.addAuthToken,
            middlewares.user.signInUser,
            middlewares.sendAnswer
        ];

        this.deleteUser = [

        ];
    }
}

module.exports = new UserController;