const middlewares = require('../middlewares');

class Controller {
    
    checkToken (req, res, next) {

    }

    sendAnswer (req, res, next) {
        middlewares.sendAnswer(req, res, next)
    }

    addUserIdToParams(req, res, next) {

    }

    groupJoinData(req, res, next) {

    }
}

module.exports = Controller;