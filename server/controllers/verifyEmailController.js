const middlewares = require('../middlewares');

class VerifyEmailController {
    constructor () {
        this.verify = [
            middlewares.email.endVerifyEmail,
            middlewares.redirectToAuthPage
        ];
    }
}

module.exports = new VerifyEmailController;