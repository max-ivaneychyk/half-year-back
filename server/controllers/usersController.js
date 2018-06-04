const middlewares = require('../middlewares');
const validators = require('../validators/UserRegistrationValidator');

class UserController {
    constructor () {
        this.addNewUser = [
            validators.userRegistrationValidator.validateWithMiddleware.bind(validators.userRegistrationValidator),
            middlewares.addNewUser,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new UserController;