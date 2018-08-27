const middlewares = require('../middlewares');

class Controller {
    sendAnswer (req, res, next) {
        middlewares.sendAnswer(req, res, next)
    }
}

module.exports = Controller;