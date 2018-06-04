const middlewares = require('../middlewares');

class VerifyEmailController {
    constructor () {
        this.verify = [
            middlewares.endVerifyEmail,
            middlewares.redirectToAuthPage
        ];
    }
}

module.exports = new VerifyEmailController;