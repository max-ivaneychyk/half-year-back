const middlewares = require('../middlewares');
let {groupJoinData, CHECK_KEYS} = middlewares.utils.joiner;

class Controller {
    constructor() {
        this.JOIN_OBJECTS = CHECK_KEYS;
    }
    
    checkToken (req, res, next) {
        middlewares.token.checkToken(req, res, next)
    }

    sendAnswer (req, res, next) {
        middlewares.sendAnswer(req, res, next)
    }

    addUserIdToParams (req, res, next) {
        middlewares.utils.addUserIdToParams.apply(null, arguments);
    }

    mapRecors(listForJoin = []) {
        return groupJoinData(listForJoin)
    }

    getFirstElemFromDataList (req, res, next) {
        req.ans.merge({data: req.ans.get().data[0]});
        next();
    }

    validateBody(model) {

    }

    validateQuery(model) {

    }

    validateParams(model) {

    }
}

module.exports = Controller;